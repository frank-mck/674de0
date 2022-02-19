const router = require("express").Router();
const { Op } = require("sequelize");
const { Conversation, Message } = require("../../db/models");
const onlineUsers = require("../../onlineUsers");

// expects {recipientId, text, conversationId } in body (conversationId will be null if no conversation exists yet)
router.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const senderId = req.user.id;
    const { recipientId, text, conversationId, sender } = req.body;

    // if we already know conversation id, we can save time and just add it to message and return
    if (conversationId) {
      const message = await Message.create({ senderId, text, conversationId, read: [{userId: senderId}] });

      let conversation = await Conversation.findConversation(
        senderId,
        recipientId
      );

      return res.json({ message, sender, conversation });
    }

    // if we don't have conversation id, find a conversation to make sure it doesn't already exist
    let conversation = await Conversation.findConversation(
      senderId,
      recipientId
    );

    if (!conversation) {
      // create conversation
      conversation = await Conversation.create({
        user1Id: senderId,
        user2Id: recipientId,
        onlineUserId: senderId
      });

      if (onlineUsers.includes(sender.id)) {
        sender.online = true;
      }
    }
    const message = await Message.create({
      senderId,
      text,
      conversationId: conversation.id,
      read: [{userId: senderId}]
    });
    res.json({ message, sender });
  } catch (error) {
    next(error);
  }
});

router.put("/read-message", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const { messages, userId } = req.body;
    const conversationId = messages[0].conversationId;

    // Find and read messages where the senderId does not equal mine 
    let mesgs = await Message.findAll({
      where: {
        conversationId: conversationId, 
        senderId: {
          [Op.ne]: userId
        }      
      }
    });
  
    // Filter the messages that I havent read
    mesgs = mesgs.filter(({read}) => {
      return !read.some((user) => user.userId === userId);
    });

    // Update message: add the user id of the user logged in to each message read
    for(let i = 0; i < mesgs.length; i++) {
      let message = mesgs[i];

      message = await message.update({
          read: [...message.read, { userId: userId }]
        },
        { where: {
          id: message.id,
        }
      }); 
    } 
    
    return res.json(mesgs);
  } catch(error) {
    next(error);
  }  
});

module.exports = router;
