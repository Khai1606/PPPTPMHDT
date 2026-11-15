import React, { useState } from 'react';

export default function NhatKyHoatDong({ duLieu, nguoiDung }: any) {
  const [tuKhoa, setTuKhoa] = useState('');
  const [locHanhDong, setLocHanhDong] = useState('ALL');

  const laQuanLy = nguoiDung?.VAITRO === 'QuanLyKho';

  const layThongTinNguoiThucHien = (maTK: string) => {
    if (!maTK || maTK === 'SYSTEM') return { ten: 'Hệ thống tự động', vaiTro: 'Batch Job' };
    const tk = (duLieu.TAIKHOAN || []).find((u: any) => u.MATAIKHOAN === maTK);
    if (!tk) return { ten: maTK, vaiTro: '' };
    return {
      ten: `${tk.HOTEN} (${tk.MATAIKHOAN})`,
      vaiTro: tk.VAITRO === 'QuanLyKho' ? 'Quản lý kho' : 'Thủ kho'
    };
  };

  const danhSachLog = duLieu.NHATKYHOATDONG || [];

  const danhSachLoc = danhSachLog.filter((log: any) => {
    const khopTuKhoa =
      (log.CHITIET || '').toLowerCase().includes(tuKhoa.toLowerCase()) ||
      (log.HANHDONG || '').toLowerCase().includes(tuKhoa.toLowerCase()) ||
      (log.MALOG || '').toLowerCase().includes(tuKhoa.toLowerCase()) ||
      (log.MATAIKHOAN || '').toLowerCase().includes(tuKhoa.toLowerCase());

    if (!khopTuKhoa) return false;
    if (locHanhDong === 'ALL') return true;
    return (log.HANHDONG || '').toLowerCase().includes(locHanhDong.toLowerCase());
  });

  const layMauBadgeHanhDong = (hanhDong: string) => {
    const hd = (hanhDong || '').toLowerCase();
    if (hd.includes('phê duyệt') || hd.includes('nhập')) return 'bg-success';
    if (hd.includes('từ chối') || hd.includes('khóa') || hd.includes('tiêu hủy')) return 'bg-danger';
    if (hd.includes('xuất kho')) return 'bg-primary';
    if (hd.includes('điều chỉnh') || hd.includes('quét')) return 'bg-warning text-dark';
    return 'bg-secondary';
  };

  if (!laQuanLy) {
    return (
      <div className="alert alert-danger shadow-sm">
        ⛔ Chỉ tài khoản <strong>Quản lý kho</strong> mới có quyền truy cập phân hệ Nhật ký kiểm toán hệ thống (Audit Log).
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-1">Nhật Ký Hoạt Động Hệ Thống (Audit Log)</h4>
          <p className="text-muted small mb-0">
            Lưu vết toàn bộ thao tác nghiệp vụ theo cơ chế <strong>Chỉ thêm mới (Append-only)</strong> — Tuyệt đối không thể chỉnh sửa hoặc xóa
          </p>
        </div>
        <span className="badge bg-dark px-3 py-2 fs-6">
          🔒 Chế độ chỉ đọc (Immutable)
        </span>
      </div>

      {/* Thanh công cụ tìm kiếm & lọc */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-7">
              <input
                type="text"
                className="form-control"
                placeholder="🔍 Tìm theo mã log, mã lô, tên nhân viên hoặc nội dung chi tiết..."
                value={tuKhoa}
                onChange={(e) => setTuKhoa(e.target.value)}
              />
            </div>
            <div className="col-md-5">
              <select
                className="form-select"
                value={locHanhDong}
                onChange={(e) => setLocHanhDong(e.target.value)}
              >
                <option value="ALL">Tất cả loại hành động ({danhSachLog.length})</option>
                <option value="đăng nhập">Đăng nhập hệ thống</option>
                <option value="nhập lô">Nhập lô thuốc mới</option>
                <option value="xuất kho">Xuất kho FEFO</option>
                <option value="điều chỉnh">Lập / Duyệt / Từ chối phiếu điều chỉnh</option>
                <option value="khóa">Quét hạn dùng / Khóa lô / Tiêu hủy</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Bảng hiển thị Audit Log */}
      <div className="card border-0 shadow-sm">
        <div className="card-header bg-white fw-bold py-3 d-flex justify-content-between">
          <span>Lịch sử truy vết thao tác ({danhSachLoc.length} bản ghi)</span>
          <small className="text-muted fw-normal">Sắp xếp theo thời gian mới nhất</small>
        </div>
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Mã Log</th>
                <th>Thời Gian</th>
                <th>Người Thực Hiện</th>
                <th>Hành Động</th>
                <th>Đối Tượng</th>
                <th>Nội Dung Chi Tiết</th>
              </tr>
            </thead>
            <tbody>
              {danhSachLoc.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center text-muted py-4">
                    Không tìm thấy bản ghi nhật ký nào phù hợp.
                  </td>
                </tr>
              ) : (
                danhSachLoc.map((log: any) => {
                  const nguoi = layThongTinNguoiThucHien(log.MATAIKHOAN);
                  return (
                    <tr key={log.MALOG}>
                      <td className="fw-bold text-secondary small">{log.MALOG}</td>
                      <td className="small text-nowrap">
                        {new Date(log.THOIGIAN).toLocaleString('vi-VN')}
                      </td>
                      <td>
                        <div className="fw-semibold">{nguoi.ten}</div>
                        <small className="text-muted">{nguoi.vaiTro}</small>
                      </td>
                      <td>
                        <span className={`badge ${layMauBadgeHanhDong(log.HANHDONG)}`}>
                          {log.HANHDONG}
                        </span>
                      </td>
                      <td className="small fw-semibold text-primary">{log.DOITUONGTACDONG}</td>
                      <td className="small">{log.CHITIET}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}