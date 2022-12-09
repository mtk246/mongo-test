const { VerifyJWT } = require("../helper/jwt_helper");

exports.IsAdmin = (req, res, next) => {
  const token=req.headers["authorization"]
  if(!token) {
    return res.status(403).json({
        message: "Please login to access this resource.",
    });
  }
  const decoded=VerifyJWT(req,token.split(" ")[1])
  if(decoded) {
    if (req.user.role=="Admin") {
        return next()
    } else {
        return res.status(403).json({
            message: "Please login to access this resource.",
        });
    }
  } else {
    return res.status(403).json({
        message: req.jwterr+"",
    });
  }
};

exports.IsAuthenticated = (req, res, next) => {
  const token=req.headers["authentication"]
  if(!token) {
    return res.status(403).json({
        message: "Please login to access this resource.",
    });
  }
  const decoded=VerifyJWT(req,token.split(" ")[1])
  if(decoded) {
    return next()
  } else {
    return res.status(403).json({
        message: req.jwterr+"",
    });
  }
};
