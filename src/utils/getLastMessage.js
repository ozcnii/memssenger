import getDate from "./getDate";

export const getLastMessage = (dialog) => {
  const lastMessageIndex = dialog.length - 1;
  let lastMessage = dialog[lastMessageIndex];

  if (lastMessage.length !== 0) {
    const time = getDate(lastMessage.date);
    const newLastMessage = {
      ...lastMessage,
      time,
    };
    lastMessage = newLastMessage;
  }

  return lastMessage;
};
