const router = require("express").Router();
const authController = require("../controllers/authController.js");
const { auth } = require("../middlewares");

router.post("/login", auth.isGuest, authController.login);
router.post("/register", auth.isGuest, authController.register);
router.put("/activate/:activation_code", auth.isGuest, authController.activate);

module.exports = router;
