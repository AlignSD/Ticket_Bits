const router = require("express").Router();
const userRoutes = require("./Users");
const eventRoutes = require("./events")

// routes
router.use("/Users", userRoutes);
router.use("/Events", eventRoutes);

module.exports = router;