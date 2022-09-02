import React, { useState } from "react";
import s from "../Messages.module.css";
import Picker from "emoji-picker-react";
import { observer } from "mobx-react-lite";
import { userStore } from "../../../store/user";
import { dialogStore } from "../../../store/dialog";
import { EmojiIcon } from "../../../components/Icons/EmojiIcon/EmojiIcon";
import { SendMessageIcon } from "../../../components/Icons/SendMessageIcon/SendMessageIcon";

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
            <EmojiIcon />

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
            <SendMessageIcon />
          </button>
        </form>
      </div>
    </div>
  );
});

export default FormMessage;
