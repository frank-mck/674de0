const Conversation = require("./conversation");
const User = require("./user");
const Message = require("./message");
const Notification = require("./notification")

// associations

User.hasMany(Conversation);
Conversation.belongsTo(User, { as: "user1" });
Conversation.belongsTo(User, { as: "user2" });
Message.belongsTo(Conversation);
Conversation.hasMany(Message);
Conversation.belongsTo(Notification);
Notification.hasMany(User);

module.exports = {
  User,
  Conversation,
  Message,
  Notification,
};