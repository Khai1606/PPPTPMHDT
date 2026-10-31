/* =====================================================================
   HỆ THỐNG QUẢN LÝ NHÂN SỰ - CÔNG TY SƠN ĐÔNG Á
   Script khởi tạo CSDL QuanLyNhanSu (SQL Server / LocalDB)
   ===================================================================== */
IF DB_ID(N'QuanLyNhanSu') IS NULL CREATE DATABASE QuanLyNhanSu;
GO
USE QuanLyNhanSu;
GO

-- Xóa bảng cũ nếu đã tồn tại
IF OBJECT_ID('BangLuong','U') IS NOT NULL DROP TABLE BangLuong;
IF OBJECT_ID('PhieuThuNopPhat','U') IS NOT NULL DROP TABLE PhieuThuNopPhat;
IF OBJECT_ID('PhieuChiKhenThuong','U') IS NOT NULL DROP TABLE PhieuChiKhenThuong;
IF OBJECT_ID('QDKyLuat','U') IS NOT NULL DROP TABLE QDKyLuat;
IF OBJECT_ID('QDKhenThuong','U') IS NOT NULL DROP TABLE QDKhenThuong;
IF OBJECT_ID('BangChamCong','U') IS NOT NULL DROP TABLE BangChamCong;
IF OBJECT_ID('ChiTietPhuTroi','U') IS NOT NULL DROP TABLE ChiTietPhuTroi;
IF OBJECT_ID('PhieuPhuTroi','U') IS NOT NULL DROP TABLE PhieuPhuTroi;
IF OBJECT_ID('KeHoachPhanCong','U') IS NOT NULL DROP TABLE KeHoachPhanCong;
IF OBJECT_ID('QDChucVu','U') IS NOT NULL DROP TABLE QDChucVu;
IF OBJECT_ID('QDLuong','U') IS NOT NULL DROP TABLE QDLuong;
IF OBJECT_ID('HoSoBaoHiem','U') IS NOT NULL DROP TABLE HoSoBaoHiem;
IF OBJECT_ID('HopDongLaoDong','U') IS NOT NULL DROP TABLE HopDongLaoDong;
IF OBJECT_ID('QDTuyendung','U') IS NOT NULL DROP TABLE QDTuyendung;
IF OBJECT_ID('NhanVien','U') IS NOT NULL DROP TABLE NhanVien;
IF OBJECT_ID('ChucVu','U') IS NOT NULL DROP TABLE ChucVu;
IF OBJECT_ID('PhongBan','U') IS NOT NULL DROP TABLE PhongBan;
GO

-- 1. Bảng Phòng ban
CREATE TABLE PhongBan (
    MaPhongBan varchar(20) NOT NULL PRIMARY KEY,
    TenPhongBan nvarchar(150) NOT NULL,
    SoDienThoaiPB varchar(20) NULL
);

-- 2. Bảng Chức vụ
CREATE TABLE ChucVu (
    MaChucVu varchar(20) NOT NULL PRIMARY KEY,
    TenChucVu nvarchar(100) NOT NULL,
    PhuCapChucVu decimal(18,2) NOT NULL DEFAULT 0 CHECK(PhuCapChucVu >= 0)
);

-- 3. Bảng Nhân viên
CREATE TABLE NhanVien (
    MaNhanVien varchar(20) NOT NULL PRIMARY KEY,
    HoTen nvarchar(120) NOT NULL,
    NgaySinh date NULL,
    GioiTinh nvarchar(10) CHECK(GioiTinh IN (N'Nam', N'Nữ')),
    DiaChi nvarchar(250) NULL,
    SoDienThoai varchar(20) NULL,
    TrangThai nvarchar(50) NOT NULL DEFAULT N'Thử việc',
    MaPhongBan varchar(20) NULL CONSTRAINT FK_NV_PB FOREIGN KEY REFERENCES PhongBan(MaPhongBan),
    MaChucVu varchar(20) NULL CONSTRAINT FK_NV_CV FOREIGN KEY REFERENCES ChucVu(MaChucVu)
);

