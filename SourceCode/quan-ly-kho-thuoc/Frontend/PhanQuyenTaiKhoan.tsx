import React, { useState } from 'react';
import { API_URL } from '../src/App';

export default function PhanQuyenTaiKhoan({ duLieu, taiLaiDuLieu, nguoiDung }: any) {
  const laQuanLy = nguoiDung?.VAITRO === 'QuanLyKho';
  const danhSachTK = (duLieu.TAIKHOAN || []).filter((tk: any) => tk.MATAIKHOAN !== 'SYSTEM');

  const [hoTen, setHoTen] = useState('');
  const [tenDangNhap, setTenDangNhap] = useState('');
  const [matKhau, setMatKhau] = useState('123456');
  const [vaiTro, setVaiTro] = useState('ThuKho');
  const [dangXuLy, setDangXuLy] = useState(false);

  if (!laQuanLy) {
    return (
      <div className="alert alert-danger shadow-sm">
        ⛔ Chỉ tài khoản <strong>Quản lý kho</strong> mới có quyền quản lý và phân vai trò tài khoản.
      </div>
    );
  }

  // Tạo tài khoản mới
  const xuLyTaoTaiKhoan = async (e: React.FormEvent) => {
    e.preventDefault();
    setDangXuLy(true);
    try {
      const res = await fetch(`${API_URL}/tai-khoan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hoTen, tenDangNhap, matKhau, vaiTro, nguoiThucHien: nguoiDung })
      });
      const data = await res.json();
      if (!res.ok) return alert(data.message);

      setHoTen('');
      setTenDangNhap('');
      setMatKhau('123456');
      await taiLaiDuLieu();
      alert(data.message);
    } finally {
      setDangXuLy(false);
    }
  };

  // Đổi vai trò trực tiếp trên bảng
  const xuLyDoiVaiTro = async (tk: any, vaiTroMoi: string) => {
    if (tk.VAITRO === vaiTroMoi) return;
    const res = await fetch(`${API_URL}/tai-khoan/${tk.MATAIKHOAN}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ hoTen: tk.HOTEN, vaiTro: vaiTroMoi, nguoiThucHien: nguoiDung })
    });
    const data = await res.json();
    if (!res.ok) return alert(data.message);

    await taiLaiDuLieu();
    alert(data.message);
  };

  // Xóa tài khoản chưa phát sinh giao dịch
  const xuLyXoaTaiKhoan = async (tk: any) => {
    if (!window.confirm(`Xác nhận xóa tài khoản ${tk.HOTEN} (${tk.TENDANGNHAP})?`)) return;
    const res = await fetch(`${API_URL}/tai-khoan/${tk.MATAIKHOAN}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nguoiThucHien: nguoiDung })
    });
    const data = await res.json();
    if (!res.ok) return alert(data.message);

    await taiLaiDuLieu();
    alert(data.message);
  };

  return (
    <div>
      <div className="mb-4">
        <h4 className="fw-bold mb-1">Quản Lý & Phân Quyền Tài Khoản (RBAC)</h4>
        <p className="text-muted small mb-0">
          Tạo tài khoản nhân viên mới và gán vai trò <strong>Thủ kho</strong> hoặc <strong>Quản lý kho</strong>
        </p>
      </div>

      {/* Form cấp tài khoản mới */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-header bg-primary text-white fw-bold">
          ➕ Cấp Tài Khoản & Phân Vai Trò Mới
        </div>
        <div className="card-body">
          <form onSubmit={xuLyTaoTaiKhoan} className="row g-3 align-items-end">
            <div className="col-md-3">
              <label className="form-label small fw-semibold">Họ và Tên *</label>
              <input
                type="text"
                className="form-control"
                placeholder="VD: Lê Văn C"
                value={hoTen}
                onChange={(e) => setHoTen(e.target.value)}
                required
              />
            </div>
            <div className="col-md-3">
              <label className="form-label small fw-semibold">Tên Đăng Nhập *</label>
              <input
                type="text"
                className="form-control"
                placeholder="VD: thukho02"
                value={tenDangNhap}
                onChange={(e) => setTenDangNhap(e.target.value)}
                required
              />
            </div>
            <div className="col-md-2">
              <label className="form-label small fw-semibold">Mật Khẩu *</label>
              <input
                type="text"
                className="form-control"
                value={matKhau}
                onChange={(e) => setMatKhau(e.target.value)}
                required
              />
            </div>
            <div className="col-md-2">
              <label className="form-label small fw-semibold">Vai Trò Phân Quyền *</label>
              <select className="form-select" value={vaiTro} onChange={(e) => setVaiTro(e.target.value)}>
                <option value="ThuKho">Thủ kho</option>
                <option value="QuanLyKho">Quản lý kho</option>
              </select>
            </div>
            <div className="col-md-2">
              <button type="submit" className="btn btn-success w-100 fw-semibold" disabled={dangXuLy}>
                {dangXuLy ? 'Đang lưu...' : 'Tạo tài khoản'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Bảng phân quyền tài khoản */}
      <div className="card border-0 shadow-sm">
        <div className="card-header bg-white fw-bold py-3">
          Danh Sách Tài Khoản Hệ Thống ({danhSachTK.length} tài khoản)
        </div>
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Mã TK</th>
                <th>Họ Tên Nhân Viên</th>
                <th>Tên Đăng Nhập</th>
                <th>Vai Trò Hiện Tại</th>
                <th>Thay Đổi Phân Quyền</th>
                <th className="text-end">Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {danhSachTK.map((tk: any) => (
                <tr key={tk.MATAIKHOAN}>
                  <td className="fw-bold text-primary">{tk.MATAIKHOAN}</td>
                  <td className="fw-semibold">{tk.HOTEN}</td>
                  <td><code>{tk.TENDANGNHAP}</code></td>
                  <td>
                    <span className={`badge ${tk.VAITRO === 'QuanLyKho' ? 'bg-danger' : 'bg-info text-dark'}`}>
                      {tk.VAITRO === 'QuanLyKho' ? 'Quản lý kho' : 'Thủ kho'}
                    </span>
                  </td>
                  <td style={{ width: '210px' }}>
                    <select
                      className="form-select form-select-sm"
                      value={tk.VAITRO}
                      disabled={tk.MATAIKHOAN === nguoiDung.MATAIKHOAN}
                      onChange={(e) => xuLyDoiVaiTro(tk, e.target.value)}
                    >
                      <option value="ThuKho">Thủ kho</option>
                      <option value="QuanLyKho">Quản lý kho</option>
                    </select>
                  </td>
                  <td className="text-end">
                    {tk.MATAIKHOAN === nguoiDung.MATAIKHOAN ? (
                      <span className="text-muted small">Đang đăng nhập</span>
                    ) : (
                      <button onClick={() => xuLyXoaTaiKhoan(tk)} className="btn btn-sm btn-outline-danger">
                        Xóa
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}