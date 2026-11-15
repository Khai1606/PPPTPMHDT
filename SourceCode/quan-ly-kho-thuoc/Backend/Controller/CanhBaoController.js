const LoThuocRepository = require('../Models/LoThuocRepository');
const NhatKyRepository = require('../Models/NhatKyRepository');

const CanhBaoController = {
  async layDuLieu(req, res) {
    try {
      const duLieu = await LoThuocRepository.layToanBoDuLieu();
      res.json(duLieu);
    } catch (err) {
      console.error('Lỗi lấy dữ liệu tổng:', err);
      res.status(500).json({ message: 'Lỗi tải dữ liệu từ SQL Server: ' + err.message });
    }
  },

  async quetHanDung(req, res) {
    try {
      const { nguoiThucHien } = req.body;
      if (nguoiThucHien?.VAITRO !== 'QuanLyKho') {
        return res.status(403).json({ message: 'Chỉ Quản lý kho mới có quyền quét hạn dùng!' });
      }
      const soLoBiKhoa = await LoThuocRepository.quetVaKhoaLoHetHan(nguoiThucHien);
      res.json({ message: `Quét hoàn tất! Đã tự động khóa ${soLoBiKhoa} lô thuốc quá hạn.` });
    } catch (err) {
      res.status(500).json({ message: 'Lỗi quét hạn dùng: ' + err.message });
    }
  },

  async khoaLoThuoc(req, res) {
    try {
      const { nguoiThucHien } = req.body;
      if (nguoiThucHien?.VAITRO !== 'QuanLyKho') {
        return res.status(403).json({ message: 'Chỉ Quản lý kho mới có quyền khóa lô!' });
      }
      await LoThuocRepository.khoaLoKhanCap(req.params.maLo, nguoiThucHien);
      res.json({ message: `Đã khóa khẩn cấp lô ${req.params.maLo}!` });
    } catch (err) {
      res.status(500).json({ message: 'Lỗi khóa lô: ' + err.message });
    }
  },

  async tieuHuyLoThuoc(req, res) {
    try {
      const { nguoiThucHien } = req.body;
      if (nguoiThucHien?.VAITRO !== 'QuanLyKho') {
        return res.status(403).json({ message: 'Chỉ Quản lý kho mới có quyền tiêu hủy lô!' });
      }
      await LoThuocRepository.tieuHuyLo(req.params.maLo, nguoiThucHien);
      res.json({ message: `Đã tiêu hủy lô ${req.params.maLo} khỏi kho!` });
    } catch (err) {
      res.status(500).json({ message: 'Lỗi tiêu hủy lô: ' + err.message });
    }
  },

  async ghiLogXuatBaoCao(req, res) {
    try {
      const { loaiBaoCao, nguoiThucHien } = req.body;
      if (nguoiThucHien?.VAITRO !== 'QuanLyKho') {
        return res.status(403).json({ message: 'Chỉ Quản lý kho mới có quyền xuất báo cáo!' });
      }
      await NhatKyRepository.ghiLog(
        nguoiThucHien.MATAIKHOAN,
        'Xuất báo cáo Excel',
        'BAOCAO',
        `Quản lý ${nguoiThucHien.HOTEN} (${nguoiThucHien.MATAIKHOAN}) đã kết xuất file Excel: ${loaiBaoCao}.`
      );
      res.json({ message: 'Đã ghi nhận lịch sử xuất báo cáo.' });
    } catch (err) {
      res.status(500).json({ message: 'Lỗi ghi log báo cáo: ' + err.message });
    }
  }
};

module.exports = CanhBaoController;