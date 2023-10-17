const MEMBER = require("../models/memberModels");

const create_member = async (req, res) => {
  try {
    let { fullName, user_id, username, referal_id } = req.body;
    console.log(req.body);
    let existUser = await MEMBER.findOne({ user_id });
    console.log(existUser);

    if (!existUser) {
      let offer_user = await MEMBER.findOne({ user_id: referal_id });
      console.log(offer_user);
        if (offer_user) {
          await MEMBER.findByIdAndUpdate(offer_user._id, {
            invited_users: offer_user.invited_users + 1,
          });
        }
        let member = await MEMBER.create({
          fullName,
          user_id,
          username,
          referal_id,
        });

        console.log(member);

        return res.status(200).json({
          status: true,
          message: "Muvofaqiyatli ro'yhatga olindi!",
        });
      
    } else {
      await MEMBER.findByIdAndUpdate(existUser._id, {
        fullName,
        user_id,
        username,
        active: true,
      });
      console.log("no");
      return res.status(200).json({
        status: false,
        message: "Foydalanuvchi allaqachon ro'yhatdan o'tgan!",
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = { create_member };
