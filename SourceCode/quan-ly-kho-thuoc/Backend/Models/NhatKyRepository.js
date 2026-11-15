const { sql, poolPromise } = require('../db');

const NhatKyRepository = {
  // Hàm ghi log bất biến (Append-only)
  async ghiLog(maTaiKhoan, hanhDong, doiTuong, chiTiet, transaction = null) {
    const request = transaction
      ? new sql.Request(transaction)
      : (await poolPromise).request();

    await request
      .input('MaLog', sql.VarChar(50), 'LOG' + Date.now() + Math.floor(Math.random() * 100))
      .input('MaTK', sql.VarChar(50), maTaiKhoan)
      .input('HanhDong', sql.NVarChar(100), hanhDong)
      .input('DoiTuong', sql.NVarChar(100), doiTuong)
      .input('ChiTiet', sql.NVarChar(500), chiTiet)
      .query(`
        INSERT INTO NHATKYHOATDONG (MALOG, MATAIKHOAN, HANHDONG, DOITUONGTACDONG, THOIGIAN, CHITIET)
        VALUES (@MaLog, @MaTK, @HanhDong, @DoiTuong, GETDATE(), @ChiTiet)
      `);
  },

  // Hàm lấy toàn bộ nhật ký sắp xếp mới nhất lên đầu
  async layDanhSach() {
    const ketNoi = await poolPromise;
    const ketQua = await ketNoi.request().query(`
      SELECT MALOG, MATAIKHOAN, HANHDONG, DOITUONGTACDONG, THOIGIAN, CHITIET
      FROM NHATKYHOATDONG
      ORDER BY THOIGIAN DESC
    `);
    return ketQua.recordset;
  }
};

module.exports = NhatKyRepository;