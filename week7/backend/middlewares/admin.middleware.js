const jwt = require("jsonwebtoken");

const adminMiddleware = (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    res.status(404).json({
      message: "Token not found!!",
    });
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_ADMIN);

  if (!decoded) {
    res.status(404).json({
      message: "Not signed in!!",
    });
  }

  req.adminId = decoded.id;
  next();
};

module.exports = { adminMiddleware };
