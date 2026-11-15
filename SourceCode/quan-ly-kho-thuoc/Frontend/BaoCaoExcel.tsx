import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { API_URL } from '../src/App';

export default function BaoCaoExcel({ duLieu, taiLaiDuLieu, nguoiDung }: any) {
  const laQuanLy = nguoiDung?.VAITRO === 'QuanLyKho';
  const [boLocCanhBao, setBoLocCanhBao] = useState<'ALL' | 'CAN_HAN' | 'HET_HAN'>('ALL');

  if (!laQuanLy) {
    return (
      <div className="alert alert-danger shadow-sm">
        ⛔ Chỉ tài khoản <strong>Quản lý kho</strong> mới có quyền truy cập phân hệ Báo cáo & Kết xuất Excel.
      </div>
    );
  }

  const tinhSoNgayConLai = (ngayHetHan: string) => {
    const homNay = new Date();
    homNay.setHours(0, 0, 0, 0);
    const hanDung = new Date(ngayHetHan);
    hanDung.setHours(0, 0, 0, 0);
    return Math.ceil((hanDung.getTime() - homNay.getTime()) / (1000 * 60 * 60 * 24));
  };

  const layTenThuoc = (maThuoc: string) => {
    const t = (duLieu.THUOC || []).find((item: any) => item.MATHUOC === maThuoc);
    return t ? { ten: t.TENTHUOC, dvt: t.DONVITINH } : { ten: maThuoc, dvt: '' };
  };

  const layTenTaiKhoan = (maTK: string) => {
    if (!maTK) return '—';
    const tk = (duLieu.TAIKHOAN || []).find((u: any) => u.MATAIKHOAN === maTK);
    return tk ? `${tk.HOTEN} (${tk.MATAIKHOAN})` : maTK;
  };

  const ghiLogBaoCao = async (loaiBaoCao: string) => {
    try {
      await fetch(`${API_URL}/bao-cao/ghi-log`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ loaiBaoCao, nguoiThucHien: nguoiDung })
      });
      await taiLaiDuLieu();
    } catch (e) {
      console.error(e);
    }
  };

  const dsLoDaXuLy = (duLieu.LOTHUOC || [])
    .map((lo: any) => {
      const thuoc = layTenThuoc(lo.MATHUOC);
      const soNgay = tinhSoNgayConLai(lo.NGAYHETHAN);
      let mucCanhBao = 'An toàn (> 90 ngày)';
      if (lo.TRANGTHAI !== 'Active' || soNgay <= 0) mucCanhBao = 'Hết hạn / Khóa xuất';
      else if (soNgay <= 30) mucCanhBao = 'Cận hạn nguy hiểm (≤ 30 ngày)';
      else if (soNgay <= 90) mucCanhBao = 'Cảnh báo sớm (≤ 90 ngày)';

      return {
        ...lo,
        TENTHUOC: thuoc.ten,
        DONVITINH: thuoc.dvt,
        soNgay,
        mucCanhBao
      };
    })
    .filter((lo: any) => {
      if (boLocCanhBao === 'CAN_HAN') return lo.TRANGTHAI === 'Active' && lo.soNgay > 0 && lo.soNgay <= 90;
      if (boLocCanhBao === 'HET_HAN') return lo.TRANGTHAI !== 'Active' || lo.soNgay <= 0;
      return true;
    });

  // 1. Xuất Excel Tồn kho & Cảnh báo Hạn dùng
  const xuatExcelCanhBao = async () => {
    const rows = dsLoDaXuLy.map((lo: any, index: number) => ({
      'STT': index + 1,
      'Mã Lô': lo.MALO,
      'Mã Thuốc': lo.MATHUOC,
      'Tên Thuốc': lo.TENTHUOC,
      'Đơn Vị Tính': lo.DONVITINH,
      'Ngày Sản Xuất': lo.NGAYSANXUAT ? String(lo.NGAYSANXUAT).slice(0, 10) : '',
      'Hạn Sử Dụng': lo.NGAYHETHAN ? String(lo.NGAYHETHAN).slice(0, 10) : '',
      'Số Ngày Còn Lại': lo.soNgay > 0 ? lo.soNgay : `Quá hạn ${Math.abs(lo.soNgay)} ngày`,
      'Số Lượng Tồn': lo.SOLUONGTON,
      'Trạng Thái Lô': lo.TRANGTHAI,
      'Mức Cảnh Báo Hạn Dùng': lo.mucCanhBao
    }));

    const ws = XLSX.utils.json_to_sheet(rows);
    ws['!cols'] = [
      { wch: 6 }, { wch: 12 }, { wch: 12 }, { wch: 26 }, { wch: 12 },
      { wch: 15 }, { wch: 15 }, { wch: 20 }, { wch: 15 }, { wch: 15 }, { wch: 28 }
    ];
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'TonKho_CanhBaoHSD');

    const ngayHomNay = new Date().toISOString().slice(0, 10);
    XLSX.writeFile(wb, `BaoCao_TonKho_CanhBaoHSD_${ngayHomNay}.xlsx`);
    await ghiLogBaoCao(`Báo cáo Tồn kho & Cảnh báo HSD (${dsLoDaXuLy.length} lô)`);
  };

  // 2. Xuất Excel Lịch sử Xuất kho FEFO
  const xuatExcelXuatKho = async () => {
    const rows = (duLieu.PHIEUXUAT || []).map((px: any, index: number) => {
      const chiTietStr = (px.CHITIET || [])
        .map((ct: any) => `Lô ${ct.MALO} (SL: ${ct.SOLUONGXUAT})`)
        .join(', ');
      return {
        'STT': index + 1,
        'Mã Phiếu Xuất': px.MAPHIEUXUAT,
        'Thời Gian Xuất': px.NGAYXUAT ? new Date(px.NGAYXUAT).toLocaleString('vi-VN') : '',
        'Người Thực Hiện': layTenTaiKhoan(px.MATAIKHOAN),
        'Chi Tiết Lô Xuất (FEFO)': chiTietStr,
        'Ghi Chú': px.GHICHU || ''
      };
    });

    const ws = XLSX.utils.json_to_sheet(rows);
    ws['!cols'] = [{ wch: 6 }, { wch: 18 }, { wch: 22 }, { wch: 24 }, { wch: 35 }, { wch: 35 }];
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'LichSu_XuatKho_FEFO');

    const ngayHomNay = new Date().toISOString().slice(0, 10);
    XLSX.writeFile(wb, `BaoCao_XuatKho_FEFO_${ngayHomNay}.xlsx`);
    await ghiLogBaoCao(`Báo cáo Lịch sử Xuất kho FEFO (${rows.length} phiếu)`);
  };

  // 3. Xuất Excel Kiểm kê & Nhật ký Bất biến (2 Sheet)
  const xuatExcelKiemKeVaAudit = async () => {
    const rowsDieuChinh = (duLieu.PHIEUDIEUCHINH || []).map((p: any, index: number) => ({
      'STT': index + 1,
      'Mã Phiếu': p.MAPHIEU,
      'Ngày Lập': p.NGAYLAP ? new Date(p.NGAYLAP).toLocaleString('vi-VN') : '',
      'Người Lập (Thủ kho)': layTenTaiKhoan(p.NGUOILAPID),
      'Mã Lô': p.MALO,
      'Tồn Sổ Sách': p.SOLUONGTONSOSACH,
      'Tồn Thực Tế': p.SOLUONGTONTHUCTE,
      'Chênh Lệch': p.CHENHLECH,
      'Lý Do Kiểm Kê': p.LYDODIEUCHINH,
      'Trạng Thái': p.TRANGTHAI,
      'Người Duyệt (Quản lý)': layTenTaiKhoan(p.NGUOIDUYETID),
      'Lý Do Từ Chối': p.LYDOTUCHOI || ''
    }));

    const rowsAudit = (duLieu.NHATKYHOATDONG || []).map((log: any, index: number) => ({
      'STT': index + 1,
      'Mã Log': log.MALOG,
      'Thời Gian': log.THOIGIAN ? new Date(log.THOIGIAN).toLocaleString('vi-VN') : '',
      'Người Thực Hiện': layTenTaiKhoan(log.MATAIKHOAN),
      'Hành Động': log.HANHDONG,
      'Đối Tượng': log.DOITUONGTACDONG,
      'Chi Tiết Nghiệp Vụ': log.CHITIET
    }));

    const wb = XLSX.utils.book_new();
    const ws1 = XLSX.utils.json_to_sheet(rowsDieuChinh);
    ws1['!cols'] = [
      { wch: 6 }, { wch: 16 }, { wch: 20 }, { wch: 22 }, { wch: 10 },
      { wch: 14 }, { wch: 14 }, { wch: 12 }, { wch: 30 }, { wch: 14 }, { wch: 22 }, { wch: 25 }
    ];
    const ws2 = XLSX.utils.json_to_sheet(rowsAudit);
    ws2['!cols'] = [
      { wch: 6 }, { wch: 18 }, { wch: 20 }, { wch: 22 }, { wch: 25 }, { wch: 20 }, { wch: 55 }
    ];

    XLSX.utils.book_append_sheet(wb, ws1, 'Phieu_Dieu_Chinh_Kho');
    XLSX.utils.book_append_sheet(wb, ws2, 'Nhat_Ky_Bat_Bien_AuditLog');

    const ngayHomNay = new Date().toISOString().slice(0, 10);
    XLSX.writeFile(wb, `BaoCao_KiemKe_AuditLog_${ngayHomNay}.xlsx`);
    await ghiLogBaoCao('Báo cáo Kiểm kê Điều chỉnh & Nhật ký Bất biến (Audit Log)');
  };

  return (
    <div>
      <div className="mb-4">
        <h4 className="fw-bold mb-1">Kết Xuất Báo Cáo Kho Thuốc (Excel .xlsx)</h4>
        <p className="text-muted small mb-0">
          Xuất dữ liệu trực tiếp từ SQL Server ra file Excel phục vụ kiểm kê, thanh tra và báo cáo định kỳ
        </p>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body d-flex flex-column">
              <span className="badge bg-success-subtle text-success align-self-start mb-2">Biểu mẫu BM-01</span>
              <h6 className="fw-bold">1. Báo cáo Tồn kho & Cảnh báo HSD</h6>
              <p className="text-muted small flex-grow-1">
                Danh sách chi tiết từng lô thuốc, số ngày còn lại, tồn kho và phân loại cảnh báo Xanh / Vàng / Đỏ.
              </p>
              <button onClick={xuatExcelCanhBao} className="btn btn-success fw-semibold w-100">
                📥 Xuất Excel Tồn kho & HSD
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body d-flex flex-column">
              <span className="badge bg-primary-subtle text-primary align-self-start mb-2">Biểu mẫu BM-02</span>
              <h6 className="fw-bold">2. Báo cáo Lịch sử Xuất kho FEFO</h6>
              <p className="text-muted small flex-grow-1">
                Tổng hợp toàn bộ phiếu xuất kho, người lập và chi tiết các lô đã phân bổ theo hạn sử dụng gần nhất.
              </p>
              <button onClick={xuatExcelXuatKho} className="btn btn-primary fw-semibold w-100">
                📥 Xuất Excel Xuất kho FEFO
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body d-flex flex-column">
              <span className="badge bg-warning-subtle text-dark align-self-start mb-2">Biểu mẫu BM-03 (2 Sheets)</span>
              <h6 className="fw-bold">3. Báo cáo Kiểm kê & Nhật ký Audit Log</h6>
              <p className="text-muted small flex-grow-1">
                Xuất đồng thời 2 sheet: Danh sách phiếu duyệt điều chỉnh 2 bước và toàn bộ Nhật ký bất biến hệ thống.
              </p>
              <button onClick={xuatExcelKiemKeVaAudit} className="btn btn-warning fw-semibold w-100">
                📥 Xuất Excel Kiểm kê & Audit
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center flex-wrap gap-2">
          <span className="fw-bold">Xem Trước Dữ Liệu Tồn Kho & Cảnh Báo ({dsLoDaXuLy.length} lô)</span>
          <div className="btn-group btn-group-sm">
            <button
              className={`btn ${boLocCanhBao === 'ALL' ? 'btn-dark' : 'btn-outline-dark'}`}
              onClick={() => setBoLocCanhBao('ALL')}
            >
              Tất cả lô
            </button>
            <button
              className={`btn ${boLocCanhBao === 'CAN_HAN' ? 'btn-warning' : 'btn-outline-warning text-dark'}`}
              onClick={() => setBoLocCanhBao('CAN_HAN')}
            >
              Cận hạn (≤ 90 ngày)
            </button>
            <button
              className={`btn ${boLocCanhBao === 'HET_HAN' ? 'btn-danger' : 'btn-outline-danger'}`}
              onClick={() => setBoLocCanhBao('HET_HAN')}
            >
              Hết hạn / Đã khóa
            </button>
          </div>
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
              </tr>
            </thead>
            <tbody>
              {dsLoDaXuLy.map((lo: any) => (
                <tr key={lo.MALO}>
                  <td className="fw-bold text-primary">{lo.MALO}</td>
                  <td>{lo.TENTHUOC}</td>
                  <td>{String(lo.NGAYHETHAN).slice(0, 10)}</td>
                  <td>{lo.soNgay > 0 ? `${lo.soNgay} ngày` : `Quá hạn ${Math.abs(lo.soNgay)} ngày`}</td>
                  <td className="fw-semibold">{lo.SOLUONGTON} {lo.DONVITINH}</td>
                  <td>
                    <span className={`badge ${
                      lo.TRANGTHAI !== 'Active' || lo.soNgay <= 0 ? 'bg-dark' :
                      lo.soNgay <= 30 ? 'bg-danger' :
                      lo.soNgay <= 90 ? 'bg-warning text-dark' : 'bg-success'
                    }`}>
                      {lo.mucCanhBao}
                    </span>
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