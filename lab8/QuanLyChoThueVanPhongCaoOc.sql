/* =====================================================================
   BÀI 4 - QUẢN LÝ CHO THUÊ VĂN PHÒNG Ở CAO ỐC (ĐÃ SỬA LỖI)
   ===================================================================== */
IF DB_ID(N'QuanLyCaoOc') IS NULL CREATE DATABASE QuanLyCaoOc;
GO
USE QuanLyCaoOc;
GO

-- Xóa bảng cũ theo thứ tự ngược phụ thuộc khóa ngoại
IF OBJECT_ID('PhieuKiemTra','U') IS NOT NULL DROP TABLE PhieuKiemTra;
IF OBJECT_ID('HoaDonTienThue','U') IS NOT NULL DROP TABLE HoaDonTienThue;
IF OBJECT_ID('ChiTietHoaDonDV','U') IS NOT NULL DROP TABLE ChiTietHoaDonDV;
IF OBJECT_ID('HoaDonDichVu','U') IS NOT NULL DROP TABLE HoaDonDichVu;
IF OBJECT_ID('DichVu','U') IS NOT NULL DROP TABLE DichVu;
IF OBJECT_ID('TheXe','U') IS NOT NULL DROP TABLE TheXe;
IF OBJECT_ID('NhanVienCongTy','U') IS NOT NULL DROP TABLE NhanVienCongTy;
IF OBJECT_ID('PhieuGiaHan','U') IS NOT NULL DROP TABLE PhieuGiaHan;
IF OBJECT_ID('ChiTietHopDong','U') IS NOT NULL DROP TABLE ChiTietHopDong;
IF OBJECT_ID('HopDongThue','U') IS NOT NULL DROP TABLE HopDongThue;
IF OBJECT_ID('KhachHang','U') IS NOT NULL DROP TABLE KhachHang;
IF OBJECT_ID('Phong','U') IS NOT NULL DROP TABLE Phong;
IF OBJECT_ID('Tang','U') IS NOT NULL DROP TABLE Tang;
GO

-- 1. BẢNG TẦNG
CREATE TABLE Tang (
    MaTang varchar(20) NOT NULL PRIMARY KEY,
    TenTang nvarchar(100) NOT NULL,
    SoLuongPhong int NOT NULL CHECK (SoLuongPhong > 0),
    ViTriDoCao float NULL
);

-- 2. BẢNG PHÒNG
CREATE TABLE Phong (
    MaPhong varchar(20) NOT NULL PRIMARY KEY,
    MaTang varchar(20) NOT NULL,
    HuongPhong nvarchar(50) NOT NULL,
    DienTich float NOT NULL CHECK (DienTich > 0),
    DonGiaThue decimal(18,2) NOT NULL CHECK (DonGiaThue >= 0),
    TrangThai nvarchar(50) NOT NULL DEFAULT N'Trống',
    CONSTRAINT FK_Phong_Tang FOREIGN KEY (MaTang) REFERENCES Tang(MaTang),
    CONSTRAINT CK_Phong_TrangThai CHECK (TrangThai IN (N'Trống', N'Đã thuê', N'Bảo trì'))
);

-- 3. BẢNG KHÁCH HÀNG (CÔNG TY THUÊ)
CREATE TABLE KhachHang (
    MaKH varchar(20) NOT NULL PRIMARY KEY,
    TenCongTy nvarchar(180) NOT NULL,
    SoDienThoai varchar(20) NOT NULL,
    Email varchar(100) NULL,
    DiaChi nvarchar(250) NOT NULL,
    MaSoThue varchar(30) NULL
);

-- 4. BẢNG HỢP ĐỒNG THUÊ (TỐI THIỂU 6 THÁNG)
CREATE TABLE HopDongThue (
    MaHopDong varchar(20) NOT NULL PRIMARY KEY,
    MaKH varchar(20) NOT NULL,
    NgayLap datetime2 NOT NULL DEFAULT SYSDATETIME(),
    NgayBatDau date NOT NULL,
    ThoiHanThue int NOT NULL CHECK (ThoiHanThue >= 6),
    TienCoc decimal(18,2) NOT NULL CHECK (TienCoc > 0),
    TrangThai nvarchar(50) NOT NULL DEFAULT N'Đang hiệu lực',
    CONSTRAINT FK_HD_KhachHang FOREIGN KEY (MaKH) REFERENCES KhachHang(MaKH),
    CONSTRAINT CK_HD_TrangThai CHECK (TrangThai IN (N'Đang hiệu lực', N'Đã hết hạn', N'Đã hủy'))
);

