const router = require("express").Router();
const spaceTypesController = require("../controllers/spaceTypesController");
const { auth } = require("../middlewares");

router
  .route("/")
  .get(auth.isLoggedIn, auth.isAdmin, spaceTypesController.findAll)
  .post(auth.isLoggedIn, auth.isAdmin, spaceTypesController.create);

router
  .route("/:id")
  .put(auth.isLoggedIn, auth.isAdmin, spaceTypesController.update)
  .delete(auth.isLoggedIn, auth.isAdmin, spaceTypesController.remove);

module.exports = router;
