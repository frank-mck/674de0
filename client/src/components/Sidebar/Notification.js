import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Badge } from "@material-ui/core";

const Notification = (props) => {
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
    <div>
      <Badge badgeContent={getNotifications()} color="primary" />
    </div>    
  )
}

export default Notification;