-- 5. BẢNG CHI TIẾT HỢP ĐỒNG
CREATE TABLE ChiTietHopDong (
    MaCTHD varchar(30) NOT NULL PRIMARY KEY,
    MaHopDong varchar(20) NOT NULL,
    MaPhong varchar(20) NOT NULL,
    DonGiaApDung decimal(18,2) NOT NULL CHECK (DonGiaApDung >= 0),
    CONSTRAINT FK_CTHD_HopDong FOREIGN KEY (MaHopDong) REFERENCES HopDongThue(MaHopDong),
    CONSTRAINT FK_CTHD_Phong FOREIGN KEY (MaPhong) REFERENCES Phong(MaPhong)
);

-- 6. BẢNG PHIẾU GIA HẠN
CREATE TABLE PhieuGiaHan (
    MaPhieuGH varchar(20) NOT NULL PRIMARY KEY,
    MaHopDong varchar(20) NOT NULL,
    NgayLap datetime2 NOT NULL DEFAULT SYSDATETIME(),
    ThoiGianGiaHan int NOT NULL CHECK (ThoiGianGiaHan > 0),
    TrangThaiDuyet bit NOT NULL DEFAULT 1,
    CONSTRAINT FK_PGH_HopDong FOREIGN KEY (MaHopDong) REFERENCES HopDongThue(MaHopDong)
);

-- 7. BẢNG NHÂN VIÊN CÔNG TY THUÊ
CREATE TABLE NhanVienCongTy (
    MaNV varchar(20) NOT NULL PRIMARY KEY,
    MaKH varchar(20) NOT NULL,
    MaPhong varchar(20) NULL,
    HoTen nvarchar(120) NOT NULL,
    ChucVu nvarchar(80) NULL,
    HinhAnh nvarchar(250) NULL,
    SoDienThoai varchar(20) NULL,
    CONSTRAINT FK_NV_KhachHang FOREIGN KEY (MaKH) REFERENCES KhachHang(MaKH),
    CONSTRAINT FK_NV_Phong FOREIGN KEY (MaPhong) REFERENCES Phong(MaPhong)
);

-- 8. BẢNG THẺ XE (MỖI NHÂN VIÊN TỐI ĐA 1 THẺ XE)
CREATE TABLE TheXe (
    MaTheXe varchar(20) NOT NULL PRIMARY KEY,
    MaNV varchar(20) NOT NULL UNIQUE,
    BienSoXe varchar(20) NOT NULL,
    LoaiXe nvarchar(50) NOT NULL,
    NgayCap date NOT NULL DEFAULT CAST(GETDATE() AS date),
    CONSTRAINT FK_TheXe_NV FOREIGN KEY (MaNV) REFERENCES NhanVienCongTy(MaNV)
);

-- 9. BẢNG DỊCH VỤ
CREATE TABLE DichVu (
    MaDichVu varchar(20) NOT NULL PRIMARY KEY,
    TenDichVu nvarchar(100) NOT NULL,
    DonGia decimal(18,2) NOT NULL CHECK (DonGia >= 0),
    DonViTinh nvarchar(30) NOT NULL
);

-- 10. BẢNG HÓA ĐƠN DỊCH VỤ (CUỐI THÁNG)
CREATE TABLE HoaDonDichVu (
    MaHoaDonDV varchar(20) NOT NULL PRIMARY KEY,
    MaPhong varchar(20) NOT NULL,
    ThangNam varchar(10) NOT NULL,
    NgayLap date NOT NULL DEFAULT CAST(GETDATE() AS date),
    TongTienDV decimal(18,2) NOT NULL CHECK (TongTienDV >= 0),
    TrangThaiThanhToan bit NOT NULL DEFAULT 0,
    CONSTRAINT FK_HDDV_Phong FOREIGN KEY (MaPhong) REFERENCES Phong(MaPhong)
);

