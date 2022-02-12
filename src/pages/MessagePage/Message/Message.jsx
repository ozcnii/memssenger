import s from "../Messages.module.css";
import getDate from "../../../utils/getDate";
import { motion } from "framer-motion/dist/framer-motion";

export default function Message({ message, uid, userUid, date }) {
  const messageDate = getDate(date);

  const initialPosition = uid === userUid ? "100%" : "-100%";

  return (
    <motion.div
      initial={{ x: initialPosition }}
      animate={{ x: "0%" }}
      className={s.messageContainer}
      style={{
        justifyContent: uid === userUid && "flex-end",
        textAlign: uid === userUid && "right",
      }}
    >
      <div className={s.message}>
        <span className={s.messageText}>{message}</span>
        {date ? <span className={s.messageDate}> {messageDate} </span> : null}
      </div>
    </motion.div>
  );
}