-- 4. Quyết định Tuyển dụng (Thử việc)
CREATE TABLE QDTuyendung (
    SoQDTD varchar(20) NOT NULL PRIMARY KEY,
    MaNhanVien varchar(20) NOT NULL CONSTRAINT FK_QDTD_NV FOREIGN KEY REFERENCES NhanVien(MaNhanVien),
    MaPhongBan varchar(20) NOT NULL CONSTRAINT FK_QDTD_PB FOREIGN KEY REFERENCES PhongBan(MaPhongBan),
    NgayKy date NOT NULL,
    ThoiGianThuViec int NOT NULL CHECK(ThoiGianThuViec > 0), -- Tính theo tháng
    LuongThuViec decimal(18,2) NOT NULL CHECK(LuongThuViec >= 0),
    NoiDungDieuKhoan nvarchar(1000) NULL
);

-- 5. Hợp đồng Lao động (Ngắn hạn / Dài hạn)
CREATE TABLE HopDongLaoDong (
    SoHopDong varchar(20) NOT NULL PRIMARY KEY,
    MaNhanVien varchar(20) NOT NULL CONSTRAINT FK_HD_NV FOREIGN KEY REFERENCES NhanVien(MaNhanVien),
    LoaiHopDong nvarchar(50) NOT NULL CHECK(LoaiHopDong IN (N'Ngắn hạn', N'Dài hạn')),
    NgayBatDau date NOT NULL,
    NgayKetThuc date NULL,
    NoiDungHopDong nvarchar(1000) NULL,
    CONSTRAINT CK_HD_Ngay CHECK(NgayKetThuc IS NULL OR NgayKetThuc >= NgayBatDau)
);

-- 6. Hồ sơ Bảo hiểm (Dành cho Hợp đồng dài hạn)
CREATE TABLE HoSoBaoHiem (
    MaHoSoBH varchar(20) NOT NULL PRIMARY KEY,
    MaNhanVien varchar(20) NOT NULL UNIQUE CONSTRAINT FK_BH_NV FOREIGN KEY REFERENCES NhanVien(MaNhanVien),
    SoBHYT varchar(30) NULL,
    SoBHXH varchar(30) NULL,
    MucDong decimal(18,2) NOT NULL CHECK(MucDong >= 0),
    NgayThamGia date NOT NULL
);

-- 7. Quyết định Lương
CREATE TABLE QDLuong (
    SoQDLuong varchar(20) NOT NULL PRIMARY KEY,
    MaNhanVien varchar(20) NOT NULL CONSTRAINT FK_QDL_NV FOREIGN KEY REFERENCES NhanVien(MaNhanVien),
    NgayKy date NOT NULL,
    LuongCoBan decimal(18,2) NOT NULL CHECK(LuongCoBan >= 0),
    PhuCapLuong decimal(18,2) NOT NULL DEFAULT 0 CHECK(PhuCapLuong >= 0),
    PhuCapDocHai decimal(18,2) NOT NULL DEFAULT 0 CHECK(PhuCapDocHai >= 0),
    NgayApdung date NOT NULL
);

-- 8. Quyết định Chức vụ
CREATE TABLE QDChucVu (
    SoQDChucVu varchar(20) NOT NULL PRIMARY KEY,
    MaNhanVien varchar(20) NOT NULL CONSTRAINT FK_QDCV_NV FOREIGN KEY REFERENCES NhanVien(MaNhanVien),
    MaChucVu varchar(20) NOT NULL CONSTRAINT FK_QDCV_CV FOREIGN KEY REFERENCES ChucVu(MaChucVu),
    NgayKy date NOT NULL,
    NgayApdung date NOT NULL,
    NoiDungBoNhiem nvarchar(500) NULL
);

-- 9. Kế hoạch Phân công Ca làm việc
CREATE TABLE KeHoachPhanCong (
    MaKeHoach varchar(20) NOT NULL PRIMARY KEY,
    MaPhongBan varchar(20) NOT NULL CONSTRAINT FK_KH_PB FOREIGN KEY REFERENCES PhongBan(MaPhongBan),
    Tuan int NOT NULL CHECK(Tuan BETWEEN 1 AND 53),
    Nam int NOT NULL CHECK(Nam >= 2000),
    NgayLap date NOT NULL,
    CaLamViec nvarchar(100) NOT NULL
);

-- 10. Phiếu ghi nhận Giờ phụ trội
CREATE TABLE PhieuPhuTroi (
    SoPhieuPhuTroi varchar(20) NOT NULL PRIMARY KEY,
    NgayPhuTroi date NOT NULL,
    SoGioPhuTroi float NOT NULL CHECK(SoGioPhuTroi > 0),
    HinhThuc nvarchar(50) NOT NULL CHECK(HinhThuc IN (N'Tăng ca', N'Ngày lễ', N'Ngày nghỉ')),
    HeSoLuong float NOT NULL DEFAULT 1.5 CHECK(HeSoLuong >= 1.0)
);

