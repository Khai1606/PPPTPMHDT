import React, { useState } from 'react';
import { API_URL } from '../src/App';

export default function XuatKho({ duLieu, taiLaiDuLieu, nguoiDung }: any) {
  const [maThuocChon, setMaThuocChon] = useState('');
  const [soLuongCanXuat, setSoLuongCanXuat] = useState<number>(10);
  const [ghiChu, setGhiChu] = useState('');
  const [dangXuLy, setDangXuLy] = useState(false);

  const homNay = new Date();
  homNay.setHours(0, 0, 0, 0);

  // Lọc các lô khả dụng của thuốc đang chọn và sắp xếp FEFO (NGAYHETHAN ASC)
  const cacLoKhaDungFEFO = (duLieu.LOTHUOC || [])
    .filter((lo: any) => {
      const hsd = new Date(lo.NGAYHETHAN);
      hsd.setHours(0, 0, 0, 0);
      return lo.MATHUOC === maThuocChon && lo.TRANGTHAI === 'Active' && lo.SOLUONGTON > 0 && hsd > homNay;
    })
    .sort((a: any, b: any) => new Date(a.NGAYHETHAN).getTime() - new Date(b.NGAYHETHAN).getTime());

  const tongTonKhaDung = cacLoKhaDungFEFO.reduce((tong: number, l: any) => tong + l.SOLUONGTON, 0);

  // Tính toán mô phỏng phân bổ FEFO để hiển thị xem trước trên giao diện
  let conCanLay = soLuongCanXuat > 0 ? soLuongCanXuat : 0;
  const danhSachGoiYFEFO = cacLoKhaDungFEFO.map((lo: any) => {
    const soLuongLay = Math.min(lo.SOLUONGTON, conCanLay);
    conCanLay -= soLuongLay;
    return {
      ...lo,
      soLuongLay
    };
  });

  const thuocDangChon = (duLieu.THUOC || []).find((t: any) => t.MATHUOC === maThuocChon);

  const xuLyXuatKho = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!maThuocChon || soLuongCanXuat <= 0) return;

    setDangXuLy(true);
    try {
      const res = await fetch(`${API_URL}/xuat-kho`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          maThuoc: maThuocChon,
          soLuongCanXuat,
          ghiChu,
          nguoiThucHien: nguoiDung
        })
      });

      const data = await res.json();
      if (!res.ok) return alert(data.message);

      setGhiChu('');
      await taiLaiDuLieu();
      alert(data.message);
    } finally {
      setDangXuLy(false);
    }
  };

  return (
    <div>
      <div className="mb-4">
        <h4 className="fw-bold mb-1">Xuất Kho Thuốc Theo Nguyên Tắc FEFO</h4>
        <p className="text-muted small mb-0">
          Hệ thống tự động ưu tiên xuất các lô có hạn sử dụng gần nhất (First Expired, First Out) và chặn xuất lô hết hạn[cite: 1, 2]
        </p>
      </div>

      <div className="row g-4 mb-4">
        {/* CỘT TRÁI: FORM LẬP PHIẾU XUẤT */}
        <div className="col-md-5">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-primary text-white fw-bold">
              📦 Lập Phiếu Xuất Kho Mới
            </div>
            <div className="card-body">
              <form onSubmit={xuLyXuatKho}>
                <div className="mb-3">
                  <label className="form-label small fw-semibold">Chọn Loại Thuốc Cần Xuất *</label>
                  <select
                    className="form-select"
                    value={maThuocChon}
                    onChange={(e) => setMaThuocChon(e.target.value)}
                    required
                  >
                    <option value="">-- Chọn thuốc trong danh mục --</option>
                    {(duLieu.THUOC || []).map((t: any) => (
                      <option key={t.MATHUOC} value={t.MATHUOC}>
                        {t.MATHUOC} - {t.TENTHUOC} ({t.DONVITINH})
                      </option>
                    ))}
                  </select>
                </div>

                {maThuocChon && (
                  <div className="alert alert-info py-2 small">
                    Tổng tồn kho khả dụng (chưa hết hạn/không khóa):{' '}
                    <strong>
                      {tongTonKhaDung} {thuocDangChon?.DONVITINH}
                    </strong>
                  </div>
                )}

                <div className="mb-3">
                  <label className="form-label small fw-semibold">Số Lượng Cần Xuất *</label>
                  <input
                    type="number"
                    min={1}
                    className="form-control"
                    value={soLuongCanXuat}
                    onChange={(e) => setSoLuongCanXuat(Number(e.target.value))}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label small fw-semibold">Ghi Chú Xuất Kho</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="VD: Xuất cấp phát cho khoa Nội..."
                    value={ghiChu}
                    onChange={(e) => setGhiChu(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 fw-semibold"
                  disabled={dangXuLy || !maThuocChon || soLuongCanXuat > tongTonKhaDung}
                >
                  {dangXuLy ? 'Đang xử lý xuất kho...' : '✅ Xác nhận xuất kho FEFO'}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* CỘT PHẢI: XEM TRƯỚC PHÂN BỔ LÔ FEFO */}
        <div className="col-md-7">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-white fw-bold">
              ⚡ Gợi Ý Phân Bổ Lô Tự Động (Sắp xếp Hạn sử dụng tăng dần)
            </div>
            <div className="card-body">
              {!maThuocChon ? (
                <div className="text-center text-muted py-5">
                  Vui lòng chọn loại thuốc bên trái để xem thuật toán FEFO tự động chọn lô[cite: 1, 2].
                </div>
              ) : cacLoKhaDungFEFO.length === 0 ? (
                <div className="alert alert-warning mb-0">
                  Thuốc này hiện không còn lô nào khả dụng (đã hết hàng hoặc các lô còn lại đã hết hạn/bị khóa).
                </div>
              ) : (
                <>
                  {soLuongCanXuat > tongTonKhaDung && (
                    <div className="alert alert-danger py-2 small">
                      ⚠️ Số lượng yêu cầu ({soLuongCanXuat}) vượt quá tổng tồn khả dụng ({tongTonKhaDung})!
                    </div>
                  )}

                  <div className="table-responsive">
                    <table className="table table-bordered align-middle mb-0">
                      <thead className="table-light">
                        <tr>
                          <th>Thứ Tự Ưu Tiên</th>
                          <th>Mã Lô</th>
                          <th>Hạn Sử Dụng</th>
                          <th>Tồn Hiện Tại</th>
                          <th className="text-primary">Số Lượng Sẽ Lấy</th>
                        </tr>
                      </thead>
                      <tbody>
                        {danhSachGoiYFEFO.map((lo: any, index: number) => (
                          <tr key={lo.MALO} className={lo.soLuongLay > 0 ? 'table-primary' : ''}>
                            <td className="fw-bold">#{index + 1} {index === 0 && <span className="badge bg-danger ms-1">Cận hạn nhất</span>}</td>
                            <td className="fw-bold">{lo.MALO}</td>
                            <td>{lo.NGAYHETHAN?.split('T')[0]}</td>
                            <td>{lo.SOLUONGTON}</td>
                            <td className="fw-bold text-primary fs-6">
                              {lo.soLuongLay > 0 ? `-${lo.soLuongLay}` : '0'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* LỊCH SỬ PHIẾU XUẤT KHO */}
      <div className="card border-0 shadow-sm">
        <div className="card-header bg-white fw-bold py-3">
          Lịch Sử Các Phiếu Xuất Kho Đã Thực Hiện
        </div>
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Mã Phiếu</th>
                <th>Thời Gian Xuất</th>
                <th>Người Thực Hiện</th>
                <th>Chi Tiết Các Lô Đã Xuất (FEFO)</th>
                <th>Ghi Chú</th>
              </tr>
            </thead>
            <tbody>
              {(duLieu.PHIEUXUAT || []).map((px: any) => (
                <tr key={px.MAPHIEUXUAT}>
                  <td className="fw-bold text-primary">{px.MAPHIEUXUAT}</td>
                  <td>{new Date(px.NGAYXUAT).toLocaleString('vi-VN')}</td>
                  <td>{px.MATAIKHOAN}</td>
                  <td>
                    {(px.CHITIET || []).map((ct: any, idx: number) => (
                      <span key={idx} className="badge bg-info text-dark me-1">
                        Lô {ct.MALO}: {ct.SOLUONGXUAT}
                      </span>
                    ))}
                  </td>
                  <td className="text-muted small">{px.GHICHU}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}