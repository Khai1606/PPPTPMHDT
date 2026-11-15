const NhatKyRepository = require('../Models/NhatKyRepository');

const NhatKyHoatDongController = {
  // [GET] /api/nhat-ky - Lấy danh sách nhật ký bất biến
  async layNhatKy(req, res) {
    try {
      const danhSach = await NhatKyRepository.layDanhSach();
      res.json(danhSach);
    } catch (err) {
      res.status(500).json({ message: 'Lỗi tải nhật ký hoạt động: ' + err.message });
    }
  }
};

module.exports = NhatKyHoatDongController;