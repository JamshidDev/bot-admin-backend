const JWT = require("jsonwebtoken");
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;

module.exports = async function auth(req, res, next) {
  const token = req.headers.authorization
    ? req.headers.authorization.split(" ")[1]
    : null;
  if (token) {
    try {
      const decoded = JWT.verify(token, SECRET_KEY);
      req.user_id = decoded._id;
      next();
    } catch (error) {
      res.status(401).json({
        status: false,
        message: "Your token is invalid",
      });
    }
  } else {
    res.status(401).json({
      status: false,
      message: "401 Error Unauthorized Access",
    });
  }
};
