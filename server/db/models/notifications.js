const { Op, Sequelize } = require("sequelize");
const db = require("../db");

const Notification = db.define("notification", {});

Notification.findNotifications = async function (notificationId) {
  const notification = await Notification.findOne({
    where: {
      id: notificationId
    }
  });

  // return notification or null if it doesn't exist
  return notification;
};

module.exports = Notification;