const jwt = require("../services/JwtService");
const config = require("config");

module.exports = async function (req, res, next) {
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

    const [err, decodedData] = await to(
      jwt.verify(token, config.get("secret_key"), {})
    );
    if (err) {
      return res.badRequest({ frendlyMsg: err.message });
    }
    req.author = decodedData;
    console.log(decodedData);
    next();
  } catch (err) {
    console.log(err);
    return res.status(403).json({ message: "Avtor ro'yxatdan o'tmagan" });
  }
};

async function to() {
  return promise.then((response) => [null, response]).catch((error) => [error]);
}
