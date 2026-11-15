import React, { useState } from 'react';

const API_URL = 'http://localhost:5000/api';

interface DangNhapProps {
  khiDangNhapThanhCong: (nguoiDung: any) => void;
}

export default function DangNhap({ khiDangNhapThanhCong }: DangNhapProps) {
  const [tenDangNhap, setTenDangNhap] = useState('thukho01');
  const [matKhau, setMatKhau] = useState('123456');
  const [thongBaoLoi, setThongBaoLoi] = useState('');
  const [dangXuLy, setDangXuLy] = useState(false);

  const xuLyDangNhap = async (e: React.FormEvent) => {
    e.preventDefault();
    setThongBaoLoi('');
    setDangXuLy(true);

    try {
      const phanHoi = await fetch(`${API_URL}/dang-nhap`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tenDangNhap, matKhau }),
      });

      const duLieu = await phanHoi.json();

      if (!phanHoi.ok) {
        setThongBaoLoi(duLieu.message || duLieu.thongBao || 'Tên đăng nhập hoặc mật khẩu không đúng!');
        return;
      }

      // Chuẩn hóa dữ liệu người dùng trả về từ Backend
      const thongTinUser = duLieu.duLieu || duLieu;

      // Lưu phiên đăng nhập vào localStorage để F5 không bị văng ra ngoài
      localStorage.setItem('nguoiDungHienTai', JSON.stringify(thongTinUser));
      if (thongTinUser.token) {
        localStorage.setItem('token', thongTinUser.token);
      }

      khiDangNhapThanhCong(thongTinUser);
    } catch (loi) {
      setThongBaoLoi('Không thể kết nối tới Backend (http://localhost:5000). Em kiểm tra đã bật server chưa nhé!');
    } finally {
      setDangXuLy(false);
    }
  };

  const dienNhanhTaiKhoan = (tk: string, mk: string) => {
    setTenDangNhap(tk);
    setMatKhau(mk);
    setThongBaoLoi('');
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#F4F6F9' }}>
      <div className="card border-0 shadow-sm p-4" style={{ width: '420px', borderRadius: '12px' }}>
        <div className="text-center mb-4">
          <div className="fs-2 mb-1">💊</div>
          <h4 className="fw-bold text-primary mb-1">KHO DƯỢC HLT-03</h4>
          <p className="text-muted small mb-0">Hệ thống Quản lý Kho thuốc & Cảnh báo Hết hạn</p>
        </div>

        {thongBaoLoi && (
          <div className="alert alert-danger py-2 small text-center" role="alert">
            {thongBaoLoi}
          </div>
        )}

        <form onSubmit={xuLyDangNhap}>
          <div className="mb-3">
            <label className="form-label fw-semibold small">Tên đăng nhập</label>
            <input
              type="text"
              className="form-control"
              placeholder="Nhập tên đăng nhập..."
              value={tenDangNhap}
              onChange={(e) => setTenDangNhap(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold small">Mật khẩu</label>
            <input
              type="password"
              className="form-control"
              placeholder="Nhập mật khẩu..."
              value={matKhau}
              onChange={(e) => setMatKhau(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 fw-semibold py-2"
            disabled={dangXuLy}
          >
            {dangXuLy ? 'Đang xác thực...' : 'Đăng nhập hệ thống'}
          </button>
        </form>

        <div className="mt-4 p-3 bg-light border rounded small">
          <div className="fw-bold text-secondary mb-2">Tài khoản dùng thử (Bấm để điền nhanh):</div>
          <div className="d-flex gap-2">
            <button
              type="button"
              className="btn btn-outline-primary btn-sm flex-fill"
              onClick={() => dienNhanhTaiKhoan('thukho01', '123456')}
            >
              Thủ kho (thukho01)
            </button>
            <button
              type="button"
              className="btn btn-outline-dark btn-sm flex-fill"
              onClick={() => dienNhanhTaiKhoan('quanly01', '123456')}
            >
              Quản lý (quanly01)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}