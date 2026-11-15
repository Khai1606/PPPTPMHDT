CREATE DATABASE eShoppingDB;
GO
USE eShoppingDB;
GO

-- 1. Bảng Nhóm sản phẩm
CREATE TABLE NhomSanPham (
    MaNhom INT IDENTITY(1,1) PRIMARY KEY,
    TenNhom NVARCHAR(100) NOT NULL,
    MoTa NVARCHAR(MAX)
);

-- 2. Bảng Sản phẩm
CREATE TABLE SanPham (
    MaSP VARCHAR(20) PRIMARY KEY,
    TenSP NVARCHAR(200) NOT NULL,
    MaNhom INT FOREIGN KEY REFERENCES NhomSanPham(MaNhom),
    TenNhaSanXuat NVARCHAR(100),
    MoTa NVARCHAR(MAX),
    ThongSoKyThuat NVARCHAR(MAX),
    GiaBanHienHang DECIMAL(18,2) NOT NULL,
    TinhTrang NVARCHAR(20) DEFAULT N'Còn hàng'
);

-- 3. Bảng Hình ảnh sản phẩm
CREATE TABLE HinhAnhSanPham (
    MaHinh INT IDENTITY(1,1) PRIMARY KEY,
    MaSP VARCHAR(20) FOREIGN KEY REFERENCES SanPham(MaSP) ON DELETE CASCADE,
    DuongDanHinh VARCHAR(500) NOT NULL
);

-- 4. Bảng Khách hàng
CREATE TABLE KhachHang (
    MaKH INT IDENTITY(1,1) PRIMARY KEY,
    TenDangNhap VARCHAR(50) UNIQUE NOT NULL,
    MatKhau VARCHAR(255) NOT NULL,
    HoTen NVARCHAR(100) NOT NULL,
    NgaySinh DATE,
    SoCMND_Passport VARCHAR(20),
    DiaChi NVARCHAR(255),
    DienThoai VARCHAR(15),
    Email VARCHAR(100)
);

-- 5. Bảng Loại phiếu đặt hàng
CREATE TABLE LoaiPhieuDatHang (
    MaLoaiPhieu INT IDENTITY(1,1) PRIMARY KEY,
    TenLoaiPhieu NVARCHAR(100) NOT NULL,
    DonGia DECIMAL(18,2) DEFAULT 0,
    ThoiGianXuLy NVARCHAR(50)
);

-- 6. Bảng Phiếu đặt hàng
CREATE TABLE PhieuDatHang (
    MaPhieuDat INT IDENTITY(1,1) PRIMARY KEY,
    MaKH INT FOREIGN KEY REFERENCES KhachHang(MaKH),
    MaLoaiPhieu INT FOREIGN KEY REFERENCES LoaiPhieuDatHang(MaLoaiPhieu),
    ThoiDiemDatHang DATETIME DEFAULT GETDATE(),
    HoTenNguoiNhan NVARCHAR(100) NOT NULL,
    DiaChiNguoiNhan NVARCHAR(255) NOT NULL,
    SoDienThoaiNguoiNhan VARCHAR(15) NOT NULL,
    ChiPhiGiaoHang DECIMAL(18,2) DEFAULT 0,
    TongTriGia DECIMAL(18,2) NOT NULL,
    TrangThai NVARCHAR(50) DEFAULT N'Chờ xử lý'
);

-- 7. Bảng Chi tiết phiếu đặt hàng
CREATE TABLE ChiTietPhieuDatHang (
    MaPhieuDat INT FOREIGN KEY REFERENCES PhieuDatHang(MaPhieuDat),
    MaSP VARCHAR(20) FOREIGN KEY REFERENCES SanPham(MaSP),
    SoLuong INT NOT NULL CHECK (SoLuong > 0),
    DonGiaBan DECIMAL(18,2) NOT NULL,
    PRIMARY KEY (MaPhieuDat, MaSP)
);

