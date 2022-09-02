import s from "./../EditName/EditName.module.css";
import ReactDOM from "react-dom";
import { motion } from "framer-motion/dist/framer-motion";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useState } from "react";
import { userStore } from "../../../store/user";

export default function EditAvatar({ setModal }) {
  return ReactDOM.createPortal(<Modal setModal={setModal} />, document.body);
}

function Modal({ setModal }) {
  const [isLoading, setIsLoading] = useState(false);
  const user = userStore.user;

  const onChange = async (event) => {
    event.preventDefault();
    await getAvatarUrl(event.target.files[0]);
  };

  const closeModalAndDisableLoading = () => {
    setIsLoading(false);
    setModal(false);
  };

  const getAvatarUrl = async (file) => {
    setIsLoading(true);

    if (file.size > 1024 * 1024 * 10) {
      alert("Размер изображения слишком большой");
      closeModalAndDisableLoading();
    } else if (
      file.type !== "image/png" &&
      file.type !== "image/jpg" &&
      file.type !== "image/jpeg"
    ) {
      alert("Можно загружать только изображения (png/jpg/jpeg)");
      closeModalAndDisableLoading();
    } else {
      const avatarName = user.uid + "_avatar";
      const storage = getStorage();
      const storageRef = ref(storage, avatarName);

      await uploadBytes(storageRef, file).then(() => {
        getDownloadURL(ref(storage, avatarName))
          .then(async (url) => {
            const avatarUrl = url;
            await userStore.editUserAvatar(avatarUrl);
          })
          .catch((error) => {
            alert("Произошла ошибка при обновлении аватара. " + error.message);
          })
          .finally(() => {
            closeModalAndDisableLoading();
          });
      });
    }
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
          <form onChange={onChange} className={s.form}>
            {!isLoading && (
              <>
                <label className={s.labelAvatar} htmlFor="avatar">
                  Выберите файл
                </label>

                <input className={s.inputAvatar} type="file" id="avatar" />
              </>
            )}

            {isLoading && <div className={s.labelAvatar}>Загрузка...</div>}
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
