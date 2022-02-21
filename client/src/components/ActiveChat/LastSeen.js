import { Avatar, makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react'

const useStyles = makeStyles(() => ({
  avatar: {
    height: 25,
    width: 25,
    marginRight: 11,
    marginTop: 6
  },
}));

function LastSeen(props) {
  const classes = useStyles();
  const { messages, messageId, otherUser, userId } = props;

  const lastSeen = messages.filter(mesg => {   
    return mesg.read.some(user => {
      return user.userId !== mesg.senderId
    }) && mesg.senderId === userId
  }).reverse()[0];

  useEffect(() => {
    return lastSeen;
  })

  return (
    <div>
      {lastSeen?.id === messageId && (
          <Avatar
            alt={otherUser.username}
            src={otherUser.photoUrl} 
            className={classes.avatar}
          ></Avatar>
        )} 
    </div>
  )
}

export default LastSeen