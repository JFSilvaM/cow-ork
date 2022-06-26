const jwt = require("jsonwebtoken");
const { generateError } = require("../lib");
const {
  ACCOUNT_NOT_AUTHORIZED,
  ACCOUNT_LOGIN,
  ACCOUNT_ALREADY_LOGGED_IN,
} = require("../messages/messages");

const { JWT_SECRET } = process.env;

const isAdmin = (req, res, next) => {
  try {
    if (!req.auth.is_admin) {
      generateError(ACCOUNT_NOT_AUTHORIZED, 403);
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
      generateError(ACCOUNT_LOGIN, 401);
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
      generateError(ACCOUNT_ALREADY_LOGGED_IN, 403);
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
