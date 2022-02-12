import styles from "./Dialog.module.css";
import { NavLink } from "react-router-dom";
import routes from "../../../routes/routes";
import { useLayoutEffect, useMemo, useState } from "react";
import { userStore } from "../../../store/user.store";
import { observer } from "mobx-react-lite";
import { getLastMessage } from "../../../utils/getLastMessage";
import { chatStore } from "../../../store/chat.store";
import { dialogStore } from "../../../store/dialog.store";
import { motion } from "framer-motion/dist/framer-motion";

const Message = observer(({ dialog }) => {
  const authUser = userStore.user;
  const [lastMessage, setLastMessage] = useState("");
  const [user, setUser] = useState("");

  useMemo(() => {
    const dialogId = dialog[0].dialog_id;

    chatStore.users.forEach((user) => {
      if (dialogId.includes(user.uid)) {
        setUser(user);
      }
    });
  }, [dialog]);

  const { name, uid, email, avatar } = user;

  useLayoutEffect(() => {
    const lastMessage = getLastMessage(dialog);
    setLastMessage(lastMessage);
    chatStore.setLoading(false);
  }, [dialog]);

  return (
    <>
      {lastMessage && lastMessage.length !== 0 ? (
        <motion.div layout>
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
                <div className={styles.time}>
                  {chatStore.loading
                    ? null
                    : lastMessage.length === 0
                    ? null
                    : lastMessage?.time}
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
        </motion.div>
      ) : null}
    </>
  );
});

export default Message;
