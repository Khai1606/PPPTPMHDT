namespace QLKT
{
    partial class frmThuHoiTieuHuy
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
            this.grpXuLy = new System.Windows.Forms.GroupBox();
            this.btnTieuHuy = new System.Windows.Forms.Button();
            this.btnKhoaLo = new System.Windows.Forms.Button();
            this.txtLyDo = new System.Windows.Forms.TextBox();
            this.lblLyDo = new System.Windows.Forms.Label();
            this.txtTenThuoc = new System.Windows.Forms.TextBox();
            this.lblTenThuoc = new System.Windows.Forms.Label();
            this.cboMaLo = new System.Windows.Forms.ComboBox();
            this.lblMaLo = new System.Windows.Forms.Label();
            this.dgvDanhSachLo = new System.Windows.Forms.DataGridView();
            this.pnlTop.SuspendLayout();
            this.grpXuLy.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.dgvDanhSachLo)).BeginInit();
            this.SuspendLayout();
            // 
            // pnlTop
            // 
            this.pnlTop.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(220)))), ((int)(((byte)(53)))), ((int)(((byte)(69)))));
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
            this.btnDong.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(52)))), ((int)(((byte)(58)))), ((int)(((byte)(64)))));
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
            this.lblTieuDe.Size = new System.Drawing.Size(447, 25);
            this.lblTieuDe.TabIndex = 0;
            this.lblTieuDe.Text = "🚫 TẠM KHÓA / THU HỒI & TIÊU HỦY LÔ THUỐC";
            // 
            // grpXuLy
            // 
            this.grpXuLy.BackColor = System.Drawing.Color.WhiteSmoke;
            this.grpXuLy.Controls.Add(this.btnTieuHuy);
            this.grpXuLy.Controls.Add(this.btnKhoaLo);
            this.grpXuLy.Controls.Add(this.txtLyDo);
            this.grpXuLy.Controls.Add(this.lblLyDo);
            this.grpXuLy.Controls.Add(this.txtTenThuoc);
            this.grpXuLy.Controls.Add(this.lblTenThuoc);
            this.grpXuLy.Controls.Add(this.cboMaLo);
            this.grpXuLy.Controls.Add(this.lblMaLo);
            this.grpXuLy.Dock = System.Windows.Forms.DockStyle.Top;
            this.grpXuLy.Font = new System.Drawing.Font("Segoe UI", 9.5F, System.Drawing.FontStyle.Bold);
            this.grpXuLy.Location = new System.Drawing.Point(0, 58);
            this.grpXuLy.Name = "grpXuLy";
            this.grpXuLy.Size = new System.Drawing.Size(984, 145);
            this.grpXuLy.TabIndex = 1;
            this.grpXuLy.TabStop = false;
            this.grpXuLy.Text = "Thông tin xử lý lô thuốc thu hồi / quá hạn (Quyền Quản lý kho)";
            // 
            // lblMaLo
            // 
            this.lblMaLo.AutoSize = true;
            this.lblMaLo.Location = new System.Drawing.Point(22, 34);
            this.lblMaLo.Name = "lblMaLo";
            this.lblMaLo.Size = new System.Drawing.Size(92, 17);
            this.lblMaLo.TabIndex = 0;
            this.lblMaLo.Text = "Chọn Mã lô:";
            // 
            // cboMaLo
            // 
            this.cboMaLo.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.cboMaLo.Font = new System.Drawing.Font("Segoe UI", 9.5F);
            this.cboMaLo.FormattingEnabled = true;
            this.cboMaLo.Location = new System.Drawing.Point(125, 30);
            this.cboMaLo.Name = "cboMaLo";
            this.cboMaLo.Size = new System.Drawing.Size(210, 25);
            this.cboMaLo.TabIndex = 1;
            // 
            // lblTenThuoc
            // 
            this.lblTenThuoc.AutoSize = true;
            this.lblTenThuoc.Location = new System.Drawing.Point(375, 34);
            this.lblTenThuoc.Name = "lblTenThuoc";
            this.lblTenThuoc.Size = new System.Drawing.Size(76, 17);
            this.lblTenThuoc.TabIndex = 2;
            this.lblTenThuoc.Text = "Tên thuốc:";
            // 
            // txtTenThuoc
            // 
            this.txtTenThuoc.Font = new System.Drawing.Font("Segoe UI", 9.5F);
            this.txtTenThuoc.Location = new System.Drawing.Point(465, 31);
            this.txtTenThuoc.Name = "txtTenThuoc";
            this.txtTenThuoc.ReadOnly = true;
            this.txtTenThuoc.Size = new System.Drawing.Size(485, 24);
            this.txtTenThuoc.TabIndex = 3;
            // 
            // lblLyDo
            // 
            this.lblLyDo.AutoSize = true;
            this.lblLyDo.Location = new System.Drawing.Point(22, 74);
            this.lblLyDo.Name = "lblLyDo";
            this.lblLyDo.Size = new System.Drawing.Size(173, 17);
            this.lblLyDo.TabIndex = 4;
            this.lblLyDo.Text = "Lý do / Số biên bản xử lý:";
            // 
            // txtLyDo
            // 
            this.txtLyDo.Font = new System.Drawing.Font("Segoe UI", 9.5F);
            this.txtLyDo.Location = new System.Drawing.Point(205, 71);
            this.txtLyDo.Name = "txtLyDo";
            this.txtLyDo.Size = new System.Drawing.Size(745, 24);
            this.txtLyDo.TabIndex = 5;
            // 
            // btnKhoaLo
            // 
            this.btnKhoaLo.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(193)))), ((int)(((byte)(7)))));
            this.btnKhoaLo.FlatAppearance.BorderSize = 0;
            this.btnKhoaLo.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnKhoaLo.ForeColor = System.Drawing.Color.Black;
            this.btnKhoaLo.Location = new System.Drawing.Point(600, 104);
            this.btnKhoaLo.Name = "btnKhoaLo";
            this.btnKhoaLo.Size = new System.Drawing.Size(170, 32);
            this.btnKhoaLo.TabIndex = 6;
            this.btnKhoaLo.Text = "🔒 Khóa / Thu hồi lô";
            this.btnKhoaLo.UseVisualStyleBackColor = false;
            // 
            // btnTieuHuy
            // 
            this.btnTieuHuy.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(220)))), ((int)(((byte)(53)))), ((int)(((byte)(69)))));
            this.btnTieuHuy.FlatAppearance.BorderSize = 0;
            this.btnTieuHuy.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnTieuHuy.ForeColor = System.Drawing.Color.White;
            this.btnTieuHuy.Location = new System.Drawing.Point(780, 104);
            this.btnTieuHuy.Name = "btnTieuHuy";
            this.btnTieuHuy.Size = new System.Drawing.Size(170, 32);
            this.btnTieuHuy.TabIndex = 7;
            this.btnTieuHuy.Text = "🗑️ Xác nhận Tiêu hủy";
            this.btnTieuHuy.UseVisualStyleBackColor = false;
            // 
            // dgvDanhSachLo
            // 
            this.dgvDanhSachLo.AutoSizeColumnsMode = System.Windows.Forms.DataGridViewAutoSizeColumnsMode.Fill;
            this.dgvDanhSachLo.BackgroundColor = System.Drawing.Color.White;
            this.dgvDanhSachLo.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.dgvDanhSachLo.Dock = System.Windows.Forms.DockStyle.Fill;
            this.dgvDanhSachLo.Location = new System.Drawing.Point(0, 203);
            this.dgvDanhSachLo.Name = "dgvDanhSachLo";
            this.dgvDanhSachLo.RowHeadersVisible = false;
            this.dgvDanhSachLo.Size = new System.Drawing.Size(984, 358);
            this.dgvDanhSachLo.TabIndex = 2;
            // 
            // frmThuHoiTieuHuy
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(984, 561);
            this.Controls.Add(this.dgvDanhSachLo);
            this.Controls.Add(this.grpXuLy);
            this.Controls.Add(this.pnlTop);
            this.Name = "frmThuHoiTieuHuy";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "Tạm khóa / Thu hồi & Tiêu hủy Lô thuốc";
            this.pnlTop.ResumeLayout(false);
            this.pnlTop.PerformLayout();
            this.grpXuLy.ResumeLayout(false);
            this.grpXuLy.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)(this.dgvDanhSachLo)).EndInit();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Panel pnlTop;
        private System.Windows.Forms.Button btnDong;
        private System.Windows.Forms.Label lblTieuDe;
        private System.Windows.Forms.GroupBox grpXuLy;
        private System.Windows.Forms.Button btnTieuHuy;
        private System.Windows.Forms.Button btnKhoaLo;
        private System.Windows.Forms.TextBox txtLyDo;
        private System.Windows.Forms.Label lblLyDo;
        private System.Windows.Forms.TextBox txtTenThuoc;
        private System.Windows.Forms.Label lblTenThuoc;
        private System.Windows.Forms.ComboBox cboMaLo;
        private System.Windows.Forms.Label lblMaLo;
        private System.Windows.Forms.DataGridView dgvDanhSachLo;
    }
}