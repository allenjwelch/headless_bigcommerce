const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");

// API Routes -- Sets intial api path to .../eyAPI (add additional route paths below)
router.use("/eyAPI", apiRoutes);

module.exports = router;
