const { sql, poolPromise } = require('../db');
const NhatKyRepository = require('./NhatKyRepository');

const ThuocRepository = {
  // Thêm thuốc mới vào danh mục
  async themThuocMoi({ maThuoc, tenThuoc, donViTinh, maNhom, moTa, nguoiThucHien }) {
    const ketNoi = await poolPromise;
    await ketNoi.request()
      .input('MaThuoc', sql.VarChar(20), String(maThuoc).trim().toUpperCase())
      .input('TenThuoc', sql.NVarChar(150), String(tenThuoc).trim())
      .input('DonViTinh', sql.NVarChar(20), String(donViTinh).trim())
      .input('MaNhom', sql.VarChar(20), maNhom || 'NHOM01')
      .input('MoTa', sql.NVarChar(255), moTa || '')
      .query(`
        INSERT INTO THUOC (MATHUOC, TENTHUOC, DONVITINH, MANHOM, MOTA)
        VALUES (@MaThuoc, @TenThuoc, @DonViTinh, @MaNhom, @MoTa)
      `);

    await NhatKyRepository.ghiLog(
      nguoiThucHien?.MATAIKHOAN || 'TK02',
      'Thêm danh mục thuốc',
      'THUOC',
      `Quản lý ${nguoiThucHien?.HOTEN || 'Quản lý kho'} thêm thuốc mới: ${maThuoc} - ${tenThuoc} (${donViTinh})`
    );
  },

  // Sửa thông tin thuốc & cập nhật trực tiếp số lượng / hạn dùng các lô (Quyền Quản lý kho)
  async suaThuocVaLo(maThuoc, { tenThuoc, donViTinh, moTa, danhSachLoCapNhat, nguoiThucHien }) {
    const ketNoi = await poolPromise;
    const giaoDich = new sql.Transaction(ketNoi);

    try {
      await giaoDich.begin();

      // 1. Cập nhật thông tin danh mục thuốc
      await new sql.Request(giaoDich)
        .input('MaThuoc', sql.VarChar(20), maThuoc)
        .input('TenThuoc', sql.NVarChar(150), String(tenThuoc).trim())
        .input('DonViTinh', sql.NVarChar(20), String(donViTinh).trim())
        .input('MoTa', sql.NVarChar(255), moTa || '')
        .query(`
          UPDATE THUOC
          SET TENTHUOC = @TenThuoc, DONVITINH = @DonViTinh, MOTA = @MoTa
          WHERE MATHUOC = @MaThuoc
        `);

      // 2. Cập nhật số lượng tồn / hạn sử dụng / trạng thái cho từng lô (nếu có chỉnh sửa)
      const chiTietLogLo = [];
      if (Array.isArray(danhSachLoCapNhat) && danhSachLoCapNhat.length > 0) {
        for (const lo of danhSachLoCapNhat) {
          const soLuongMoi = Math.max(0, Number(lo.SOLUONGTON));
          const trangThaiMoi = lo.TRANGTHAI || 'Active';
          const hanDungMoi = lo.NGAYHETHAN ? String(lo.NGAYHETHAN).slice(0, 10) : null;

          await new sql.Request(giaoDich)
            .input('MaLo', sql.VarChar(20), lo.MALO)
            .input('SoLuongTon', sql.Int, soLuongMoi)
            .input('NgayHetHan', sql.Date, hanDungMoi)
            .input('TrangThai', sql.NVarChar(30), trangThaiMoi)
            .query(`
              UPDATE LOTHUOC
              SET SOLUONGTON = @SoLuongTon,
                  NGAYHETHAN = ISNULL(@NgayHetHan, NGAYHETHAN),
                  TRANGTHAI = @TrangThai
              WHERE MALO = @MaLo
            `);

          chiTietLogLo.push(`Lô ${lo.MALO}: SL=${soLuongMoi}, HSD=${hanDungMoi}, TT=${trangThaiMoi}`);
        }
      }

      // 3. Ghi vết bất biến vào Nhật ký hoạt động
      const moTaChiTiet = chiTietLogLo.length > 0
        ? `Quản lý ${nguoiThucHien?.HOTEN} (${nguoiThucHien?.MATAIKHOAN}) cập nhật thuốc ${maThuoc} (${tenThuoc}) và điều chỉnh lô: [${chiTietLogLo.join(' | ')}]`
        : `Quản lý ${nguoiThucHien?.HOTEN} (${nguoiThucHien?.MATAIKHOAN}) cập nhật thông tin thuốc ${maThuoc} (${tenThuoc} - ${donViTinh})`;

      await NhatKyRepository.ghiLog(
        nguoiThucHien?.MATAIKHOAN || 'TK02',
        'Cập nhật thuốc & số lượng lô',
        'THUOC & LOTHUOC',
        moTaChiTiet,
        giaoDich
      );

      await giaoDich.commit();
    } catch (err) {
      if (giaoDich._aborted === false) await giaoDich.rollback();
      throw err;
    }
  },

  // Xóa thuốc khỏi danh mục (Kiểm tra ràng buộc nếu còn lô)
  async xoaThuoc(maThuoc, nguoiThucHien) {
    const ketNoi = await poolPromise;

    const kiemTraLo = await ketNoi.request()
      .input('MaThuoc', sql.VarChar(20), maThuoc)
      .query(`SELECT COUNT(*) AS SoLo FROM LOTHUOC WHERE MATHUOC = @MaThuoc`);

    if (kiemTraLo.recordset[0].SoLo > 0) {
      throw new Error(`Không thể xóa thuốc ${maThuoc} vì đang có ${kiemTraLo.recordset[0].SoLo} lô thuốc lưu trong kho!`);
    }

    await ketNoi.request()
      .input('MaThuoc', sql.VarChar(20), maThuoc)
      .query(`DELETE FROM THUOC WHERE MATHUOC = @MaThuoc`);

    await NhatKyRepository.ghiLog(
      nguoiThucHien?.MATAIKHOAN || 'TK02',
      'Xóa danh mục thuốc',
      'THUOC',
      `Quản lý ${nguoiThucHien?.HOTEN} (${nguoiThucHien?.MATAIKHOAN}) đã xóa thuốc ${maThuoc} khỏi danh mục.`
    );
  }
};

module.exports = ThuocRepository;