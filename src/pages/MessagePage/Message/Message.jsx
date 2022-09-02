import s from "../Messages.module.css";
import getDate from "../../../utils/getDate";

export default function Message({ message, uid, userUid, date }) {
  const messageDate = getDate(date);
  return (
    <div
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
    </div>
  );
}
