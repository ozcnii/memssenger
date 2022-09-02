import React from "react";
import s from "../Messages.module.css";
import Message from "../Message/Message";
import ScrollableFeed from "react-scrollable-feed";
import { userStore } from "../../../store/user.store";
import { dialogStore } from "../../../store/dialog.store";
import { observer } from "mobx-react-lite";
import useInnerHeight from "../../../hooks/useInnerHeight";

const MessagesWrapper = observer(() => {
  const user = userStore.user;
  const headerHeight = 168;
  const { innerHeight } = useInnerHeight();

  return (
    <>
      <div
        layout
        className={s.messagesWrapper}
        style={{ height: innerHeight - headerHeight + "px" }}
      >
        <ScrollableFeed className="x-hidden">
          {dialogStore.messages.map(({ message, uid, date }, i) => (
            <Message
              key={`message_key_${i}`}
              message={message}
              userUid={user.uid}
              uid={uid}
              date={date}
            ></Message>
          ))}
        </ScrollableFeed>
      </div>
    </>
  );
});

export default MessagesWrapper;
