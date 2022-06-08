const jwt = require("jsonwebtoken");
const { generateError } = require("../lib");

const { JWT_SECRET } = process.env;

const isAdmin = (req, res, next) => {
  try {
    if (!req.auth.is_admin) {
      generateError("No tienes permisos para realizar esta acción", 403);
    }

    next();
  } catch (error) {
    next(error);
  }
};

const isLoggedIn = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const [tokenType, token] = authorization?.split(" ") || [];

    if (tokenType !== "Bearer" || !token) {
      generateError("Ingresa con tu cuenta para continuar", 400);
    }

    req.auth = jwt.verify(token, JWT_SECRET);

    next();
  } catch (error) {
    next(error);
  }
};

const isGuest = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const [tokenType, token] = authorization?.split(" ") || [];

    if (tokenType === "Bearer" && token) {
      generateError("Ya estás ingresado en tu cuenta", 403);
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  isAdmin,
  isLoggedIn,
  isGuest,
};
