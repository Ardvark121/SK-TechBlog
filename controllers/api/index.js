const router = require("express").Router();

const userRoutes = require("./user-routes.js");

const userPostRoutes = require("./userPost-routes.js");

router.use("/user", userRoutes);

router.use("/post", userPostRoutes);

module.exports = router;
