import React, { useState } from "react";
import s from "../Messages.module.css";
import Picker from "emoji-picker-react";
import { observer } from "mobx-react-lite";
import { userStore } from "../../../store/user.store";
import { dialogStore } from "../../../store/dialog.store";

const FormMessage = observer(() => {
  const user = userStore.user;
  const dialogId = dialogStore.dialogId;
  const [newMessage, setNewMessage] = useState("");
  const [emojiPopover, setEmojiPopover] = useState(false);

  const onEmojiClick = (event, emojiObject) => {
    setNewMessage((e) => `${e} ${emojiObject.emoji}`);
  };

  const sendMessage = async (event) => {
    event.preventDefault();

    const message = newMessage;
    if (message?.trim().length) {
      const myMessage = {
        message: message,
        uid: user.uid,
        date: new Date(),
        dialog_id: dialogId,
        name: user.name,
      };

      setNewMessage("");
      dialogStore.sendMessage(myMessage);
    }
  };

  return (
    <div className={s.wrapper}>
      <div className={s.formWrapper}>
        <form
          className={s.form}
          onSubmit={(event) => {
            sendMessage(event);
            setEmojiPopover(false);
          }}
        >
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className={s.input}
            type="text"
            placeholder="Сообщение"
          />

          <div
            onClick={() => setEmojiPopover(!emojiPopover)}
            className="emoji-button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#383838"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
            </svg>

            {emojiPopover ? (
              <div
                onClick={(e) => e.stopPropagation()}
                className="emoji-popover"
              >
                <Picker
                  pickerStyle={{
                    boxShadow: "none",
                  }}
                  onEmojiClick={onEmojiClick}
                />
              </div>
            ) : null}
          </div>

          <button className={s.send}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24px"
              fill="#000000"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M4.01 6.03l7.51 3.22-7.52-1 .01-2.22m7.5 8.72L4 17.97v-2.22l7.51-1M2.01 3L2 10l15 2-15 2 .01 7L23 12 2.01 3z" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
});

export default FormMessage;
