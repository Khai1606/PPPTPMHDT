namespace QuanLyKhoThuoc
{
    partial class frmMain
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
            this.pnlHeader = new System.Windows.Forms.Panel();
            this.btnDangXuat = new System.Windows.Forms.Button();
            this.lblThongTinUser = new System.Windows.Forms.Label();
            this.lblTieuDe = new System.Windows.Forms.Label();
            this.tblNutChinh = new System.Windows.Forms.TableLayoutPanel();
            this.btnCanhBao = new System.Windows.Forms.Button();
            this.btnLoThuoc = new System.Windows.Forms.Button();
            this.btnPhieuNhap = new System.Windows.Forms.Button();
            this.btnPhieuXuat = new System.Windows.Forms.Button();
            this.btnKiemKe = new System.Windows.Forms.Button();
            this.btnQuanLy = new System.Windows.Forms.Button();
            this.pnlHeader.SuspendLayout();
            this.tblNutChinh.SuspendLayout();
            this.SuspendLayout();
            // 
            // pnlHeader
            // 
            this.pnlHeader.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(13)))), ((int)(((byte)(110)))), ((int)(((byte)(253)))));
            this.pnlHeader.Controls.Add(this.btnDangXuat);
            this.pnlHeader.Controls.Add(this.lblThongTinUser);
            this.pnlHeader.Controls.Add(this.lblTieuDe);
            this.pnlHeader.Dock = System.Windows.Forms.DockStyle.Top;
            this.pnlHeader.Location = new System.Drawing.Point(0, 0);
            this.pnlHeader.Name = "pnlHeader";
            this.pnlHeader.Size = new System.Drawing.Size(984, 75);
            this.pnlHeader.TabIndex = 0;
            // 
            // lblTieuDe
            // 
            this.lblTieuDe.AutoSize = true;
            this.lblTieuDe.Font = new System.Drawing.Font("Segoe UI", 16F, System.Drawing.FontStyle.Bold);
            this.lblTieuDe.ForeColor = System.Drawing.Color.White;
            this.lblTieuDe.Location = new System.Drawing.Point(24, 22);
            this.lblTieuDe.Name = "lblTieuDe";
            this.lblTieuDe.Size = new System.Drawing.Size(447, 30);
            this.lblTieuDe.TabIndex = 0;
            this.lblTieuDe.Text = "💊 QUẢN LÝ KHO THUỐC & CẢNH BÁO (HLT-03)";
            // 
            // lblThongTinUser
            // 
            this.lblThongTinUser.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Right)));
            this.lblThongTinUser.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Bold);
            this.lblThongTinUser.ForeColor = System.Drawing.Color.White;
            this.lblThongTinUser.Location = new System.Drawing.Point(550, 27);
            this.lblThongTinUser.Name = "lblThongTinUser";
            this.lblThongTinUser.Size = new System.Drawing.Size(300, 23);
            this.lblThongTinUser.TabIndex = 1;
            this.lblThongTinUser.Text = "Xin chào: Nhân viên (Thủ kho)";
            this.lblThongTinUser.TextAlign = System.Drawing.ContentAlignment.MiddleRight;
            // 
            // btnDangXuat
            // 
            this.btnDangXuat.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Right)));
            this.btnDangXuat.BackColor = System.Drawing.Color.Crimson;
            this.btnDangXuat.FlatAppearance.BorderSize = 0;
            this.btnDangXuat.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnDangXuat.Font = new System.Drawing.Font("Segoe UI", 9.5F, System.Drawing.FontStyle.Bold);
            this.btnDangXuat.ForeColor = System.Drawing.Color.White;
            this.btnDangXuat.Location = new System.Drawing.Point(862, 20);
            this.btnDangXuat.Name = "btnDangXuat";
            this.btnDangXuat.Size = new System.Drawing.Size(98, 35);
            this.btnDangXuat.TabIndex = 2;
            this.btnDangXuat.Text = "Đăng xuất";
            this.btnDangXuat.UseVisualStyleBackColor = false;
            this.btnDangXuat.Click += new System.EventHandler(this.btnDangXuat_Click);
            // 
            // tblNutChinh (Lưới 3 cột x 2 hàng nằm chính diện)
            // 
            this.tblNutChinh.Anchor = System.Windows.Forms.AnchorStyles.None;
            this.tblNutChinh.ColumnCount = 3;
            this.tblNutChinh.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 33.33F));
            this.tblNutChinh.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 33.33F));
            this.tblNutChinh.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 33.33F));
            this.tblNutChinh.Controls.Add(this.btnCanhBao, 0, 0);
            this.tblNutChinh.Controls.Add(this.btnLoThuoc, 1, 0);
            this.tblNutChinh.Controls.Add(this.btnPhieuNhap, 2, 0);
            this.tblNutChinh.Controls.Add(this.btnPhieuXuat, 0, 1);
            this.tblNutChinh.Controls.Add(this.btnKiemKe, 1, 1);
            this.tblNutChinh.Controls.Add(this.btnQuanLy, 2, 1);
            this.tblNutChinh.Location = new System.Drawing.Point(82, 145);
            this.tblNutChinh.Name = "tblNutChinh";
            this.tblNutChinh.RowCount = 2;
            this.tblNutChinh.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 50F));
            this.tblNutChinh.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 50F));
            this.tblNutChinh.Size = new System.Drawing.Size(820, 350);
            this.tblNutChinh.TabIndex = 1;
            // 
            // btnCanhBao
            // 
            this.btnCanhBao.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(220)))), ((int)(((byte)(53)))), ((int)(((byte)(69)))));
            this.btnCanhBao.Cursor = System.Windows.Forms.Cursors.Hand;
            this.btnCanhBao.Dock = System.Windows.Forms.DockStyle.Fill;
            this.btnCanhBao.FlatAppearance.BorderSize = 0;
            this.btnCanhBao.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnCanhBao.Font = new System.Drawing.Font("Segoe UI", 13F, System.Drawing.FontStyle.Bold);
            this.btnCanhBao.ForeColor = System.Drawing.Color.White;
            this.btnCanhBao.Location = new System.Drawing.Point(12, 12);
            this.btnCanhBao.Margin = new System.Windows.Forms.Padding(12);
            this.btnCanhBao.Name = "btnCanhBao";
            this.btnCanhBao.Size = new System.Drawing.Size(249, 151);
            this.btnCanhBao.TabIndex = 0;
            this.btnCanhBao.Text = "⚠️\r\nCẢNH BÁO HẠN DÙNG";
            this.btnCanhBao.UseVisualStyleBackColor = false;
            this.btnCanhBao.Click += new System.EventHandler(this.btnCanhBao_Click);
            // 
            // btnLoThuoc
            // 
            this.btnLoThuoc.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(13)))), ((int)(((byte)(110)))), ((int)(((byte)(253)))));
            this.btnLoThuoc.Cursor = System.Windows.Forms.Cursors.Hand;
            this.btnLoThuoc.Dock = System.Windows.Forms.DockStyle.Fill;
            this.btnLoThuoc.FlatAppearance.BorderSize = 0;
            this.btnLoThuoc.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnLoThuoc.Font = new System.Drawing.Font("Segoe UI", 13F, System.Drawing.FontStyle.Bold);
            this.btnLoThuoc.ForeColor = System.Drawing.Color.White;
            this.btnLoThuoc.Location = new System.Drawing.Point(285, 12);
            this.btnLoThuoc.Margin = new System.Windows.Forms.Padding(12);
            this.btnLoThuoc.Name = "btnLoThuoc";
            this.btnLoThuoc.Size = new System.Drawing.Size(249, 151);
            this.btnLoThuoc.TabIndex = 1;
            this.btnLoThuoc.Text = "📦\r\nDANH MỤC & LÔ THUỐC";
            this.btnLoThuoc.UseVisualStyleBackColor = false;
            this.btnLoThuoc.Click += new System.EventHandler(this.btnLoThuoc_Click);
            // 
            // btnPhieuNhap
            // 
            this.btnPhieuNhap.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(25)))), ((int)(((byte)(135)))), ((int)(((byte)(84)))));
            this.btnPhieuNhap.Cursor = System.Windows.Forms.Cursors.Hand;
            this.btnPhieuNhap.Dock = System.Windows.Forms.DockStyle.Fill;
            this.btnPhieuNhap.FlatAppearance.BorderSize = 0;
            this.btnPhieuNhap.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnPhieuNhap.Font = new System.Drawing.Font("Segoe UI", 13F, System.Drawing.FontStyle.Bold);
            this.btnPhieuNhap.ForeColor = System.Drawing.Color.White;
            this.btnPhieuNhap.Location = new System.Drawing.Point(558, 12);
            this.btnPhieuNhap.Margin = new System.Windows.Forms.Padding(12);
            this.btnPhieuNhap.Name = "btnPhieuNhap";
            this.btnPhieuNhap.Size = new System.Drawing.Size(250, 151);
            this.btnPhieuNhap.TabIndex = 2;
            this.btnPhieuNhap.Text = "📥\r\nNHẬP KHO LÔ MỚI";
            this.btnPhieuNhap.UseVisualStyleBackColor = false;
            this.btnPhieuNhap.Click += new System.EventHandler(this.btnPhieuNhap_Click);
            // 
            // btnPhieuXuat
            // 
            this.btnPhieuXuat.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(13)))), ((int)(((byte)(202)))), ((int)(((byte)(240)))));
            this.btnPhieuXuat.Cursor = System.Windows.Forms.Cursors.Hand;
            this.btnPhieuXuat.Dock = System.Windows.Forms.DockStyle.Fill;
            this.btnPhieuXuat.FlatAppearance.BorderSize = 0;
            this.btnPhieuXuat.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnPhieuXuat.Font = new System.Drawing.Font("Segoe UI", 13F, System.Drawing.FontStyle.Bold);
            this.btnPhieuXuat.ForeColor = System.Drawing.Color.Black;
            this.btnPhieuXuat.Location = new System.Drawing.Point(12, 187);
            this.btnPhieuXuat.Margin = new System.Windows.Forms.Padding(12);
            this.btnPhieuXuat.Name = "btnPhieuXuat";
            this.btnPhieuXuat.Size = new System.Drawing.Size(249, 151);
            this.btnPhieuXuat.TabIndex = 3;
            this.btnPhieuXuat.Text = "📤\r\nXUẤT KHO FEFO";
            this.btnPhieuXuat.UseVisualStyleBackColor = false;
            this.btnPhieuXuat.Click += new System.EventHandler(this.btnPhieuXuat_Click);
            // 
            // btnKiemKe
            // 
            this.btnKiemKe.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(193)))), ((int)(((byte)(7)))));
            this.btnKiemKe.Cursor = System.Windows.Forms.Cursors.Hand;
            this.btnKiemKe.Dock = System.Windows.Forms.DockStyle.Fill;
            this.btnKiemKe.FlatAppearance.BorderSize = 0;
            this.btnKiemKe.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnKiemKe.Font = new System.Drawing.Font("Segoe UI", 13F, System.Drawing.FontStyle.Bold);
            this.btnKiemKe.ForeColor = System.Drawing.Color.Black;
            this.btnKiemKe.Location = new System.Drawing.Point(285, 187);
            this.btnKiemKe.Margin = new System.Windows.Forms.Padding(12);
            this.btnKiemKe.Name = "btnKiemKe";
            this.btnKiemKe.Size = new System.Drawing.Size(249, 151);
            this.btnKiemKe.TabIndex = 4;
            this.btnKiemKe.Text = "📋\r\nKIỂM KÊ & ĐIỀU CHỈNH";
            this.btnKiemKe.UseVisualStyleBackColor = false;
            this.btnKiemKe.Click += new System.EventHandler(this.btnKiemKe_Click);
            // 
            // btnQuanLy
            // 
            this.btnQuanLy.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(108)))), ((int)(((byte)(117)))), ((int)(((byte)(125)))));
            this.btnQuanLy.Cursor = System.Windows.Forms.Cursors.Hand;
            this.btnQuanLy.Dock = System.Windows.Forms.DockStyle.Fill;
            this.btnQuanLy.FlatAppearance.BorderSize = 0;
            this.btnQuanLy.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnQuanLy.Font = new System.Drawing.Font("Segoe UI", 13F, System.Drawing.FontStyle.Bold);
            this.btnQuanLy.ForeColor = System.Drawing.Color.White;
            this.btnQuanLy.Location = new System.Drawing.Point(558, 187);
            this.btnQuanLy.Margin = new System.Windows.Forms.Padding(12);
            this.btnQuanLy.Name = "btnQuanLy";
            this.btnQuanLy.Size = new System.Drawing.Size(250, 151);
            this.btnQuanLy.TabIndex = 5;
            this.btnQuanLy.Text = "🛡️\r\nQUẢN LÝ & AUDIT LOG";
            this.btnQuanLy.UseVisualStyleBackColor = false;
            this.btnQuanLy.Click += new System.EventHandler(this.btnQuanLy_Click);
            // 
            // frmMain
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.WhiteSmoke;
            this.ClientSize = new System.Drawing.Size(984, 561);
            this.Controls.Add(this.tblNutChinh);
            this.Controls.Add(this.pnlHeader);
            this.Name = "frmMain";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "Màn hình chính - Hệ thống Quản lý Kho thuốc (HLT-03)";
            this.Load += new System.EventHandler(this.frmMain_Load);
            this.pnlHeader.ResumeLayout(false);
            this.pnlHeader.PerformLayout();
            this.tblNutChinh.ResumeLayout(false);
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Panel pnlHeader;
        private System.Windows.Forms.Label lblTieuDe;
        private System.Windows.Forms.Label lblThongTinUser;
        private System.Windows.Forms.Button btnDangXuat;
        private System.Windows.Forms.TableLayoutPanel tblNutChinh;
        private System.Windows.Forms.Button btnCanhBao;
        private System.Windows.Forms.Button btnLoThuoc;
        private System.Windows.Forms.Button btnPhieuNhap;
        private System.Windows.Forms.Button btnPhieuXuat;
        private System.Windows.Forms.Button btnKiemKe;
        private System.Windows.Forms.Button btnQuanLy;
    }
}