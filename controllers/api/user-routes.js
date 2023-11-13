const router = require("express").Router();
const { User } = require("../../models");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  try {
    const userdata = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.user_id = userdata.id;
      req.session.username = userdata.username;
      res.status(200).json(userdata);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const logindata = await User.findOne({
      where: { username: req.body.username },
    });
    if (!logindata) {
      res
        .status(404)
        .json({ message: "Could not find your account please check username" });
      return;
    }

    const Checkpass = await bcrypt.compare(
      req.body.password,
      logindata.password
    );
    if (!Checkpass) {
      res.status(400).json({ message: "Password did not match your username" });
      return;
    }
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.user_id = logindata.id;
      req.session.username = logindata.username;
      res.status(200).json({ message: "You are now logged in!", logindata });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});
module.exports = router;
