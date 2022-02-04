import s from "./../EditName/EditName.module.css";
import ReactDOM from "react-dom";
import { motion } from "framer-motion/dist/framer-motion";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useState } from "react";
import { userStore } from "../../../store/user.store";

export default function EditAvatar({ setModal }) {
  return ReactDOM.createPortal(<Modal setModal={setModal} />, document.body);
}

function Modal({ setModal }) {
  const [isLoading, setIsLoading] = useState(false);
  const user = userStore.user;

  const onChange = async (event) => {
    setIsLoading(true);
    event.preventDefault();

    const file = event.target.files[0];
    await getAvatarUrl(file);
  };

  const getAvatarUrl = async (file) => {
    if (file.size > 1024 * 1024 * 10) {
      alert("Размер изображения слишком большой");
      setModal(false);
    } else if (
      file.type !== "image/png" &&
      file.type !== "image/jpg" &&
      file.type !== "image/jpeg"
    ) {
      console.log(file.type !== "image/png");
      alert("Можно загружать только изображения (png/jpg/jpeg)");
      setModal(false);
    } else {
      const avatarName = user.uid + "_avatar";
      const storage = getStorage();
      const storageRef = ref(storage, avatarName);

      await uploadBytes(storageRef, file).then(() => {
        getDownloadURL(ref(storage, avatarName))
          .then(async (url) => {
            const avatarUrl = url;

            const newUser = await userStore.editUserAvatar(avatarUrl);

            if (newUser !== undefined) {
              localStorage.setItem("user", JSON.stringify(newUser));
            }
            setModal(false);
          })
          .catch((error) => {
            console.log(error);
          });
      });
    }
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
          <form onChange={onChange} className={s.form}>
            {!isLoading && (
              <>
                <label className={s.labelAvatar} htmlFor="avatar">
                  Выберите файл
                </label>

                <input className={s.inputAvatar} type="file" id="avatar" />
              </>
            )}

            {isLoading && <div className={s.labelAvatar}>loading...</div>}
          </form>

          {!isLoading && (
            <button onClick={onClose} data-close="close" className={s.close}>
              Отменить
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
