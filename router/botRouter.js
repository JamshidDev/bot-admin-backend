const express = require('express');
const router = express.Router();
const {update_advertising ,register_admin, remove_admin, channel_list} = require("../controllers/channelController")
const {search_bank,premium_services, create_member, remove_user,get_all_details, user_statistic} = require("../controllers/botControllers")




router.get("/member", get_all_details)
router.get("/member/statistic", user_statistic)
router.post("/member/create", create_member)
router.delete("/member/delete/:user_id", remove_user)

router.get("/services", premium_services)

router.get("/admin/", channel_list)
router.post("/admin", register_admin)
router.delete("/admin/:id", remove_admin)
router.put("/admin/:id", update_advertising)

router.get("/bank/:debet/:kredit", search_bank)








module.exports = router