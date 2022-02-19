import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    marginLeft: 20,
    flexGrow: 1,
    position: 'relative'
  },
  username: {
    fontWeight: "bold",
    letterSpacing: -0.2,
  },
  previewText: {
    fontSize: 12,
    color: "#9CADC8",
    letterSpacing: -0.17,
  },
  boldText: {
    fontWeight: "900",
    fontSize: 13,
    letterSpacing: -0.17,
  }
}));

const ChatContent = (props) => {
  const classes = useStyles();

  const { conversation } = props;
  const { latestMessageText, otherUser, onlineUserId, messages } = conversation;

  const readLastMessage = () => {
    return messages[messages.length - 1]?.read?.some(({userId}) => {
      return userId === onlineUserId;
    });
  }

  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        
        {!readLastMessage() ? (
          <Typography className={classes.boldText}>
            {latestMessageText}
          </Typography>          
        ) : (
          <Typography className={classes.previewText}>
            {latestMessageText}
          </Typography>
        )}              
      </Box>
    </Box>
  );
};

export default ChatContent;
