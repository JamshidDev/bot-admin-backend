const MEMBER = require("../models/memberModels");

const create_member = async (req, res) => {
  try {
    let { fullName, user_id, username, referal_id } = req.body;
    let existUser = await MEMBER.findOne({ user_id });

    if (!existUser) {
      let offer_user = await MEMBER.findOne({ user_id: referal_id });
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


const remove_user = async (req, res) => {
  try {
    let user_id = req.params.user_id;
    let existUser = await MEMBER.findOne({ user_id });
    if (existUser) {

      // if(existUser.referal_id){
      //   let inviter_user = await MEMBER.findOne({ user_id: +existUser.referal_id }); 
      //   await MEMBER.findByIdAndUpdate(inviter_user._id, {
      //     invited_users: inviter_user.invited_users - 1,
      //   });
      // }
      await MEMBER.findByIdAndUpdate(existUser._id, {
        active: false,
      });
      return res.status(200).json({
        status: true,
        message: "Foydalanuvchi muvofaqiyatli ravishda o'chirildi!",
      });

    } else {
      return res.status(200).json({
        status: false,
        message: "user_id ga mos foydalanuvchi ro'yhatdan topilmadi!",
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


const get_all_details = async (req, res) => {
  try {
    let all_active_users = await MEMBER.find({ active: true })
    return res.status(200).json({
      status: true,
      data: all_active_users,
      message: null,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
}


const user_statistic = async (req, res) => {
  try {
    let active_count = await MEMBER.countDocuments({ active: true })
    let count = await MEMBER.countDocuments()
    return res.status(200).json({
      status: true,
      data: {
        all_users_count: count,
        active_users_count: active_count,
        inactive_users_count: count - active_count,
      },
      message: null,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
}

module.exports = { create_member, remove_user, get_all_details, user_statistic };
