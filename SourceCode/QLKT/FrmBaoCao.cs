using System;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Text;
using System.Windows.Forms;

namespace QLKT
{
    public partial class frmBaoCao : Form
    {
        public frmBaoCao()
        {
            InitializeComponent();
        }

        private void frmBaoCao_Load(object sender, EventArgs e)
        {
            cboLoaiBaoCao.SelectedIndex = 0;
            dtpTuNgay.Value = DateTime.Now.AddMonths(-1);
            dtpDenNgay.Value = DateTime.Now;
            TaiDuLieuBaoCao();
        }

        private void btnXemBaoCao_Click(object sender, EventArgs e)
        {
            TaiDuLieuBaoCao();
        }

        private void TaiDuLieuBaoCao()
        {
            string sql = "";
            int loai = cboLoaiBaoCao.SelectedIndex;

            if (loai == 0) // Tồn kho chi tiết theo FEFO
            {
                sql = @"SELECT L.MALO AS [Mã Lô], T.MATHUOC AS [Mã Thuốc], T.TENTHUOC AS [Tên Thuốc], 
                               T.DONVITINH AS [ĐVT], L.NGAYHETHAN AS [Hạn Sử Dụng], 
                               DATEDIFF(DAY, GETDATE(), L.NGAYHETHAN) AS [Số Ngày Còn Lại],
                               L.SOLUONGTON AS [Số Lượng Tồn], L.TRANGTHAI AS [Trạng Thái]
                        FROM LOTHUOC L JOIN THUOC T ON L.MATHUOC = T.MATHUOC
                        WHERE L.SOLUONGTON > 0
                        ORDER BY L.NGAYHETHAN ASC";
            }
            else if (loai == 1) // Thuốc sắp hết hạn (<= 90 ngày)
            {
                sql = @"SELECT L.MALO AS [Mã Lô], T.TENTHUOC AS [Tên Thuốc], L.NGAYHETHAN AS [Hạn Sử Dụng],
                               DATEDIFF(DAY, GETDATE(), L.NGAYHETHAN) AS [Số Ngày Còn Lại],
                               CASE WHEN DATEDIFF(DAY, GETDATE(), L.NGAYHETHAN) <= 30 THEN N'Đỏ - Nguy hiểm'
                                    ELSE N'Vàng - Cảnh báo sớm' END AS [Mức Cảnh Báo],
                               L.SOLUONGTON AS [Tồn Kho]
                        FROM LOTHUOC L JOIN THUOC T ON L.MATHUOC = T.MATHUOC
                        WHERE L.TRANGTHAI = 'Active' AND DATEDIFF(DAY, GETDATE(), L.NGAYHETHAN) BETWEEN 1 AND 90
                        ORDER BY L.NGAYHETHAN ASC";
            }
            else if (loai == 2) // Lô đã hết hạn hoặc bị khóa
            {
                sql = @"SELECT L.MALO AS [Mã Lô], T.TENTHUOC AS [Tên Thuốc], L.NGAYHETHAN AS [Hạn Sử Dụng],
                               L.SOLUONGTON AS [Số Lượng Tồn], L.TRANGTHAI AS [Trạng Thái Khóa]
                        FROM LOTHUOC L JOIN THUOC T ON L.MATHUOC = T.MATHUOC
                        WHERE L.TRANGTHAI IN ('Expired', 'Blocked') OR L.NGAYHETHAN <= GETDATE()";
            }
            else // Lịch sử xuất kho theo thời gian
            {
                sql = @"SELECT PX.MAPHIEUXUAT AS [Mã Phiếu Xuất], PX.NGAYXUAT AS [Ngày Xuất],
                               T.TENTHUOC AS [Tên Thuốc], CT.MALO AS [Mã Lô Xuất], CT.SOLUONGXUAT AS [Số Lượng Xuất],
                               PX.GHICHU AS [Ghi Chú]
                        FROM PHIEUXUAT PX
                        JOIN CHITIETPHIEUXUAT CT ON PX.MAPHIEUXUAT = CT.MAPHIEUXUAT
                        JOIN LOTHUOC L ON CT.MALO = L.MALO
                        JOIN THUOC T ON L.MATHUOC = T.MATHUOC
                        WHERE CAST(PX.NGAYXUAT AS DATE) BETWEEN @TuNgay AND @DenNgay
                        ORDER BY PX.NGAYXUAT DESC";
            }

        }

        private void btnXuatExcel_Click(object sender, EventArgs e)
        {
            if (dgvBaoCao.Rows.Count == 0)
            {
                MessageBox.Show("Không có dữ liệu để xuất!", "Thông báo", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return;
            }

            SaveFileDialog sfd = new SaveFileDialog
            {
                Filter = "Excel CSV (*.csv)|*.csv",
                FileName = $"BaoCaoKhoDuoc_{DateTime.Now:yyyyMMdd_HHmm}.csv"
            };

            if (sfd.ShowDialog() == DialogResult.OK)
            {
                StringBuilder sb = new StringBuilder();
                for (int i = 0; i < dgvBaoCao.Columns.Count; i++)
                {
                    sb.Append(dgvBaoCao.Columns[i].HeaderText + (i < dgvBaoCao.Columns.Count - 1 ? "," : ""));
                }
                sb.AppendLine();

                foreach (DataGridViewRow row in dgvBaoCao.Rows)
                {
                    for (int i = 0; i < dgvBaoCao.Columns.Count; i++)
                    {
                        sb.Append("\"" + row.Cells[i].Value?.ToString().Replace("\"", "\"\"") + "\"" + (i < dgvBaoCao.Columns.Count - 1 ? "," : ""));
                    }
                    sb.AppendLine();
                }

                File.WriteAllText(sfd.FileName, sb.ToString(), Encoding.UTF8);
                MessageBox.Show("Xuất báo cáo Excel thành công!", "Hoàn tất", MessageBoxButtons.OK, MessageBoxIcon.Information);
            }
        }
    }
}