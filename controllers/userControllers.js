const MEMBER = require("../models/memberModels");



const get_all_users = async (req, res) => {
    try {
        let page = req.query.page || 1;
        let per_page = req.query.per_page || 10;
        let sort = req.query.sort || 1;
        let search = req.query.search || "";
        let total_item = 0;
    
        total_item = await MEMBER.countDocuments({active:true, fullName: { $regex: search, $options: "i" } });
        let users = await MEMBER.find({active:true, fullName: { $regex: search, $options: "i" },  })
          .sort({ created_at: sort })
          .skip((page - 1) * per_page)
          .limit(per_page);
    
        res.status(200).json({
          status: true,
          message: null,
          total_item,
          data: users,
        });
      } catch (error) {
        console.log(error.message);
        res.status(500).json({
          status: false,
          message: error.message,
        });
      }
}


module.exports = { get_all_users };
