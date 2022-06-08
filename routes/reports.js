const router = require("express").Router();
const reportsController = require("../controllers/reportsController");
const { auth } = require("../middlewares");

router
  .route("/")
  .get(auth.isLoggedIn, auth.isAdmin, reportsController.findAll)
  .post(auth.isLoggedIn, auth.isAdmin, reportsController.create);

router
  .route("/:id")
  .get(auth.isLoggedIn, auth.isAdmin, reportsController.findOne)
  .put(auth.isLoggedIn, auth.isAdmin, reportsController.update)
  .delete(auth.isLoggedIn, auth.isAdmin, reportsController.remove);

module.exports = router;
