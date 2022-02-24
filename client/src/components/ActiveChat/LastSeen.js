import { Avatar, makeStyles, Box } from '@material-ui/core';
import React from 'react'

const useStyles = makeStyles(() => ({
  avatar: {
    height: 25,
    width: 25,
    marginRight: 11,
    marginTop: 6
  },
}));

const LastSeen = ({ otherUser }) => {
  const classes = useStyles();

  return (
    <Box>         
      <Avatar
        alt={otherUser.username}
        src={otherUser.photoUrl} 
        className={classes.avatar}
      ></Avatar>      
    </Box>   
  )
}

export default LastSeen;