-- 11. BẢNG CHI TIẾT HÓA ĐƠN DỊCH VỤ (ĐÃ SỬA CHECK CONSTRAINT TẠI ĐÂY)
CREATE TABLE ChiTietHoaDonDV (
    MaCTHDDV varchar(30) NOT NULL PRIMARY KEY,
    MaHoaDonDV varchar(20) NOT NULL,
    MaDichVu varchar(20) NOT NULL,
    ChiSoCu decimal(18,2) NOT NULL CHECK (ChiSoCu >= 0),
    ChiSoMoi decimal(18,2) NOT NULL,
    ThanhTien decimal(18,2) NOT NULL CHECK (ThanhTien >= 0),
    CONSTRAINT FK_CTHDDV_HDDV FOREIGN KEY (MaHoaDonDV) REFERENCES HoaDonDichVu(MaHoaDonDV),
    CONSTRAINT FK_CTHDDV_DV FOREIGN KEY (MaDichVu) REFERENCES DichVu(MaDichVu),
    CONSTRAINT CK_CTHDDV_ChiSo CHECK (ChiSoMoi >= ChiSoCu)
);

-- 12. BẢNG HÓA ĐƠN TIỀN THUÊ (ĐẦU THÁNG TỪ THÁNG THỨ 7)
CREATE TABLE HoaDonTienThue (
    MaHDThue varchar(20) NOT NULL PRIMARY KEY,
    MaHopDong varchar(20) NOT NULL,
    ThangNam varchar(10) NOT NULL,
    NgayLap date NOT NULL DEFAULT CAST(GETDATE() AS date),
    SoTien decimal(18,2) NOT NULL CHECK (SoTien >= 0),
    TrangThaiThanhToan bit NOT NULL DEFAULT 0,
    CONSTRAINT FK_HDThue_HopDong FOREIGN KEY (MaHopDong) REFERENCES HopDongThue(MaHopDong)
);

-- 13. BẢNG PHIẾU KIỂM TRA ĐỊNH KỲ (1 NĂM / LẦN)
CREATE TABLE PhieuKiemTra (
    MaPhieuKT varchar(20) NOT NULL PRIMARY KEY,
    MaPhong varchar(20) NOT NULL,
    NgayKiemTra date NOT NULL DEFAULT CAST(GETDATE() AS date),
    TinhTrangPhong nvarchar(500) NOT NULL,
    CoViPhamKetCau bit NOT NULL DEFAULT 0,
    TienPhat decimal(18,2) NOT NULL DEFAULT 0 CHECK (TienPhat >= 0),
    CONSTRAINT FK_PKT_Phong FOREIGN KEY (MaPhong) REFERENCES Phong(MaPhong)
);
GO

-- =====================================================================
-- DỮ LIỆU MẪU
-- =====================================================================
INSERT INTO Tang(MaTang, TenTang, SoLuongPhong, ViTriDoCao) VALUES
('T01', N'Tầng 1', 5, 4.0),
('T02', N'Tầng 2', 5, 8.0),
('T03', N'Tầng 3', 5, 12.0);

INSERT INTO Phong(MaPhong, MaTang, HuongPhong, DienTich, DonGiaThue, TrangThai) VALUES
('P101', 'T01', N'Hướng Đông', 80.0, 15000000, N'Đã thuê'),
('P102', 'T01', N'Hướng Nam', 100.0, 18000000, N'Đã thuê'),
('P201', 'T02', N'Hướng Bắc', 120.0, 22000000, N'Trống'),
('P202', 'T02', N'Hướng Tây', 90.0, 16000000, N'Trống'),
('P301', 'T03', N'Hướng Đông Nam', 150.0, 28000000, N'Trống');

INSERT INTO KhachHang(MaKH, TenCongTy, SoDienThoai, Email, DiaChi, MaSoThue) VALUES
('KH001', N'Công ty CP Phần mềm Sao Việt', '0283900001', 'contact@saoviet.com', N'25 Nguyễn Thị Minh Khai, Q.3, TP.HCM', '0312345678'),
('KH002', N'Tập đoàn Công nghệ Mới', '0909111222', 'info@newtech.com', N'12 Lê Lợi, Q.1, TP.HCM', '0398765432');

INSERT INTO HopDongThue(MaHopDong, MaKH, NgayLap, NgayBatDau, ThoiHanThue, TienCoc, TrangThai) VALUES
('HD001', 'KH001', '2026-03-01 08:30:00', '2026-03-01', 12, 50000000, N'Đang hiệu lực'),
('HD002', 'KH002', '2026-04-01 09:00:00', '2026-04-01', 12, 60000000, N'Đang hiệu lực');

