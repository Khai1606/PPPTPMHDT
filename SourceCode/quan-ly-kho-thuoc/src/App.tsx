import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DangNhap from '../Frontend/DangNhap';
import GiaoDienThietKe from '../Frontend/GiaoDienThietKe';
import TongQuanCanhBao from '../Frontend/TongQuanCanhBao';
import DanhMucThuoc from '../Frontend/DanhMucThuoc';
import XuatKho from '../Frontend/XuatKho';
import KiemDuyet from '../Frontend/KiemDuyet';
import NhatKyHoatDong from '../Frontend/NhatKyHoatDong';
import PhanQuyenTaiKhoan from '../Frontend/PhanQuyenTaiKhoan';
import BaoCaoExcel from '../Frontend/BaoCaoExcel';

export const API_URL = 'http://localhost:5000/api';

export default function App() {
  const [duLieu, setDuLieu] = useState<any>({
    TAIKHOAN: [],
    THUOC: [],
    LOTHUOC: [],
    PHIEUDIEUCHINH: [],
    PHIEUXUAT: [],
    NHATKYHOATDONG: []
  });

  const [nguoiDung, setNguoiDung] = useState<any>(() => {
    const userLuu = sessionStorage.getItem('nguoiDungKhoThuoc');
    if (!userLuu) return null;
    const parsed = JSON.parse(userLuu);
    return parsed.taiKhoan ? parsed.taiKhoan : parsed;
  });

  const taiDuLieuTuBackend = async () => {
    try {
      const res = await fetch(`${API_URL}/du-lieu`);
      if (res.ok) {
        const data = await res.json();
        setDuLieu(data);
      }
    } catch (error) {
      console.error('Không kết nối được Backend:', error);
    }
  };

  useEffect(() => {
    taiDuLieuTuBackend();
  }, [nguoiDung]);

  const xuLyDangNhap = (phanHoi: any) => {
    const thongTinUser = phanHoi.taiKhoan ? phanHoi.taiKhoan : phanHoi;
    setNguoiDung(thongTinUser);
    sessionStorage.setItem('nguoiDungKhoThuoc', JSON.stringify(thongTinUser));
    taiDuLieuTuBackend();
  };

  const xuLyDangXuat = () => {
    setNguoiDung(null);
    sessionStorage.removeItem('nguoiDungKhoThuoc');
  };

  if (!nguoiDung) {
    return <DangNhap khiDangNhapThanhCong={xuLyDangNhap} />;
  }

  return (
    <BrowserRouter>
      <GiaoDienThietKe
        nguoiDung={nguoiDung}
        duLieu={duLieu}
        khiDangXuat={xuLyDangXuat}
        khiKhoiPhucDuLieu={taiDuLieuTuBackend}
      >
        <Routes>
          <Route path="/" element={<TongQuanCanhBao duLieu={duLieu} taiLaiDuLieu={taiDuLieuTuBackend} nguoiDung={nguoiDung} />} />
          <Route path="/danh-muc" element={<DanhMucThuoc duLieu={duLieu} taiLaiDuLieu={taiDuLieuTuBackend} nguoiDung={nguoiDung} />} />
          <Route path="/xuat-kho" element={<XuatKho duLieu={duLieu} taiLaiDuLieu={taiDuLieuTuBackend} nguoiDung={nguoiDung} />} />
          <Route path="/kiem-ke-duyet" element={<KiemDuyet duLieu={duLieu} taiLaiDuLieu={taiDuLieuTuBackend} nguoiDung={nguoiDung} />} />
          <Route path="/nhat-ky" element={<NhatKyHoatDong duLieu={duLieu} nguoiDung={nguoiDung} />} />
          <Route path="/phan-quyen" element={<PhanQuyenTaiKhoan duLieu={duLieu} taiLaiDuLieu={taiDuLieuTuBackend} nguoiDung={nguoiDung} />} />
          <Route path="/bao-cao" element={<BaoCaoExcel duLieu={duLieu} taiLaiDuLieu={taiDuLieuTuBackend} nguoiDung={nguoiDung} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </GiaoDienThietKe>
    </BrowserRouter>
  );
}