const router = require("express").Router();
const bookingsController = require("../controllers/bookingsController");
const { auth } = require("../middlewares");

router
  .route("/")
  .get(auth.isLoggedIn, auth.isAdmin, bookingsController.findAll)
  .post(auth.isLoggedIn, auth.isAdmin, bookingsController.create);

router
  .route("/:id")
  .get(auth.isLoggedIn, auth.isAdmin, bookingsController.findOne)
  .put(auth.isLoggedIn, auth.isAdmin, bookingsController.update)
  .delete(auth.isLoggedIn, auth.isAdmin, bookingsController.remove);

module.exports = router;
