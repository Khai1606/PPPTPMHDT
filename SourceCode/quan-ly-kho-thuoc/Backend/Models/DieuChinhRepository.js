const { sql, poolPromise } = require('../db');
const NhatKyRepository = require('./NhatKyRepository');

const DieuChinhRepository = {
  // Bước 1: Thủ kho lập phiếu yêu cầu điều chỉnh (Trạng thái Pending)
  async lapPhieu({ maLo, tonSoSach, tonThucTe, lyDoDieuChinh, nguoiThucHien }) {
    const ketNoi = await poolPromise;
    const giaoDich = new sql.Transaction(ketNoi);

    try {
      await giaoDich.begin();

      const maPhieu = 'PDC' + Date.now();
      const maChiTiet = 'CTDC' + Date.now();
      const chenhLech = Number(tonThucTe) - Number(tonSoSach);

      await new sql.Request(giaoDich)
        .input('MaPhieu', sql.VarChar(50), maPhieu)
        .input('NguoiLapID', sql.VarChar(20), nguoiThucHien.MATAIKHOAN)
        .query(`
          INSERT INTO PHIEUDIEUCHINH (MAPHIEU, NGAYLAP, NGUOILAPID, NGUOIDUYETID, TRANGTHAI, LYDOTUCHOI)
          VALUES (@MaPhieu, GETDATE(), @NguoiLapID, NULL, 'Pending', NULL)
        `);

      await new sql.Request(giaoDich)
        .input('MaChiTiet', sql.VarChar(50), maChiTiet)
        .input('MaPhieu', sql.VarChar(50), maPhieu)
        .input('MaLo', sql.VarChar(20), maLo)
        .input('TonSoSach', sql.Int, Number(tonSoSach))
        .input('TonThucTe', sql.Int, Number(tonThucTe))
        .input('ChenhLech', sql.Int, chenhLech)
        .input('LyDo', sql.NVarChar(255), lyDoDieuChinh)
        .query(`
          INSERT INTO CHITIETPHIEUDIEUCHINH 
            (MACHITIET, MAPHIEU, MALO, SOLUONGTONSOSACH, SOLUONGTONTHUCTE, CHENHLECH, LYDODIEUCHINH)
          VALUES 
            (@MaChiTiet, @MaPhieu, @MaLo, @TonSoSach, @TonThucTe, @ChenhLech, @LyDo)
        `);

      await NhatKyRepository.ghiLog(
        nguoiThucHien.MATAIKHOAN,
        'Lập phiếu điều chỉnh tồn kho',
        'PHIEUDIEUCHINH',
        `Thủ kho ${nguoiThucHien.HOTEN} (${nguoiThucHien.MATAIKHOAN}) lập phiếu ${maPhieu} kiểm kê lô ${maLo} (Sổ sách: ${tonSoSach} -> Thực tế: ${tonThucTe}), chờ Quản lý duyệt.`,
        giaoDich
      );

      await giaoDich.commit();
      return maPhieu;
    } catch (err) {
      if (giaoDich._aborted === false) await giaoDich.rollback();
      throw err;
    }
  },

  // Bước 2 (Đồng ý): Quản lý phê duyệt -> Cập nhật tồn kho thực tế
  async duyetPhieu(maPhieu, nguoiThucHien) {
    const ketNoi = await poolPromise;
    const giaoDich = new sql.Transaction(ketNoi);

    try {
      await giaoDich.begin();

      const phieuRes = await new sql.Request(giaoDich)
        .input('MaPhieu', sql.VarChar(50), maPhieu)
        .query(`
          SELECT P.TRANGTHAI, C.MALO, C.SOLUONGTONTHUCTE
          FROM PHIEUDIEUCHINH P
          JOIN CHITIETPHIEUDIEUCHINH C ON P.MAPHIEU = C.MAPHIEU
          WHERE P.MAPHIEU = @MaPhieu
        `);

      const thongTin = phieuRes.recordset[0];
      if (!thongTin) throw new Error('Không tìm thấy phiếu điều chỉnh!');
      if (thongTin.TRANGTHAI !== 'Pending') throw new Error('Phiếu này đã được xử lý trước đó!');

      await new sql.Request(giaoDich)
        .input('MaPhieu', sql.VarChar(50), maPhieu)
        .input('NguoiDuyetID', sql.VarChar(20), nguoiThucHien.MATAIKHOAN)
        .query(`
          UPDATE PHIEUDIEUCHINH
          SET TRANGTHAI = 'Approved', NGUOIDUYETID = @NguoiDuyetID
          WHERE MAPHIEU = @MaPhieu
        `);

      await new sql.Request(giaoDich)
        .input('MaLo', sql.VarChar(20), thongTin.MALO)
        .input('TonThucTe', sql.Int, thongTin.SOLUONGTONTHUCTE)
        .query(`
          UPDATE LOTHUOC
          SET SOLUONGTON = @TonThucTe
          WHERE MALO = @MaLo
        `);

      await NhatKyRepository.ghiLog(
        nguoiThucHien.MATAIKHOAN,
        'Phê duyệt phiếu điều chỉnh',
        'PHIEUDIEUCHINH & LOTHUOC',
        `Quản lý ${nguoiThucHien.HOTEN} (${nguoiThucHien.MATAIKHOAN}) PHÊ DUYỆT phiếu ${maPhieu}: Cập nhật tồn kho lô ${thongTin.MALO} thành ${thongTin.SOLUONGTONTHUCTE}.`,
        giaoDich
      );

      await giaoDich.commit();
      return thongTin.MALO;
    } catch (err) {
      if (giaoDich._aborted === false) await giaoDich.rollback();
      throw err;
    }
  },

  // Bước 2 (Từ chối): Quản lý từ chối -> Giữ nguyên tồn kho cũ
  async tuChoiPhieu(maPhieu, lyDoTuChoi, nguoiThucHien) {
    const ketNoi = await poolPromise;
    const giaoDich = new sql.Transaction(ketNoi);

    try {
      await giaoDich.begin();

      const checkRes = await new sql.Request(giaoDich)
        .input('MaPhieu', sql.VarChar(50), maPhieu)
        .query(`SELECT TRANGTHAI FROM PHIEUDIEUCHINH WHERE MAPHIEU = @MaPhieu`);

      if (!checkRes.recordset[0]) throw new Error('Không tìm thấy phiếu điều chỉnh!');
      if (checkRes.recordset[0].TRANGTHAI !== 'Pending') throw new Error('Phiếu này đã được xử lý trước đó!');

      await new sql.Request(giaoDich)
        .input('MaPhieu', sql.VarChar(50), maPhieu)
        .input('NguoiDuyetID', sql.VarChar(20), nguoiThucHien.MATAIKHOAN)
        .input('LyDoTuChoi', sql.NVarChar(255), lyDoTuChoi.trim())
        .query(`
          UPDATE PHIEUDIEUCHINH
          SET TRANGTHAI = 'Rejected', NGUOIDUYETID = @NguoiDuyetID, LYDOTUCHOI = @LyDoTuChoi
          WHERE MAPHIEU = @MaPhieu
        `);

      await NhatKyRepository.ghiLog(
        nguoiThucHien.MATAIKHOAN,
        'Từ chối phiếu điều chỉnh',
        'PHIEUDIEUCHINH',
        `Quản lý ${nguoiThucHien.HOTEN} (${nguoiThucHien.MATAIKHOAN}) TỪ CHỐI phiếu ${maPhieu} (Lý do: ${lyDoTuChoi}). Giữ nguyên tồn kho cũ.`,
        giaoDich
      );

      await giaoDich.commit();
    } catch (err) {
      if (giaoDich._aborted === false) await giaoDich.rollback();
      throw err;
    }
  }
};

module.exports = DieuChinhRepository;