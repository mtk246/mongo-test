//const { CustomError } = require("../middlewares/error_middlware")

const { ctrx } = require("../helper/crud");
const { DB } = require("../helper/db_helper");
const { GenerateJWT } = require("../helper/jwt_helper");

// slint-disable-next-line no-unused-vars
exports.hello = (req, res, next) => {
  res.status(200).json({
    message: "Hello Yan",
    info: req.user
  });
};

exports.gen = (req,res,next) => {
    res.status(200).json({
        token: GenerateJWT("test","Admin","yan@gmail.com")
    })
}

exports.exampleRaQuery = ctrx(async (req,res) => {
  res.status(200).json({
    message: "Success",
    data: await new DB(req,'select * from public.city_tbl').findOne()
  })
});