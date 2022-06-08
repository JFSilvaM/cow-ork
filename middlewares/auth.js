const jwt = require("jsonwebtoken");
const { generateError } = require("../lib");

const { JWT_SECRET } = process.env;

const isAdmin = (req, res, next) => {
  console.log("isAdmin");
  next();
};

const isLoggedIn = (req, res, next) => {
  console.log("isLoggedIn");
  next();
};

const isGuest = (req, res, next) => {
  console.log("isGuest");
  next();
};

const validateAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      generateError("Falta la cabecera de autorización", 400);
    }

    const [tokenType, token] = authorization.split(" ");

    if (tokenType !== "Bearer" || !token) {
      generateError("Formato de token inválido", 400);
    }

    const tokenInfo = jwt.verify(token, JWT_SECRET);

    req.auth = tokenInfo;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  isAdmin,
  isLoggedIn,
  isGuest,
  validateAuth,
};
