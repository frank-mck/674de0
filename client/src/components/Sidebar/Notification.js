import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Badge, Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  badge: {
    margin: "0 22px"
  }
}));

const Notification = (props) => {
  const classes = useStyles();

  const { conversation } = props;
  const { messages, onlineUserId } = conversation; 

  const getNotifications = () => {
    return messages.filter(({read, senderId}) => {
      return !read.some((user) => {
        return user.userId === onlineUserId
      })
        && senderId !== onlineUserId;
    }).length
  }

  return (
    <Box>
      <Badge className={classes.badge} badgeContent={getNotifications()} color="primary" />
    </Box>    
  )
}

export default Notification;