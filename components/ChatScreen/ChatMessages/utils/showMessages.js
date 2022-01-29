export const showMessages = (messagesSnapshot) => {
  const filteredMessage = messagesSnapshot.docs.map((doc) => {
    return {
      message: doc.data().message,
      timestamp: doc.data().timestamp,
      author: doc.data().user,
    };
  });
  return filteredMessage;
};