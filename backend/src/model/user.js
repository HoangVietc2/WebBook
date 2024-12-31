const conn = require("../config/database");

function User(newuser) {
  this.username = newuser.username;
  this.email = newuser.email;
  this.password = newuser.password;
  this.role = newuser.role;
  this.token = newuser.token;
}

User.getAllUser = async function () {
  try {
    const query =
      "SELECT users.*, role.role_name FROM users INNER JOIN role ON users.role_id = role.id_role WHERE role_id = 2 OR role_id = 3 OR role_id=4";
    const [result] = await conn.execute(query);
    return result;
  } catch (error) {
    throw error;
  }
};
User.getUserRole = async function () {
  try {
    const query =
      "SELECT users.*, role.role_name FROM users INNER JOIN role ON users.role_id = role.id_role WHERE role_id = 2 OR role_id = 3";
    const [result] = await conn.execute(query);
    return result;
  } catch (error) {
    throw error;
  }
};
User.SignUp = async function (newuser) {
  try {
    const query =
      "INSERT INTO `users` (`username`, `email`, `password`, `role_id`) VALUES (?,?,?,?)";
    const result = await conn.execute(query, [
      newuser.username,
      newuser.email,
      newuser.password,
      newuser.role,
    ]);
    return result;
  } catch (error) {
    throw error;
  }
};

User.FindoneByEmail = async function (newuser) {
  try {
    const query = "SELECT * FROM users WHERE email = ?";
    const [result] = await conn.execute(query, [newuser.email]);
    return result;
  } catch (error) {
    throw error;
  }
};
User.getByID = async function (id) {
  try {
    const query =
      "SELECT users.*, role.role_name FROM users INNER JOIN role ON users.role_id = role.id_role WHERE id_user = ? ";
    const [result] = await conn.execute(query, [id]);
    return result;
  } catch (error) {
    throw error;
  }
};
User.Update = async function (newUser, id) {
  try {
    const query =
      "UPDATE `users` SET `role_id` = ? WHERE `users`.`id_user` = ?";
    const result = conn.execute(query, [newUser.role, id]);
    return result;
  } catch (error) {
    throw error;
  }
};
User.Delete = async function (id) {
  try {
    const query = "DELETE FROM users WHERE id = ? ";
    const result = conn.execute(query, [id]);
    return result;
  } catch (error) {
    throw error;
  }
};
User.GetCount = async function () {
  try {
    const query = "SELECT COUNT(*) AS total_users FROM users";
    const [result] = await conn.execute(query);
    return result[0]["total_users"];
  } catch (error) {
    throw error;
  }
};

module.exports = User;
