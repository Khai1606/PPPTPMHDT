const { sql, poolPromise } = require('../db');
const NhatKyRepository = require('./NhatKyRepository');

const XuatKhoRepository = {
  async taoPhieuXuatFEFO({ maThuoc, soLuongXuatTong, chiTietXuat, ghiChu, nguoiThucHien }) {
    const ketNoi = await poolPromise;
    const giaoDich = new sql.Transaction(ketNoi);

    try {
      await giaoDich.begin();

      let danhSachLoSeXuat = [];

      // Trường hợp 1: Frontend gửi mã thuốc & tổng số lượng -> Backend tự tính FEFO
      if (maThuoc && soLuongXuatTong > 0) {
        const dsLoRes = await new sql.Request(giaoDich)
          .input('MaThuoc', sql.VarChar(20), maThuoc)
          .query(`
            SELECT MALO, NGAYHETHAN, SOLUONGTON
            FROM LOTHUOC
            WHERE MATHUOC = @MaThuoc
              AND TRANGTHAI = 'Active'
              AND SOLUONGTON > 0
              AND CAST(NGAYHETHAN AS DATE) > CAST(GETDATE() AS DATE)
            ORDER BY NGAYHETHAN ASC
          `);

        const cacLoKhaDung = dsLoRes.recordset;
        const tongTonKhaDung = cacLoKhaDung.reduce((sum, lo) => sum + lo.SOLUONGTON, 0);

        if (tongTonKhaDung < soLuongXuatTong) {
          await giaoDich.rollback();
          throw new Error(`Không đủ tồn kho khả dụng! Hiện chỉ còn ${tongTonKhaDung} đơn vị.`);
        }

        let soLuongConLai = soLuongXuatTong;
        for (const lo of cacLoKhaDung) {
          if (soLuongConLai <= 0) break;
          const layTuLoNay = Math.min(lo.SOLUONGTON, soLuongConLai);
          danhSachLoSeXuat.push({ MALO: lo.MALO, SOLUONGXUAT: layTuLoNay });
          soLuongConLai -= layTuLoNay;
        }
      } 
      // Trường hợp 2: Frontend gửi sẵn danh sách chiTietXuat
      else if (Array.isArray(chiTietXuat) && chiTietXuat.length > 0) {
        danhSachLoSeXuat = chiTietXuat.map((ct) => ({
          MALO: ct.MALO || ct.maLo,
          SOLUONGXUAT: Number(ct.SOLUONGXUAT || ct.soLuongXuat)
        }));
      }

      // Tạo phiếu xuất chính
      const maPhieuXuat = 'PX' + Date.now();
      await new sql.Request(giaoDich)
        .input('MaPhieuXuat', sql.VarChar(50), maPhieuXuat)
        .input('MaTaiKhoan', sql.VarChar(20), nguoiThucHien?.MATAIKHOAN || 'TK01')
        .input('GhiChu', sql.NVarChar(255), ghiChu || 'Xuất kho theo nguyên tắc ưu tiên hạn dùng FEFO')
        .query(`
          INSERT INTO PHIEUXUAT (MAPHIEUXUAT, NGAYXUAT, MATAIKHOAN, GHICHU)
          VALUES (@MaPhieuXuat, GETDATE(), @MaTaiKhoan, @GhiChu)
        `);

      // Lưu chi tiết xuất & trừ tồn kho từng lô
      const chiTietDaXuat = [];
      for (let i = 0; i < danhSachLoSeXuat.length; i++) {
        const item = danhSachLoSeXuat[i];

        await new sql.Request(giaoDich)
          .input('MaCTPX', sql.VarChar(50), `CTPX${Date.now()}_${i + 1}`)
          .input('MaPhieuXuat', sql.VarChar(50), maPhieuXuat)
          .input('MaLo', sql.VarChar(20), item.MALO)
          .input('SoLuongXuat', sql.Int, item.SOLUONGXUAT)
          .query(`
            INSERT INTO CHITIETPHIEUXUAT (MACTPX, MAPHIEUXUAT, MALO, SOLUONGXUAT)
            VALUES (@MaCTPX, @MaPhieuXuat, @MaLo, @SoLuongXuat)
          `);

        await new sql.Request(giaoDich)
          .input('MaLo', sql.VarChar(20), item.MALO)
          .input('SoLuongTru', sql.Int, item.SOLUONGXUAT)
          .query(`UPDATE LOTHUOC SET SOLUONGTON = SOLUONGTON - @SoLuongTru WHERE MALO = @MaLo`);

        chiTietDaXuat.push(`${item.MALO} (SL: ${item.SOLUONGXUAT})`);
      }

      // Ghi Audit Log trong cùng Transaction
      await NhatKyRepository.ghiLog(
        nguoiThucHien?.MATAIKHOAN || 'TK01',
        'Xuất kho FEFO',
        'PHIEUXUAT',
        `${nguoiThucHien?.HOTEN || 'Thủ kho'} lập phiếu ${maPhieuXuat} xuất kho từ các lô: ${chiTietDaXuat.join(', ')}`,
        giaoDich
      );

      await giaoDich.commit();
      return { maPhieuXuat, chiTietDaXuat };
    } catch (err) {
      if (giaoDich._aborted === false) await giaoDich.rollback();
      throw err;
    }
  }
};

module.exports = XuatKhoRepository;