-- 11. Chi tiết Phụ trội từng Nhân viên
CREATE TABLE ChiTietPhuTroi (
    SoPhieuPhuTroi varchar(20) NOT NULL CONSTRAINT FK_CTPT_PPT FOREIGN KEY REFERENCES PhieuPhuTroi(SoPhieuPhuTroi),
    MaNhanVien varchar(20) NOT NULL CONSTRAINT FK_CTPT_NV FOREIGN KEY REFERENCES NhanVien(MaNhanVien),
    SoGioPhuTroiCaNhan float NOT NULL CHECK(SoGioPhuTroiCaNhan > 0),
    GhiChu nvarchar(250) NULL,
    PRIMARY KEY (SoPhieuPhuTroi, MaNhanVien)
);

-- 12. Bảng Chấm công hàng tháng
CREATE TABLE BangChamCong (
    MaChamCong varchar(20) NOT NULL PRIMARY KEY,
    MaNhanVien varchar(20) NOT NULL CONSTRAINT FK_BCC_NV FOREIGN KEY REFERENCES NhanVien(MaNhanVien),
    Thang int NOT NULL CHECK(Thang BETWEEN 1 AND 12),
    Nam int NOT NULL CHECK(Nam >= 2000),
    SoNgayCong float NOT NULL CHECK(SoNgayCong >= 0),
    SoGioPhuTroiTong float NOT NULL DEFAULT 0 CHECK(SoGioPhuTroiTong >= 0),
    CONSTRAINT UQ_ChamCong UNIQUE (MaNhanVien, Thang, Nam)
);

-- 13. Quyết định Khen thưởng
CREATE TABLE QDKhenThuong (
    SoQDKhenThuong varchar(20) NOT NULL PRIMARY KEY,
    NgayKy date NOT NULL,
    LoaiDoiTuong nvarchar(20) NOT NULL CHECK(LoaiDoiTuong IN (N'Cá nhân', N'Tập thể')),
    MaDoiTuong varchar(20) NOT NULL, -- MaNhanVien hoặc MaPhongBan
    LyDo nvarchar(500) NOT NULL,
    SoTienThuong decimal(18,2) NOT NULL CHECK(SoTienThuong > 0)
);

-- 14. Quyết định Kỷ luật
CREATE TABLE QDKyLuat (
    SoQDKyLuat varchar(20) NOT NULL PRIMARY KEY,
    NgayKy date NOT NULL,
    LoaiDoiTuong nvarchar(20) NOT NULL CHECK(LoaiDoiTuong IN (N'Cá nhân', N'Tập thể')),
    MaDoiTuong varchar(20) NOT NULL,
    LyDo nvarchar(500) NOT NULL,
    SoTienPhat decimal(18,2) NOT NULL CHECK(SoTienPhat >= 0)
);

-- 15. Phiếu Chi Khen thưởng
CREATE TABLE PhieuChiKhenThuong (
    SoPhieuChi varchar(20) NOT NULL PRIMARY KEY,
    SoQDKhenThuong varchar(20) NOT NULL UNIQUE CONSTRAINT FK_PC_QDKT FOREIGN KEY REFERENCES QDKhenThuong(SoQDKhenThuong),
    NgayChi date NOT NULL,
    SoTienChi decimal(18,2) NOT NULL CHECK(SoTienChi > 0),
    LyDoChi nvarchar(250) NULL
);

-- 16. Phiếu Thu Nộp phạt
CREATE TABLE PhieuThuNopPhat (
    SoPhieuThu varchar(20) NOT NULL PRIMARY KEY,
    SoQDKyLuat varchar(20) NOT NULL UNIQUE CONSTRAINT FK_PT_QDKL FOREIGN KEY REFERENCES QDKyLuat(SoQDKyLuat),
    NgayThu date NOT NULL,
    SoTienThu decimal(18,2) NOT NULL CHECK(SoTienThu > 0),
    LyDoThu nvarchar(250) NULL
);

