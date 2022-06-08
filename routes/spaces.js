const router = require("express").Router();
const spacesController = require("../controllers/spacesController.js");
const { auth } = require("../middlewares");

router
  .route("/")
  .get(spacesController.findAll)
  .post(auth.isLoggedIn, auth.isAdmin, spacesController.create);

router
  .route("/:id")
  .get(spacesController.findOne)
  .put(auth.isLoggedIn, auth.isAdmin, spacesController.update)
  .delete(auth.isLoggedIn, auth.isAdmin, spacesController.remove);

module.exports = router;
