const router = require("express").Router();
const userRoutes = require("./Users");

// routes
router.use("/Users", userRoutes);

module.exports = router;