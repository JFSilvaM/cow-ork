const router = require("express").Router();
const usersController = require("../controllers/usersController");

router.route("/").get(usersController.findAll);

router
  .route("/:id")
  .get(usersController.findOne)
  .put(usersController.update)
  .delete(usersController.remove);

module.exports = router;
