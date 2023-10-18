const CATEGORY = require("../models/categoryModels");



const get_categories = async (req, res) => {
    try {
        let page = req.query.page || 1;
        let per_page = req.query.per_page || 10;
        let sort = req.query.sort || 1;
        let search = req.query.search || "";
        let total_item = 0;

        total_item = await CATEGORY.countDocuments({ active: true, });
        let items = await CATEGORY.find({ active: true, })
            .sort({ created_at: sort })
            .skip((page - 1) * per_page)
            .limit(per_page);

        res.status(200).json({
            status: true,
            message: null,
            total_item,
            data: items,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            status: false,
            message: error.message,
        });
    }
}

const create_category = async (req, res) => {
    try {
        let { name_ru, name_uz, } = req.body;
        let category = await CATEGORY.create({
            name_uz,
            name_ru,
        });
        res.status(200).json({
            status: true,
            data: category,
            message: "Muvofaqiyatli yarataildi",
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            status: false,
            message: error.message,
        });
    }
};

const update_category = async (req, res) => {
    try {
        let category_id = req.params.category_id;
        let { name_ru, name_uz, } = req.body;
        let category = await CATEGORY.findByIdAndUpdate(category_id, {
            name_uz,
            name_ru,
        });

        res.status(200).json({
            status: true,
            data: category,
            message: "Muvofaqiyatli tahrirlandi",
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            status: false,
            message: error.message,
        });
    }
};
const delete_category = async (req, res) => {
    try {
        let category_id = req.params.category_id;
        await CATEGORY.findByIdAndUpdate(category_id, {
            active: false,
        });
        res.status(200).json({
            status: true,
            message: "Muvofaqiyatli o'chirildi",
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            status: false,
            message: error.message,
        });
    }
};

module.exports = { get_categories ,create_category, update_category, delete_category };
