const JWT = require("jsonwebtoken")

require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;

const generateToken = (id)=>{
    let token = JWT.sign({_id:id}, SECRET_KEY);
    return token;
}

// Export module

module.exports = {generateToken}