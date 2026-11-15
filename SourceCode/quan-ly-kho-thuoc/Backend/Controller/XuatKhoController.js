const XuatKhoRepository = require('../Models/XuatKhoRepository');

const XuatKhoController = {
  // [POST] /api/xuat-kho - Xuất kho ưu tiên hạn dùng (FEFO)
  async xuatKho(req, res) {
    try {
      const {
        maThuoc,
        soLuongXuatTong,
        soLuongCanXuat,
        chiTietXuat,
        ghiChu,
        nguoiThucHien
      } = req.body;

      if (nguoiThucHien?.VAITRO !== 'ThuKho') {
        return res.status(403).json({
          message: 'Chỉ Thủ kho mới có quyền lập phiếu xuất kho!'
        });
      }

      // Hỗ trợ cả 2 trường hợp: Frontend gửi (maThuoc + soLuongXuatTong) hoặc gửi sẵn mảng chiTietXuat
      const tongSoLuong = Number(soLuongXuatTong || soLuongCanXuat || 0);

      if ((!maThuoc || tongSoLuong <= 0) && (!Array.isArray(chiTietXuat) || chiTietXuat.length === 0)) {
        return res.status(400).json({
          message: 'Vui lòng chọn thuốc và nhập số lượng xuất hợp lệ (> 0)!'
        });
      }

      const ketQua = await XuatKhoRepository.taoPhieuXuatFEFO({
        maThuoc,
        soLuongXuatTong: tongSoLuong,
        chiTietXuat,
        ghiChu,
        nguoiThucHien
      });

      res.status(201).json({
        maPhieuXuat: ketQua.maPhieuXuat,
        message: `Đã xuất kho thành công! Phiếu ${ketQua.maPhieuXuat} đã trừ tồn kho các lô: ${ketQua.chiTietDaXuat.join(', ')}`
      });
    } catch (err) {
      console.error('Lỗi xuất kho:', err);
      res.status(400).json({ message: err.message });
    }
  }
};

module.exports = XuatKhoController;