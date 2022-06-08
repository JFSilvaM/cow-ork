const router = require("express").Router();
const servicesController = require("../controllers/servicesController");
const { auth } = require("../middlewares");

router
  .route("/")
  .get(auth.isAdmin, servicesController.findAll)
  .post(auth.isAdmin, servicesController.create);

router
  .route("/:id")
  .put(auth.isAdmin, servicesController.update)
  .delete(auth.isAdmin, servicesController.remove);

module.exports = router;
