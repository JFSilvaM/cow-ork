const router = require("express").Router();
const reportsController = require("../controllers/reportsController");
const { auth } = require("../middlewares");

router
  .route("/")
  .get(auth.isLoggedIn, reportsController.findAll)
  .post(auth.isLoggedIn, reportsController.create);

router
  .route("/:id")
  .get(auth.isLoggedIn, reportsController.findOne)
  .put(auth.isLoggedIn, reportsController.update)
  .delete(auth.isLoggedIn, reportsController.remove);

module.exports = router;
