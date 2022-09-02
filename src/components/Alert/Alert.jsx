import s from "./Alert.module.css";
import ReactDOM from "react-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion/dist/framer-motion";

export default function Alert(props) {
  return ReactDOM.createPortal(<AlertComponent {...props} />, document.body);
}

const ALERT_SHOW_TIME = 4000;

function AlertComponent({ message, closeAlert }) {
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    const showTimeout = setTimeout(() => {
      setIsClosed(true);
    }, ALERT_SHOW_TIME);

    return () => clearTimeout(showTimeout);
  }, [closeAlert]);

  return (
    <div className={s.wrapper}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={!isClosed ? { opacity: 1 } : ""}
        transition={{ duration: 0.2 }}
      >
        <div className={s.alert}>
          <span className={s.container}>{message}</span>
        </div>
      </motion.div>
    </div>
  );
}
