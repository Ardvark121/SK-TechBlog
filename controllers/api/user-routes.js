const router = require("express").Router();
const user = require("../../models/user");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  try {
    const userdata = await user.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.user = req.body.username;
      res.status(200).json(userdata);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const Logindata = await user.findOne({
      where: { username: req.body.username },
    });
    if (!Logindata) {
      res
        .status(404)
        .json({ message: "Could not find your account please check username" });
      return;
    }

    const Checkpass = await bcrypt.compare(
      req.body.password,
      Logindata.password
    );
    if (!Checkpass) {
      res.status(400).json({ message: "Password did not match your username" });
      return;
    }
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.user = req.body.username;
    });
    req.session.loggedIn = true;
    res.status(200).json({ message: "You are now logged in!" });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const currentuser = await user.findOne({
      where: { username: req.session.user },
    });
    res
      .status(200)
      .json({ id: currentuser.id, username: currentuser.username });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