-- 17. Bảng Lương hàng tháng
CREATE TABLE BangLuong (
    MaBangLuong varchar(20) NOT NULL PRIMARY KEY,
    MaNhanVien varchar(20) NOT NULL CONSTRAINT FK_BL_NV FOREIGN KEY REFERENCES NhanVien(MaNhanVien),
    Thang int NOT NULL CHECK(Thang BETWEEN 1 AND 12),
    Nam int NOT NULL CHECK(Nam >= 2000),
    LuongCoBan decimal(18,2) NOT NULL CHECK(LuongCoBan >= 0),
    PhuCap decimal(18,2) NOT NULL DEFAULT 0,
    LuongPhuTroi decimal(18,2) NOT NULL DEFAULT 0,
    TienTrichBH decimal(18,2) NOT NULL DEFAULT 0,
    TienKhenThuong decimal(18,2) NOT NULL DEFAULT 0,
    TienKyLuat decimal(18,2) NOT NULL DEFAULT 0,
    LuongThucLinh decimal(18,2) NOT NULL,
    CONSTRAINT UQ_BangLuong UNIQUE (MaNhanVien, Thang, Nam)
);
GO

/* ---------------- DỮ LIỆU MẪU BAN ĐẦU ---------------- */
INSERT INTO PhongBan VALUES 
('PB01', N'Phòng Tài chính Kế toán', '0283800001'),
('PB02', N'Phòng Kỹ thuật', '0283800002'),
('PB03', N'Phân xưởng Sản xuất', '0283800003');

INSERT INTO ChucVu VALUES 
('CV01', N'Trưởng phòng', 3000000),
('CV02', N'Phó phòng', 1500000),
('CV03', N'Nhân viên', 0);

INSERT INTO NhanVien VALUES 
('NV01', N'Nguyễn Văn An', '1990-05-15', N'Nam', N'Q.1, TP.HCM', '0901234567', N'Chính thức', 'PB01', 'CV01'),
('NV02', N'Trần Thị Bích', '1995-08-20', N'Nữ', N'Q.Tân Bình, TP.HCM', '0912345678', N'Chính thức', 'PB02', 'CV03'),
('NV03', N'Lê Hoàng Cường', '1998-11-02', N'Nam', N'TP. Thủ Đức, TP.HCM', '0923456789', N'Thử việc', 'PB03', 'CV03');

INSERT INTO QDTuyendung VALUES 
('QDTD01', 'NV03', 'PB03', '2026-09-01', 2, 5000000, N'Thử việc 2 tháng tại phân xưởng sản xuất sơn');

INSERT INTO HopDongLaoDong VALUES 
('HD01', 'NV01', N'Dài hạn', '2020-01-01', NULL, N'Hợp đồng lao động không xác định thời hạn'),
('HD02', 'NV02', N'Dài hạn', '2022-03-01', '2027-03-01', N'Hợp đồng lao động 5 năm');

INSERT INTO HoSoBaoHiem VALUES 
('BH01', 'NV01', 'DN123456789', '0123456789', 800000, '2020-01-01'),
('BH02', 'NV02', 'DN987654321', '0987654321', 650000, '2022-03-01');

INSERT INTO QDLuong VALUES 
('QDL01', 'NV01', '2025-01-01', 12000000, 1000000, 500000, '2025-01-01'),
('QDL02', 'NV02', '2025-01-01', 8000000, 500000, 1000000, '2025-01-01');

GO
PRINT N'Khởi tạo xong CSDL QuanLyNhanSu thành công!';

USE QuanLyNhanSu;
GO

-- 1. Tạo bảng Kế hoạch Phân công Ca làm việc
IF OBJECT_ID('KeHoachPhanCong', 'U') IS NULL
BEGIN
    CREATE TABLE KeHoachPhanCong (
        MaKeHoach varchar(20) NOT NULL PRIMARY KEY,
        MaPhongBan varchar(20) NOT NULL CONSTRAINT FK_KH_PB FOREIGN KEY REFERENCES PhongBan(MaPhongBan),
        Tuan int NOT NULL CHECK(Tuan BETWEEN 1 AND 53),
        Nam int NOT NULL CHECK(Nam >= 2000),
        NgayLap date NOT NULL,
        CaLamViec nvarchar(100) NOT NULL
    );
    PRINT N'Tạo bảng KeHoachPhanCong thành công!';
END
GO

-- 2. Thêm dữ liệu mẫu thử nghiệm
INSERT INTO KeHoachPhanCong (MaKeHoach, MaPhongBan, Tuan, Nam, NgayLap, CaLamViec)
VALUES 
('KH01', 'PB01', 40, 2026, '2026-10-01', N'Ca 1 (07:30 - 11:30) & Ca 2 (13:00 - 17:00)'),
('KH02', 'PB02', 40, 2026, '2026-10-02', N'Ca Hành chính & Ca Đêm kíp 1');
GO

