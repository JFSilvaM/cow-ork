const router = require("express").Router();
const ratingController = require("../controllers/spaceRatingsController");
const { auth } = require("../middlewares");

router
  .route("/:id")
  .get(auth.isLoggedIn, ratingController.findOne)
  .put(auth.isLoggedIn, ratingController.update);

module.exports = router;
