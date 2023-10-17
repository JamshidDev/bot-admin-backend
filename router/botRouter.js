const express = require('express');
const router = express.Router();
const {create_member} = require("../controllers/botControllers")


// router.get("/", get_bank)
router.post("/member/create", create_member)
// router.put("/update/:bank_id", update_bank)
// router.delete("/delete/:bank_id", delete_bank)



module.exports = router