exports.verifyAccess = async (req, res, next) => {
  
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).json({
      message: "Please login to access this resource.",
    });
  }
  try {
    const rawResponse = await fetch(
        process.env.SERVER_BASE_URL + "/auth/check",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: req.headers["authorization"],
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            route: req._parsedUrl.pathname,
            method: req.method,
          }),
        }
      );
      if (rawResponse.status == 200) {
        req.user = (await rawResponse.json()).user
        console.log("User ",req.user)
        next();
      } else {
        return res.status(403).json({
          message: (await rawResponse.json()).message
        });
      }
  } catch (e) {
    return res.status(403).json({
        message: e.message,
    });
  }
};
