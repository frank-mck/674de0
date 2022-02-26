const Conversation = require("./conversation");
const User = require("./user");
const Message = require("./message");

// associations

User.belongsToMany(Conversation, {
  through: 'groupConversations',
  foreignKey: 'userId',
 
});

Conversation.belongsToMany(User, {
  foreignKey: 'conversationId', 
  through: 'groupConversations',
});

Message.belongsTo(Conversation);
Conversation.hasMany(Message);


module.exports = {
  User,
  Conversation,
  Message,
};
