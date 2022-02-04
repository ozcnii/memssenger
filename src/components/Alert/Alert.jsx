import s from "./Alert.module.css";
import ReactDOM from "react-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion/dist/framer-motion";
export default function Alert({ message, closeAlert }) {
  return ReactDOM.createPortal(
    <Modal message={message} closeAlert={closeAlert} />,
    document.body
  );
}

function Modal({ message, closeAlert }) {
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    const showTimeout = setTimeout(() => {
      setIsClosed(true);
    }, 4000);
    const closeTimeout = closeAlert
      ? setTimeout(() => {
          closeAlert(false);
        }, 4300)
      : 0;

    return () => {
      clearTimeout(showTimeout);
      clearTimeout(closeTimeout);
    };
  }, [closeAlert]);

  return (
    <div className={s.wrapper}>
      <motion.div initial={{ x: "100%" }} animate={{ x: "0%" }}>
        <div className={isClosed ? s.alert + " " + s.close : s.alert}>
          <div className={s.container}>{message}</div>
        </div>
      </motion.div>
    </div>
  );
}
