import s from "./EditName.module.css";
import ReactDOM from "react-dom";
import { useRef } from "react";
import { userStore } from "../../../store/user.store";
import { motion } from "framer-motion/dist/framer-motion";
export default function EditName({ setModal }) {
  return ReactDOM.createPortal(<Modal setModal={setModal} />, document.body);
}

function Modal({ setModal }) {
  const newName = useRef(null);

  const onClickHandler = async (event) => {
    const myName = newName.current.value.trim();

    if (myName.length > 0) {
      const newUser = await userStore.editUserName(myName);
      if (newUser !== undefined) {
        localStorage.setItem("user", JSON.stringify(newUser));
      }
    }
    setModal(false);
  };

  const onClose = (event) => {
    event.stopPropagation();

    if (event.target.dataset.close === "close") {
      setModal(false);
    }
  };

  return (
    <div className={s.modal} data-close="close" onClick={onClose}>
      <motion.div initial={{ y: "100%" }} animate={{ y: "0%" }}>
        <div className={s.modalContent}>
          <div className={s.form}>
            <input
              autoFocus
              ref={newName}
              placeholder="Введите имя"
              type="text"
            />
            <button onClick={onClickHandler}>Сохранить</button>
          </div>

          <button onClick={onClose} data-close="close" className={s.close}>
            Отменить
          </button>
        </div>
      </motion.div>
    </div>
  );
}