INSERT INTO ChiTietHopDong(MaCTHD, MaHopDong, MaPhong, DonGiaApDung) VALUES
('CT_HD001_P101', 'HD001', 'P101', 15000000),
('CT_HD002_P102', 'HD002', 'P102', 18000000);

INSERT INTO DichVu(MaDichVu, TenDichVu, DonGia, DonViTinh) VALUES
('DV01', N'Điện sinh hoạt', 3500, N'kWh'),
('DV02', N'Nước sinh hoạt', 18000, N'm3'),
('DV03', N'Internet cáp quang', 500000, N'Tháng');

INSERT INTO NhanVienCongTy(MaNV, MaKH, MaPhong, HoTen, ChucVu, HinhAnh, SoDienThoai) VALUES
('NV01', 'KH001', 'P101', N'Nguyễn Văn An', N'Trưởng phòng IT', 'an.jpg', '0912000001'),
('NV02', 'KH001', 'P101', N'Trần Thị Bích', N'Kế toán trưởng', 'bich.jpg', '0912000002');

INSERT INTO TheXe(MaTheXe, MaNV, BienSoXe, LoaiXe, NgayCap) VALUES
('TX001', 'NV01', '59-P1 123.45', N'Xe máy', '2026-03-02'),
('TX002', 'NV02', '51H-999.88', N'Ô tô', '2026-03-02');

USE QuanLyCaoOc;
GO

-- 1. Bổ sung dữ liệu mẫu cho Form Lập Phiếu Gia Hạn (FrmPhieuGiaHan)
INSERT INTO PhieuGiaHan(MaPhieuGH, MaHopDong, NgayLap, ThoiGianGiaHan, TrangThaiDuyet) VALUES
('GH001', 'HD001', '2026-09-01 09:00:00', 6, 1),
('GH002', 'HD002', '2026-09-15 10:30:00', 3, 1);

-- 2. Bổ sung dữ liệu mẫu cho Form Thu Tiền Thuê Hàng Tháng (FrmThanhToanThue)
INSERT INTO HoaDonTienThue(MaHDThue, MaHopDong, ThangNam, NgayLap, SoTien, TrangThaiThanhToan) VALUES
('HDT001', 'HD001', '09/2026', '2026-09-01', 15000000, 1),
('HDT002', 'HD001', '10/2026', '2026-10-01', 15000000, 0),
('HDT003', 'HD002', '10/2026', '2026-10-01', 18000000, 0);

-- 3. Bổ sung dữ liệu mẫu cho Form Hóa Đơn Dịch Vụ (FrmHoaDonDichVu)
INSERT INTO HoaDonDichVu(MaHoaDonDV, MaPhong, ThangNam, NgayLap, TongTienDV, TrangThaiThanhToan) VALUES
('HDDV001', 'P101', '09/2026', '2026-09-30', 1210000, 1),
('HDDV002', 'P102', '09/2026', '2026-09-30', 1539000, 0);

INSERT INTO ChiTietHoaDonDV(MaCTHDDV, MaHoaDonDV, MaDichVu, ChiSoCu, ChiSoMoi, ThanhTien) VALUES
('HDDV001_DV01', 'HDDV001', 'DV01', 100, 200, 350000),   -- Điện (100 kWh * 3,500)
('HDDV001_DV02', 'HDDV001', 'DV02', 10, 30, 360000),     -- Nước (20 m3 * 18,000)
('HDDV001_DV03', 'HDDV001', 'DV03', 1, 1, 500000),       -- Internet cáp quang
('HDDV002_DV01', 'HDDV002', 'DV01', 150, 300, 525000),
('HDDV002_DV02', 'HDDV002', 'DV02', 20, 48, 514000),
('HDDV002_DV03', 'HDDV002', 'DV03', 1, 1, 500000);

-- 4. Bổ sung dữ liệu mẫu cho Form Kiểm Tra Định Kỳ & Bảo Trì (FrmKiemTraBaoTri)
INSERT INTO PhieuKiemTra(MaPhieuKT, MaPhong, NgayKiemTra, TinhTrangPhong, CoViPhamKetCau, TienPhat) VALUES
('KT001', 'P101', '2026-05-15', N'Tường bị tróc sơn nhẹ, hệ thống điện nước hoạt động bình thường', 0, 0),
('KT002', 'P102', '2026-06-20', N'Tự ý đập vách ngăn phòng họp không theo thiết kế ban đầu', 1, 5000000);
GO