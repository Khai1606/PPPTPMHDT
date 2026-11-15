using System.Configuration;
using System.Data;
using System.Data.SqlClient;

namespace QLKT // Đổi thành namespace của project em nếu khác
{
    public static class DatabaseHelper
    {
        public static string ConnStr => ConfigurationManager.ConnectionStrings["QLKTConnectionString"].ConnectionString;

        // Hàm dùng chung để lấy dữ liệu đổ lên DataGridView hoặc ComboBox
        public static DataTable GetData(string sql, params SqlParameter[] parameters)
        {
            using (SqlConnection conn = new SqlConnection(ConnStr))
            using (SqlCommand cmd = new SqlCommand(sql, conn))
            {
                if (parameters != null) cmd.Parameters.AddRange(parameters);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                return dt;
            }
        }

        // Hàm dùng chung cho INSERT, UPDATE, DELETE
        public static int ExecuteNonQuery(string sql, params SqlParameter[] parameters)
        {
            using (SqlConnection conn = new SqlConnection(ConnStr))
            using (SqlCommand cmd = new SqlCommand(sql, conn))
            {
                if (parameters != null) cmd.Parameters.AddRange(parameters);
                conn.Open();
                return cmd.ExecuteNonQuery();
            }
        }
    }
}