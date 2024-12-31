const conn = require("../config/database");

const Author = {
  getAllAuthor: async () => {
    try {
      const query = "SELECT * FROM company";
      const [result] = await conn.query(query); // Giả sử bạn đang sử dụng một pool kết nối, hãy thay thế pool bằng đối tượng kết nối thực tế của bạn
      return result;
    } catch (error) {
      throw error;
    }
  },
  InsertAuthor: async (tentacgia, motaAuthor) => {
    try {
      const query =
        "INSERT INTO `company` (`namecompany` , `mota_company`) VALUES (?,?) ";
      const result = await conn.execute(query, [tentacgia, motaAuthor]);
      return result;
    } catch (error) {
      throw error;
    }
  },
  GetAuthorID: async (id) => {
    try {
      const query = "SELECT * FROM company WHERE id_company = ? ";
      const [result] = await conn.execute(query, [id]);
      return result;
    } catch (error) {
      throw error;
    }
  },
  DeleteAuthorID: async (id) => {
    try {
      const query = "DELETE FROM company WHERE id_company = ? ";
      const result = await conn.execute(query, [id]);
      return result;
    } catch (error) {
      throw error;
    }
  },
  UpdateAuhtor: async(tentacgia , motaAuthor , id) => {
    try {
      const query = "UPDATE `company` SET `namecompany` = ? , `mota_company` = ? WHERE `company`.`id_company` = ?";
      const result = await conn.execute(query , [tentacgia , motaAuthor , id]);
      return result ;
    } catch (error) {
      throw error;
    }
  }
};
module.exports = Author;
