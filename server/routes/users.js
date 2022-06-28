const router = require("express").Router();
const usersController = require("../controllers/usersController");
const { auth } = require("../middlewares");

router.route("/").get(auth.isLoggedIn, auth.isAdmin, usersController.findAll);

router.route("/profile").get(auth.isLoggedIn, usersController.findProfile);

router
  .route("/:id")
  .get(auth.isLoggedIn, usersController.findOne)
  .put(auth.isLoggedIn, usersController.update)
  .delete(auth.isLoggedIn, auth.isAdmin, usersController.remove);

module.exports = router;
