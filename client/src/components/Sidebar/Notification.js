import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  notification: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50px',
    backgroundColor: '#3A8DFF',
    height: '22px',
    minWidth: '22px',
    color: 'white',
    fontSize: '13px',
    fontWeight: '600',
    marginRight: '10px',
    padding: '0 8px 0 8px',
  },
}));

const Notification = (props) => {
  const classes = useStyles();

  const { conversation } = props;
  const { user1, user1NotSeen, user2NotSeen } = conversation;

  const getNotification = user1 === null ? user1NotSeen : user2NotSeen;  

  return (
    <div>
      {getNotification > 0 ? (
        <div className={classes.notification}>
          {getNotification}
        </div>
      ) : (
        <div className={classes.notification} style={{visibility:'hidden'}}>
          {getNotification}
        </div>
      )}
    </div>
    
  )
}

const mapStateToProps = (state) => {
  return {
    conversations: state.conversations
  };
};

export default connect(mapStateToProps, null)(Notification);