import { Avatar, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';

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
  const [lastSeenMesg, setLastSeenMesg] = useState(null)
  const { messages, messageId, otherUser, userId } = props;

  const lastSeen = messages.filter(mesg => {   
    return mesg.read.some(user => {
      return user.userId !== mesg.senderId
    }) && mesg.senderId === userId
  }).reverse()[0];

  useEffect(() => {
    setLastSeenMesg(lastSeen);
  }, [setLastSeenMesg, lastSeen, messages])

  return (
    <div>
      {lastSeenMesg?.id === messageId && (
          <Avatar
            alt={otherUser.username}
            src={otherUser.photoUrl} 
            className={classes.avatar}
          ></Avatar>
        )} 
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    conversations: state.conversations
  };
};

export default connect(mapStateToProps, null)(LastSeen);