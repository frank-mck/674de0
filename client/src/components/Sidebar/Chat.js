import React from "react";
import { Box } from "@material-ui/core";
import { BadgeAvatar, ChatContent } from "../Sidebar";
import { makeStyles } from "@material-ui/core/styles";
import { setActiveChat } from "../../store/activeConversation";
import { connect } from "react-redux";
import { postReadMessages } from "../../store/utils/thunkCreators";

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
  const { conversation, postReadMessages, setActiveChat } = props;
  const { otherUser, user1, user2 } = conversation;

  const handleClick = async () => {
    await setActiveChat(otherUser.username);
    if (user2 === null) {
      await postReadMessages('user2NotSeen', conversation.id);
    } else if (user1 === null) {
      await postReadMessages('user1NotSeen', conversation.id);
    }
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
    </Box>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveChat: (id) => {
      dispatch(setActiveChat(id));
    },
    postReadMessages: (user, conversationId) => {
      dispatch(postReadMessages(user, conversationId));
    }
  };
};

export default connect(null, mapDispatchToProps)(Chat);
