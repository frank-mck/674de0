const Conversation = require("./conversation");
const User = require("./user");
const Message = require("./message");
const GroupConversation = require("./groupConversation");

// associations

User.belongsToMany(Conversation, {
  through: GroupConversation,
  foreignKey: 'userId'
});
Conversation.belongsToMany(User, { 
  through: GroupConversation,
});

Message.belongsTo(Conversation);
Conversation.hasMany(Message);


module.exports = {
  User,
  Conversation,
  Message,
  GroupConversation
};
