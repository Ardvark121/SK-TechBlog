const router = require("express").Router();
const { userPost } = require("../models");

router.get("/", async (req, res) => {
  try {
    if (req.session.loggedIn) {
      const postdata = await userPost.findAll().catch((err) => {
        res.json(err);
      });
      const posts = postdata.map((post) => post.get({ plain: true }));
      console.log(posts);
      res.render("all", { posts });
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

router.get("/addpost", async (req, res) => {
  try {
    if (req.session.loggedIn) {
      res.render("addpost");
    } else {
      res.render("login");
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/signup", (req, res) => {
  res.render("signup");
});
module.exports = router;
