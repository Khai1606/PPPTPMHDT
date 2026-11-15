using System;
using System.Data;
using System.Data.SqlClient;
using System.Windows.Forms;

namespace QuanLyKhoThuoc
{
    public partial class frmNhatKy : Form
    {
        // Đổi lại chuỗi kết nối theo máy của em nếu cần
        private string strConn = @"Data Source=.;Initial Catalog=QuanLyKhoThuoc;Integrated Security=True";

        public frmNhatKy()
        {
            InitializeComponent();
        }

        private void frmNhatKy_Load(object sender, EventArgs e)
        {
            cboHanhDong.SelectedIndex = 0;
            TaiDuLieuNhatKy();
        }

        private void TaiDuLieuNhatKy(string tuKhoa = "", string hanhDong = "")
        {
            try
            {
                using (SqlConnection conn = new SqlConnection(strConn))
                {
                    conn.Open();
                    string query = @"
                        SELECT 
                            nk.MALOG AS [Mã Log],
                            nk.THOIGIAN AS [Thời gian],
                            tk.HOTEN + ' (' + tk.VAITRO + ')' AS [Người thực hiện],
                            nk.HANHDONG AS [Hành động],
                            nk.DOITUONGTACDONG AS [Đối tượng],
                            nk.CHITIET AS [Chi tiết tác động]
                        FROM NHATKYHOATDONG nk
                        LEFT JOIN TAIKHOAN tk ON nk.MATAIKHOAN = tk.MATAIKHOAN
                        WHERE 1=1 ";

                    if (!string.IsNullOrWhiteSpace(tuKhoa))
                    {
                        query += " AND (nk.CHITIET LIKE @TuKhoa OR nk.DOITUONGTACDONG LIKE @TuKhoa OR tk.HOTEN LIKE @TuKhoa) ";
                    }
                    if (!string.IsNullOrWhiteSpace(hanhDong) && hanhDong != "-- Tất cả hành động --")
                    {
                        query += " AND nk.HANHDONG LIKE @HanhDong ";
                    }

                    query += " ORDER BY nk.THOIGIAN DESC";

                    SqlCommand cmd = new SqlCommand(query, conn);
                    if (!string.IsNullOrWhiteSpace(tuKhoa))
                        cmd.Parameters.AddWithValue("@TuKhoa", "%" + tuKhoa.Trim() + "%");
                    if (!string.IsNullOrWhiteSpace(hanhDong) && hanhDong != "-- Tất cả hành động --")
                        cmd.Parameters.AddWithValue("@HanhDong", "%" + hanhDong + "%");

                    SqlDataAdapter da = new SqlDataAdapter(cmd);
                    DataTable dt = new DataTable();
                    da.Fill(dt);
                    dgvNhatKy.DataSource = dt;
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("Lỗi tải nhật ký hoạt động: " + ex.Message, "Thông báo", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        private void btnLoc_Click(object sender, EventArgs e)
        {
            TaiDuLieuNhatKy(txtTimKiem.Text, cboHanhDong.Text);
        }

        private void btnLamMoi_Click(object sender, EventArgs e)
        {
            txtTimKiem.Clear();
            cboHanhDong.SelectedIndex = 0;
            TaiDuLieuNhatKy();
        }

        private void btnDong_Click(object sender, EventArgs e)
        {
            this.Close();
        }
    }
}