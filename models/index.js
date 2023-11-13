const User = require("./user");
const userPost = require("./userPost");

User.hasMany(userPost, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

userPost.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = { User, userPost };
