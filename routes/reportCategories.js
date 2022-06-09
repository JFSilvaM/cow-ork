const router = require("express").Router();
const reportCategoriesController = require("../controllers/reportCategoriesController");
const { auth } = require("../middlewares");

router
  .route("/")
  .get(auth.isLoggedIn, auth.isAdmin, reportCategoriesController.findAll)
  .post(auth.isLoggedIn, auth.isAdmin, reportCategoriesController.create);

router
  .route("/:id")
  .put(auth.isLoggedIn, auth.isAdmin, reportCategoriesController.update)
  .delete(auth.isLoggedIn, auth.isAdmin, reportCategoriesController.remove);

module.exports = router;
