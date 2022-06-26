const router = require("express").Router();
const servicesController = require("../controllers/servicesController");
const { auth } = require("../middlewares");

router
  .route("/")
  .get(auth.isLoggedIn, auth.isAdmin, servicesController.findAll)
  .post(auth.isLoggedIn, auth.isAdmin, servicesController.create);

router
  .route("/:id")
  .put(auth.isLoggedIn, auth.isAdmin, servicesController.update)
  .delete(auth.isLoggedIn, auth.isAdmin, servicesController.remove);

module.exports = router;
