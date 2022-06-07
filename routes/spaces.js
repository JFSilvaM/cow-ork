const router = require("express").Router();
const spacesController = require("../controllers/spacesController.js");

router.route("/").get(spacesController.findAll).post(spacesController.create);

router
  .route("/:id")
  .get(spacesController.findOne)
  .put(spacesController.update)
  .delete(spacesController.remove);

module.exports = router;
