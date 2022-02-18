const { Sequelize } = require("sequelize");
const db = require("../db");

const Conversation = db.define("conversation", {
  notificationId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
});

// find conversation given conversation id

Conversation.findConversation = async function (conversationId) {
  const conversation = await Conversation.findOne({
    where: {
      id: conversationId
    }
  });

  // return conversation or null if it doesn't exist
  return conversation;
};

module.exports = Conversation;
