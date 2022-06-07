const router = require("express").Router();
const reportCategoriesController = require("../controllers/reportCategoriesController");

router
  .route("/")
  .get(reportCategoriesController.findAll)
  .post(reportCategoriesController.create);

router
  .route("/:id")
  .put(reportCategoriesController.update)
  .delete(reportCategoriesController.remove);

module.exports = router;
