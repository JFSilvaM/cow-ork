const router = require("express").Router();
const bookingsController = require("../controllers/bookingsController");
const { auth } = require("../middlewares");

router
  .route("/")
  .get(auth.isLoggedIn, bookingsController.findAllById)
  .post(auth.isLoggedIn, bookingsController.create);

router.post("/payment_intent", auth.isLoggedIn, bookingsController.payment);

router
  .route("/:id")
  .get(auth.isLoggedIn, bookingsController.findOne)
  .delete(auth.isLoggedIn, bookingsController.remove);

module.exports = router;
