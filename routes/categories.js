const router = require("express").Router();
const categoriesController = require("../controllers/categoriesController");

router
  .route("/")
  .get(categoriesController.findAll)
  .post(categoriesController.create);

router
  .route("/:id")
  .put(categoriesController.update)
  .delete(categoriesController.remove);

module.exports = router;
