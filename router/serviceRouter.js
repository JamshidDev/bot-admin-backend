const express = require('express');
const router = express.Router();
const {get_categories, create_category,update_category,delete_category } = require("../controllers/serviceControllers")


router.get("/category/all", get_categories)
router.post("/category/create", create_category)
router.put("/category/update/:category_id", update_category)
router.delete("/category/delete/:category_id", delete_category)




module.exports = router