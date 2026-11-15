import React from 'react';
import { NavLink } from 'react-router-dom';

export default function GiaoDienThietKe({ nguoiDung, duLieu, khiDangXuat, khiKhoiPhucDuLieu, children }: any) {
  const laThuKho = nguoiDung.VAITRO === 'ThuKho';
  const soPhieuChoDuyet = duLieu.PHIEUDIEUCHINH?.filter((p: any) => p.TRANGTHAI === 'Pending').length || 0;

  const layClassMenu = ({ isActive }: { isActive: boolean }) =>
    `nav-link text-white py-2 px-3 rounded mb-2 ${isActive ? 'bg-dark fw-bold shadow-sm' : 'opacity-75'}`;

  return (
    <div className="d-flex">
      {}
      <div className="bg-primary text-white p-3 d-flex flex-column" style={{ width: '260px', minHeight: '100vh' }}>
        <h5 className="fw-bold border-bottom pb-3 mb-3">💊 KHO DƯỢC HLT-03</h5>

        <div className="small text-light mb-3 opacity-75">
          Phân hệ: <strong>{laThuKho ? 'Nghiệp vụ Thủ kho' : 'Kiểm soát Quản lý kho'}</strong>
        </div>

        <nav className="nav flex-column flex-grow-1">
          <NavLink to="/" className={layClassMenu}>
            Tổng quan & Cảnh báo
          </NavLink>

          {laThuKho ? (
            <>
              <NavLink to="/danh-muc" className={layClassMenu}>
                Nhập kho & Danh mục lô
              </NavLink>
              <NavLink to="/xuat-kho" className={layClassMenu}>
                Xuất kho ưu tiên (FEFO)
              </NavLink>
              <NavLink to="/kiem-ke-duyet" className={layClassMenu}>
                Kiểm kê & Lập phiếu
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/danh-muc" className={layClassMenu}>
                Quản lý Danh mục & Lô
              </NavLink>
              <NavLink to="/kiem-ke-duyet" className={layClassMenu}>
                Duyệt điều chỉnh kho{' '}
                {soPhieuChoDuyet > 0 && <span className="badge bg-danger ms-1">{soPhieuChoDuyet}</span>}
              </NavLink>
              <NavLink to="/nhat-ky" className={layClassMenu}>
                Nhật ký hoạt động
              </NavLink>
              <NavLink to="/phan-quyen" className={layClassMenu}>
                Phân quyền tài khoản
              </NavLink>
              <NavLink to="/bao-cao" className={layClassMenu}>
                Xuất báo cáo Excel
              </NavLink>
            </>
          )}
        </nav>
      </div>

      {}
      <div className="flex-grow-1 bg-light d-flex flex-column" style={{ minHeight: '100vh' }}>
        <header className="bg-white border-bottom px-4 py-3 d-flex justify-content-between align-items-center">
          <span className="text-secondary fw-semibold">Hệ thống Quản lý Kho thuốc & Cảnh báo Hết hạn</span>
          <div className="d-flex align-items-center gap-3">
            <span>
              Xin chào, <strong>{nguoiDung.HOTEN}</strong>{' '}
              <span className="badge bg-info text-dark">{laThuKho ? 'Thủ kho' : 'Quản lý kho'}</span>
            </span>
            <button onClick={khiDangXuat} className="btn btn-outline-danger btn-sm">
              Đăng xuất
            </button>
          </div>
        </header>
        <main className="p-4 flex-grow-1">{children}</main>
      </div>
    </div>
  );
}