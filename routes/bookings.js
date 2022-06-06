const router = require("express").Router();
const bookingsController = require("../controllers/bookingsController");

router
  .route("/")
  .get(bookingsController.findAll)
  .post(bookingsController.create);

router
  .route("/:id")
  .get(bookingsController.findOne)
  .put(bookingsController.update)
  .delete(bookingsController.remove);

module.exports = router;
