const router = require("express").Router();
const bookingsController = require("../controllers/bookingsController");
const { auth } = require("../middlewares");

router
  .route("/")
  .get(auth.isLoggedIn, bookingsController.findAllById)
  .post(auth.isLoggedIn, bookingsController.create);

router.get("/success", bookingsController.checkoutSuccess);
router.get("/canceled", bookingsController.checkoutCanceled);
router.get("/all", auth.isLoggedIn, bookingsController.findAll);

router
  .route("/:id")
  .get(auth.isLoggedIn, bookingsController.findOne)
  .put(auth.isLoggedIn, bookingsController.update)
  .delete(auth.isLoggedIn, bookingsController.remove);

module.exports = router;
