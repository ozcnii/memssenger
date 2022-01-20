import s from "./EditName.module.css";
import ReactDOM from "react-dom";
import { useRef } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";

import { db } from "./../../../firebase";

export default function EditName({ setModal, user, setUser }) {
    return ReactDOM.createPortal(
        <Modal setModal={setModal} user={user} setUser={setUser} />,
        document.body
    );
}

function Modal({ setModal, user, setUser }) {
    const newName = useRef(null);

    const onSubmit = async (event) => {
        event.preventDefault();

        const myName = newName.current.value.trim();

        if (myName.length > 0) {
            newName.current.value = "";

            let userId = null;

            const citiesRef = collection(db, "users");
            const q = query(citiesRef, where("uid", "==", user.uid));

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                userId = doc.id;
            });

            const nameRef = doc(db, "users", userId);
            await updateDoc(nameRef, {
                name: myName,
            });

            const newUser = { ...user, name: myName };
            setUser(newUser);
            localStorage.setItem("user", JSON.stringify(newUser));
            setModal(false);
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
            <div className={s.modalContent}>
                <form onSubmit={onSubmit} className={s.form}>
                    <input
                        autoFocus
                        ref={newName}
                        placeholder="Введите имя"
                        type="text"
                    />
                    <button type="submit">Сохранить</button>
                </form>

                <button
                    onClick={onClose}
                    data-close="close"
                    className={s.close}
                >
                    Отменить
                </button>
            </div>
        </div>
    );
}
