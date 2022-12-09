const { EnvConfig } = require("../config/env_config");

const jwt = require("jsonwebtoken");
const { logError } = require("./logger");
exports.GenerateJWT = (user_id, role, email) => {

  const token = jwt.sign(
    { user_id: user_id, email, role: role },
    process.env[EnvConfig.JWT_KEY],
    {
      expiresIn: "7d",
    }
  );
  return token;
};

exports.VerifyJWT = (req,token) => {
    try {
        const decoded = jwt.verify(token, process.env[EnvConfig.JWT_KEY]);
        req.user = decoded;
        return req
    } catch (err) {
        logError(err)
        req.jwterr = err
        return false
    }
};
