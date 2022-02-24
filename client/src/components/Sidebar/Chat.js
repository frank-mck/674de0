import React, { useEffect, useMemo } from "react";
import { Box } from "@material-ui/core";
import { BadgeAvatar, ChatContent } from "../Sidebar";
import { makeStyles } from "@material-ui/core/styles";
import { setActiveChat } from "../../store/activeConversation";
import { connect } from "react-redux";
import { postReadMessage } from "../../store/utils/thunkCreators";
import Notification from "./Notification";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 8,
    height: 80,
    boxShadow: "0 2px 10px 0 rgba(88,133,196,0.05)",
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "grab"
    }
  }
}));

const Chat = (props) => {
  const classes = useStyles();
  const { conversation, postReadMessage, setActiveChat, activeConversation } = props;
  const { otherUser, messages, onlineUserId } = conversation;

  const computeUnreadMessages = useMemo(() => {
    return getUnreadMessages(messages, conversation, onlineUserId);
  }, [messages, conversation, onlineUserId])

  useEffect(() => {   
    if (activeConversation === otherUser.username
       && computeUnreadMessages.length > 0) {
      postReadMessage(onlineUserId, computeUnreadMessages);
    }      
  }, [computeUnreadMessages,
      activeConversation,
      onlineUserId,
      otherUser.username,
      postReadMessage,
      messages
    ]);

  const handleClick = async () => {
    await setActiveChat(otherUser.username);
  };

  return (
    <Box onClick={() => handleClick()} className={classes.root}>
      <BadgeAvatar
        photoUrl={otherUser.photoUrl}
        username={otherUser.username}
        online={otherUser.online}
        sidebar={true}
      />
      <ChatContent conversation={conversation} />
      <Notification conversation={conversation} />
    </Box>
  );
};

const getUnreadMessages = (messages, conversation, onlineUserId) => {
  let unreadMessages = messages.filter(({conversationId}) => {
    return conversationId === conversation.id
  });

  // Filter messages that i havent sent and by the ones i havent read
  unreadMessages = unreadMessages.filter(({read, senderId}) => {
    return !read.some(user => {
      return user.userId === onlineUserId
    }) 
    
    && senderId !== onlineUserId;
  });
  return unreadMessages;
}

const mapStateToProps = (state) => {
  return {
    activeConversation: state.activeConversation
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveChat: (id) => {
      dispatch(setActiveChat(id));
    },
    postReadMessage: (userId, messages) => {
      dispatch(postReadMessage(userId, messages));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
