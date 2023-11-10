const router = require("express").Router();
const userPost = require("../models/userPost");

router.get("/", async (req, res) => {
  try {
    if (req.session.loggedIn) {
      const data = await userPost.findAll();
      res.render("all", { data });
    } else {
      res.render("login");
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const postData = await userPost.create({
      content: req.body.content,
    });

    res.status(200).json(postData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/addpost", (req, res) => {
  res.render("addpost");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});
module.exports = router;
