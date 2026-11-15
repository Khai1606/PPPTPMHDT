const jwt = require('jsonwebtoken');

const KHOA_BI_MAT = process.env.JWT_SECRET || 'HLT03_QUAN_LY_KHO_THUOC_2026';

const Helper = {
    // Tạo Token chứa mã tài khoản và vai trò
    taoToken(taiKhoan) {
        return jwt.sign(
            {
                maTaiKhoan: taiKhoan.MATAIKHOAN,
                tenDangNhap: taiKhoan.TENDANGNHAP,
                vaiTro: taiKhoan.VAITRO
            },
            KHOA_BI_MAT,
            { expiresIn: '8h' }
        );
    }
};

module.exports = Helper;