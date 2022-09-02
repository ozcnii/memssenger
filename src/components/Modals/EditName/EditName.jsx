import s from "./EditName.module.css";
import ReactDOM from "react-dom";
import { useRef, useState } from "react";
import { userStore } from "../../../store/user";
import { motion } from "framer-motion/dist/framer-motion";

export default function EditName({ setModal }) {
  return ReactDOM.createPortal(<Modal setModal={setModal} />, document.body);
}

function Modal({ setModal }) {
  const [isLoading, setIsLoading] = useState(false);
  const newName = useRef(null);

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const myName = newName.current.value.trim();
    if (myName.length > 0) {
      const newUser = await userStore.editUserName(myName);
      if (newUser) {
        localStorage.setItem("user", JSON.stringify(newUser));
      }
    }
    setIsLoading(false);
    setModal(false);
  };

  const onClose = (event) => {
    event.stopPropagation();
    if (event.target.dataset.close === "close" && !isLoading) {
      setModal(false);
    }
  };

  return (
    <div className={s.modal} data-close="close" onClick={onClose}>
      <motion.div initial={{ y: "100%" }} animate={{ y: "0%" }}>
        <div className={s.modalContent}>
          <form onSubmit={onSubmit} className={s.form}>
            <input
              autoFocus
              ref={newName}
              placeholder="Введите имя"
              type="text"
            />
            <button disabled={isLoading}>
              {isLoading ? "Загрузка.." : "Сохранить"}
            </button>
          </form>

          <button onClick={onClose} data-close="close" className={s.close}>
            Отменить
          </button>
        </div>
      </motion.div>
    </div>
  );
}
