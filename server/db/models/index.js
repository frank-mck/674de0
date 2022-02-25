const Conversation = require("./conversation");
const User = require("./user");
const Message = require("./message");

// associations

User.belongsToMany(Conversation, {
  through: 'group-conversations',
  foreignKey: 'userId',
 
});

Conversation.belongsToMany(User, {
  foreignKey: 'conversationId', 
  through: 'group-conversations',
});

Message.belongsTo(Conversation);
Conversation.hasMany(Message);


module.exports = {
  User,
  Conversation,
  Message,
};
