const mongoose = require("mongoose");

const channelSchema = mongoose.Schema({
        telegram_id: {
            type: Number,
            required: true
        },
        user_id: {
            type: Number,
            required: true,
        },
        username: {
            type: String,
            default: null,
        },
        title: {
            type: String,

        },
        type: {
            type: String,
            required: true
        },
        new_chat: {
            type: Object,
            required: true
        },
        advertising:{
            type:Boolean,
            default:false,
        },
        active: {
            type: Boolean,
            default: true,
        },
    }, {
        timestamps: {
            createdAt: "created_at", // Use `created_at` to store the created date
            updatedAt: "updated_at", // and `updated_at` to store the last updated date
        },
    }
);


const CHANNEL = mongoose.model("CHANNEL", channelSchema)

module.exports = CHANNEL;