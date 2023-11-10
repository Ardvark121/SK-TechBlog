const user = require("./user");
const userPost = require("./userPost");

userPost.belongsTo(user, {
  foreignKey: "user_id",
});

user.hasMany(userPost, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});
