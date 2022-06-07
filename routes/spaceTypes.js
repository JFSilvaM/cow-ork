const router = require("express").Router();
const spaceTypesController = require("../controllers/spaceTypesController");

router
  .route("/")
  .get(spaceTypesController.findAll)
  .post(spaceTypesController.create);

router
  .route("/:id")
  .put(spaceTypesController.update)
  .delete(spaceTypesController.remove);

module.exports = router;
