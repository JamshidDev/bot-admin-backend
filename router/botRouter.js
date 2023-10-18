const express = require('express');
const router = express.Router();
const {create_member, remove_user,get_all_details, user_statistic} = require("../controllers/botControllers")


router.get("/member", get_all_details)
router.get("/member/statistic", user_statistic)
router.post("/member/create", create_member)
// router.put("/update/:bank_id", update_bank)
router.delete("/member/delete/:user_id", remove_user)



module.exports = router