const ADMIN = require("../models/authModels");
const { generateToken } = require("../utils/generateToken");

const registerAdmin = async (req, res) => {
  try {
    let { fullName, login, password } = req.body;
    let existAdmin = await ADMIN.findOne({ login });

    if (!existAdmin) {
      let admin = await ADMIN.create({
        fullName,
        login,
        password,
      });
      res.status(200).json({
        status: true,
        message: "Admin muvofaqiyatli registratsiya qilindi!",
      });
    } else {
      res.status(400).json({
        status: false,
        message: "Siz allaqachon registratsiyadan o'tgansiz.",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const loginAdmin = async (req, res) => {
  try {
    let { login, password } = req.body;
    let existAdmin = await ADMIN.findOne({ login, password });

    if (existAdmin) {
      let token = generateToken(existAdmin._id);
      res.status(200).json({
        data: existAdmin,
        access_token: token,
        refresh_token: token,
        status: true,
        message: "",
      });
    } else {
      res.status(401).json({
        status: false,
        message: "Login yoki parol noto'g'ri!",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = { registerAdmin, loginAdmin };
