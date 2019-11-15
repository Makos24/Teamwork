const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_SECRET");
    const userId = decodedToken.userId;
    const role = decodedToken.role;
    if (req.body.userId !== userId && role !== 1) {
      throw "Invalid User ID";
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: "Invalid request"
    });
  }
};
