const router = require("express").Router();
const reportCategoriesController = require("../controllers/reportCategoriesController");
const { auth } = require("../middlewares");

router
  .route("/")
  .get(auth.isAdmin, reportCategoriesController.findAll)
  .post(auth.isAdmin, reportCategoriesController.create);

router
  .route("/:id")
  .put(auth.isAdmin, reportCategoriesController.update)
  .delete(auth.isAdmin, reportCategoriesController.remove);

module.exports = router;
