import getDate from "./get_date";

export const getLastMessage = (dialogs, user) => {
  let lastMessage = [];

  dialogs.forEach((dialog) => {
    if (dialog[0].dialog_id.includes(user.uid)) {
      const lastIndex = dialog.length - 1;
      lastMessage = dialog[lastIndex];
    }
  });

  if (lastMessage.length !== 0) {
    const date = getDate(lastMessage.date);
    const newLastMessage = {
      ...lastMessage,
      date,
    };
    lastMessage = newLastMessage;
  }

  return lastMessage;
};
