using QLKT;
using System;
using System.Windows.Forms;

namespace QuanLyKhoThuoc
{
    public partial class frmMain : Form
    {
        private string _hoTen;
        private string _vaiTro;

        public frmMain(string hoTen = "Nhân viên kho", string vaiTro = "ThuKho")
        {
            InitializeComponent();
            _hoTen = hoTen;
            _vaiTro = vaiTro;
        }

        private void frmMain_Load(object sender, EventArgs e)
        {
            string tenVaiTro = (_vaiTro == "QuanLyKho") ? "Quản lý kho" : "Thủ kho";
            lblThongTinUser.Text = $"Xin chào: {_hoTen} ({tenVaiTro})";

            // Nếu là Thủ kho thì ẩn ô Quản lý & Audit Log
            if (_vaiTro == "ThuKho")
            {
                btnQuanLy.Visible = false;
            }
        }

        // Hàm mở form con dạng cửa sổ độc lập, đóng form con sẽ quay lại frmMain
        private void ChuyenSangForm(Form formDich)
        {
            this.Hide();
            formDich.StartPosition = FormStartPosition.CenterScreen;
            formDich.ShowDialog();
            this.Show();
        }

        private void btnCanhBao_Click(object sender, EventArgs e)
        {
            ChuyenSangForm(new frmCanhBao());
        }

        private void btnLoThuoc_Click(object sender, EventArgs e)
        {
            ChuyenSangForm(new frmLoThuoc());
        }

        private void btnPhieuNhap_Click(object sender, EventArgs e)
        {
            ChuyenSangForm(new frmPhieuNhap());
        }

        private void btnPhieuXuat_Click(object sender, EventArgs e)
        {
            ChuyenSangForm(new frmPhieuXuat());
        }

        private void btnKiemKe_Click(object sender, EventArgs e)
        {
            ChuyenSangForm(new frmKiemKe());
        }

        private void btnQuanLy_Click(object sender, EventArgs e)
        {
            ChuyenSangForm(new frmQuanLy());
        }

        private void btnDangXuat_Click(object sender, EventArgs e)
        {
            if (MessageBox.Show("Bạn muốn đăng xuất khỏi hệ thống?", "Xác nhận", MessageBoxButtons.YesNo, MessageBoxIcon.Question) == DialogResult.Yes)
            {
                this.Hide();
                Frmdangnhap fLogin = new Frmdangnhap();
                fLogin.ShowDialog();
                this.Close();
            }
        }
    }
}