-- 8. Bảng Thanh toán thẻ
CREATE TABLE ThanhToanThe (
    MaGiaoDich INT IDENTITY(1,1) PRIMARY KEY,
    MaPhieuDat INT FOREIGN KEY REFERENCES PhieuDatHang(MaPhieuDat),
    LoaiThe VARCHAR(20) NOT NULL,
    SoHieuTheAnDanh VARCHAR(20),
    TenChuThe NVARCHAR(100),
    SoTienThanhToan DECIMAL(18,2) NOT NULL,
    TrangThaiThanhToan NVARCHAR(50) DEFAULT N'Thành công'
);
-- 1. Thêm dữ liệu nhóm sản phẩm
INSERT INTO NhomSanPham (TenNhom, MoTa) VALUES
(N'Thiết bị điện gia dụng', N'Các sản phẩm điện máy gia đình'),
(N'Đồ chơi', N'Đồ chơi trẻ em và quà tặng'),
(N'Máy ảnh kỹ thuật số', N'Máy ảnh và phụ kiện nhiếp ảnh'),
(N'Thiết bị máy tính', N'Linh kiện, chuột, bàn phím, laptop');

-- 2. Thêm dữ liệu sản phẩm
INSERT INTO SanPham (MaSP, TenSP, MaNhom, TenNhaSanXuat, MoTa, ThongSoKyThuat, GiaBanHienHang, TinhTrang) VALUES
('SP001', N'Máy pha cà phê Mini ABC', 1, N'ABC Home', N'Máy pha cà phê tiện lợi gia đình', N'Công suất 800W, Dung tích 1.2L', 850000, N'Còn hàng'),
('SP002', N'Gấu bông Giáng Sinh 80cm', 2, N'Teddy Corp', N'Gấu bông mềm mịn quà tặng Noël', N'Chiều cao 80cm, Bông gòn cao cấp', 350000, N'Còn hàng'),
('SP003', N'Máy ảnh Mirrorless X100', 3, N'PhotoCam', N'Máy ảnh du lịch nhỏ gọn', N'Cảm biến 24MP, Quay phim 4K', 12500000, N'Còn hàng'),
('SP004', N'Bàn phím cơ Không dây K8', 4, N'KeyLab', N'Bàn phím cơ gõ êm thích hợp văn phòng', N'Kết nối Bluetooth/2.4G, Switch Brown', 1650000, N'Còn hàng'),
('SP005', N'Nồi chiên không dầu 5.5L', 1, N'ABC Home', N'Nồi chiên không dầu chống dính', N'Công suất 1500W, Dung tích 5.5L', 1200000, N'Hết hàng');

-- 3. Thêm hình ảnh minh họa cho sản phẩm
INSERT INTO HinhAnhSanPham (MaSP, DuongDanHinh) VALUES
('SP001', '/images/sp001_1.jpg'),
('SP001', '/images/sp001_2.jpg'),
('SP002', '/images/sp002_main.jpg'),
('SP003', '/images/sp003_front.jpg'),
('SP004', '/images/sp004_1.jpg');

-- 4. Thêm loại phiếu đặt hàng (Các hình thức giao hàng)
INSERT INTO LoaiPhieuDatHang (TenLoaiPhieu, DonGia, ThoiGianXuLy) VALUES
(N'Phiếu đặt hàng thường', 30000, N'3 - 5 ngày'),
(N'Phiếu đặt hàng chuyển phát nhanh', 50000, N'1 - 2 ngày'),
(N'Phiếu đặt hàng chuyển phát nhanh trong ngày', 100000, N'Trong ngày (24h)');

-- 5. Thêm khách hàng mẫu
INSERT INTO KhachHang (TenDangNhap, MatKhau, HoTen, NgaySinh, SoCMND_Passport, DiaChi, DienThoai, Email) VALUES
('nguyenvana', 'password123', N'Nguyễn Văn A', '1995-05-15', '079195000123', N'123 Lê Lợi, Q.1, TP.HCM', '0901234567', 'nguyenvana@gmail.com'),
('tranthib', 'password456', N'Trần Thị B', '1998-11-20', '079198000456', N'456 Nguyễn Huệ, Q.1, TP.HCM', '0918765432', 'tranthib@gmail.com');

-- 6. Thêm phiếu đặt hàng (Đơn hàng)
-- Đơn hàng 1: Khách A mua cho người thân, tổng trị giá 1.200.000đ -> Miễn phí Chuyển phát nhanh (trị giá >= 1tr)
INSERT INTO PhieuDatHang (MaKH, MaLoaiPhieu, ThoiDiemDatHang, HoTenNguoiNhan, DiaChiNguoiNhan, SoDienThoaiNguoiNhan, ChiPhiGiaoHang, TongTriGia, TrangThai) VALUES
(1, 2, GETDATE(), N'Nguyễn Văn C', N'789 Điện Biên Phủ, Q.3, TP.HCM', '0909999888', 0, 1200000, N'Đã thanh toán');

