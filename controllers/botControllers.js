const { MEMBER } = require("../models/memberModels");

const create_member = async (req, res) => {
  try {
    let { fullName, user_id, username, referal_id } = req.body;
    let existUser = await MEMBER.findOne({ user_id });

    if (!existUser) {
      let offer_user = await MEMBER.findOne({ user_id: referal_id });
      if (offer_user) {
        if (offer_user) {
          await MEMBER.findByIdAndUpdate(offer_user._id, {
            invited_users: offer_user.invited_users + 1,
          });
        }
        await MEMBER.create({
          fullName,
          user_id,
          username,
          referal_id,
        });

        res.status(200).json({
          status: true,
          message: "Muvofaqiyatli ro'yhatga olindi!",
        });
      }
    } else {
      await MEMBER.findByIdAndUpdate(existUser._id, {
        fullName,
        user_id,
        username,
        active: true,
      });
      res.status(200).json({
        status: false,
        message: "Foydalanuvchi allaqachon ro'yhatdan o'tgan!",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};




module.exports = {create_member}
