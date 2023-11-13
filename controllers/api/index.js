const router = require("express").Router();
const userRoutes = require("./user-routes");
const userpost = require("./userpost");
router.use("/users", userRoutes);
router.use("/posts", userpost);
module.exports = router;
