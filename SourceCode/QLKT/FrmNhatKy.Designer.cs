namespace QuanLyKhoThuoc
{
    partial class frmNhatKy
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
            this.lblTieuDe = new System.Windows.Forms.Label();
            this.lblGhiChu = new System.Windows.Forms.Label();
            this.pnlBoLoc = new System.Windows.Forms.Panel();
            this.lblTimKiem = new System.Windows.Forms.Label();
            this.txtTimKiem = new System.Windows.Forms.TextBox();
            this.lblHanhDong = new System.Windows.Forms.Label();
            this.cboHanhDong = new System.Windows.Forms.ComboBox();
            this.btnLoc = new System.Windows.Forms.Button();
            this.btnLamMoi = new System.Windows.Forms.Button();
            this.dgvNhatKy = new System.Windows.Forms.DataGridView();
            this.pnlBottom = new System.Windows.Forms.Panel();
            this.btnDong = new System.Windows.Forms.Button();
            this.pnlTop.SuspendLayout();
            this.pnlBoLoc.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.dgvNhatKy)).BeginInit();
            this.pnlBottom.SuspendLayout();
            this.SuspendLayout();
            // 
            // pnlTop
            // 
            this.pnlTop.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(52)))), ((int)(((byte)(58)))), ((int)(((byte)(64)))));
            this.pnlTop.Controls.Add(this.lblGhiChu);
            this.pnlTop.Controls.Add(this.lblTieuDe);
            this.pnlTop.Dock = System.Windows.Forms.DockStyle.Top;
            this.pnlTop.Location = new System.Drawing.Point(0, 0);
            this.pnlTop.Name = "pnlTop";
            this.pnlTop.Size = new System.Drawing.Size(984, 65);
            this.pnlTop.TabIndex = 0;
            // 
            // lblTieuDe
            // 
            this.lblTieuDe.AutoSize = true;
            this.lblTieuDe.Font = new System.Drawing.Font("Segoe UI", 14F, System.Drawing.FontStyle.Bold);
            this.lblTieuDe.ForeColor = System.Drawing.Color.White;
            this.lblTieuDe.Location = new System.Drawing.Point(20, 12);
            this.lblTieuDe.Name = "lblTieuDe";
            this.lblTieuDe.Size = new System.Drawing.Size(455, 25);
            this.lblTieuDe.TabIndex = 0;
            this.lblTieuDe.Text = "🛡️ NHẬT KÝ HOẠT ĐỘNG HỆ THỐNG (AUDIT LOG)";
            // 
            // lblGhiChu
            // 
            this.lblGhiChu.AutoSize = true;
            this.lblGhiChu.Font = new System.Drawing.Font("Segoe UI", 9F, System.Drawing.FontStyle.Italic);
            this.lblGhiChu.ForeColor = System.Drawing.Color.LightGray;
            this.lblGhiChu.Location = new System.Drawing.Point(22, 40);
            this.lblGhiChu.Name = "lblGhiChu";
            this.lblGhiChu.Size = new System.Drawing.Size(447, 15);
            this.lblGhiChu.TabIndex = 1;
            this.lblGhiChu.Text = "Dữ liệu lưu vết bất biến (Append-only) phục vụ kiểm toán — Không cho phép chỉnh sửa/xóa";
            // 
            // pnlBoLoc
            // 
            this.pnlBoLoc.BackColor = System.Drawing.Color.White;
            this.pnlBoLoc.Controls.Add(this.btnLamMoi);
            this.pnlBoLoc.Controls.Add(this.btnLoc);
            this.pnlBoLoc.Controls.Add(this.cboHanhDong);
            this.pnlBoLoc.Controls.Add(this.lblHanhDong);
            this.pnlBoLoc.Controls.Add(this.txtTimKiem);
            this.pnlBoLoc.Controls.Add(this.lblTimKiem);
            this.pnlBoLoc.Dock = System.Windows.Forms.DockStyle.Top;
            this.pnlBoLoc.Location = new System.Drawing.Point(0, 65);
            this.pnlBoLoc.Name = "pnlBoLoc";
            this.pnlBoLoc.Size = new System.Drawing.Size(984, 58);
            this.pnlBoLoc.TabIndex = 1;
            // 
            // lblTimKiem
            // 
            this.lblTimKiem.AutoSize = true;
            this.lblTimKiem.Font = new System.Drawing.Font("Segoe UI", 9.5F, System.Drawing.FontStyle.Bold);
            this.lblTimKiem.Location = new System.Drawing.Point(20, 20);
            this.lblTimKiem.Name = "lblTimKiem";
            this.lblTimKiem.Size = new System.Drawing.Size(118, 17);
            this.lblTimKiem.TabIndex = 0;
            this.lblTimKiem.Text = "Từ khóa / Mã lô:";
            // 
            // txtTimKiem
            // 
            this.txtTimKiem.Font = new System.Drawing.Font("Segoe UI", 9.5F);
            this.txtTimKiem.Location = new System.Drawing.Point(144, 17);
            this.txtTimKiem.Name = "txtTimKiem";
            this.txtTimKiem.Size = new System.Drawing.Size(230, 24);
            this.txtTimKiem.TabIndex = 1;
            // 
            // lblHanhDong
            // 
            this.lblHanhDong.AutoSize = true;
            this.lblHanhDong.Font = new System.Drawing.Font("Segoe UI", 9.5F, System.Drawing.FontStyle.Bold);
            this.lblHanhDong.Location = new System.Drawing.Point(395, 20);
            this.lblHanhDong.Name = "lblHanhDong";
            this.lblHanhDong.Size = new System.Drawing.Size(113, 17);
            this.lblHanhDong.TabIndex = 2;
            this.lblHanhDong.Text = "Loại hành động:";
            // 
            // cboHanhDong
            // 
            this.cboHanhDong.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.cboHanhDong.Font = new System.Drawing.Font("Segoe UI", 9.5F);
            this.cboHanhDong.FormattingEnabled = true;
            this.cboHanhDong.Items.AddRange(new object[] {
            "-- Tất cả hành động --",
            "Đăng nhập",
            "Nhập kho",
            "Xuất kho FEFO",
            "Tạo phiếu điều chỉnh",
            "Phê duyệt điều chỉnh",
            "Từ chối điều chỉnh",
            "Khóa lô hết hạn"});
            this.cboHanhDong.Location = new System.Drawing.Point(514, 16);
            this.cboHanhDong.Name = "cboHanhDong";
            this.cboHanhDong.Size = new System.Drawing.Size(210, 25);
            this.cboHanhDong.TabIndex = 3;
            // 
            // btnLoc
            // 
            this.btnLoc.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(13)))), ((int)(((byte)(110)))), ((int)(((byte)(253)))));
            this.btnLoc.FlatAppearance.BorderSize = 0;
            this.btnLoc.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnLoc.Font = new System.Drawing.Font("Segoe UI", 9.5F, System.Drawing.FontStyle.Bold);
            this.btnLoc.ForeColor = System.Drawing.Color.White;
            this.btnLoc.Location = new System.Drawing.Point(745, 14);
            this.btnLoc.Name = "btnLoc";
            this.btnLoc.Size = new System.Drawing.Size(100, 30);
            this.btnLoc.TabIndex = 4;
            this.btnLoc.Text = "Tra cứu";
            this.btnLoc.UseVisualStyleBackColor = false;
            this.btnLoc.Click += new System.EventHandler(this.btnLoc_Click);
            // 
            // btnLamMoi
            // 
            this.btnLamMoi.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(108)))), ((int)(((byte)(117)))), ((int)(((byte)(125)))));
            this.btnLamMoi.FlatAppearance.BorderSize = 0;
            this.btnLamMoi.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnLamMoi.Font = new System.Drawing.Font("Segoe UI", 9.5F, System.Drawing.FontStyle.Bold);
            this.btnLamMoi.ForeColor = System.Drawing.Color.White;
            this.btnLamMoi.Location = new System.Drawing.Point(855, 14);
            this.btnLamMoi.Name = "btnLamMoi";
            this.btnLamMoi.Size = new System.Drawing.Size(100, 30);
            this.btnLamMoi.TabIndex = 5;
            this.btnLamMoi.Text = "Làm mới";
            this.btnLamMoi.UseVisualStyleBackColor = false;
            this.btnLamMoi.Click += new System.EventHandler(this.btnLamMoi_Click);
            // 
            // dgvNhatKy
            // 
            this.dgvNhatKy.AllowUserToAddRows = false;
            this.dgvNhatKy.AllowUserToDeleteRows = false;
            this.dgvNhatKy.AutoSizeColumnsMode = System.Windows.Forms.DataGridViewAutoSizeColumnsMode.Fill;
            this.dgvNhatKy.BackgroundColor = System.Drawing.Color.White;
            this.dgvNhatKy.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.dgvNhatKy.Dock = System.Windows.Forms.DockStyle.Fill;
            this.dgvNhatKy.Location = new System.Drawing.Point(0, 123);
            this.dgvNhatKy.Name = "dgvNhatKy";
            this.dgvNhatKy.ReadOnly = true;
            this.dgvNhatKy.RowHeadersVisible = false;
            this.dgvNhatKy.SelectionMode = System.Windows.Forms.DataGridViewSelectionMode.FullRowSelect;
            this.dgvNhatKy.Size = new System.Drawing.Size(984, 388);
            this.dgvNhatKy.TabIndex = 2;
            // 
            // pnlBottom
            // 
            this.pnlBottom.BackColor = System.Drawing.Color.WhiteSmoke;
            this.pnlBottom.Controls.Add(this.btnDong);
            this.pnlBottom.Dock = System.Windows.Forms.DockStyle.Bottom;
            this.pnlBottom.Location = new System.Drawing.Point(0, 511);
            this.pnlBottom.Name = "pnlBottom";
            this.pnlBottom.Size = new System.Drawing.Size(984, 50);
            this.pnlBottom.TabIndex = 3;
            // 
            // btnDong
            // 
            this.btnDong.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Right)));
            this.btnDong.Font = new System.Drawing.Font("Segoe UI", 9.5F, System.Drawing.FontStyle.Bold);
            this.btnDong.Location = new System.Drawing.Point(862, 10);
            this.btnDong.Name = "btnDong";
            this.btnDong.Size = new System.Drawing.Size(98, 30);
            this.btnDong.TabIndex = 0;
            this.btnDong.Text = "Đóng";
            this.btnDong.UseVisualStyleBackColor = true;
            this.btnDong.Click += new System.EventHandler(this.btnDong_Click);
            // 
            // frmNhatKy
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(984, 561);
            this.Controls.Add(this.dgvNhatKy);
            this.Controls.Add(this.pnlBottom);
            this.Controls.Add(this.pnlBoLoc);
            this.Controls.Add(this.pnlTop);
            this.Name = "frmNhatKy";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "Nhật ký hoạt động hệ thống (Audit Log)";
            this.Load += new System.EventHandler(this.frmNhatKy_Load);
            this.pnlTop.ResumeLayout(false);
            this.pnlTop.PerformLayout();
            this.pnlBoLoc.ResumeLayout(false);
            this.pnlBoLoc.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)(this.dgvNhatKy)).EndInit();
            this.pnlBottom.ResumeLayout(false);
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Panel pnlTop;
        private System.Windows.Forms.Label lblTieuDe;
        private System.Windows.Forms.Label lblGhiChu;
        private System.Windows.Forms.Panel pnlBoLoc;
        private System.Windows.Forms.Label lblTimKiem;
        private System.Windows.Forms.TextBox txtTimKiem;
        private System.Windows.Forms.Label lblHanhDong;
        private System.Windows.Forms.ComboBox cboHanhDong;
        private System.Windows.Forms.Button btnLoc;
        private System.Windows.Forms.Button btnLamMoi;
        private System.Windows.Forms.DataGridView dgvNhatKy;
        private System.Windows.Forms.Panel pnlBottom;
        private System.Windows.Forms.Button btnDong;
    }
}