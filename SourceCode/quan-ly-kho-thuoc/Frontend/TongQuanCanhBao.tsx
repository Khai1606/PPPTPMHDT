import React, { useState } from 'react';
import { API_URL } from '../src/App';

export default function TongQuanCanhBao({ duLieu, taiLaiDuLieu, nguoiDung }: any) {
  const [boLocMau, setBoLocMau] = useState<'ALL' | 'SAFE' | 'WARNING' | 'DANGER'>('ALL');
  const laQuanLy = nguoiDung?.VAITRO === 'QuanLyKho';

  const tinhSoNgayConLai = (ngayHetHan: string) => {
    const homNay = new Date();
    homNay.setHours(0, 0, 0, 0);
    const hanDung = new Date(ngayHetHan);
    hanDung.setHours(0, 0, 0, 0);
    return Math.ceil((hanDung.getTime() - homNay.getTime()) / (1000 * 60 * 60 * 24));
  };

  const danhSachLoDayDu = (duLieu.LOTHUOC || []).map((lo: any) => {
    const thuoc = duLieu.THUOC?.find((t: any) => t.MATHUOC === lo.MATHUOC);
    const soNgayConLai = tinhSoNgayConLai(lo.NGAYHETHAN);
    return {
      ...lo,
      TENTHUOC: thuoc ? thuoc.TENTHUOC : lo.MATHUOC,
      DONVITINH: thuoc ? thuoc.DONVITINH : '',
      soNgayConLai
    };
  });

  const soLoAnToan = danhSachLoDayDu.filter((l: any) => l.TRANGTHAI === 'Active' && l.soNgayConLai > 90).length;
  const soLoCanhBao = danhSachLoDayDu.filter((l: any) => l.TRANGTHAI === 'Active' && l.soNgayConLai > 30 && l.soNgayConLai <= 90).length;
  const soLoNguyHiem = danhSachLoDayDu.filter((l: any) => l.soNgayConLai <= 30 || l.TRANGTHAI !== 'Active').length;

  const danhSachHienThi = danhSachLoDayDu.filter((l: any) => {
    if (boLocMau === 'SAFE') return l.TRANGTHAI === 'Active' && l.soNgayConLai > 90;
    if (boLocMau === 'WARNING') return l.TRANGTHAI === 'Active' && l.soNgayConLai > 30 && l.soNgayConLai <= 90;
    if (boLocMau === 'DANGER') return l.soNgayConLai <= 30 || l.TRANGTHAI !== 'Active';
    return true;
  });

  const xuLyQuetHanDung = async () => {
    const res = await fetch(`${API_URL}/lo-thuoc/quet-han-dung`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nguoiThucHien: nguoiDung })
    });
    const data = await res.json();
    if (!res.ok) return alert(data.message);
    await taiLaiDuLieu();
    alert(data.message);
  };

  const xuLyKhoaLo = async (maLo: string) => {
    if (!window.confirm(`Xác nhận khóa khẩn cấp lô ${maLo}? Lô này sẽ không thể xuất kho nữa.`)) return;
    const res = await fetch(`${API_URL}/lo-thuoc/${maLo}/khoa`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nguoiThucHien: nguoiDung })
    });
    const data = await res.json();
    if (!res.ok) return alert(data.message);
    await taiLaiDuLieu();
    alert(data.message);
  };

  const xuLyTieuHuy = async (maLo: string) => {
    if (!window.confirm(`Xác nhận tiêu hủy và xóa hẳn lô ${maLo} khỏi danh sách tồn kho?`)) return;
    const res = await fetch(`${API_URL}/lo-thuoc/${maLo}`, {
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
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-1">Tổng quan Kho thuốc & Cảnh báo Hạn dùng</h4>
          <p className="text-muted small mb-0">
            {laQuanLy
              ? 'Theo dõi trạng thái hạn sử dụng, quét khóa lô quá hạn và xử lý tiêu hủy'
              : 'Theo dõi hạn sử dụng các lô thuốc để ưu tiên xuất kho cận hạn trước'}
          </p>
        </div>

        {/* Chỉ Quản lý kho mới được bấm Quét hạn dùng */}
        {laQuanLy && (
          <button onClick={xuLyQuetHanDung} className="btn btn-warning fw-semibold shadow-sm">
            ⚡ Chạy quét hạn dùng tự động
          </button>
        )}
      </div>

      {/* 3 Thẻ thống kê (Bấm vào để lọc nhanh) */}
      <div className="row g-3 mb-4">
        <div className="col-md-4" style={{ cursor: 'pointer' }} onClick={() => setBoLocMau(boLocMau === 'SAFE' ? 'ALL' : 'SAFE')}>
          <div className={`card border-0 border-start border-success border-4 shadow-sm ${boLocMau === 'SAFE' ? 'bg-success bg-opacity-10' : ''}`}>
            <div className="card-body">
              <div className="text-success fw-bold small">LÔ AN TOÀN (&gt; 90 NGÀY)</div>
              <h2 className="fw-bold mb-0 mt-1">{soLoAnToan} <span className="fs-6 fw-normal text-muted">lô</span></h2>
            </div>
          </div>
        </div>

        <div className="col-md-4" style={{ cursor: 'pointer' }} onClick={() => setBoLocMau(boLocMau === 'WARNING' ? 'ALL' : 'WARNING')}>
          <div className={`card border-0 border-start border-warning border-4 shadow-sm ${boLocMau === 'WARNING' ? 'bg-warning bg-opacity-10' : ''}`}>
            <div className="card-body">
              <div className="text-warning fw-bold small">CẢNH BÁO SỚM (31 - 90 NGÀY)</div>
              <h2 className="fw-bold mb-0 mt-1">{soLoCanhBao} <span className="fs-6 fw-normal text-muted">lô</span></h2>
            </div>
          </div>
        </div>

        <div className="col-md-4" style={{ cursor: 'pointer' }} onClick={() => setBoLocMau(boLocMau === 'DANGER' ? 'ALL' : 'DANGER')}>
          <div className={`card border-0 border-start border-danger border-4 shadow-sm ${boLocMau === 'DANGER' ? 'bg-danger bg-opacity-10' : ''}`}>
            <div className="card-body">
              <div className="text-danger fw-bold small">CẬN HẠN (&le; 30 NGÀY) / ĐÃ KHÓA</div>
              <h2 className="fw-bold mb-0 mt-1">{soLoNguyHiem} <span className="fs-6 fw-normal text-muted">lô</span></h2>
            </div>
          </div>
        </div>
      </div>

      {/* Bảng theo dõi các lô thuốc */}
      <div className="card border-0 shadow-sm">
        <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
          <span className="fw-bold">Danh sách theo dõi hạn sử dụng các Lô thuốc</span>
          {boLocMau !== 'ALL' && (
            <button onClick={() => setBoLocMau('ALL')} className="btn btn-sm btn-outline-secondary">
              Hiển thị tất cả
            </button>
          )}
        </div>
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Mã Lô</th>
                <th>Tên Thuốc</th>
                <th>Hạn Sử Dụng</th>
                <th>Thời Gian Còn Lại</th>
                <th>Tồn Kho</th>
                <th>Mức Cảnh Báo</th>
                {laQuanLy && <th className="text-end">Thao Tác Quản Lý</th>}
              </tr>
            </thead>
            <tbody>
              {danhSachHienThi.map((lo: any) => {
                const daHetHanHoacKhoa = lo.TRANGTHAI !== 'Active' || lo.soNgayConLai <= 0;
                let mauNhan = 'bg-success';
                let nhanCanhBao = 'An toàn';

                if (daHetHanHoacKhoa) {
                  mauNhan = 'bg-dark';
                  nhanCanhBao = lo.TRANGTHAI === 'Blocked' ? 'Đã khóa khẩn cấp' : 'Hết hạn / Khóa xuất';
                } else if (lo.soNgayConLai <= 30) {
                  mauNhan = 'bg-danger';
                  nhanCanhBao = 'Cận hạn nguy hiểm (≤ 30 ngày)';
                } else if (lo.soNgayConLai <= 90) {
                  mauNhan = 'bg-warning text-dark';
                  nhanCanhBao = 'Cảnh báo sớm (≤ 90 ngày)';
                }

                return (
                  <tr key={lo.MALO} className={daHetHanHoacKhoa ? 'table-secondary' : ''}>
                    <td className="fw-bold text-primary">{lo.MALO}</td>
                    <td className="fw-semibold">{lo.TENTHUOC}</td>
                    <td>{lo.NGAYHETHAN?.split('T')[0]}</td>
                    <td className="fw-semibold">
                      {lo.soNgayConLai > 0 ? `${lo.soNgayConLai} ngày` : `Quá hạn ${Math.abs(lo.soNgayConLai)} ngày`}
                    </td>
                    <td>{lo.SOLUONGTON} {lo.DONVITINH}</td>
                    <td><span className={`badge ${mauNhan}`}>{nhanCanhBao}</span></td>
                    {laQuanLy && (
                      <td className="text-end">
                        {daHetHanHoacKhoa ? (
                          <button onClick={() => xuLyTieuHuy(lo.MALO)} className="btn btn-sm btn-danger">
                            🗑️ Tiêu hủy
                          </button>
                        ) : (
                          <button onClick={() => xuLyKhoaLo(lo.MALO)} className="btn btn-sm btn-outline-dark">
                            🔒 Khóa lô
                          </button>
                        )}
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}