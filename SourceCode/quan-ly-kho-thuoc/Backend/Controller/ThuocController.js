const ThuocRepository = require('../Models/ThuocRepository');
const LoThuocRepository = require('../Models/LoThuocRepository');

const ThuocController = {
  // [POST] /api/thuoc - Thêm thuốc mới
  async themThuoc(req, res) {
    try {
      const { maThuoc, tenThuoc, donViTinh, maNhom, moTa, nguoiThucHien } = req.body;
      if (nguoiThucHien?.VAITRO !== 'QuanLyKho') {
        return res.status(403).json({ message: 'Chỉ Quản lý kho mới có quyền thêm danh mục thuốc!' });
      }
      if (!maThuoc || !tenThuoc || !donViTinh) {
        return res.status(400).json({ message: 'Vui lòng nhập đầy đủ Mã thuốc, Tên thuốc và Đơn vị tính!' });
      }
      await ThuocRepository.themThuocMoi({ maThuoc, tenThuoc, donViTinh, maNhom, moTa, nguoiThucHien });
      res.status(201).json({ message: `Đã thêm thuốc ${tenThuoc} (${maThuoc}) vào danh mục!` });
    } catch (err) {
      res.status(400).json({ message: 'Lỗi thêm thuốc (có thể trùng Mã thuốc): ' + err.message });
    }
  },

  // [PUT] /api/thuoc/:maThuoc - Sửa thuốc và số lượng các lô trực thuộc
  async suaThuoc(req, res) {
    try {
      const { tenThuoc, donViTinh, moTa, danhSachLoCapNhat, nguoiThucHien } = req.body;
      if (nguoiThucHien?.VAITRO !== 'QuanLyKho') {
        return res.status(403).json({ message: 'Chỉ Quản lý kho mới có quyền chỉnh sửa thuốc và số lượng lô!' });
      }
      await ThuocRepository.suaThuocVaLo(req.params.maThuoc, {
        tenThuoc,
        donViTinh,
        moTa,
        danhSachLoCapNhat,
        nguoiThucHien
      });
      res.json({ message: `Đã cập nhật thành công thông tin thuốc ${req.params.maThuoc} và số lượng tồn các lô!` });
    } catch (err) {
      res.status(400).json({ message: 'Lỗi cập nhật thuốc & lô: ' + err.message });
    }
  },

  // [DELETE] /api/thuoc/:maThuoc - Xóa thuốc
  async xoaThuoc(req, res) {
    try {
      const { nguoiThucHien } = req.body;
      if (nguoiThucHien?.VAITRO !== 'QuanLyKho') {
        return res.status(403).json({ message: 'Chỉ Quản lý kho mới có quyền xóa danh mục thuốc!' });
      }
      await ThuocRepository.xoaThuoc(req.params.maThuoc, nguoiThucHien);
      res.json({ message: `Đã xóa thuốc ${req.params.maThuoc} khỏi danh mục!` });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  // [POST] /api/lo-thuoc - Nhập lô mới (Thủ kho)
  async nhapLoMoi(req, res) {
    try {
      await LoThuocRepository.nhapLoMoi(req.body);
      res.status(201).json({ message: 'Đã nhập lô thuốc mới thành công vào SQL Server!' });
    } catch (err) {
      res.status(400).json({ message: 'Lỗi nhập lô mới: ' + err.message });
    }
  }
};

module.exports = ThuocController;