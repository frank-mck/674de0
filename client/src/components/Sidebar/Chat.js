import React, { useEffect } from "react";
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

  const getUnreadMessages = () => {
    // Get messages from the conversation we want
    let message = messages.filter(({conversationId}) => conversationId === conversation.id);

    // Filter messages that i havent sent and by the ones i havent read
    message = message.filter(({read, senderId}) => {
      return !read.some(user => {
        return user.userId === onlineUserId
      }) 
      
      && senderId !== onlineUserId;
    });

    return message.length > 0 ? message : false;
  }

  const readMessage = async () => {
    const messages = getUnreadMessages();

    if (messages) {
      await postReadMessage(onlineUserId, messages);
    }
  }

  useEffect(() => {   
    if (activeConversation) {
      return readMessage(); 
    }      
  })

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
    postReadMessage: (userId, message) => {
      dispatch(postReadMessage(userId, message));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
