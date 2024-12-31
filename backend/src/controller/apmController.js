const Apm = require("../model/appointments");


const User = require("../model/user");
const HandleInsertApm = async (req, res) => {
  try {
    const id_user = req.user.userID;

    const { phone_number, appointment_date, trainer_id, description } =
      req.body;
    console.log(req.body);
    const result = await Apm.InsertAppontment(id_user , trainer_id ,appointment_date, phone_number, description  )
    res.status(200).json(result)
    
  } catch (error) {
    res.status(500).send("SERVER ERROR");
    console.error(error);
  }
}
  const HandlegetUserRole = async (req, res) => {
    try {
      const data = await User.getUserRole();
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  };

const GetListByUser = async (req, res) => {
  try {
    const id_user = req.user.userID;
    console.log(id_user);
    const data =  await Apm.getID_Apm_Customer(id_user);
    console.log(data);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send("SERVER ERROR");
    console.error(error);
  }
};
const GetListApmAdmin = async (req, res) => {
  try {
    const id_user = req.user.userID;
    console.log(id_user);
    const data =  await Apm.getID_Apm_Admin(id_user);
    console.log(data);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send("SERVER ERROR");
    console.error(error);
  }
};
const UpdateApmAdmin = async (req , res) => {
    try {
        const id = req.params.id;
        await Apm.UpdateAuhtor(id);
        res.status(200).json("Update thanh cong")
    } catch (error) {
        res.status(500).send("SERVER ERROR");
        console.error(error);
    }
}


module.exports = {
  HandleInsertApm,
  HandlegetUserRole,
  GetListByUser,
  GetListApmAdmin,
  UpdateApmAdmin,
};
