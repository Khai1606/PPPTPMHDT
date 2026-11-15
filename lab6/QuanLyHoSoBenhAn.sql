/* =====================================================================
   HỆ THỐNG QUẢN LÝ HỒ SƠ BỆNH ÁN BỆNH VIỆN
   Script tạo CSDL QuanLyHoSoBenhAn (SQL Server)
   Theo chuẩn kiến trúc và thói quen thiết kế CSDL của bài lab
   ===================================================================== */

IF DB_ID(N'QuanLyHoSoBenhAn') IS NULL CREATE DATABASE QuanLyHoSoBenhAn;
GO
USE QuanLyHoSoBenhAn;
GO

-- Xóa bảng cũ theo thứ tự ngược phụ thuộc
IF OBJECT_ID('ChiTietToaThuoc','U') IS NOT NULL DROP TABLE ChiTietToaThuoc;
IF OBJECT_ID('ToaThuoc','U') IS NOT NULL DROP TABLE ToaThuoc;
IF OBJECT_ID('Thuoc','U') IS NOT NULL DROP TABLE Thuoc;
IF OBJECT_ID('XetNghiem','U') IS NOT NULL DROP TABLE XetNghiem;
IF OBJECT_ID('ThanhToanVienPhi','U') IS NOT NULL DROP TABLE ThanhToanVienPhi;
IF OBJECT_ID('PhieuKham','U') IS NOT NULL DROP TABLE PhieuKham;
IF OBJECT_ID('LePhiNam','U') IS NOT NULL DROP TABLE LePhiNam;
IF OBJECT_ID('HoSoBenhAn','U') IS NOT NULL DROP TABLE HoSoBenhAn;
IF OBJECT_ID('BenhNhan','U') IS NOT NULL DROP TABLE BenhNhan;
IF OBJECT_ID('BacSi','U') IS NOT NULL DROP TABLE BacSi;
IF OBJECT_ID('KhoaDieuTri','U') IS NOT NULL DROP TABLE KhoaDieuTri;
GO

-- 1. Bảng KhoaDieuTri
CREATE TABLE KhoaDieuTri (
    MaKhoa varchar(20) NOT NULL PRIMARY KEY,
    TenKhoa nvarchar(150) NOT NULL UNIQUE
);

-- 2. Bảng BacSi
CREATE TABLE BacSi (
    MaBS varchar(20) NOT NULL PRIMARY KEY,
    HoTen nvarchar(120) NOT NULL,
    DienThoai varchar(20) NULL,
    MaKhoa varchar(20) NOT NULL,
    CONSTRAINT FK_BS_Khoa FOREIGN KEY(MaKhoa) REFERENCES KhoaDieuTri(MaKhoa)
);

-- 3. Bảng BenhNhan
CREATE TABLE BenhNhan (
    MaBN varchar(20) NOT NULL PRIMARY KEY,
    HoTen nvarchar(120) NOT NULL,
    NgaySinh date NULL,
    DiaChi nvarchar(250) NOT NULL,
    DienThoai varchar(20) NOT NULL,
    Anh3x4 nvarchar(250) NULL
);

-- 4. Bảng HoSoBenhAn
CREATE TABLE HoSoBenhAn (
    MaHoSo varchar(20) NOT NULL PRIMARY KEY,
    MaBN varchar(20) NOT NULL,
    NgayTao datetime2 NOT NULL DEFAULT SYSDATETIME(),
    TrangThai nvarchar(40) NOT NULL DEFAULT N'Đang theo dõi',
    CONSTRAINT FK_HS_BN FOREIGN KEY(MaBN) REFERENCES BenhNhan(MaBN)
);

-- 5. Bảng LePhiNam (Ràng buộc BR: Đóng lệ phí hằng năm)
CREATE TABLE LePhiNam (
    MaLePhi varchar(20) NOT NULL PRIMARY KEY,
    MaHoSo varchar(20) NOT NULL,
    Nam int NOT NULL CHECK(Nam >= 2020),
    NgayThu datetime2 NOT NULL DEFAULT SYSDATETIME(),
    SoTien decimal(18,2) NOT NULL CHECK(SoTien > 0),
    DaThu bit NOT NULL DEFAULT 1,
    CONSTRAINT FK_LPN_HS FOREIGN KEY(MaHoSo) REFERENCES HoSoBenhAn(MaHoSo)
);

-- 6. Bảng PhieuKham
CREATE TABLE PhieuKham (
    MaPhieuKham varchar(20) NOT NULL PRIMARY KEY,
    MaHoSo varchar(20) NOT NULL,
    MaBS varchar(20) NOT NULL,
    NgayKham datetime2 NOT NULL DEFAULT SYSDATETIME(),
    NhietDo decimal(4,1) NULL CHECK(NhietDo BETWEEN 35.0 AND 42.0),
    HuyetAp nvarchar(20) NULL,
    TrieuChung nvarchar(500) NULL,
    ChanDoan nvarchar(500) NULL,
    LoaiKham nvarchar(50) NOT NULL DEFAULT N'Khám thường',
    CONSTRAINT FK_PK_HS FOREIGN KEY(MaHoSo) REFERENCES HoSoBenhAn(MaHoSo),
    CONSTRAINT FK_PK_BS FOREIGN KEY(MaBS) REFERENCES BacSi(MaBS)
);

