namespace QLKT
{
    partial class frmDanhMucThuoc
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
            this.grpNhapLieu = new System.Windows.Forms.GroupBox();
            this.btnLamMoi = new System.Windows.Forms.Button();
            this.btnXoa = new System.Windows.Forms.Button();
            this.btnSua = new System.Windows.Forms.Button();
            this.btnThem = new System.Windows.Forms.Button();
            this.txtMoTa = new System.Windows.Forms.TextBox();
            this.lblMoTa = new System.Windows.Forms.Label();
            this.cboNhomThuoc = new System.Windows.Forms.ComboBox();
            this.lblNhomThuoc = new System.Windows.Forms.Label();
            this.cboDonViTinh = new System.Windows.Forms.ComboBox();
            this.lblDonViTinh = new System.Windows.Forms.Label();
            this.txtTenThuoc = new System.Windows.Forms.TextBox();
            this.lblTenThuoc = new System.Windows.Forms.Label();
            this.txtMaThuoc = new System.Windows.Forms.TextBox();
            this.lblMaThuoc = new System.Windows.Forms.Label();
            this.dgvDanhMucThuoc = new System.Windows.Forms.DataGridView();
            this.pnlTop.SuspendLayout();
            this.grpNhapLieu.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.dgvDanhMucThuoc)).BeginInit();
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
            this.lblTieuDe.Size = new System.Drawing.Size(427, 25);
            this.lblTieuDe.TabIndex = 0;
            this.lblTieuDe.Text = " QUẢN LÝ DANH MỤC THUỐC";
            // 
            // grpNhapLieu
            // 
            this.grpNhapLieu.BackColor = System.Drawing.Color.WhiteSmoke;
            this.grpNhapLieu.Controls.Add(this.btnLamMoi);
            this.grpNhapLieu.Controls.Add(this.btnXoa);
            this.grpNhapLieu.Controls.Add(this.btnSua);
            this.grpNhapLieu.Controls.Add(this.btnThem);
            this.grpNhapLieu.Controls.Add(this.txtMoTa);
            this.grpNhapLieu.Controls.Add(this.lblMoTa);
            this.grpNhapLieu.Controls.Add(this.cboNhomThuoc);
            this.grpNhapLieu.Controls.Add(this.lblNhomThuoc);
            this.grpNhapLieu.Controls.Add(this.cboDonViTinh);
            this.grpNhapLieu.Controls.Add(this.lblDonViTinh);
            this.grpNhapLieu.Controls.Add(this.txtTenThuoc);
            this.grpNhapLieu.Controls.Add(this.lblTenThuoc);
            this.grpNhapLieu.Controls.Add(this.txtMaThuoc);
            this.grpNhapLieu.Controls.Add(this.lblMaThuoc);
            this.grpNhapLieu.Dock = System.Windows.Forms.DockStyle.Top;
            this.grpNhapLieu.Font = new System.Drawing.Font("Segoe UI", 9.5F, System.Drawing.FontStyle.Bold);
            this.grpNhapLieu.Location = new System.Drawing.Point(0, 58);
            this.grpNhapLieu.Name = "grpNhapLieu";
            this.grpNhapLieu.Size = new System.Drawing.Size(984, 155);
            this.grpNhapLieu.TabIndex = 1;
            this.grpNhapLieu.TabStop = false;
            this.grpNhapLieu.Text = "Thông tin chi tiết mặt hàng thuốc";
            // 
            // lblMaThuoc
            // 
            this.lblMaThuoc.AutoSize = true;
            this.lblMaThuoc.Location = new System.Drawing.Point(22, 34);
            this.lblMaThuoc.Name = "lblMaThuoc";
            this.lblMaThuoc.Size = new System.Drawing.Size(73, 17);
            this.lblMaThuoc.TabIndex = 0;
            this.lblMaThuoc.Text = "Mã thuốc:";
            // 
            // txtMaThuoc
            // 
            this.txtMaThuoc.Font = new System.Drawing.Font("Segoe UI", 9.5F);
            this.txtMaThuoc.Location = new System.Drawing.Point(110, 31);
            this.txtMaThuoc.Name = "txtMaThuoc";
            this.txtMaThuoc.Size = new System.Drawing.Size(160, 24);
            this.txtMaThuoc.TabIndex = 1;
            // 
            // lblTenThuoc
            // 
            this.lblTenThuoc.AutoSize = true;
            this.lblTenThuoc.Location = new System.Drawing.Point(300, 34);
            this.lblTenThuoc.Name = "lblTenThuoc";
            this.lblTenThuoc.Size = new System.Drawing.Size(76, 17);
            this.lblTenThuoc.TabIndex = 2;
            this.lblTenThuoc.Text = "Tên thuốc:";
            // 
            // txtTenThuoc
            // 
            this.txtTenThuoc.Font = new System.Drawing.Font("Segoe UI", 9.5F);
            this.txtTenThuoc.Location = new System.Drawing.Point(390, 31);
            this.txtTenThuoc.Name = "txtTenThuoc";
            this.txtTenThuoc.Size = new System.Drawing.Size(270, 24);
            this.txtTenThuoc.TabIndex = 3;
            // 
            // lblDonViTinh
            // 
            this.lblDonViTinh.AutoSize = true;
            this.lblDonViTinh.Location = new System.Drawing.Point(690, 34);
            this.lblDonViTinh.Name = "lblDonViTinh";
            this.lblDonViTinh.Size = new System.Drawing.Size(87, 17);
            this.lblDonViTinh.TabIndex = 4;
            this.lblDonViTinh.Text = "Đơn vị tính:";
            // 
            // cboDonViTinh
            // 
            this.cboDonViTinh.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.cboDonViTinh.Font = new System.Drawing.Font("Segoe UI", 9.5F);
            this.cboDonViTinh.FormattingEnabled = true;
            this.cboDonViTinh.Items.AddRange(new object[] {
            "Hộp",
            "Vỉ",
            "Lọ",
            "Chai",
            "Ống"});
            this.cboDonViTinh.Location = new System.Drawing.Point(790, 30);
            this.cboDonViTinh.Name = "cboDonViTinh";
            this.cboDonViTinh.Size = new System.Drawing.Size(165, 25);
            this.cboDonViTinh.TabIndex = 5;
            // 
            // lblNhomThuoc
            // 
            this.lblNhomThuoc.AutoSize = true;
            this.lblNhomThuoc.Location = new System.Drawing.Point(22, 74);
            this.lblNhomThuoc.Name = "lblNhomThuoc";
            this.lblNhomThuoc.Size = new System.Drawing.Size(93, 17);
            this.lblNhomThuoc.TabIndex = 6;
            this.lblNhomThuoc.Text = "Nhóm thuốc:";
            // 
            // cboNhomThuoc
            // 
            this.cboNhomThuoc.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.cboNhomThuoc.Font = new System.Drawing.Font("Segoe UI", 9.5F);
            this.cboNhomThuoc.FormattingEnabled = true;
            this.cboNhomThuoc.Items.AddRange(new object[] {
            "N01 - Giảm đau, hạ sốt (Tầng 1)",
            "N02 - Kháng sinh (Tầng 2)",
            "N03 - Tiêu hóa (Tầng 1)",
            "N04 - Tim mạch, huyết áp (Tầng 2)",
            "N05 - Kho lạnh bảo quản 2-8°C"});
            this.cboNhomThuoc.Location = new System.Drawing.Point(125, 70);
            this.cboNhomThuoc.Name = "cboNhomThuoc";
            this.cboNhomThuoc.Size = new System.Drawing.Size(260, 25);
            this.cboNhomThuoc.TabIndex = 7;
            // 
            // lblMoTa
            // 
            this.lblMoTa.AutoSize = true;
            this.lblMoTa.Location = new System.Drawing.Point(410, 74);
            this.lblMoTa.Name = "lblMoTa";
            this.lblMoTa.Size = new System.Drawing.Size(141, 17);
            this.lblMoTa.TabIndex = 8;
            this.lblMoTa.Text = "Mô tả / Công dụng:";
            // 
            // txtMoTa
            // 
            this.txtMoTa.Font = new System.Drawing.Font("Segoe UI", 9.5F);
            this.txtMoTa.Location = new System.Drawing.Point(560, 71);
            this.txtMoTa.Name = "txtMoTa";
            this.txtMoTa.Size = new System.Drawing.Size(395, 24);
            this.txtMoTa.TabIndex = 9;
            // 
            // btnThem
            // 
            this.btnThem.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(25)))), ((int)(((byte)(135)))), ((int)(((byte)(84)))));
            this.btnThem.FlatAppearance.BorderSize = 0;
            this.btnThem.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnThem.ForeColor = System.Drawing.Color.White;
            this.btnThem.Location = new System.Drawing.Point(515, 110);
            this.btnThem.Name = "btnThem";
            this.btnThem.Size = new System.Drawing.Size(102, 32);
            this.btnThem.TabIndex = 10;
            this.btnThem.Text = "Thêm mới";
            this.btnThem.UseVisualStyleBackColor = false;
            // 
            // btnSua
            // 
            this.btnSua.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(193)))), ((int)(((byte)(7)))));
            this.btnSua.FlatAppearance.BorderSize = 0;
            this.btnSua.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnSua.ForeColor = System.Drawing.Color.Black;
            this.btnSua.Location = new System.Drawing.Point(627, 110);
            this.btnSua.Name = "btnSua";
            this.btnSua.Size = new System.Drawing.Size(102, 32);
            this.btnSua.TabIndex = 11;
            this.btnSua.Text = "Cập nhật";
            this.btnSua.UseVisualStyleBackColor = false;
            // 
            // btnXoa
            // 
            this.btnXoa.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(220)))), ((int)(((byte)(53)))), ((int)(((byte)(69)))));
            this.btnXoa.FlatAppearance.BorderSize = 0;
            this.btnXoa.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnXoa.ForeColor = System.Drawing.Color.White;
            this.btnXoa.Location = new System.Drawing.Point(739, 110);
            this.btnXoa.Name = "btnXoa";
            this.btnXoa.Size = new System.Drawing.Size(102, 32);
            this.btnXoa.TabIndex = 12;
            this.btnXoa.Text = "Xóa thuốc";
            this.btnXoa.UseVisualStyleBackColor = false;
            // 
            // btnLamMoi
            // 
            this.btnLamMoi.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(108)))), ((int)(((byte)(117)))), ((int)(((byte)(125)))));
            this.btnLamMoi.FlatAppearance.BorderSize = 0;
            this.btnLamMoi.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnLamMoi.ForeColor = System.Drawing.Color.White;
            this.btnLamMoi.Location = new System.Drawing.Point(851, 110);
            this.btnLamMoi.Name = "btnLamMoi";
            this.btnLamMoi.Size = new System.Drawing.Size(104, 32);
            this.btnLamMoi.TabIndex = 13;
            this.btnLamMoi.Text = "Làm mới";
            this.btnLamMoi.UseVisualStyleBackColor = false;
            // 
            // dgvDanhMucThuoc
            // 
            this.dgvDanhMucThuoc.AutoSizeColumnsMode = System.Windows.Forms.DataGridViewAutoSizeColumnsMode.Fill;
            this.dgvDanhMucThuoc.BackgroundColor = System.Drawing.Color.White;
            this.dgvDanhMucThuoc.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.dgvDanhMucThuoc.Dock = System.Windows.Forms.DockStyle.Fill;
            this.dgvDanhMucThuoc.Location = new System.Drawing.Point(0, 213);
            this.dgvDanhMucThuoc.Name = "dgvDanhMucThuoc";
            this.dgvDanhMucThuoc.RowHeadersVisible = false;
            this.dgvDanhMucThuoc.Size = new System.Drawing.Size(984, 348);
            this.dgvDanhMucThuoc.TabIndex = 2;
            // 
            // frmDanhMucThuoc
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(984, 561);
            this.Controls.Add(this.dgvDanhMucThuoc);
            this.Controls.Add(this.grpNhapLieu);
            this.Controls.Add(this.pnlTop);
            this.Name = "frmDanhMucThuoc";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "Quản lý Danh mục Thuốc";
            this.pnlTop.ResumeLayout(false);
            this.pnlTop.PerformLayout();
            this.grpNhapLieu.ResumeLayout(false);
            this.grpNhapLieu.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)(this.dgvDanhMucThuoc)).EndInit();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Panel pnlTop;
        private System.Windows.Forms.Button btnDong;
        private System.Windows.Forms.Label lblTieuDe;
        private System.Windows.Forms.GroupBox grpNhapLieu;
        private System.Windows.Forms.Button btnLamMoi;
        private System.Windows.Forms.Button btnXoa;
        private System.Windows.Forms.Button btnSua;
        private System.Windows.Forms.Button btnThem;
        private System.Windows.Forms.TextBox txtMoTa;
        private System.Windows.Forms.Label lblMoTa;
        private System.Windows.Forms.ComboBox cboNhomThuoc;
        private System.Windows.Forms.Label lblNhomThuoc;
        private System.Windows.Forms.ComboBox cboDonViTinh;
        private System.Windows.Forms.Label lblDonViTinh;
        private System.Windows.Forms.TextBox txtTenThuoc;
        private System.Windows.Forms.Label lblTenThuoc;
        private System.Windows.Forms.TextBox txtMaThuoc;
        private System.Windows.Forms.Label lblMaThuoc;
        private System.Windows.Forms.DataGridView dgvDanhMucThuoc;
    }
}