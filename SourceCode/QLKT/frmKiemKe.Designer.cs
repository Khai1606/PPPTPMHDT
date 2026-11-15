namespace QLKT
{
    partial class frmKiemKe
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.label1 = new System.Windows.Forms.Label();
            this.txtMaPhieuKK = new System.Windows.Forms.TextBox();
            this.label2 = new System.Windows.Forms.Label();
            this.dtpNgayKiemKe = new System.Windows.Forms.DateTimePicker();
            this.label3 = new System.Windows.Forms.Label();
            this.txtNguoiKiem = new System.Windows.Forms.TextBox();
            this.dgvKiemKe = new System.Windows.Forms.DataGridView();
            this.btnThemPhieu = new System.Windows.Forms.Button();
            this.btnLuuKiemKe = new System.Windows.Forms.Button();
            this.btnXuatExcel = new System.Windows.Forms.Button();
            this.btnDong = new System.Windows.Forms.Button();
            ((System.ComponentModel.ISupportInitialize)(this.dgvKiemKe)).BeginInit();
            this.SuspendLayout();
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Font = new System.Drawing.Font("Microsoft Sans Serif", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label1.Location = new System.Drawing.Point(30, 25);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(103, 17);
            this.label1.TabIndex = 0;
            this.label1.Text = "Mã phiếu kiểm:";
            // 
            // txtMaPhieuKK
            // 
            this.txtMaPhieuKK.Font = new System.Drawing.Font("Microsoft Sans Serif", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.txtMaPhieuKK.Location = new System.Drawing.Point(140, 22);
            this.txtMaPhieuKK.Name = "txtMaPhieuKK";
            this.txtMaPhieuKK.Size = new System.Drawing.Size(260, 23);
            this.txtMaPhieuKK.TabIndex = 1;
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Font = new System.Drawing.Font("Microsoft Sans Serif", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label2.Location = new System.Drawing.Point(30, 65);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(97, 17);
            this.label2.TabIndex = 2;
            this.label2.Text = "Ngày kiểm kê:";
            // 
            // dtpNgayKiemKe
            // 
            this.dtpNgayKiemKe.CustomFormat = "dd/MM/yyyy";
            this.dtpNgayKiemKe.Font = new System.Drawing.Font("Microsoft Sans Serif", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.dtpNgayKiemKe.Format = System.Windows.Forms.DateTimePickerFormat.Custom;
            this.dtpNgayKiemKe.Location = new System.Drawing.Point(140, 62);
            this.dtpNgayKiemKe.Name = "dtpNgayKiemKe";
            this.dtpNgayKiemKe.Size = new System.Drawing.Size(260, 23);
            this.dtpNgayKiemKe.TabIndex = 3;
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Font = new System.Drawing.Font("Microsoft Sans Serif", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label3.Location = new System.Drawing.Point(450, 25);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(103, 17);
            this.label3.TabIndex = 4;
            this.label3.Text = "Người kiểm tra:";
            // 
            // txtNguoiKiem
            // 
            this.txtNguoiKiem.Font = new System.Drawing.Font("Microsoft Sans Serif", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.txtNguoiKiem.Location = new System.Drawing.Point(565, 22);
            this.txtNguoiKiem.Name = "txtNguoiKiem";
            this.txtNguoiKiem.Size = new System.Drawing.Size(285, 23);
            this.txtNguoiKiem.TabIndex = 5;
            // 
            // dgvKiemKe
            // 
            this.dgvKiemKe.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.dgvKiemKe.Location = new System.Drawing.Point(12, 110);
            this.dgvKiemKe.Name = "dgvKiemKe";
            this.dgvKiemKe.Size = new System.Drawing.Size(860, 310);
            this.dgvKiemKe.TabIndex = 6;
            // 
            // btnThemPhieu
            // 
            this.btnThemPhieu.Font = new System.Drawing.Font("Microsoft Sans Serif", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btnThemPhieu.Location = new System.Drawing.Point(565, 74);
            this.btnThemPhieu.Name = "btnThemPhieu";
            this.btnThemPhieu.Size = new System.Drawing.Size(95, 30);
            this.btnThemPhieu.TabIndex = 7;
            this.btnThemPhieu.Text = "Tạo phiếu mới";
            this.btnThemPhieu.UseVisualStyleBackColor = true;
            // 
            // btnLuuKiemKe
            // 
            this.btnLuuKiemKe.Font = new System.Drawing.Font("Microsoft Sans Serif", 9F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btnLuuKiemKe.Location = new System.Drawing.Point(669, 74);
            this.btnLuuKiemKe.Name = "btnLuuKiemKe";
            this.btnLuuKiemKe.Size = new System.Drawing.Size(95, 30);
            this.btnLuuKiemKe.TabIndex = 8;
            this.btnLuuKiemKe.Text = "Lưu kết quả";
            this.btnLuuKiemKe.UseVisualStyleBackColor = true;
            // 
            // btnXuatExcel
            // 
            this.btnXuatExcel.Font = new System.Drawing.Font("Microsoft Sans Serif", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btnXuatExcel.Location = new System.Drawing.Point(770, 74);
            this.btnXuatExcel.Name = "btnXuatExcel";
            this.btnXuatExcel.Size = new System.Drawing.Size(100, 30);
            this.btnXuatExcel.TabIndex = 9;
            this.btnXuatExcel.Text = "Xuất Excel";
            this.btnXuatExcel.UseVisualStyleBackColor = true;
            // 
            // btnDong
            // 
            this.btnDong.Font = new System.Drawing.Font("Microsoft Sans Serif", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btnDong.Location = new System.Drawing.Point(785, 435);
            this.btnDong.Name = "btnDong";
            this.btnDong.Size = new System.Drawing.Size(85, 30);
            this.btnDong.TabIndex = 10;
            this.btnDong.Text = "Đóng";
            this.btnDong.UseVisualStyleBackColor = true;
            // 
            // frmKiemKe
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(885, 480);
            this.Controls.Add(this.btnDong);
            this.Controls.Add(this.btnXuatExcel);
            this.Controls.Add(this.btnLuuKiemKe);
            this.Controls.Add(this.btnThemPhieu);
            this.Controls.Add(this.dgvKiemKe);
            this.Controls.Add(this.txtNguoiKiem);
            this.Controls.Add(this.label3);
            this.Controls.Add(this.dtpNgayKiemKe);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.txtMaPhieuKK);
            this.Controls.Add(this.label1);
            this.Name = "frmKiemKe";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "Kiểm Kê Kho Thuốc & Xuất Báo Cáo";
            ((System.ComponentModel.ISupportInitialize)(this.dgvKiemKe)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.TextBox txtMaPhieuKK;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.DateTimePicker dtpNgayKiemKe;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.TextBox txtNguoiKiem;
        private System.Windows.Forms.DataGridView dgvKiemKe;
        private System.Windows.Forms.Button btnThemPhieu;
        private System.Windows.Forms.Button btnLuuKiemKe;
        private System.Windows.Forms.Button btnXuatExcel;
        private System.Windows.Forms.Button btnDong;
    }
}