USE QuanLyNhanSu;
GO

-- 1. Thêm dữ liệu mẫu vào bảng Phiếu Phụ Trội (HeSoLuong mặc định 1.5)
INSERT INTO PhieuPhuTroi (SoPhieuPhuTroi, NgayPhuTroi, SoGioPhuTroi, HinhThuc, HeSoLuong)
VALUES 
('PT01', '2026-10-05', 4.0, N'Tăng ca', 1.5),
('PT02', '2026-10-12', 8.0, N'Ngày nghỉ', 1.5),
('PT03', '2026-10-20', 2.5, N'Tăng ca', 1.5);

-- 2. Gán giờ phụ trội cho từng nhân viên cụ thể
INSERT INTO ChiTietPhuTroi (SoPhieuPhuTroi, MaNhanVien, SoGioPhuTroiCaNhan, GhiChu)
VALUES 
('PT01', 'NV01', 4.0, N'Tăng ca hoàn thành hồ sơ tài chính'),
('PT02', 'NV02', 8.0, N'Trực kỹ thuật ngày chủ nhật');
GO

-- 1. Tạo bảng BangChamCong (nếu CSDL chưa có)
IF OBJECT_ID('BangChamCong', 'U') IS NULL
BEGIN
    CREATE TABLE BangChamCong (
        MaChamCong varchar(20) NOT NULL PRIMARY KEY,
        MaNhanVien varchar(20) NOT NULL CONSTRAINT FK_BCC_NV FOREIGN KEY REFERENCES NhanVien(MaNhanVien),
        Thang int NOT NULL CHECK(Thang BETWEEN 1 AND 12),
        Nam int NOT NULL CHECK(Nam >= 2000),
        SoNgayCong float NOT NULL CHECK(SoNgayCong >= 0),
        SoGioPhuTroiTong float NOT NULL DEFAULT 0 CHECK(SoGioPhuTroiTong >= 0),
        CONSTRAINT UQ_ChamCong UNIQUE (MaNhanVien, Thang, Nam)
    );
END
GO

-- 2. Thêm dữ liệu chấm công mẫu cho Tháng 10/2026
INSERT INTO BangChamCong (MaChamCong, MaNhanVien, Thang, Nam, SoNgayCong, SoGioPhuTroiTong)
VALUES 
('CC_NV01_102026', 'NV01', 10, 2026, 26, 4.0),
('CC_NV02_102026', 'NV02', 10, 2026, 25, 8.0),
('CC_NV03_102026', 'NV03', 10, 2026, 24, 0.0);
GO

USE QuanLyNhanSu;
GO

-- 1. Tạo bảng QDKhenThuong & PhieuChiKhenThuong (nếu CSDL chưa có)
IF OBJECT_ID('QDKhenThuong', 'U') IS NULL
BEGIN
    CREATE TABLE QDKhenThuong (
        SoQDKhenThuong varchar(20) NOT NULL PRIMARY KEY,
        NgayKy date NOT NULL,
        LoaiDoiTuong nvarchar(20) NOT NULL CHECK(LoaiDoiTuong IN (N'Cá nhân', N'Tập thể')),
        MaDoiTuong varchar(20) NOT NULL,
        LyDo nvarchar(500) NOT NULL,
        SoTienThuong decimal(18,2) NOT NULL CHECK(SoTienThuong > 0)
    );
END

IF OBJECT_ID('PhieuChiKhenThuong', 'U') IS NULL
BEGIN
    CREATE TABLE PhieuChiKhenThuong (
        SoPhieuChi varchar(20) NOT NULL PRIMARY KEY,
        SoQDKhenThuong varchar(20) NOT NULL UNIQUE CONSTRAINT FK_PC_QDKT FOREIGN KEY REFERENCES QDKhenThuong(SoQDKhenThuong),
        NgayChi date NOT NULL,
        SoTienChi decimal(18,2) NOT NULL CHECK(SoTienChi > 0),
        LyDoChi nvarchar(250) NULL
    );
END

