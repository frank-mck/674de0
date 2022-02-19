export const addMessageToStore = (state, payload) => {
  const { message, sender } = payload;
  // if sender isn't null, that means the message needs to be put in a brand new convo
  if (sender !== null) {
    const newConvo = {
      id: message.conversationId,
      otherUser: sender,
      messages: [message],
    };
    newConvo.latestMessageText = message.text;
    return [newConvo, ...state];
  }

  return state.map((convo) => {
    const convoCopy = { ...convo };
    if (convo.id === message.conversationId) {
      convoCopy.messages.push(message);
      convoCopy.latestMessageText = message.text;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addOnlineUserToStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser = { ...convoCopy.otherUser, online: true };
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const removeOfflineUserFromStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser = { ...convoCopy.otherUser, online: false };
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addSearchedUsersToStore = (state, users) => {
  const currentUsers = {};

  // make table of current users so we can lookup faster
  state.forEach((convo) => {
    currentUsers[convo.otherUser.id] = true;
  });

  const newState = [...state];
  users.forEach((user) => {
    // only create a fake convo if we don't already have a convo with this user
    if (!currentUsers[user.id]) {
      let fakeConvo = { otherUser: user, messages: [] };
      newState.push(fakeConvo);
    }
  });

  return newState;
};

export const addNewConvoToStore = (state, recipientId, message, senderId) => {
  return state.map((convo) => {
    const convoCopy = { ...convo };
    if (convo.otherUser.id === recipientId) {
      convoCopy.id = message.conversationId;
      convoCopy.messages.push(message);
      convoCopy.latestMessageText = message.text;
      convoCopy.onlineUserId = senderId;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const updateConvoNotifications = (state, message) => {
  return state.map((convo) => {
    
    if (convo.conversationId === message.conversationId) {
      const convoCopy = { ...convo };
      const messagesCopy = [ ...convoCopy.messages ]

      for (let i = 0; i < message.length; i++) {
        const msgCopy = messagesCopy.filter(({id}) => id === message[i].id); 

        if (msgCopy.length > 0) {
          msgCopy[0].read = [ ...message[i].read ];
        }
      }
      
      convoCopy.messages = [...messagesCopy];

      return convoCopy;  
    } else {
      return convo;
    }       
  });
}