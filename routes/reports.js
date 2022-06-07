const router = require("express").Router();
const reportsController = require("../controllers/reportsController");

router.route("/").get(reportsController.findAll).post(reportsController.create);

router
  .route("/:id")
  .get(reportsController.findOne)
  .put(reportsController.update)
  .delete(reportsController.remove);

module.exports = router;
