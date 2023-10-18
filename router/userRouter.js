const express = require('express');
const router = express.Router();
const {get_all_users} = require("../controllers/userControllers")


router.get("/all", get_all_users)




module.exports = router