const express = require('express');
const router = express.Router();
const {premium_services, create_member, remove_user,get_all_details, user_statistic} = require("../controllers/botControllers")


router.get("/member", get_all_details)
router.get("/member/statistic", user_statistic)
router.post("/member/create", create_member)
router.delete("/member/delete/:user_id", remove_user)

router.get("/services", premium_services)



module.exports = router