-- 2. Tạo bảng QDKyLuat & PhieuThuNopPhat (nếu CSDL chưa có)
IF OBJECT_ID('QDKyLuat', 'U') IS NULL
BEGIN
    CREATE TABLE QDKyLuat (
        SoQDKyLuat varchar(20) NOT NULL PRIMARY KEY,
        NgayKy date NOT NULL,
        LoaiDoiTuong nvarchar(20) NOT NULL CHECK(LoaiDoiTuong IN (N'Cá nhân', N'Tập thể')),
        MaDoiTuong varchar(20) NOT NULL,
        LyDo nvarchar(500) NOT NULL,
        SoTienPhat decimal(18,2) NOT NULL CHECK(SoTienPhat >= 0)
    );
END

IF OBJECT_ID('PhieuThuNopPhat', 'U') IS NULL
BEGIN
    CREATE TABLE PhieuThuNopPhat (
        SoPhieuThu varchar(20) NOT NULL PRIMARY KEY,
        SoQDKyLuat varchar(20) NOT NULL UNIQUE CONSTRAINT FK_PT_QDKL FOREIGN KEY REFERENCES QDKyLuat(SoQDKyLuat),
        NgayThu date NOT NULL,
        SoTienThu decimal(18,2) NOT NULL CHECK(SoTienThu > 0),
        LyDoThu nvarchar(250) NULL
    );
END
GO

-- 3. Thêm dữ liệu mẫu Quyết định Khen thưởng
INSERT INTO QDKhenThuong (SoQDKhenThuong, NgayKy, LoaiDoiTuong, MaDoiTuong, LyDo, SoTienThuong)
VALUES 
('QDKT01', '2026-10-15', N'Cá nhân', 'NV01', N'Hoàn thành xuất sắc nhiệm vụ quý 3', 2000000),
('QDKT02', '2026-10-20', N'Cá nhân', 'NV02', N'Đạt danh hiệu nhân viên giỏi tháng 9', 1000000),
('QDKT03', '2026-10-25', N'Tập thể', 'PB01', N'Phòng ban đạt thành tích xuất sắc', 5000000);

INSERT INTO PhieuChiKhenThuong (SoPhieuChi, SoQDKhenThuong, NgayChi, SoTienChi, LyDoChi)
VALUES 
('PC_QDKT01', 'QDKT01', '2026-10-15', 2000000, N'Chi thưởng tiền mặt theo QĐ QDKT01');

-- 4. Thêm dữ liệu mẫu Quyết định Kỷ luật
INSERT INTO QDKyLuat (SoQDKyLuat, NgayKy, LoaiDoiTuong, MaDoiTuong, LyDo, SoTienPhat)
VALUES 
('QDKL01', '2026-10-05', N'Cá nhân', 'NV03', N'Đi trễ quá 3 lần trong tháng', 200000),
('QDKL02', '2026-10-18', N'Cá nhân', 'NV02', N'Bàn giao công việc trễ hạn', 500000);

INSERT INTO PhieuThuNopPhat (SoPhieuThu, SoQDKyLuat, NgayThu, SoTienThu, LyDoThu)
VALUES 
('PT_QDKL01', 'QDKL01', '2026-10-05', 200000, N'Thu tiền nộp phạt theo QĐ QDKL01');
GO

USE QuanLyNhanSu;
GO

-- 1. Tạo bảng BangLuong (nếu chưa có)
IF OBJECT_ID('BangLuong', 'U') IS NULL
BEGIN
    CREATE TABLE BangLuong (
        MaBangLuong varchar(30) NOT NULL PRIMARY KEY,
        MaNhanVien varchar(20) NOT NULL CONSTRAINT FK_BL_NV FOREIGN KEY REFERENCES NhanVien(MaNhanVien),
        Thang int NOT NULL CHECK(Thang BETWEEN 1 AND 12),
        Nam int NOT NULL CHECK(Nam >= 2000),
        LuongCoBan decimal(18,2) NOT NULL CHECK(LuongCoBan >= 0),
        PhuCap decimal(18,2) NOT NULL DEFAULT 0,
        LuongPhuTroi decimal(18,2) NOT NULL DEFAULT 0,
        TienTrichBH decimal(18,2) NOT NULL DEFAULT 0,
        TienKhenThuong decimal(18,2) NOT NULL DEFAULT 0,
        TienKyLuat decimal(18,2) NOT NULL DEFAULT 0,
        LuongThucLinh decimal(18,2) NOT NULL,
        CONSTRAINT UQ_BangLuong UNIQUE (MaNhanVien, Thang, Nam)
    );
END
GO