const { Op, Sequelize, DataTypes } = require("sequelize");
const db = require("../db");

const GroupConversation = db.define("groupconversation", {
  groupConversationId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    
  }
});

module.exports = GroupConversation;