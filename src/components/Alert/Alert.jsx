import s from "./Alert.module.css";
import ReactDOM from "react-dom";
import { useState } from "react";

export default function Alert({ message, closeAlert }) {
    return ReactDOM.createPortal(
        <Modal message={message} closeAlert={closeAlert} />,
        document.body
    );
}

function Modal({ message, closeAlert }) {
    const [isClosed, setIsClosed] = useState(false);

    setTimeout(() => {
        setIsClosed(true);
    }, 4000);

    if (closeAlert) {
        setTimeout(() => {
            closeAlert(false);
        }, 4300);
    }

    return (
        <div className={isClosed ? s.alert + " " + s.close : s.alert}>
            <div className={s.container}>{message}</div>
        </div>
    );
}
