const conn = require("../config/database");

const Appointment = {
  getID_Apm_Customer: async (id) => {
    try {
      const query =
        "SELECT a.*, t.username AS trainer_name FROM appointment a JOIN users t ON a.trainer_id = t.id_user WHERE a.user_id = ? ORDER BY a.appointment_date DESC;";
      const [result] = await conn.query(query, [id]); // Giả sử bạn đang sử dụng một pool kết nối, hãy thay thế pool bằng đối tượng kết nối thực tế của bạn
      return result;
    } catch (error) {
      throw error;
    }
  },
  getID_Apm_Admin: async (id) => {
    try {
      const query =
        "SELECT a.*, t.username AS trainer_name FROM appointment a JOIN users t ON a.user_id = t.id_user WHERE a.trainer_id = ? ORDER BY a.appointment_date DESC;";
      const [result] = await conn.query(query, [id]); // Giả sử bạn đang sử dụng một pool kết nối, hãy thay thế pool bằng đối tượng kết nối thực tế của bạn
      return result;
    } catch (error) {
      throw error;
    }
  },
  InsertAppontment: async (
    id_customer,
    id_pt,
    appointment_date,
    phone_number,
    description
  ) => {
    try {
      const query =
        "INSERT INTO `appointment` (`user_id`, `trainer_id`, `appointment_date`, `phone_number`, `description`, `status`) VALUES (?, ?, ?, ?, ?, ?);";
      const result = await conn.execute(query, [
        id_customer,
        id_pt,
        appointment_date,
        phone_number,
        description,
        "pending", // Giá trị mặc định cho status
      ]);
      return result;
    } catch (error) {
      throw error;
    }
  },
  UpdateAuhtor: async(id) => {
    try {
      const query =
        "UPDATE `appointment` SET `status` = 'completed' WHERE `appointment`.`id` = ?;";
      const result = await conn.execute(query , [id]);
      return result ;
    } catch (error) {
      throw error;
    }
  }

};

// Đảm bảo module.exports nằm bên ngoài object Appointment
module.exports = Appointment ;