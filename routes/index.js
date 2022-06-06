const router = require("express").Router();

router.use("/bookings", require("./bookings"));
router.use("/categories", require("./categories"));
router.use("/services", require("./services"));
router.use("/reports", require("./reports"));
router.use("/spaces", require("./spaces"));
router.use("/users", require("./users"));

module.exports = router;
