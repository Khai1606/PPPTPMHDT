const { sql, poolPromise } = require('../db');
const NhatKyRepository = require('./NhatKyRepository');

const LoThuocRepository = {
  // Lấy toàn bộ dữ liệu từ database QuanLyKhoThuoc
  async layToanBoDuLieu() {
    const ketNoi = await poolPromise;

    const truyVanAnToan = async (cauLenhSQL) => {
      try {
        const res = await ketNoi.request().query(cauLenhSQL);
        return res.recordset;
      } catch (loi) {
        console.error('⚠️ Lỗi câu SQL:', cauLenhSQL, '->', loi.message);
        return [];
      }
    };

    const [taiKhoan, thuoc, loThuoc, phieuDieuChinh, phieuXuat, chiTietXuat, nhatKy] =
      await Promise.all([
        truyVanAnToan('SELECT MATAIKHOAN, HOTEN, TENDANGNHAP, VAITRO FROM TAIKHOAN'),
        truyVanAnToan('SELECT * FROM THUOC'),
        truyVanAnToan('SELECT * FROM LOTHUOC ORDER BY NGAYHETHAN ASC'),
        truyVanAnToan(`
          SELECT P.*, C.MALO, C.SOLUONGTONSOSACH, C.SOLUONGTONTHUCTE, C.CHENHLECH, C.LYDODIEUCHINH
          FROM PHIEUDIEUCHINH P
          LEFT JOIN CHITIETPHIEUDIEUCHINH C ON P.MAPHIEU = C.MAPHIEU
          ORDER BY P.NGAYLAP DESC
        `),
        truyVanAnToan('SELECT * FROM PHIEUXUAT ORDER BY NGAYXUAT DESC'),
        truyVanAnToan('SELECT * FROM CHITIETPHIEUXUAT'),
        truyVanAnToan('SELECT * FROM NHATKYHOATDONG ORDER BY THOIGIAN DESC')
      ]);

    const danhSachPhieuXuat = phieuXuat.map((px) => ({
      ...px,
      CHITIET: chiTietXuat.filter((ct) => ct.MAPHIEUXUAT === px.MAPHIEUXUAT)
    }));

    return {
      TAIKHOAN: taiKhoan,
      THUOC: thuoc,
      LOTHUOC: loThuoc,
      PHIEUDIEUCHINH: phieuDieuChinh,
      PHIEUXUAT: danhSachPhieuXuat,
      NHATKYHOATDONG: nhatKy
    };
  },

  // Nhập lô thuốc mới
  async nhapLoMoi(duLieu) {
    const maLo = duLieu.maLo || duLieu.MALO;
    const maThuoc = duLieu.maThuoc || duLieu.MATHUOC;
    const ngaySanXuat = duLieu.ngaySanXuat || duLieu.NGAYSANXUAT;
    const ngayHetHan = duLieu.ngayHetHan || duLieu.NGAYHETHAN;
    const soLuongNhap = duLieu.soLuongNhap || duLieu.SOLUONGTON || duLieu.SOLUONGNHAP;
    const nguoiThucHien = duLieu.nguoiThucHien;

    const ketNoi = await poolPromise;
    await ketNoi.request()
      .input('MaLo', sql.VarChar(20), String(maLo).trim().toUpperCase())
      .input('MaThuoc', sql.VarChar(20), String(maThuoc).trim())
      .input('NgaySanXuat', sql.Date, ngaySanXuat || null)
      .input('NgayHetHan', sql.Date, ngayHetHan)
      .input('SoLuongTon', sql.Int, Number(soLuongNhap))
      .query(`
        INSERT INTO LOTHUOC (MALO, MATHUOC, NGAYSANXUAT, NGAYHETHAN, NGAYNHAPKHO, SOLUONGTON, TRANGTHAI)
        VALUES (@MaLo, @MaThuoc, @NgaySanXuat, @NgayHetHan, GETDATE(), @SoLuongTon, 'Active')
      `);

    await NhatKyRepository.ghiLog(
      nguoiThucHien?.MATAIKHOAN || 'TK01',
      'Nhập lô thuốc mới',
      'LOTHUOC',
      `${nguoiThucHien?.HOTEN || 'Thủ kho'} nhập lô ${maLo} (Thuốc ${maThuoc}), SL: ${soLuongNhap}, HSD: ${ngayHetHan}`
    );
  },

  // Quét & khóa lô hết hạn
  async quetVaKhoaLoHetHan(nguoiThucHien) {
    const ketNoi = await poolPromise;
    const ketQua = await ketNoi.request().query(`
      UPDATE LOTHUOC
      SET TRANGTHAI = 'Expired'
      OUTPUT INSERTED.MALO
      WHERE TRANGTHAI = 'Active' AND CAST(NGAYHETHAN AS DATE) <= CAST(GETDATE() AS DATE)
    `);
    const soLoBiKhoa = ketQua.recordset.length;

    await NhatKyRepository.ghiLog(
      nguoiThucHien.MATAIKHOAN,
      'Quét hạn dùng tự động',
      'LOTHUOC',
      `Quản lý ${nguoiThucHien.HOTEN} kích hoạt quét hạn dùng: Đã khóa ${soLoBiKhoa} lô quá hạn.`
    );
    return soLoBiKhoa;
  },

  // Khóa lô khẩn cấp
  async khoaLoKhanCap(maLo, nguoiThucHien) {
    const ketNoi = await poolPromise;
    await ketNoi.request()
      .input('MaLo', sql.VarChar(50), maLo)
      .query(`UPDATE LOTHUOC SET TRANGTHAI = 'Blocked' WHERE MALO = @MaLo`);

    await NhatKyRepository.ghiLog(
      nguoiThucHien.MATAIKHOAN,
      'Khóa lô khẩn cấp',
      'LOTHUOC',
      `Quản lý ${nguoiThucHien.HOTEN} đã khóa khẩn cấp lô ${maLo}`
    );
  },

  // Tiêu hủy lô thuốc
  async tieuHuyLo(maLo, nguoiThucHien) {
    const ketNoi = await poolPromise;
    await ketNoi.request()
      .input('MaLo', sql.VarChar(50), maLo)
      .query(`DELETE FROM LOTHUOC WHERE MALO = @MaLo`);

    await NhatKyRepository.ghiLog(
      nguoiThucHien.MATAIKHOAN,
      'Tiêu hủy lô thuốc',
      'LOTHUOC',
      `Quản lý ${nguoiThucHien.HOTEN} đã xuất hủy và xóa lô ${maLo} khỏi kho`
    );
  }
};

module.exports = LoThuocRepository;