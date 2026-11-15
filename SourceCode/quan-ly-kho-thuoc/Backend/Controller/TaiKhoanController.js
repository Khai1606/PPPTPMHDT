const TaiKhoanRepository = require('../Models/TaiKhoanRepository');
const NhatKyRepository = require('../Models/NhatKyRepository');

const TaiKhoanController = {
  // [GET] /api/tai-khoan
  async layDanhSach(req, res) {
    try {
      const ds = await TaiKhoanRepository.layDanhSachTaiKhoan();
      res.json(ds);
    } catch (err) {
      res.status(500).json({ message: 'Lỗi tải danh sách tài khoản: ' + err.message });
    }
  },

  // [POST] /api/tai-khoan - Tạo tài khoản & gán vai trò
  async taoMoi(req, res) {
    try {
      const { hoTen, tenDangNhap, matKhau, vaiTro, nguoiThucHien } = req.body;

      if (nguoiThucHien?.VAITRO !== 'QuanLyKho') {
        return res.status(403).json({ message: 'Chỉ Quản lý kho mới có quyền tạo và phân quyền tài khoản!' });
      }
      if (!hoTen?.trim() || !tenDangNhap?.trim() || !matKhau?.trim()) {
        return res.status(400).json({ message: 'Vui lòng nhập đầy đủ Họ tên, Tên đăng nhập và Mật khẩu!' });
      }

      const daTonTai = await TaiKhoanRepository.timTheoTenDangNhap(tenDangNhap.trim());
      if (daTonTai) {
        return res.status(400).json({ message: 'Tên đăng nhập này đã tồn tại!' });
      }

      const maTaiKhoan = 'TK' + Date.now().toString().slice(-4);
      const vaiTroChuan = vaiTro === 'QuanLyKho' ? 'QuanLyKho' : 'ThuKho';

      await TaiKhoanRepository.taoTaiKhoan({
        maTaiKhoan,
        hoTen: hoTen.trim(),
        tenDangNhap: tenDangNhap.trim(),
        matKhau: matKhau.trim(),
        vaiTro: vaiTroChuan
      });

      await NhatKyRepository.ghiLog(
        nguoiThucHien.MATAIKHOAN,
        'Tạo & phân quyền tài khoản',
        'TAIKHOAN',
        `Quản lý ${nguoiThucHien.HOTEN} (${nguoiThucHien.MATAIKHOAN}) tạo tài khoản ${hoTen} (${tenDangNhap}) với vai trò ${vaiTroChuan}.`
      );

      res.status(201).json({ message: `Đã tạo tài khoản ${hoTen} (${vaiTroChuan}) thành công!` });
    } catch (err) {
      res.status(500).json({ message: 'Lỗi tạo tài khoản: ' + err.message });
    }
  },

  // [PUT] /api/tai-khoan/:maTaiKhoan - Thay đổi vai trò / thông tin
  async capNhatVaiTro(req, res) {
    try {
      const { maTaiKhoan } = req.params;
      const { hoTen, vaiTro, nguoiThucHien } = req.body;

      if (nguoiThucHien?.VAITRO !== 'QuanLyKho') {
        return res.status(403).json({ message: 'Chỉ Quản lý kho mới có quyền phân quyền tài khoản!' });
      }
      if (nguoiThucHien.MATAIKHOAN === maTaiKhoan && vaiTro !== 'QuanLyKho') {
        return res.status(400).json({ message: 'Không thể tự hạ quyền của tài khoản đang đăng nhập!' });
      }

      const vaiTroChuan = vaiTro === 'QuanLyKho' ? 'QuanLyKho' : 'ThuKho';
      await TaiKhoanRepository.capNhatPhanQuyen(maTaiKhoan, {
        hoTen: hoTen.trim(),
        vaiTro: vaiTroChuan
      });

      await NhatKyRepository.ghiLog(
        nguoiThucHien.MATAIKHOAN,
        'Cập nhật phân quyền tài khoản',
        'TAIKHOAN',
        `Quản lý ${nguoiThucHien.HOTEN} (${nguoiThucHien.MATAIKHOAN}) đổi quyền tài khoản ${maTaiKhoan} (${hoTen}) thành ${vaiTroChuan}.`
      );

      res.json({ message: `Đã cập nhật phân quyền cho tài khoản ${maTaiKhoan}!` });
    } catch (err) {
      res.status(500).json({ message: 'Lỗi cập nhật phân quyền: ' + err.message });
    }
  },

  // [DELETE] /api/tai-khoan/:maTaiKhoan
  async xoa(req, res) {
    try {
      const { maTaiKhoan } = req.params;
      const { nguoiThucHien } = req.body;

      if (nguoiThucHien?.VAITRO !== 'QuanLyKho') {
        return res.status(403).json({ message: 'Chỉ Quản lý kho mới có quyền xóa tài khoản!' });
      }
      if (nguoiThucHien.MATAIKHOAN === maTaiKhoan) {
        return res.status(400).json({ message: 'Không thể tự xóa tài khoản đang đăng nhập!' });
      }

      await TaiKhoanRepository.xoaTaiKhoan(maTaiKhoan);

      await NhatKyRepository.ghiLog(
        nguoiThucHien.MATAIKHOAN,
        'Xóa tài khoản',
        'TAIKHOAN',
        `Quản lý ${nguoiThucHien.HOTEN} (${nguoiThucHien.MATAIKHOAN}) đã xóa tài khoản ${maTaiKhoan}.`
      );

      res.json({ message: `Đã xóa tài khoản ${maTaiKhoan}!` });
    } catch (err) {
      res.status(400).json({ message: 'Không thể xóa tài khoản đã phát sinh phiếu nhập/xuất/nhật ký trong hệ thống!' });
    }
  }
};

module.exports = TaiKhoanController;