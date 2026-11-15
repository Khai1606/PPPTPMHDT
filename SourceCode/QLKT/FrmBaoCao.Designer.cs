namespace QLKT
{
    partial class frmBaoCao
    {
        private System.ComponentModel.IContainer components = null;

        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        private void InitializeComponent()
        {
            this.pnlTop = new System.Windows.Forms.Panel();
            this.lblTieuDe = new System.Windows.Forms.Label();
            this.grpBoLoc = new System.Windows.Forms.GroupBox();
            this.lblLoaiBaoCao = new System.Windows.Forms.Label();
            this.cboLoaiBaoCao = new System.Windows.Forms.ComboBox();
            this.lblTuNgay = new System.Windows.Forms.Label();
            this.dtpTuNgay = new System.Windows.Forms.DateTimePicker();
            this.lblDenNgay = new System.Windows.Forms.Label();
            this.dtpDenNgay = new System.Windows.Forms.DateTimePicker();
            this.btnXemBaoCao = new System.Windows.Forms.Button();
            this.btnXuatExcel = new System.Windows.Forms.Button();
            this.dgvBaoCao = new System.Windows.Forms.DataGridView();
            this.pnlBottom = new System.Windows.Forms.Panel();
            this.lblTongSoDong = new System.Windows.Forms.Label();
            this.lblTongSoLuong = new System.Windows.Forms.Label();
            this.pnlTop.SuspendLayout();
            this.grpBoLoc.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.dgvBaoCao)).BeginInit();
            this.pnlBottom.SuspendLayout();
            this.SuspendLayout();

            // pnlTop
            this.pnlTop.BackColor = System.Drawing.Color.FromArgb(13, 110, 253);
            this.pnlTop.Controls.Add(this.lblTieuDe);
            this.pnlTop.Dock = System.Windows.Forms.DockStyle.Top;
            this.pnlTop.Location = new System.Drawing.Point(0, 0);
            this.pnlTop.Name = "pnlTop";
            this.pnlTop.Size = new System.Drawing.Size(1020, 55);

            // lblTieuDe
            this.lblTieuDe.AutoSize = true;
            this.lblTieuDe.Font = new System.Drawing.Font("Segoe UI", 14F, System.Drawing.FontStyle.Bold);
            this.lblTieuDe.ForeColor = System.Drawing.Color.White;
            this.lblTieuDe.Location = new System.Drawing.Point(20, 14);
            this.lblTieuDe.Name = "lblTieuDe";
            this.lblTieuDe.Text = "BÁO CÁO THỐNG KÊ TỒN KHO & CẢNH BÁO HẠN DÙNG (HLT-03)";

            // grpBoLoc
            this.grpBoLoc.Controls.Add(this.btnXuatExcel);
            this.grpBoLoc.Controls.Add(this.btnXemBaoCao);
            this.grpBoLoc.Controls.Add(this.dtpDenNgay);
            this.grpBoLoc.Controls.Add(this.lblDenNgay);
            this.grpBoLoc.Controls.Add(this.dtpTuNgay);
            this.grpBoLoc.Controls.Add(this.lblTuNgay);
            this.grpBoLoc.Controls.Add(this.cboLoaiBaoCao);
            this.grpBoLoc.Controls.Add(this.lblLoaiBaoCao);
            this.grpBoLoc.Dock = System.Windows.Forms.DockStyle.Top;
            this.grpBoLoc.Font = new System.Drawing.Font("Segoe UI", 10F);
            this.grpBoLoc.Location = new System.Drawing.Point(0, 55);
            this.grpBoLoc.Name = "grpBoLoc";
            this.grpBoLoc.Size = new System.Drawing.Size(1020, 85);
            this.grpBoLoc.TabStop = false;
            this.grpBoLoc.Text = "Tùy chọn tiêu chí kết xuất báo cáo";

            // lblLoaiBaoCao
            this.lblLoaiBaoCao.AutoSize = true;
            this.lblLoaiBaoCao.Location = new System.Drawing.Point(20, 38);
            this.lblLoaiBaoCao.Text = "Loại báo cáo:";

            // cboLoaiBaoCao
            this.cboLoaiBaoCao.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.cboLoaiBaoCao.Items.AddRange(new object[] {
                "1. Báo cáo Tồn kho chi tiết theo Lô (Chuẩn FEFO)",
                "2. Báo cáo Thuốc Sắp hết hạn (Vàng <= 90 ngày & Đỏ <= 30 ngày)",
                "3. Báo cáo Lô thuốc Đã hết hạn / Tạm khóa (Expired & Blocked)",
                "4. Báo cáo Lịch sử Xuất kho theo thời gian"
            });
            this.cboLoaiBaoCao.Location = new System.Drawing.Point(115, 34);
            this.cboLoaiBaoCao.Name = "cboLoaiBaoCao";
            this.cboLoaiBaoCao.Size = new System.Drawing.Size(340, 25);

            // lblTuNgay
            this.lblTuNgay.AutoSize = true;
            this.lblTuNgay.Location = new System.Drawing.Point(470, 38);
            this.lblTuNgay.Text = "Từ ngày:";

            // dtpTuNgay
            this.dtpTuNgay.Format = System.Windows.Forms.DateTimePickerFormat.Short;
            this.dtpTuNgay.Location = new System.Drawing.Point(535, 34);
            this.dtpTuNgay.Name = "dtpTuNgay";
            this.dtpTuNgay.Size = new System.Drawing.Size(110, 25);

            // lblDenNgay
            this.lblDenNgay.AutoSize = true;
            this.lblDenNgay.Location = new System.Drawing.Point(655, 38);
            this.lblDenNgay.Text = "Đến:";

            // dtpDenNgay
            this.dtpDenNgay.Format = System.Windows.Forms.DateTimePickerFormat.Short;
            this.dtpDenNgay.Location = new System.Drawing.Point(695, 34);
            this.dtpDenNgay.Name = "dtpDenNgay";
            this.dtpDenNgay.Size = new System.Drawing.Size(110, 25);

            // btnXemBaoCao
            this.btnXemBaoCao.BackColor = System.Drawing.Color.FromArgb(13, 110, 253);
            this.btnXemBaoCao.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnXemBaoCao.Font = new System.Drawing.Font("Segoe UI", 9.5F, System.Drawing.FontStyle.Bold);
            this.btnXemBaoCao.ForeColor = System.Drawing.Color.White;
            this.btnXemBaoCao.Location = new System.Drawing.Point(815, 30);
            this.btnXemBaoCao.Name = "btnXemBaoCao";
            this.btnXemBaoCao.Size = new System.Drawing.Size(90, 32);
            this.btnXemBaoCao.Text = "Xem BC";
            this.btnXemBaoCao.Click += new System.EventHandler(this.btnXemBaoCao_Click);

            // btnXuatExcel
            this.btnXuatExcel.BackColor = System.Drawing.Color.FromArgb(25, 135, 84);
            this.btnXuatExcel.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnXuatExcel.Font = new System.Drawing.Font("Segoe UI", 9.5F, System.Drawing.FontStyle.Bold);
            this.btnXuatExcel.ForeColor = System.Drawing.Color.White;
            this.btnXuatExcel.Location = new System.Drawing.Point(912, 30);
            this.btnXuatExcel.Name = "btnXuatExcel";
            this.btnXuatExcel.Size = new System.Drawing.Size(95, 32);
            this.btnXuatExcel.Text = "Xuất Excel";
            this.btnXuatExcel.Click += new System.EventHandler(this.btnXuatExcel_Click);

            // dgvBaoCao
            this.dgvBaoCao.AllowUserToAddRows = false;
            this.dgvBaoCao.AutoSizeColumnsMode = System.Windows.Forms.DataGridViewAutoSizeColumnsMode.Fill;
            this.dgvBaoCao.BackgroundColor = System.Drawing.Color.White;
            this.dgvBaoCao.Dock = System.Windows.Forms.DockStyle.Fill;
            this.dgvBaoCao.Location = new System.Drawing.Point(0, 140);
            this.dgvBaoCao.Name = "dgvBaoCao";
            this.dgvBaoCao.ReadOnly = true;
            this.dgvBaoCao.RowHeadersVisible = false;
            this.dgvBaoCao.SelectionMode = System.Windows.Forms.DataGridViewSelectionMode.FullRowSelect;
            this.dgvBaoCao.Size = new System.Drawing.Size(1020, 415);

            // pnlBottom
            this.pnlBottom.BackColor = System.Drawing.Color.FromArgb(248, 249, 250);
            this.pnlBottom.Controls.Add(this.lblTongSoLuong);
            this.pnlBottom.Controls.Add(this.lblTongSoDong);
            this.pnlBottom.Dock = System.Windows.Forms.DockStyle.Bottom;
            this.pnlBottom.Location = new System.Drawing.Point(0, 555);
            this.pnlBottom.Name = "pnlBottom";
            this.pnlBottom.Size = new System.Drawing.Size(1020, 45);

            // lblTongSoDong
            this.lblTongSoDong.AutoSize = true;
            this.lblTongSoDong.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Bold);
            this.lblTongSoDong.Location = new System.Drawing.Point(20, 13);
            this.lblTongSoDong.Text = "Tổng số bản ghi: 0";

            // lblTongSoLuong
            this.lblTongSoLuong.AutoSize = true;
            this.lblTongSoLuong.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Bold);
            this.lblTongSoLuong.ForeColor = System.Drawing.Color.FromArgb(220, 53, 69);
            this.lblTongSoLuong.Location = new System.Drawing.Point(320, 13);
            this.lblTongSoLuong.Text = "Tổng số lượng thống kê: 0";

            // frmBaoCao
            this.ClientSize = new System.Drawing.Size(1020, 600);
            this.Controls.Add(this.dgvBaoCao);
            this.Controls.Add(this.pnlBottom);
            this.Controls.Add(this.grpBoLoc);
            this.Controls.Add(this.pnlTop);
            this.Name = "frmBaoCao";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "Báo cáo thống kê kho dược - HLT-03";
            this.Load += new System.EventHandler(this.frmBaoCao_Load);
            this.pnlTop.ResumeLayout(false);
            this.pnlTop.PerformLayout();
            this.grpBoLoc.ResumeLayout(false);
            this.grpBoLoc.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)(this.dgvBaoCao)).EndInit();
            this.pnlBottom.ResumeLayout(false);
            this.pnlBottom.PerformLayout();
            this.ResumeLayout(false);
        }

        private System.Windows.Forms.Panel pnlTop;
        private System.Windows.Forms.Label lblTieuDe;
        private System.Windows.Forms.GroupBox grpBoLoc;
        private System.Windows.Forms.Label lblLoaiBaoCao;
        private System.Windows.Forms.ComboBox cboLoaiBaoCao;
        private System.Windows.Forms.Label lblTuNgay;
        private System.Windows.Forms.DateTimePicker dtpTuNgay;
        private System.Windows.Forms.Label lblDenNgay;
        private System.Windows.Forms.DateTimePicker dtpDenNgay;
        private System.Windows.Forms.Button btnXemBaoCao;
        private System.Windows.Forms.Button btnXuatExcel;
        private System.Windows.Forms.DataGridView dgvBaoCao;
        private System.Windows.Forms.Panel pnlBottom;
        private System.Windows.Forms.Label lblTongSoDong;
        private System.Windows.Forms.Label lblTongSoLuong;
    }
}