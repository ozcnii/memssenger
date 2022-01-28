import styles from "./Dialog.module.css";
import { NavLink } from "react-router-dom";
import routes from "../../../routes/routes";
import { useEffect, useState } from "react";
import { userStore } from "../../../store/user.store";
import { observer } from "mobx-react-lite";
import { getLastMessage } from "../../../utils/getLastMessage";
import { chatStore } from "../../../store/chat.store";
import { dialogStore } from "../../../store/dialog.store";

const Message = observer(({ user, dialogs }) => {
  const authUser = userStore.user;
  const [lastMessage, setLastMessage] = useState("-");
  const { name, uid, email, avatar } = user;

  useEffect(() => {
    const lastMessage = getLastMessage(dialogs, user);
    setLastMessage(lastMessage);
    chatStore.setLoading(false);
  }, [dialogs, user]);

  return (
    <>
      {lastMessage && lastMessage.length !== 0 ? (
        <NavLink
          to={routes.messages + `/${uid}`}
          className={styles.messageContainer}
          onClick={() =>
            dialogStore.setActiveDialog({ email, uid, name, avatar })
          }
        >
          <div className={styles.avatar}>
            {user?.avatar && <img src={user.avatar} alt="" />}
          </div>

          <div className={styles.info}>
            <div className={styles.top}>
              <div className={`${styles.userName} text-mw`}>{name}</div>
              <div className={styles.date}>
                {chatStore.loading
                  ? null
                  : lastMessage.length === 0
                  ? null
                  : lastMessage?.date}
              </div>
            </div>
            <div className="text-mw">
              {chatStore.loading
                ? "Загрузка..."
                : lastMessage.length !== 0
                ? lastMessage.uid === authUser.uid
                  ? `Вы: ${lastMessage.message}`
                  : lastMessage.message
                : "Сообщений не найдено"}
            </div>
          </div>
        </NavLink>
      ) : null}
    </>
  );
});

export default Message;
