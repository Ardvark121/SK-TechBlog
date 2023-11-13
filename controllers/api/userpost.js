const router = require("express").Router();
const { userPost } = require("../../models");
router.post("/", async (req, res) => {
  const user_id = req.session.user_id;
  const post_username = req.session.username;
  const postData = await userPost.create({
    content: req.body.content,
    user_id: user_id,
    post_username: post_username,
  });
  res.json(postData);
});

module.exports = router;
