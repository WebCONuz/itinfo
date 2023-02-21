const jwt = require("../services/JwtService");
const config = require("config");

module.exports = function (authorRoles) {
  return function (req, res, next) {
    if (req.method === "OPTIONS") {
      next();
    }
    try {
      const authorization = req.headers.authorization;
      if (!authorization) {
        return res.status(403).json({ message: "Avtor ro'yxatdan o'tmagan" });
      }

      const token = authorization.split(" ")[1];
      if (!token) {
        return res.status(403).json({ message: "Avtor ro'yxatdan o'tmagan" });
      }

      const { expert, roles } = jwt.verify(token, config.get("secret_key"), {});
      let hasRole = false;

      roles.forEach((role) => {
        if (authorRoles.includes(role)) {
          hasRole = true;
        }
      });

      if (!expert || !hasRole) {
        return res.status(403).json({ message: "Sizga ruxsat etilmagan" });
      }
      next();
    } catch (err) {
      console.log(err);
      return res.status(403).json({ message: "Avtor ro'yxatdan o'tmagan" });
    }
  };
};
