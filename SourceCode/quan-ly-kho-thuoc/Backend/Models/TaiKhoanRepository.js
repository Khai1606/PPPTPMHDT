const { sql, poolPromise } = require('../db');

const TaiKhoanRepository = {
  // Tìm tài khoản theo tên đăng nhập
  async timTheoTenDangNhap(tenDangNhap) {
    const ketNoi = await poolPromise;
    const ketQua = await ketNoi.request()
      .input('TenDangNhap', sql.VarChar(50), tenDangNhap)
      .query(`
        SELECT MATAIKHOAN, HOTEN, TENDANGNHAP, MATKHAU, VAITRO
        FROM TAIKHOAN
        WHERE TENDANGNHAP = @TenDangNhap
      `);
    return ketQua.recordset[0] || null;
  },

  // Kiểm tra đăng nhập
  async kiemTraDangNhap(tenDangNhap, matKhau) {
    const ketNoi = await poolPromise;
    const ketQua = await ketNoi.request()
      .input('TenDangNhap', sql.VarChar(50), tenDangNhap)
      .input('MatKhau', sql.VarChar(255), matKhau)
      .query(`
        SELECT MATAIKHOAN, HOTEN, TENDANGNHAP, VAITRO
        FROM TAIKHOAN
        WHERE TENDANGNHAP = @TenDangNhap AND MATKHAU = @MatKhau
      `);
    return ketQua.recordset[0] || null;
  },

  // Ghi vết đăng nhập bất biến
  async ghiNhatKyDangNhap(taiKhoanHoacMa, hoTenThamSo = '') {
    const ketNoi = await poolPromise;
    const maLog = 'LOG' + Date.now();

    const maTaiKhoan = typeof taiKhoanHoacMa === 'object'
      ? (taiKhoanHoacMa.MATAIKHOAN || taiKhoanHoacMa.maTaiKhoan)
      : taiKhoanHoacMa;

    const tenHienThi = typeof taiKhoanHoacMa === 'object'
      ? `${taiKhoanHoacMa.HOTEN || ''} (${taiKhoanHoacMa.VAITRO || ''})`
      : (hoTenThamSo || maTaiKhoan);

    await ketNoi.request()
      .input('MaLog', sql.VarChar(50), maLog)
      .input('MaTaiKhoan', sql.VarChar(50), maTaiKhoan)
      .input('HanhDong', sql.NVarChar(100), 'Đăng nhập hệ thống')
      .input('DoiTuong', sql.NVarChar(100), 'Tài khoản')
      .input('ChiTiet', sql.NVarChar(500), `${tenHienThi} đăng nhập thành công`)
      .query(`
        INSERT INTO NHATKYHOATDONG (MALOG, MATAIKHOAN, HANHDONG, DOITUONGTACDONG, THOIGIAN, CHITIET)
        VALUES (@MaLog, @MaTaiKhoan, @HanhDong, @DoiTuong, GETDATE(), @ChiTiet)
      `);
  },

  // Lấy danh sách tài khoản (ẩn mật khẩu)
  async layDanhSachTaiKhoan() {
    const ketNoi = await poolPromise;
    const ketQua = await ketNoi.request().query(`
      SELECT MATAIKHOAN, HOTEN, TENDANGNHAP, VAITRO
      FROM TAIKHOAN
      ORDER BY MATAIKHOAN ASC
    `);
    return ketQua.recordset;
  },

  // Tạo tài khoản mới
  async taoTaiKhoan({ maTaiKhoan, hoTen, tenDangNhap, matKhau, vaiTro }) {
    const ketNoi = await poolPromise;
    await ketNoi.request()
      .input('MaTK', sql.VarChar(20), maTaiKhoan)
      .input('HoTen', sql.NVarChar(100), hoTen)
      .input('TenDangNhap', sql.VarChar(50), tenDangNhap)
      .input('MatKhau', sql.VarChar(255), matKhau)
      .input('VaiTro', sql.NVarChar(50), vaiTro)
      .query(`
        INSERT INTO TAIKHOAN (MATAIKHOAN, HOTEN, TENDANGNHAP, MATKHAU, VAITRO)
        VALUES (@MaTK, @HoTen, @TenDangNhap, @MatKhau, @VaiTro)
      `);
  },

  // Cập nhật Họ tên & Phân quyền Vai trò
  async capNhatPhanQuyen(maTaiKhoan, { hoTen, vaiTro }) {
    const ketNoi = await poolPromise;
    await ketNoi.request()
      .input('MaTK', sql.VarChar(20), maTaiKhoan)
      .input('HoTen', sql.NVarChar(100), hoTen)
      .input('VaiTro', sql.NVarChar(50), vaiTro)
      .query(`
        UPDATE TAIKHOAN
        SET HOTEN = @HoTen, VAITRO = @VaiTro
        WHERE MATAIKHOAN = @MaTK
      `);
  },

  // Xóa tài khoản
  async xoaTaiKhoan(maTaiKhoan) {
    const ketNoi = await poolPromise;
    await ketNoi.request()
      .input('MaTK', sql.VarChar(20), maTaiKhoan)
      .query(`DELETE FROM TAIKHOAN WHERE MATAIKHOAN = @MaTK`);
  }
};

module.exports = TaiKhoanRepository;