-- Đơn hàng 2: Khách B mua máy ảnh, tổng trị giá 12.500.000đ -> Miễn phí Chuyển phát nhanh trong ngày (trị giá >= 5tr)
INSERT INTO PhieuDatHang (MaKH, MaLoaiPhieu, ThoiDiemDatHang, HoTenNguoiNhan, DiaChiNguoiNhan, SoDienThoaiNguoiNhan, ChiPhiGiaoHang, TongTriGia, TrangThai) VALUES
(2, 3, GETDATE(), N'Trần Thị B', N'456 Nguyễn Huệ, Q.1, TP.HCM', '0918765432', 0, 12500000, N'Đã thanh toán');

-- 7. Chi tiết sản phẩm trong từng đơn hàng
-- Đơn hàng 1 (MaPhieuDat = 1): 1 Máy pha cà phê + 1 Gấu bông
INSERT INTO ChiTietPhieuDatHang (MaPhieuDat, MaSP, SoLuong, DonGiaBan) VALUES
(1, 'SP001', 1, 850000),
(1, 'SP002', 1, 350000);

-- Đơn hàng 2 (MaPhieuDat = 2): 1 Máy ảnh Mirrorless
INSERT INTO ChiTietPhieuDatHang (MaPhieuDat, MaSP, SoLuong, DonGiaBan) VALUES
(2, 'SP003', 1, 12500000);

-- 8. Nhật ký thanh toán bằng thẻ tín dụng
-- Thanh toán đơn 1 bằng thẻ VISA (Số thẻ ẩn danh, chỉ lưu 4 số cuối)
INSERT INTO ThanhToanThe (MaPhieuDat, LoaiThe, SoHieuTheAnDanh, TenChuThe, SoTienThanhToan, TrangThaiThanhToan) VALUES
(1, 'VISA', '************4321', N'NGUYEN VAN A', 1200000, N'Thành công');

-- Thanh toán đơn 2 bằng thẻ MasterCard
INSERT INTO ThanhToanThe (MaPhieuDat, LoaiThe, SoHieuTheAnDanh, TenChuThe, SoTienThanhToan, TrangThaiThanhToan) VALUES
(2, 'Mastercard', '************8888', N'TRAN THI B', 12500000, N'Thành công');
USE eShoppingDB;
GO
CREATE TABLE KhuVucGiaoHang (
    MaKhuVuc INT IDENTITY(1,1) PRIMARY KEY,
    TenKhuVuc NVARCHAR(100) NOT NULL,
    PhuThu DECIMAL(18,2) DEFAULT 0
);
INSERT INTO KhuVucGiaoHang (TenKhuVuc, PhuThu) VALUES
(N'Nội thành TP.HCM', 0), (N'Ngoại thành TP.HCM', 15000), (N'Tỉnh khác', 40000);

CREATE TABLE LoaiThe (
    MaLoaiThe INT IDENTITY(1,1) PRIMARY KEY,
    TenLoaiThe VARCHAR(20) NOT NULL UNIQUE,
    SoChuSoThe INT NOT NULL,
    SoChuSoCSV INT NOT NULL,
    LePhi DECIMAL(18,2) DEFAULT 0
);
INSERT INTO LoaiThe (TenLoaiThe, SoChuSoThe, SoChuSoCSV, LePhi) VALUES
('VISA',16,3,5000),('Master',16,3,5000),('Discover',16,3,6000),('American Express',15,4,10000);

ALTER TABLE PhieuDatHang ADD MaKhuVuc INT NULL FOREIGN KEY REFERENCES KhuVucGiaoHang(MaKhuVuc);
ALTER TABLE ThanhToanThe ADD NgayHetHan DATE NULL, LePhi DECIMAL(18,2) DEFAULT 0;
GO
-- đồng bộ dữ liệu mẫu cũ
UPDATE ThanhToanThe SET LoaiThe='Master' WHERE LoaiThe='Mastercard';


-- Thêm cột NgayDat vào bảng PhieuDatHang (tự động lấy ngày giờ hiện tại)
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'PhieuDatHang' AND COLUMN_NAME = 'NgayDat')
BEGIN
    ALTER TABLE PhieuDatHang ADD NgayDat DATETIME DEFAULT GETDATE();
END
GO