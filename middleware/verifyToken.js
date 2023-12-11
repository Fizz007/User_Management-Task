var jwt = require("jsonwebtoken");
const SECRET_KEY = "Dhwani123";

const authenticateUser = async (req, res, next) => {
  const bearerHeader = req.headers["authorisation"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    try {
      const validate = jwt.verify(token, SECRET_KEY);
      req.userInfo = validate;
      next();
    } catch (err) {
      return res.send({ message: "invalid Token " + err.message });
    }
  } 
};

module.exports = authenticateUser;
