const TaiKhoanRepository = require('../Models/TaiKhoanRepository');

const DangNhapController = {
  async dangNhap(req, res) {
    try {
      const { tenDangNhap, matKhau } = req.body;

      if (!tenDangNhap || !matKhau) {
        return res.status(400).json({
          thanhCong: false,
          thongBao: 'Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu!'
        });
      }

      // 1. Tìm tài khoản trong SQL Server
      const taiKhoan = await TaiKhoanRepository.timTheoTenDangNhap(tenDangNhap.trim());

      if (!taiKhoan || taiKhoan.MATKHAU !== matKhau) {
        return res.status(401).json({
          thanhCong: false,
          thongBao: 'Tên đăng nhập hoặc mật khẩu không chính xác!'
        });
      }

      // 2. Ghi vết đăng nhập (truyền nguyên object taiKhoan có sẵn MATAIKHOAN)
      await TaiKhoanRepository.ghiNhatKyDangNhap(taiKhoan);

      // 3. Ẩn mật khẩu trước khi trả về Frontend
      const { MATKHAU, ...thongTinAnToan } = taiKhoan;

      return res.json({
        thanhCong: true,
        thongBao: 'Đăng nhập thành công!',
        taiKhoan: thongTinAnToan
      });
    } catch (loi) {
      console.error('Lỗi đăng nhập:', loi);
      return res.status(500).json({
        thanhCong: false,
        thongBao: 'Lỗi hệ thống máy chủ: ' + loi.message
      });
    }
  }
};

module.exports = DangNhapController;