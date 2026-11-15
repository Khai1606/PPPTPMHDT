const DieuChinhRepository = require('../Models/DieuChinhRepository');

const DieuChinhController = {
  // [POST] /api/phieu-dieu-chinh
  async lapPhieuDieuChinh(req, res) {
    try {
      const { maLo, tonSoSach, tonThucTe, lyDoDieuChinh, nguoiThucHien } = req.body;

      if (nguoiThucHien?.VAITRO !== 'ThuKho') {
        return res.status(403).json({ message: 'Chỉ Thủ kho mới có quyền lập phiếu kiểm kê điều chỉnh!' });
      }
      if (!maLo || tonThucTe === undefined || Number(tonThucTe) < 0 || !lyDoDieuChinh?.trim()) {
        return res.status(400).json({ message: 'Vui lòng chọn lô, nhập tồn thực tế >= 0 và lý do chênh lệch!' });
      }
      if (Number(tonThucTe) === Number(tonSoSach)) {
        return res.status(400).json({ message: 'Số lượng thực tế trùng với sổ sách, không cần lập phiếu điều chỉnh!' });
      }

      const maPhieu = await DieuChinhRepository.lapPhieu({
        maLo,
        tonSoSach,
        tonThucTe,
        lyDoDieuChinh,
        nguoiThucHien
      });

      res.status(201).json({
        maPhieu,
        message: `Đã gửi phiếu ${maPhieu} ở trạng thái CHỜ DUYỆT. Tồn kho thực tế chưa thay đổi cho tới khi Quản lý phê duyệt!`
      });
    } catch (err) {
      res.status(500).json({ message: 'Lỗi lập phiếu điều chỉnh: ' + err.message });
    }
  },

  // [PUT] /api/phieu-dieu-chinh/:maPhieu/duyet
  async duyetPhieuDieuChinh(req, res) {
    try {
      const { nguoiThucHien } = req.body;
      if (nguoiThucHien?.VAITRO !== 'QuanLyKho') {
        return res.status(403).json({ message: 'Chỉ Quản lý kho mới có quyền phê duyệt phiếu điều chỉnh!' });
      }

      const maLo = await DieuChinhRepository.duyetPhieu(req.params.maPhieu, nguoiThucHien);
      res.json({ message: `Đã phê duyệt phiếu ${req.params.maPhieu}! Tồn kho lô ${maLo} đã được cập nhật.` });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  // [PUT] /api/phieu-dieu-chinh/:maPhieu/tu-choi
  async tuChoiPhieuDieuChinh(req, res) {
    try {
      const { lyDoTuChoi, nguoiThucHien } = req.body;
      if (nguoiThucHien?.VAITRO !== 'QuanLyKho') {
        return res.status(403).json({ message: 'Chỉ Quản lý kho mới có quyền từ chối phiếu điều chỉnh!' });
      }
      if (!lyDoTuChoi || !lyDoTuChoi.trim()) {
        return res.status(400).json({ message: 'Bắt buộc phải nhập lý do khi từ chối phiếu điều chỉnh!' });
      }

      await DieuChinhRepository.tuChoiPhieu(req.params.maPhieu, lyDoTuChoi, nguoiThucHien);
      res.json({ message: `Đã từ chối phiếu ${req.params.maPhieu}. Số lượng tồn kho được giữ nguyên!` });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
};

module.exports = DieuChinhController;