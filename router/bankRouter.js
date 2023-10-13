const express = require('express');
const router = express.Router();
const {get_bank, create_bank, update_bank,delete_bank} = require("../controllers/bankControllers")


router.get("/", get_bank)
router.post("/create", create_bank)
router.put("/update/:bank_id", update_bank)
router.delete("/delete/:bank_id", delete_bank)



module.exports = router