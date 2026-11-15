import React, { useState, useEffect } from 'react';
import { API_URL } from '../src/App';

export default function KiemDuyet({ duLieu, taiLaiDuLieu, nguoiDung }: any) {
  const laThuKho = nguoiDung?.VAITRO === 'ThuKho';
  const laQuanLy = nguoiDung?.VAITRO === 'QuanLyKho';

  const danhSachLo = duLieu.LOTHUOC || [];
  const [maLoChon, setMaLoChon] = useState('');
  const [tonThucTe, setTonThucTe] = useState<number>(0);
  const [lyDoDieuChinh, setLyDoDieuChinh] = useState('Hư hỏng bao bì do ẩm mốc khi kiểm kê');
  const [dangXuLy, setDangXuLy] = useState(false);

  useEffect(() => {
    if (!maLoChon && danhSachLo.length > 0) {
      setMaLoChon(danhSachLo[0].MALO);
      setTonThucTe(Math.max(0, danhSachLo[0].SOLUONGTON - 5));
    }
  }, [danhSachLo]);

  const loDangChon = danhSachLo.find((l: any) => l.MALO === maLoChon);
  const tonSoSach = loDangChon ? loDangChon.SOLUONGTON : 0;

  const layTenTaiKhoan = (maTK: string) => {
    if (!maTK) return '';
    const tk = (duLieu.TAIKHOAN || []).find((u: any) => u.MATAIKHOAN === maTK);
    return tk ? `${tk.HOTEN} (${tk.MATAIKHOAN})` : maTK;
  };

  const layThongTinThuocTuLo = (maLo: string) => {
    const lo = danhSachLo.find((l: any) => l.MALO === maLo);
    if (!lo) return { tenThuoc: '', donViTinh: '' };
    const thuoc = (duLieu.THUOC || []).find((t: any) => t.MATHUOC === lo.MATHUOC);
    return {
      tenThuoc: thuoc ? thuoc.TENTHUOC : lo.MATHUOC,
      donViTinh: thuoc ? thuoc.DONVITINH : ''
    };
  };

  // Bước 1: Thủ kho gửi phiếu điều chỉnh (Pending)
  const xuLyGuiPhieu = async (e: React.FormEvent) => {
    e.preventDefault();
    setDangXuLy(true);
    try {
      const res = await fetch(`${API_URL}/phieu-dieu-chinh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          maLo: maLoChon,
          tonSoSach,
          tonThucTe,
          lyDoDieuChinh,
          nguoiThucHien: nguoiDung
        })
      });
      const data = await res.json();
      if (!res.ok) return alert(data.message);

      await taiLaiDuLieu();
      alert(data.message);
    } finally {
      setDangXuLy(false);
    }
  };

  // Bước 2 (Đồng ý): Quản lý phê duyệt
  const xuLyPheDuyet = async (maPhieu: string) => {
    if (!window.confirm(`Xác nhận PHÊ DUYỆT phiếu ${maPhieu}? Tồn kho thực tế sẽ được cập nhật ngay lập tức.`)) return;
    const res = await fetch(`${API_URL}/phieu-dieu-chinh/${maPhieu}/duyet`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nguoiThucHien: nguoiDung })
    });
    const data = await res.json();
    if (!res.ok) return alert(data.message);

    await taiLaiDuLieu();
    alert(data.message);
  };

  // Bước 2 (Từ chối): Quản lý từ chối & bắt buộc nhập lý do
  const xuLyTuChoi = async (maPhieu: string) => {
    const lyDoTuChoi = window.prompt(`Nhập lý do TỪ CHỐI phiếu ${maPhieu}:`);
    if (lyDoTuChoi === null) return;
    if (!lyDoTuChoi.trim()) {
      return alert('Bắt buộc phải nhập lý do khi từ chối phiếu!');
    }

    const res = await fetch(`${API_URL}/phieu-dieu-chinh/${maPhieu}/tu-choi`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lyDoTuChoi, nguoiThucHien: nguoiDung })
    });
    const data = await res.json();
    if (!res.ok) return alert(data.message);

    await taiLaiDuLieu();
    alert(data.message);
  };

  return (
    <div>
      <div className="mb-4">
        <h4 className="fw-bold mb-1">
          {laThuKho
            ? 'Kiểm Kê Kho & Lập Phiếu Điều Chỉnh Tồn Kho (Bước 1)'
            : 'Phê Duyệt Phiếu Điều Chỉnh Tồn Kho (Bước 2 - Quyền Quản Lý)'}
        </h4>
        <p className="text-muted small mb-0">
          {laThuKho
            ? 'Báo cáo chênh lệch kiểm kê thực tế. Tồn kho chỉ thay đổi sau khi Quản lý kho phê duyệt.'
            : 'Kiểm tra nguyên nhân chênh lệch từ Thủ kho để Phê duyệt cập nhật kho hoặc Từ chối bảo lưu tồn cũ.'}
        </p>
      </div>

      {/* FORM LẬP PHIẾU (Chỉ hiển thị cho Thủ kho) */}
      {laThuKho && (
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-header bg-primary text-white fw-bold">
            📋 Lập Phiếu Yêu Cầu Điều Chỉnh Tồn Kho
          </div>
          <div className="card-body">
            <form onSubmit={xuLyGuiPhieu} className="row g-3 align-items-end">
              <div className="col-md-4">
                <label className="form-label small fw-semibold">Chọn Lô Thuốc Kiểm Kê *</label>
                <select
                  className="form-select"
                  value={maLoChon}
                  onChange={(e) => {
                    const maMoi = e.target.value;
                    setMaLoChon(maMoi);
                    const loMoi = danhSachLo.find((l: any) => l.MALO === maMoi);
                    if (loMoi) setTonThucTe(Math.max(0, loMoi.SOLUONGTON - 1));
                  }}
                >
                  {danhSachLo.map((l: any) => {
                    const { tenThuoc, donViTinh } = layThongTinThuocTuLo(l.MALO);
                    return (
                      <option key={l.MALO} value={l.MALO}>
                        Lô {l.MALO} - {tenThuoc} (Tồn: {l.SOLUONGTON} {donViTinh})
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="col-md-2">
                <label className="form-label small fw-semibold">Tồn Sổ Sách</label>
                <input type="text" className="form-control bg-light fw-bold" value={tonSoSach} disabled />
              </div>

              <div className="col-md-2">
                <label className="form-label small fw-semibold">Tồn Thực Tế *</label>
                <input
                  type="number"
                  min={0}
                  className="form-control"
                  value={tonThucTe}
                  onChange={(e) => setTonThucTe(Number(e.target.value))}
                  required
                />
              </div>

              <div className="col-md-2">
                <label className="form-label small fw-semibold">Lý Do Chênh Lệch *</label>
                <input
                  type="text"
                  className="form-control"
                  value={lyDoDieuChinh}
                  onChange={(e) => setLyDoDieuChinh(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-2">
                <button type="submit" className="btn btn-warning w-100 fw-semibold" disabled={dangXuLy}>
                  {dangXuLy ? 'Đang gửi...' : 'Gửi phiếu duyệt'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* BẢNG DANH SÁCH PHIẾU ĐIỀU CHỈNH */}
      <div className="card border-0 shadow-sm">
        <div className="card-header bg-white fw-bold py-3">
          Danh Sách Phiếu Yêu Cầu Điều Chỉnh Tồn Kho
        </div>
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Mã Phiếu</th>
                <th>Thời Gian Lập</th>
                <th>Người Lập</th>
                <th>Lô & Tên Thuốc</th>
                <th>Sổ Sách &rarr; Thực Tế</th>
                <th>Chênh Lệch</th>
                <th>Lý Do Kiểm Kê</th>
                <th>Trạng Thái</th>
                {laQuanLy && <th className="text-end">Xét Duyệt</th>}
              </tr>
            </thead>
            <tbody>
              {(duLieu.PHIEUDIEUCHINH || []).map((p: any) => {
                const { tenThuoc, donViTinh } = layThongTinThuocTuLo(p.MALO);
                return (
                  <tr key={p.MAPHIEU}>
                    <td className="fw-bold text-primary">{p.MAPHIEU}</td>
                    <td className="small">{new Date(p.NGAYLAP).toLocaleString('vi-VN')}</td>
                    <td>{layTenTaiKhoan(p.NGUOILAPID)}</td>
                    <td>
                      <strong>{p.MALO}</strong> - {tenThuoc}{' '}
                      <span className="text-muted small">({donViTinh})</span>
                    </td>
                    <td>
                      {p.SOLUONGTONSOSACH} &rarr; <strong>{p.SOLUONGTONTHUCTE}</strong>
                    </td>
                    <td className={`fw-bold ${p.CHENHLECH < 0 ? 'text-danger' : 'text-success'}`}>
                      {p.CHENHLECH > 0 ? `+${p.CHENHLECH}` : p.CHENHLECH}
                    </td>
                    <td>
                      <div>{p.LYDODIEUCHINH}</div>
                      {p.LYDOTUCHOI && (
                        <small className="text-danger fw-semibold d-block">
                          Lý do từ chối: {p.LYDOTUCHOI}
                        </small>
                      )}
                    </td>
                    <td>
                      {p.TRANGTHAI === 'Pending' && <span className="badge bg-warning text-dark">Chờ duyệt</span>}
                      {p.TRANGTHAI === 'Approved' && <span className="badge bg-success">Đã phê duyệt</span>}
                      {p.TRANGTHAI === 'Rejected' && <span className="badge bg-danger">Đã từ chối</span>}
                    </td>
                    {laQuanLy && (
                      <td className="text-end">
                        {p.TRANGTHAI === 'Pending' ? (
                          <div className="d-flex justify-content-end gap-1">
                            <button onClick={() => xuLyPheDuyet(p.MAPHIEU)} className="btn btn-sm btn-success">
                              ✓ Phê duyệt
                            </button>
                            <button onClick={() => xuLyTuChoi(p.MAPHIEU)} className="btn btn-sm btn-danger">
                              ✕ Từ chối
                            </button>
                          </div>
                        ) : (
                          <span className="text-muted small">
                            Đã xử lý bởi {layTenTaiKhoan(p.NGUOIDUYETID)}
                          </span>
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