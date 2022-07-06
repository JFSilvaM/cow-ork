const router = require("express").Router();

router.use("/auth", require("./auth"));
router.use("/bookings", require("./bookings"));
router.use("/report_categories", require("./reportCategories"));
router.use("/reports", require("./reports"));
router.use("/services", require("./services"));
router.use("/spaces", require("./spaces"));
router.use("/space_ratings", require("./spaceRatings"));
router.use("/space_types", require("./spaceTypes"));
router.use("/users", require("./users"));

module.exports = router;
