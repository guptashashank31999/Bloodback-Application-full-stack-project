const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    
    JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
      console.log("Decode", decode);
      if (err) {
        return res.status(401).send({
          success: false,
          message: "Token is not valid",
        });
      } else {
        req.body.userId = decode.userId;
        next();
      }
    });
  } catch (error) {
    console.log("line 20",error);
    return res.status(401).send({
      success: false,
      error,
      message: "Auth Failed",
    });
  }
};
