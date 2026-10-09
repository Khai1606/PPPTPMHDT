========================================================================

THỰC HÀNH PHÂN TÍCH THIẾT KẾ HƯỚNG ĐỐI TƯỢNG - BÀI 6 (LAB 5/LAB 6)

DỰ ÁN: HỆ THỐNG QUẢN LÝ CÔNG TY DU LỊCH VĂN HÓA VIỆT

========================================================================



THÔNG TIN SINH VIÊN:

- Họ và tên: Tô Quốc Khải

- Mã số sinh viên (MSSV): 1250080078

- Trường: Đại học Công nghệ TP.HCM (HUTECH)



------------------------------------------------------------------------

DANH SÁCH FILE NỘP TRONG THƯ MỤC

------------------------------------------------------------------------

1. 1250080078_Tô Quốc Khải_Lab5.docx

   - Báo cáo chi tiết nội dung phân tích & thiết kế hệ thống.

   - Bao gồm: Mô tả nghiệp vụ, Bảng lớp, Biểu đồ Use Case, Biểu đồ Trạng thái,

     Biểu đồ Hoạt động, Biểu đồ Tuần tự, ERD, Thiết kế giao diện WinForms 

     và Bảng kiểm thử (Test Cases).



2. QUANLYDULICH.sql

   - Script khởi tạo Cơ sở dữ liệu SQL Server (Bao gồm các bảng, khóa chính,

     khóa ngoại, các ràng buộc CHECK/UNIQUE và dữ liệu mẫu thử nghiệm).



3. QUANLYDULICH.zip

   - Source code dự án C# WinForms (.NET Framework 4.7.2).

   - Thiết kế theo kiến trúc 3 lớp: UI (Forms) -> Services (Bus) -> Data (Db.cs).



4. Sơ đồ.drawio

   - File lưu trữ toàn bộ các mô hình biểu đồ UML (Use Case, Class, Sequence, 

     Activity, State Machine, ERD) thiết kế bằng ứng dụng Draw.io / Diagrams.net.



5. lab5.zip

   - Bảng nộp nén tổng hợp toàn bộ tài liệu và mã nguồn dự án.



------------------------------------------------------------------------

HƯỚNG DẪN CÀI ĐẶT VÀ CHẠY CHƯƠNG TRÌNH

------------------------------------------------------------------------

Bước 1: Khởi tạo Cơ sở dữ liệu

- Mở Microsoft SQL Server Management Studio (SSMS) hoặc LocalDB.

- Mở file `QUANLYDULICH.sql` và nhấn Execute (F5) để khởi tạo CSDL và chèn dữ liệu mẫu.



Bước 2: Mở và cấu hình Dự án WinForms

- Giải nén file `QUANLYDULICH.zip`.

- Mở file `QuanLyCongTyDuLich.sln` bằng Visual Studio 2022.

- Kiểm tra lại chuỗi kết nối (Connection String) trong file `App.config` cho đúng 

  với Tên máy/Server SQL Server của bạn.



Bước 3: Biên dịch & Thực thi

- Chọn Rebuild Solution để kiểm tra lỗi.

- Nhấn F5 (Start) để chạy ứng dụng WinForms.



========================================================================
