const router = require("express").Router();
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
      const message = await Message.create({ senderId, text, conversationId });

      let conversation = await Conversation.findConversation(
        senderId,
        recipientId
      );

      const { user1NotSeen, user2NotSeen, dataValues } = conversation;

      if (senderId === dataValues?.user1Id) {
        let inc = await conversation.increment({ user2NotSeen: + 1 });
        let dec = await conversation.decrement('user1NotSeen', { by: user1NotSeen });
        await Promise.all([inc, dec])
      } else {
        let inc = await conversation.increment({ user1NotSeen: + 1 });
        let dec = await conversation.decrement('user2NotSeen', { by: user2NotSeen });
        await Promise.all([inc, dec])
      }
      
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
      });
      if (onlineUsers.includes(sender.id)) {
        sender.online = true;
      }
    }
    const message = await Message.create({
      senderId,
      text,
      conversationId: conversation.id,
    });
    res.json({ message, sender });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
