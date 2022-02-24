import React, { useMemo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";
import LastSeen from "./LastSeen";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end"
  },
  date: {
    fontSize: 11,
    color: "#BECCE2",
    fontWeight: "bold",
    marginBottom: 5
  },
  text: {
    fontSize: 14,
    color: "#91A3C0",
    letterSpacing: -0.2,
    padding: 8,
    fontWeight: "bold"
  },
  bubble: {
    background: "#F4F6FA",
    borderRadius: "10px 10px 0 10px"
  }
}));

const SenderBubble = (props) => {
  const classes = useStyles();
  const { time, text, otherUser, message, messages, userId } = props;

  const computeLastSeenMessage = useMemo(() => {
    return lastSeen(messages, userId);
  }, [messages, userId]);  

  return (
    <Box className={classes.root}>
      <Typography className={classes.date}>{time}</Typography>
      <Box className={classes.bubble}>
        <Typography className={classes.text}>{text}</Typography>
      </Box>
      {computeLastSeenMessage?.id === message.id && (
        <LastSeen 
          key={Math.floor(Math.random() * userId)}
          otherUser={otherUser}
        />
      )} 
    </Box>
  );
};

const lastSeen = (messages, userId) => {
  return messages.filter(mesg => {   
    return mesg.read.some(user => {
      return user.userId !== mesg.senderId
    }) && mesg.senderId === userId
  }).reverse()[0];
}

export default SenderBubble;
