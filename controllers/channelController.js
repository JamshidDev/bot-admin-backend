const CHANNEL = require("../models/channelModels")
const MEMBER = require("../models/memberModels");
const BANK = require("../models/bankModels");


const register_admin = async (req, res) => {

    try {
        const {telegram_id, user_id, username, title, type, new_chat} = req.body;

        let exist_channel = await CHANNEL.findOne({telegram_id})

        if (!exist_channel) {
            let channel = await CHANNEL.create({
                telegram_id,
                user_id,
                username,
                title,
                type,
                new_chat,
            })
            return res.status(200).json({
                status: true,
                data: channel,
                message: "Muvofaqiyatli yaratildi!",
            });
        } else {
            await CHANNEL.findByIdAndUpdate(exist_channel._id, {
                telegram_id,
                user_id,
                username,
                title,
                type,
                new_chat,
                active: true,
            });
            return res.status(200).json({
                status: false,
                message: "Muvofaqiyatli tahrirlandi!",
            });

        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            status: false,
            message: error.message,
        });
    }

}

const remove_admin = async (req, res) => {
    try {
        const telegram_id = req.params.id;

        let admin = await CHANNEL.findOne({telegram_id, active: true})
        if (admin) {
            await CHANNEL.findByIdAndUpdate(admin._id, {
                active: false,
            });
            return res.status(200).json({
                status: true,
                message: "Adminlik huquqi olib tashlandi!",
            });
        } else {
            return res.status(404).json({
                status: false,
                message: "Channel topilmadi",
            });
        }

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            status: false,
            message: error.message,
        });
    }
}


const channel_list = async (req, res) => {
    try {
        let page = req.query.page || 1;
        let per_page = req.query.per_page || 10;
        let sort = req.query.sort || 1;
        let search = req.query.search || "";
        let total_item = 0;

        total_item = await CHANNEL.countDocuments({active: true});
        let item_data = await CHANNEL.find({active: true})
            .sort({created_at: sort})
            .skip((page - 1) * per_page)
            .limit(per_page);
        res.status(200).json({
            status: true,
            message: null,
            total_item,
            data: item_data,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            status: false,
            message: error.message,
        });
    }
};

const update_advertising = async (req, res) => {
    try {
        const telegram_id = req.params.id;
        const {advertising} = req.body;

        let admin = await CHANNEL.findOne({telegram_id, active: true})
        if (admin) {
            await CHANNEL.findByIdAndUpdate(admin._id, {
                advertising,

            });
            return res.status(200).json({
                status: false,
                message: "Muvofaqiyatli tahrirlandi!",
            });

        } else {
            return res.status(404).json({
                status: false,
                message: "Channel topilmadi!",
            });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            status: false,
            message: error.message,
        });
    }
}

module.exports = {register_admin, remove_admin, channel_list,update_advertising}