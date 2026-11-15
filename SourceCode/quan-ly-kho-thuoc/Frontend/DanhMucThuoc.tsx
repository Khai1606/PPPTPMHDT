import React, { useState } from 'react';
import { API_URL } from '../src/App';

export default function DanhMucThuoc({ duLieu, taiLaiDuLieu, nguoiDung }: any) {
  const laThuKho = nguoiDung?.VAITRO === 'ThuKho';
  const [tuKhoa, setTuKhoa] = useState('');

  // State Thêm thuốc mới (Quản lý kho)
  const [maThuocMoi, setMaThuocMoi] = useState('');
  const [tenThuocMoi, setTenThuocMoi] = useState('');
  const [donViTinhMoi, setDonViTinhMoi] = useState('Hộp');
  const [moTaMoi, setMoTaMoi] = useState('');

  // State Nhập lô mới (Thủ kho)
  const [maLoNhap, setMaLoNhap] = useState('');
  const [maThuocNhap, setMaThuocNhap] = useState(duLieu.THUOC?.[0]?.MATHUOC || 'T01');
  const [ngaySanXuat, setNgaySanXuat] = useState('');
  const [ngayHetHan, setNgayHetHan] = useState('');
  const [soLuongNhap, setSoLuongNhap] = useState<number>(100);

  // State Chỉnh sửa Thuốc + Số lượng từng lô (Quản lý kho)
  const [dangSuaMaThuoc, setDangSuaMaThuoc] = useState<string | null>(null);
  const [tenThuocSua, setTenThuocSua] = useState('');
  const [donViTinhSua, setDonViTinhSua] = useState('');
  const [moTaSua, setMoTaSua] = useState('');
  const [dsLoDangSua, setDsLoDangSua] = useState<any[]>([]);

  // Lọc danh sách thuốc theo ô tìm kiếm
  const dsThuocLoc = (duLieu.THUOC || []).filter(
    (t: any) =>
      t.MATHUOC.toLowerCase().includes(tuKhoa.toLowerCase()) ||
      t.TENTHUOC.toLowerCase().includes(tuKhoa.toLowerCase())
  );

  // Thêm thuốc mới
  const xuLyThemThuoc = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/thuoc`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        maThuoc: maThuocMoi,
        tenThuoc: tenThuocMoi,
        donViTinh: donViTinhMoi,
        moTa: moTaMoi,
        nguoiThucHien: nguoiDung
      })
    });
    const data = await res.json();
    if (!res.ok) return alert(data.message);

    setMaThuocMoi('');
    setTenThuocMoi('');
    setMoTaMoi('');
    await taiLaiDuLieu();
    alert(data.message);
  };

  // Nhập lô mới (Thủ kho)
  const xuLyNhapLo = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/lo-thuoc`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        maLo: maLoNhap,
        maThuoc: maThuocNhap,
        ngaySanXuat,
        ngayHetHan,
        soLuongNhap,
        nguoiThucHien: nguoiDung
      })
    });
    const data = await res.json();
    if (!res.ok) return alert(data.message);

    setMaLoNhap('');
    setSoLuongNhap(100);
    await taiLaiDuLieu();
    alert(data.message);
  };

  // Bắt đầu sửa Thuốc & Số lượng các lô của thuốc đó
  const batDauSua = (thuoc: any) => {
    const cacLoCuaThuoc = (duLieu.LOTHUOC || [])
      .filter((l: any) => l.MATHUOC === thuoc.MATHUOC)
      .map((l: any) => ({
        MALO: l.MALO,
        NGAYHETHAN: l.NGAYHETHAN ? String(l.NGAYHETHAN).slice(0, 10) : '',
        SOLUONGTON: l.SOLUONGTON,
        TRANGTHAI: l.TRANGTHAI
      }));

    setDangSuaMaThuoc(thuoc.MATHUOC);
    setTenThuocSua(thuoc.TENTHUOC);
    setDonViTinhSua(thuoc.DONVITINH);
    setMoTaSua(thuoc.MOTA || '');
    setDsLoDangSua(cacLoCuaThuoc);
  };

  // Cập nhật giá trị từng lô đang sửa
  const capNhatTruongLo = (maLo: string, truong: string, giaTri: any) => {
    setDsLoDangSua((prev) =>
      prev.map((lo) => (lo.MALO === maLo ? { ...lo, [truong]: giaTri } : lo))
    );
  };

  // Lưu thay đổi Thuốc + Số lượng các lô xuống SQL Server
  const xuLyLuuSua = async (maThuoc: string) => {
    const res = await fetch(`${API_URL}/thuoc/${maThuoc}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tenThuoc: tenThuocSua,
        donViTinh: donViTinhSua,
        moTa: moTaSua,
        danhSachLoCapNhat: dsLoDangSua,
        nguoiThucHien: nguoiDung
      })
    });
    const data = await res.json();
    if (!res.ok) return alert(data.message);

    setDangSuaMaThuoc(null);
    await taiLaiDuLieu();
    alert(data.message);
  };

  // Xóa thuốc
  const xuLyXoaThuoc = async (thuoc: any) => {
    if (!window.confirm(`Xác nhận xóa thuốc ${thuoc.TENTHUOC} (${thuoc.MATHUOC})?`)) return;
    const res = await fetch(`${API_URL}/thuoc/${thuoc.MATHUOC}`, {
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
      {/* Thanh tiêu đề & tìm kiếm */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <h4 className="fw-bold mb-1">Danh mục Thuốc & Quản lý Lô nhập kho</h4>
          <p className="text-muted small mb-0">
            Quản lý danh mục thuốc gốc (Master Data) và điều chỉnh trực tiếp số lượng tồn kho theo từng lô
          </p>
        </div>
        <input
          type="text"
          className="form-control"
          style={{ width: '280px' }}
          placeholder="🔍 Tìm mã hoặc tên thuốc..."
          value={tuKhoa}
          onChange={(e) => setTuKhoa(e.target.value)}
        />
      </div>

      {/* Form dành riêng cho từng vai trò */}
      {laThuKho ? (
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-header bg-primary text-white fw-bold">
            📦 Nhập Lô Thuốc Mới Vào Kho (Thủ kho)
          </div>
          <div className="card-body">
            <form onSubmit={xuLyNhapLo} className="row g-3 align-items-end">
              <div className="col-md-2">
                <label className="form-label small fw-semibold">Mã Lô *</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="VD: L06"
                  value={maLoNhap}
                  onChange={(e) => setMaLoNhap(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-3">
                <label className="form-label small fw-semibold">Chọn Thuốc *</label>
                <select
                  className="form-select"
                  value={maThuocNhap}
                  onChange={(e) => setMaThuocNhap(e.target.value)}
                >
                  {(duLieu.THUOC || []).map((t: any) => (
                    <option key={t.MATHUOC} value={t.MATHUOC}>
                      {t.MATHUOC} - {t.TENTHUOC} ({t.DONVITINH})
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-2">
                <label className="form-label small fw-semibold">Ngày Sản Xuất</label>
                <input
                  type="date"
                  className="form-control"
                  value={ngaySanXuat}
                  onChange={(e) => setNgaySanXuat(e.target.value)}
                />
              </div>
              <div className="col-md-2">
                <label className="form-label small fw-semibold">Hạn Sử Dụng *</label>
                <input
                  type="date"
                  className="form-control"
                  value={ngayHetHan}
                  onChange={(e) => setNgayHetHan(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-1">
                <label className="form-label small fw-semibold">Số Lượng *</label>
                <input
                  type="number"
                  min="1"
                  className="form-control"
                  value={soLuongNhap}
                  onChange={(e) => setSoLuongNhap(Number(e.target.value))}
                  required
                />
              </div>
              <div className="col-md-2">
                <button type="submit" className="btn btn-success w-100 fw-semibold">
                  + Nhập kho
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-header bg-dark text-white fw-bold">
            💊 Thêm Thuốc Mới Vào Danh Mục
          </div>
          <div className="card-body">
            <form onSubmit={xuLyThemThuoc} className="row g-3 align-items-end">
              <div className="col-md-2">
                <label className="form-label small fw-semibold">Mã Thuốc *</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="VD: TH06"
                  value={maThuocMoi}
                  onChange={(e) => setMaThuocMoi(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-3">
                <label className="form-label small fw-semibold">Tên Thuốc *</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tên thương mại..."
                  value={tenThuocMoi}
                  onChange={(e) => setTenThuocMoi(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-2">
                <label className="form-label small fw-semibold">Đơn Vị Tính *</label>
                <select
                  className="form-select"
                  value={donViTinhMoi}
                  onChange={(e) => setDonViTinhMoi(e.target.value)}
                >
                  <option value="Hộp">Hộp</option>
                  <option value="Vỉ">Vỉ</option>
                  <option value="Lọ">Lọ</option>
                  <option value="Chai">Chai</option>
                  <option value="Ống">Ống</option>
                </select>
              </div>
              <div className="col-md-3">
                <label className="form-label small fw-semibold">Mô Tả / Bảo Quản</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Điều kiện bảo quản, công dụng..."
                  value={moTaMoi}
                  onChange={(e) => setMoTaMoi(e.target.value)}
                />
              </div>
              <div className="col-md-2">
                <button type="submit" className="btn btn-success w-100 fw-semibold">
                  Thêm mới
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bảng danh sách Thuốc & Chi tiết các lô */}
      <div className="card border-0 shadow-sm">
        <div className="card-header bg-white fw-bold py-3">
          Danh sách Thuốc & Chi tiết Lô tồn kho ({dsThuocLoc.length} loại thuốc)
        </div>
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th style={{ width: '90px' }}>Mã Thuốc</th>
                <th style={{ width: '230px' }}>Tên Thuốc & Mô Tả</th>
                <th style={{ width: '100px' }}>Đơn Vị</th>
                <th style={{ width: '150px' }}>Tổng Tồn Khả Dụng</th>
                <th>Chi Tiết Các Lô Đang Lưu Kho (Sắp xếp FEFO)</th>
                {!laThuKho && <th className="text-end" style={{ width: '150px' }}>Thao Tác</th>}
              </tr>
            </thead>
            <tbody>
              {dsThuocLoc.map((thuoc: any) => {
                const cacLo = (duLieu.LOTHUOC || []).filter((l: any) => l.MATHUOC === thuoc.MATHUOC);
                const tongTonKhaDung = cacLo
                  .filter((l: any) => l.TRANGTHAI === 'Active' && new Date(l.NGAYHETHAN) > new Date())
                  .reduce((sum: number, l: any) => sum + Number(l.SOLUONGTON), 0);
                const dangSua = dangSuaMaThuoc === thuoc.MATHUOC;

                return (
                  <tr key={thuoc.MATHUOC} className={dangSua ? 'table-warning' : ''}>
                    <td className="fw-bold text-primary">{thuoc.MATHUOC}</td>

                    {/* Cột Tên thuốc & Mô tả */}
                    <td>
                      {dangSua ? (
                        <div className="d-flex flex-column gap-1">
                          <input
                            type="text"
                            className="form-control form-control-sm fw-bold"
                            value={tenThuocSua}
                            onChange={(e) => setTenThuocSua(e.target.value)}
                          />
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            placeholder="Mô tả..."
                            value={moTaSua}
                            onChange={(e) => setMoTaSua(e.target.value)}
                          />
                        </div>
                      ) : (
                        <>
                          <div className="fw-bold">{thuoc.TENTHUOC}</div>
                          <div className="text-muted small">{thuoc.MOTA || '—'}</div>
                        </>
                      )}
                    </td>

                    {/* Cột Đơn vị tính */}
                    <td>
                      {dangSua ? (
                        <select
                          className="form-select form-select-sm"
                          value={donViTinhSua}
                          onChange={(e) => setDonViTinhSua(e.target.value)}
                        >
                          <option value="Hộp">Hộp</option>
                          <option value="Vỉ">Vỉ</option>
                          <option value="Lọ">Lọ</option>
                          <option value="Chai">Chai</option>
                          <option value="Ống">Ống</option>
                        </select>
                      ) : (
                        thuoc.DONVITINH
                      )}
                    </td>

                    {/* Cột Tổng tồn khả dụng */}
                    <td className="fw-bold text-success">
                      {tongTonKhaDung} {thuoc.DONVITINH}
                    </td>

                    {/* Cột Chi tiết các lô (Cho phép sửa trực tiếp Số lượng, HSD, Trạng thái khi bấm Sửa) */}
                    <td>
                      {dangSua ? (
                        dsLoDangSua.length === 0 ? (
                          <span className="text-muted fst-italic small">Chưa có lô nào để chỉnh số lượng</span>
                        ) : (
                          <div className="d-flex flex-column gap-2">
                            {dsLoDangSua.map((lo) => (
                              <div key={lo.MALO} className="bg-white border rounded p-2 d-flex align-items-center gap-2 flex-wrap">
                                <span className="fw-bold text-primary" style={{ minWidth: '45px' }}>{lo.MALO}</span>
                                <div className="d-flex align-items-center gap-1">
                                  <span className="small text-muted">SL:</span>
                                  <input
                                    type="number"
                                    min="0"
                                    className="form-control form-control-sm fw-bold"
                                    style={{ width: '85px' }}
                                    value={lo.SOLUONGTON}
                                    onChange={(e) => capNhatTruongLo(lo.MALO, 'SOLUONGTON', Number(e.target.value))}
                                  />
                                </div>
                                <div className="d-flex align-items-center gap-1">
                                  <span className="small text-muted">HSD:</span>
                                  <input
                                    type="date"
                                    className="form-control form-control-sm"
                                    style={{ width: '135px' }}
                                    value={lo.NGAYHETHAN}
                                    onChange={(e) => capNhatTruongLo(lo.MALO, 'NGAYHETHAN', e.target.value)}
                                  />
                                </div>
                                <select
                                  className="form-select form-select-sm"
                                  style={{ width: '105px' }}
                                  value={lo.TRANGTHAI}
                                  onChange={(e) => capNhatTruongLo(lo.MALO, 'TRANGTHAI', e.target.value)}
                                >
                                  <option value="Active">Active</option>
                                  <option value="Blocked">Blocked</option>
                                  <option value="Expired">Expired</option>
                                </select>
                              </div>
                            ))}
                          </div>
                        )
                      ) : cacLo.length === 0 ? (
                        <span className="text-muted fst-italic small">Chưa có lô nào</span>
                      ) : (
                        <div className="d-flex flex-column gap-1">
                          {cacLo.map((lo: any) => (
                            <div
                              key={lo.MALO}
                              className="border rounded px-2 py-1 bg-white d-flex justify-content-between align-items-center small"
                            >
                              <span>
                                <strong>{lo.MALO}</strong> — HSD: {String(lo.NGAYHETHAN).slice(0, 10)}
                              </span>
                              <span>
                                SL: <strong>{lo.SOLUONGTON}</strong>{' '}
                                <span
                                  className={`badge ${
                                    lo.TRANGTHAI === 'Active'
                                      ? 'bg-success'
                                      : lo.TRANGTHAI === 'Blocked'
                                      ? 'bg-warning text-dark'
                                      : 'bg-danger'
                                  }`}
                                >
                                  {lo.TRANGTHAI}
                                </span>
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </td>

                    {/* Cột Nút Sửa / Lưu / Xóa */}
                    {!laThuKho && (
                      <td className="text-end">
                        {dangSua ? (
                          <div className="d-flex justify-content-end gap-1">
                            <button
                              onClick={() => xuLyLuuSua(thuoc.MATHUOC)}
                              className="btn btn-sm btn-success fw-semibold"
                            >
                              💾 Lưu
                            </button>
                            <button
                              onClick={() => setDangSuaMaThuoc(null)}
                              className="btn btn-sm btn-secondary"
                            >
                              Hủy
                            </button>
                          </div>
                        ) : (
                          <div className="d-flex justify-content-end gap-1">
                            <button
                              onClick={() => batDauSua(thuoc)}
                              className="btn btn-sm btn-outline-warning text-dark"
                            >
                              ✏️ Sửa
                            </button>
                            <button
                              onClick={() => xuLyXoaThuoc(thuoc)}
                              className="btn btn-sm btn-outline-danger"
                            >
                              🗑️ Xóa
                            </button>
                          </div>
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