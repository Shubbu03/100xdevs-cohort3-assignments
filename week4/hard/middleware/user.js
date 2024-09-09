const jwt = require("jsonwebtoken");
const jwt_secret = process.env.JWT_SECRET;

function userMiddleware(req, res, next) {
  const token = req.headers.token;

  if (!token) {
    return res.status(401).json({ message: "Token not found, try again!!" });
  }
  const decodedData = jwt.verify(token, jwt_secret);

  if (decodedData && token) {
    req.email = decodedData.email;
    next();
  } else {
    return res.status(401).json({ message: "User not logged in!!" });
  }
}

module.exports = userMiddleware;