-- 7. Bảng XetNghiem
CREATE TABLE XetNghiem (
    MaXN varchar(20) NOT NULL PRIMARY KEY,
    MaPhieuKham varchar(20) NOT NULL,
    TenXN nvarchar(180) NOT NULL,
    KetQua nvarchar(1000) NULL,
    NgayThucHien datetime2 NULL,
    MaKTV nvarchar(50) NULL,
    CONSTRAINT FK_XN_PK FOREIGN KEY(MaPhieuKham) REFERENCES PhieuKham(MaPhieuKham)
);

-- 8. Bảng Thuoc
CREATE TABLE Thuoc (
    MaThuoc varchar(20) NOT NULL PRIMARY KEY,
    TenThuoc nvarchar(180) NOT NULL UNIQUE,
    DonViTinh nvarchar(20) NOT NULL,
    DonGia decimal(18,2) NOT NULL CHECK(DonGia >= 0)
);

-- 9. Bảng ToaThuoc
CREATE TABLE ToaThuoc (
    MaToa varchar(20) NOT NULL PRIMARY KEY,
    MaPhieuKham varchar(20) NOT NULL UNIQUE,
    NgayKe datetime2 NOT NULL DEFAULT SYSDATETIME(),
    LoiDan nvarchar(500) NULL,
    CONSTRAINT FK_TT_PK FOREIGN KEY(MaPhieuKham) REFERENCES PhieuKham(MaPhieuKham)
);

-- 10. Bảng ChiTietToaThuoc (Khóa chính phức hợp MaToa + MaThuoc)
CREATE TABLE ChiTietToaThuoc (
    MaToa varchar(20) NOT NULL,
    MaThuoc varchar(20) NOT NULL,
    SoLuong int NOT NULL CHECK(SoLuong > 0),
    LieuDung nvarchar(200) NOT NULL,
    PRIMARY KEY (MaToa, MaThuoc),
    CONSTRAINT FK_CTTT_Toa FOREIGN KEY(MaToa) REFERENCES ToaThuoc(MaToa),
    CONSTRAINT FK_CTTT_Thuoc FOREIGN KEY(MaThuoc) REFERENCES Thuoc(MaThuoc)
);

-- 11. Bảng ThanhToanVienPhi
CREATE TABLE ThanhToanVienPhi (
    MaTT varchar(20) NOT NULL PRIMARY KEY,
    MaPhieuKham varchar(20) NOT NULL,
    NgayThanhToan datetime2 NOT NULL DEFAULT SYSDATETIME(),
    TongTien decimal(18,2) NOT NULL CHECK(TongTien >= 0),
    DaThanhToan bit NOT NULL DEFAULT 1,
    CONSTRAINT FK_TTVP_PK FOREIGN KEY(MaPhieuKham) REFERENCES PhieuKham(MaPhieuKham)
);
GO

/* ---------------- DỮ LIỆU MẪU ĐỂ TEST ---------------- */
INSERT INTO KhoaDieuTri(MaKhoa, TenKhoa) VALUES 
('K01', N'Khoa Nội tổng hợp'),
('K02', N'Khoa Ngoại tổng quát'),
('K03', N'Khoa Tim mạch');

INSERT INTO BacSi(MaBS, HoTen, DienThoai, MaKhoa) VALUES 
('BS01', N'Nguyễn Văn An', '0901111222', 'K01'),
('BS02', N'Trần Thị Bích', '0903333444', 'K02');

INSERT INTO Thuoc(MaThuoc, TenThuoc, DonViTinh, DonGia) VALUES 
('TH01', N'Paracetamol 500mg', N'Viên', 1500),
('TH02', N'Amoxicillin 500mg', N'Viên', 3000),
('TH03', N'Ginkgo Biloba 80mg', N'Viên', 5000);

INSERT INTO BenhNhan(MaBN, HoTen, NgaySinh, DiaChi, DienThoai, Anh3x4) VALUES 
('BN001', N'Phạm Quốc Cường', '1995-04-12', N'123 Lê Văn Sỹ, Q.3, TP.HCM', '0912345678', NULL),
('BN002', N'Lê Thị Mai', '1988-09-20', N'45 Nguyễn Thị Minh Khai, Q.1, TP.HCM', '0987654321', NULL);

INSERT INTO HoSoBenhAn(MaHoSo, MaBN, NgayTao, TrangThai) VALUES 
('HS001', 'BN001', '2026-01-10', N'Đang theo dõi'),
('HS002', 'BN002', '2026-02-15', N'Đang theo dõi');

INSERT INTO LePhiNam(MaLePhi, MaHoSo, Nam, NgayThu, SoTien, DaThu) VALUES 
('LP001', 'HS001', 2026, '2026-01-10', 200000, 1),
('LP002', 'HS002', 2026, '2026-02-15', 200000, 1);

INSERT INTO PhieuKham(MaPhieuKham, MaHoSo, MaBS, NgayKham, NhietDo, HuyetAp, TrieuChung, ChanDoan, LoaiKham) VALUES 
('PK001', 'HS001', 'BS01', '2026-10-20 08:30', 37.5, N'120/80', N'Sốt nhẹ, đau đầu', N'Cảm cúm thông thường', N'Khám thường'),
('PK002', 'HS002', 'BS02', '2026-10-21 09:15', 38.0, N'130/85', N'Đau bụng dưới', N'Theo dõi viêm ruột thừa', N'Khám thường');

GO
PRINT N'Đã khởi tạo thành công CSDL QuanLyHoSoBenhAn!';