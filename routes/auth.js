const router = require("express").Router();
const authController = require("../controllers/authController.js");
const { auth } = require("../middlewares");

router.post("/login", auth.isGuest, authController.login);
router.post("/logout", auth.isLoggedIn, authController.logout);
router.post("/register", auth.isGuest, authController.register);

module.exports = router;
