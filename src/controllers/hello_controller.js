//const { CustomError } = require("../middlewares/error_middlware")

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