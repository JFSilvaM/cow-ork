const router = require("express").Router();
const servicesController = require("../controllers/servicesController");

router
  .route("/")
  .get(servicesController.findAll)
  .post(servicesController.create);

router
  .route("/:id")
  .put(servicesController.update)
  .delete(servicesController.remove);

module.exports = router;
