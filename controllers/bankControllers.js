const BANK = require("../models/bankModels");

const get_bank = async (req, res) => {
  try {
    let page = req.query.page || 1;
    let per_page = req.query.per_page || 10;
    let sort = req.query.sort || 1;
    let search = req.query.search || "";
    let total_item = 0;

    total_item = await BANK.countDocuments({active:true, result_uz: { $regex: search, $options: "i" }, result_ru: { $regex: search, $options: "i" } });
    let bank = await BANK.find({active:true, result_uz: { $regex: search, $options: "i" }, result_ru: { $regex: search, $options: "i" } })
      .sort({ created_at: sort })
      .skip((page - 1) * per_page)
      .limit(per_page);

    res.status(200).json({
      status: true,
      message: null,
      total_item,
      data: bank,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const create_bank = async (req, res) => {
  try {
    let { debet, kredit, result_uz, result_ru } = req.body;

    let existBank = await BANK.findOne({ debet, kredit, active:true });
    if (!existBank) {
      let count = await BANK.countDocuments({});
      let bank = await BANK.create({
        number: count + 1,
        debet,
        kredit,
        result_uz,
        result_ru,
      });
      res.status(200).json({
        status: true,
        message: "Muvofaqiyatli yarataildi",
      });
    } else {
      res.status(400).json({
        status: false,
        message: "Allaqachon ro'yhatga olingan debet va kredit raqamlar",
        data: existBank,
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

const update_bank = async (req, res) => {
  try {
    let bank_id = req.params.bank_id;
    let { debet, kredit, result_uz, result_ru } = req.body;

    let existBank = await BANK.findOne({ debet, kredit, active:true });
    if(existBank  &&  existBank?._id == bank_id){
      let bank = await BANK.findByIdAndUpdate(bank_id, {
        debet,
        kredit,
        result_uz,
        result_ru,
      });
      res.status(200).json({
        status: true,
        message: "Muvofaqiyatli tahrirlandi",
      });
    }else{
      res.status(400).json({
        status: true,
        message: "Mavjud bo'lgan debet va kredit raqamlar",
        data:existBank
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

const delete_bank = async (req, res) => {
  try {
    let bank_id = req.params.bank_id;
    let bank = await BANK.findByIdAndUpdate(bank_id, {
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

module.exports = { get_bank, create_bank, update_bank, delete_bank };
