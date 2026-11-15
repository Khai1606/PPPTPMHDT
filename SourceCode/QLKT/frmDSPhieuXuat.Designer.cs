namespace QLKT
{
    partial class frmDSPhieuXuat
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

        #region Windows Form Designer generated code

        private void InitializeComponent()
        {
            this.pnlTop = new System.Windows.Forms.Panel();
            this.btnDong = new System.Windows.Forms.Button();
            this.lblTieuDe = new System.Windows.Forms.Label();
            this.pnlTimKiem = new System.Windows.Forms.Panel();
            this.btnLamMoi = new System.Windows.Forms.Button();
            this.btnTimKiem = new System.Windows.Forms.Button();
            this.txtMaPhieu = new System.Windows.Forms.TextBox();
            this.lblMaPhieu = new System.Windows.Forms.Label();
            this.splitContainer1 = new System.Windows.Forms.SplitContainer();
            this.dgvDanhSachXuat = new System.Windows.Forms.DataGridView();
            this.dgvChiTietXuat = new System.Windows.Forms.DataGridView();
            this.lblChiTiet = new System.Windows.Forms.Label();
            this.pnlTop.SuspendLayout();
            this.pnlTimKiem.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.splitContainer1)).BeginInit();
            this.splitContainer1.Panel1.SuspendLayout();
            this.splitContainer1.Panel2.SuspendLayout();
            this.splitContainer1.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.dgvDanhSachXuat)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.dgvChiTietXuat)).BeginInit();
            this.SuspendLayout();
            // 
            // pnlTop
            // 
            this.pnlTop.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(13)))), ((int)(((byte)(110)))), ((int)(((byte)(253)))));
            this.pnlTop.Controls.Add(this.btnDong);
            this.pnlTop.Controls.Add(this.lblTieuDe);
            this.pnlTop.Dock = System.Windows.Forms.DockStyle.Top;
            this.pnlTop.Location = new System.Drawing.Point(0, 0);
            this.pnlTop.Name = "pnlTop";
            this.pnlTop.Size = new System.Drawing.Size(984, 58);
            this.pnlTop.TabIndex = 0;
            // 
            // btnDong
            // 
            this.btnDong.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Right)));
            this.btnDong.BackColor = System.Drawing.Color.Crimson;
            this.btnDong.FlatAppearance.BorderSize = 0;
            this.btnDong.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnDong.Font = new System.Drawing.Font("Segoe UI", 9.5F, System.Drawing.FontStyle.Bold);
            this.btnDong.ForeColor = System.Drawing.Color.White;
            this.btnDong.Location = new System.Drawing.Point(872, 14);
            this.btnDong.Name = "btnDong";
            this.btnDong.Size = new System.Drawing.Size(92, 30);
            this.btnDong.TabIndex = 1;
            this.btnDong.Text = "Đóng";
            this.btnDong.UseVisualStyleBackColor = false;
            // 
            // lblTieuDe
            // 
            this.lblTieuDe.AutoSize = true;
            this.lblTieuDe.Font = new System.Drawing.Font("Segoe UI", 14F, System.Drawing.FontStyle.Bold);
            this.lblTieuDe.ForeColor = System.Drawing.Color.White;
            this.lblTieuDe.Location = new System.Drawing.Point(20, 16);
            this.lblTieuDe.Name = "lblTieuDe";
            this.lblTieuDe.Size = new System.Drawing.Size(391, 25);
            this.lblTieuDe.TabIndex = 0;
            this.lblTieuDe.Text = "📤 DANH SÁCH PHIẾU XUẤT KHO (FEFO)";
            // 
            // pnlTimKiem
            // 
            this.pnlTimKiem.BackColor = System.Drawing.Color.WhiteSmoke;
            this.pnlTimKiem.Controls.Add(this.btnLamMoi);
            this.pnlTimKiem.Controls.Add(this.btnTimKiem);
            this.pnlTimKiem.Controls.Add(this.txtMaPhieu);
            this.pnlTimKiem.Controls.Add(this.lblMaPhieu);
            this.pnlTimKiem.Dock = System.Windows.Forms.DockStyle.Top;
            this.pnlTimKiem.Location = new System.Drawing.Point(0, 58);
            this.pnlTimKiem.Name = "pnlTimKiem";
            this.pnlTimKiem.Size = new System.Drawing.Size(984, 52);
            this.pnlTimKiem.TabIndex = 1;
            // 
            // btnLamMoi
            // 
            this.btnLamMoi.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(108)))), ((int)(((byte)(117)))), ((int)(((byte)(125)))));
            this.btnLamMoi.FlatAppearance.BorderSize = 0;
            this.btnLamMoi.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnLamMoi.Font = new System.Drawing.Font("Segoe UI", 9.5F, System.Drawing.FontStyle.Bold);
            this.btnLamMoi.ForeColor = System.Drawing.Color.White;
            this.btnLamMoi.Location = new System.Drawing.Point(545, 11);
            this.btnLamMoi.Name = "btnLamMoi";
            this.btnLamMoi.Size = new System.Drawing.Size(100, 30);
            this.btnLamMoi.TabIndex = 3;
            this.btnLamMoi.Text = "Làm mới";
            this.btnLamMoi.UseVisualStyleBackColor = false;
            // 
            // btnTimKiem
            // 
            this.btnTimKiem.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(13)))), ((int)(((byte)(110)))), ((int)(((byte)(253)))));
            this.btnTimKiem.FlatAppearance.BorderSize = 0;
            this.btnTimKiem.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnTimKiem.Font = new System.Drawing.Font("Segoe UI", 9.5F, System.Drawing.FontStyle.Bold);
            this.btnTimKiem.ForeColor = System.Drawing.Color.White;
            this.btnTimKiem.Location = new System.Drawing.Point(435, 11);
            this.btnTimKiem.Name = "btnTimKiem";
            this.btnTimKiem.Size = new System.Drawing.Size(100, 30);
            this.btnTimKiem.TabIndex = 2;
            this.btnTimKiem.Text = "Tìm kiếm";
            this.btnTimKiem.UseVisualStyleBackColor = false;
            // 
            // txtMaPhieu
            // 
            this.txtMaPhieu.Font = new System.Drawing.Font("Segoe UI", 9.5F);
            this.txtMaPhieu.Location = new System.Drawing.Point(175, 14);
            this.txtMaPhieu.Name = "txtMaPhieu";
            this.txtMaPhieu.Size = new System.Drawing.Size(245, 24);
            this.txtMaPhieu.TabIndex = 1;
            // 
            // lblMaPhieu
            // 
            this.lblMaPhieu.AutoSize = true;
            this.lblMaPhieu.Font = new System.Drawing.Font("Segoe UI", 9.5F, System.Drawing.FontStyle.Bold);
            this.lblMaPhieu.Location = new System.Drawing.Point(20, 17);
            this.lblMaPhieu.Name = "lblMaPhieu";
            this.lblMaPhieu.Size = new System.Drawing.Size(145, 17);
            this.lblMaPhieu.TabIndex = 0;
            this.lblMaPhieu.Text = "Tìm mã phiếu xuất:";
            // 
            // splitContainer1
            // 
            this.splitContainer1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.splitContainer1.Location = new System.Drawing.Point(0, 110);
            this.splitContainer1.Name = "splitContainer1";
            this.splitContainer1.Orientation = System.Windows.Forms.Orientation.Horizontal;
            // 
            // splitContainer1.Panel1
            // 
            this.splitContainer1.Panel1.Controls.Add(this.dgvDanhSachXuat);
            // 
            // splitContainer1.Panel2
            // 
            this.splitContainer1.Panel2.Controls.Add(this.dgvChiTietXuat);
            this.splitContainer1.Panel2.Controls.Add(this.lblChiTiet);
            this.splitContainer1.Size = new System.Drawing.Size(984, 451);
            this.splitContainer1.SplitterDistance = 230;
            this.splitContainer1.TabIndex = 2;
            // 
            // dgvDanhSachXuat
            // 
            this.dgvDanhSachXuat.AutoSizeColumnsMode = System.Windows.Forms.DataGridViewAutoSizeColumnsMode.Fill;
            this.dgvDanhSachXuat.BackgroundColor = System.Drawing.Color.White;
            this.dgvDanhSachXuat.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.dgvDanhSachXuat.Dock = System.Windows.Forms.DockStyle.Fill;
            this.dgvDanhSachXuat.Location = new System.Drawing.Point(0, 0);
            this.dgvDanhSachXuat.Name = "dgvDanhSachXuat";
            this.dgvDanhSachXuat.RowHeadersVisible = false;
            this.dgvDanhSachXuat.Size = new System.Drawing.Size(984, 230);
            this.dgvDanhSachXuat.TabIndex = 0;
            // 
            // dgvChiTietXuat
            // 
            this.dgvChiTietXuat.AutoSizeColumnsMode = System.Windows.Forms.DataGridViewAutoSizeColumnsMode.Fill;
            this.dgvChiTietXuat.BackgroundColor = System.Drawing.Color.White;
            this.dgvChiTietXuat.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.dgvChiTietXuat.Dock = System.Windows.Forms.DockStyle.Fill;
            this.dgvChiTietXuat.Location = new System.Drawing.Point(0, 26);
            this.dgvChiTietXuat.Name = "dgvChiTietXuat";
            this.dgvChiTietXuat.RowHeadersVisible = false;
            this.dgvChiTietXuat.Size = new System.Drawing.Size(984, 191);
            this.dgvChiTietXuat.TabIndex = 1;
            // 
            // lblChiTiet
            // 
            this.lblChiTiet.BackColor = System.Drawing.Color.WhiteSmoke;
            this.lblChiTiet.Dock = System.Windows.Forms.DockStyle.Top;
            this.lblChiTiet.Font = new System.Drawing.Font("Segoe UI", 9.5F, System.Drawing.FontStyle.Bold);
            this.lblChiTiet.ForeColor = System.Drawing.Color.DarkBlue;
            this.lblChiTiet.Location = new System.Drawing.Point(0, 0);
            this.lblChiTiet.Name = "lblChiTiet";
            this.lblChiTiet.Padding = new System.Windows.Forms.Padding(12, 4, 0, 0);
            this.lblChiTiet.Size = new System.Drawing.Size(984, 26);
            this.lblChiTiet.TabIndex = 0;
            this.lblChiTiet.Text = "Chi tiết các lô thuốc xuất kho FEFO thuộc phiếu đang chọn:";
            // 
            // frmDSPhieuXuat
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(984, 561);
            this.Controls.Add(this.splitContainer1);
            this.Controls.Add(this.pnlTimKiem);
            this.Controls.Add(this.pnlTop);
            this.Name = "frmDSPhieuXuat";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "Danh sách Phiếu Xuất Kho (FEFO)";
            this.pnlTop.ResumeLayout(false);
            this.pnlTop.PerformLayout();
            this.pnlTimKiem.ResumeLayout(false);
            this.pnlTimKiem.PerformLayout();
            this.splitContainer1.Panel1.ResumeLayout(false);
            this.splitContainer1.Panel2.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)(this.splitContainer1)).EndInit();
            this.splitContainer1.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)(this.dgvDanhSachXuat)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.dgvChiTietXuat)).EndInit();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Panel pnlTop;
        private System.Windows.Forms.Button btnDong;
        private System.Windows.Forms.Label lblTieuDe;
        private System.Windows.Forms.Panel pnlTimKiem;
        private System.Windows.Forms.Button btnLamMoi;
        private System.Windows.Forms.Button btnTimKiem;
        private System.Windows.Forms.TextBox txtMaPhieu;
        private System.Windows.Forms.Label lblMaPhieu;
        private System.Windows.Forms.SplitContainer splitContainer1;
        private System.Windows.Forms.DataGridView dgvDanhSachXuat;
        private System.Windows.Forms.DataGridView dgvChiTietXuat;
        private System.Windows.Forms.Label lblChiTiet;
    }
}