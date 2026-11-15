const express = require('express');
const cors = require('cors');

const DangNhapController = require('./Controller/DangNhapController');
const CanhBaoController = require('./Controller/CanhBaoController');
const ThuocController = require('./Controller/ThuocController');
const XuatKhoController = require('./Controller/XuatKhoController');
const DieuChinhController = require('./Controller/DieuChinhController');
const NhatKyHoatDongController = require('./Controller/NhatKyHoatDongController');
const TaiKhoanController = require('./Controller/TaiKhoanController');
const NhatKyRepository = require('./Models/NhatKyRepository');

const app = express();
app.use(cors());
app.use(express.json());

// Hàm bọc an toàn: Tránh sập server.js nếu có controller nào chưa kịp lưu
const bocAnToan = (fn, tenRoute) => {
  if (typeof fn === 'function') return fn;
  return (req, res) => {
    console.error(`⚠️ Route [${tenRoute}] chưa tìm thấy hàm xử lý!`);
    res.status(500).json({ message: `Chức năng ${tenRoute} chưa được cập nhật ở Controller.` });
  };
};

// 1. Xác thực & Đăng nhập
app.post('/api/dang-nhap', bocAnToan(DangNhapController.dangNhap, 'dangNhap'));

// 2. Tổng quan Cảnh báo, Quét hạn dùng & Ghi log Báo cáo Excel
app.get('/api/du-lieu', bocAnToan(CanhBaoController.layDuLieu, 'layDuLieu'));
app.post('/api/lo-thuoc/quet-han-dung', bocAnToan(CanhBaoController.quetHanDung, 'quetHanDung'));
app.put('/api/lo-thuoc/:maLo/khoa', bocAnToan(CanhBaoController.khoaLoThuoc, 'khoaLoThuoc'));
app.delete('/api/lo-thuoc/:maLo', bocAnToan(CanhBaoController.tieuHuyLoThuoc, 'tieuHuyLoThuoc'));

app.post('/api/bao-cao/ghi-log', async (req, res) => {
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
});

// 3. Danh mục Thuốc & Nhập Lô thuốc
app.post('/api/thuoc', bocAnToan(ThuocController.themThuoc, 'themThuoc'));
app.put('/api/thuoc/:maThuoc', bocAnToan(ThuocController.suaThuoc, 'suaThuoc'));
app.delete('/api/thuoc/:maThuoc', bocAnToan(ThuocController.xoaThuoc, 'xoaThuoc'));
app.post('/api/lo-thuoc', bocAnToan(ThuocController.nhapLoMoi, 'nhapLoMoi'));

// 4. Xuất kho FEFO
app.post('/api/xuat-kho', bocAnToan(XuatKhoController.xuatKho, 'xuatKho'));

// 5. Kiểm kê & Phê duyệt điều chỉnh 2 bước
app.post('/api/dieu-chinh', bocAnToan(DieuChinhController.lapPhieu, 'lapPhieu'));
app.put('/api/dieu-chinh/:maPhieu/duyet', bocAnToan(DieuChinhController.duyetPhieu, 'duyetPhieu'));
app.put('/api/dieu-chinh/:maPhieu/tu-choi', bocAnToan(DieuChinhController.tuChoiPhieu, 'tuChoiPhieu'));

// 6. Nhật ký hoạt động bất biến (Audit Log)
app.get('/api/nhat-ky', bocAnToan(NhatKyHoatDongController.layDanhSach, 'layDanhSachNhatKy'));

// 7. Quản lý & Phân quyền Tài khoản (RBAC)
app.get('/api/tai-khoan', bocAnToan(TaiKhoanController.layDanhSach, 'layDanhSachTaiKhoan'));
app.post('/api/tai-khoan', bocAnToan(TaiKhoanController.taoMoi, 'taoMoiTaiKhoan'));
app.put('/api/tai-khoan/:maTaiKhoan', bocAnToan(TaiKhoanController.capNhatVaiTro, 'capNhatVaiTro'));
app.delete('/api/tai-khoan/:maTaiKhoan', bocAnToan(TaiKhoanController.xoa, 'xoaTaiKhoan'));

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend Kho Dược HLT-03 đang chạy tại http://localhost:${PORT}`);
});