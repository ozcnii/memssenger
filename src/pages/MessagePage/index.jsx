import Header from "./Header/Header";
import BodyComponent from "../../components/Layout/Body/BodyComponent";
import FormMessage from "./FormMessage/FormMessage";
import MessagesWrapper from "./MessagesWrapper/MessagesWrapper";
import { useEffect, useRef, useState } from "react";
import { db } from "../../firebase";
import {
    doc,
    getDoc,
    onSnapshot,
    setDoc,
    updateDoc,
} from "@firebase/firestore";
import Preloader from "../../components/Preloader/Preloader";
import { useHistory } from "react-router";

const Messages = ({ user, dialog }) => {
    const history = useHistory();

    const [messages, setMessages] = useState([]);
    const newMessage = useRef("");
    const [dialogId, setDialogId] = useState(null);

    const [isLoading, setIsLoading] = useState(true);

    const sendMessage = async (event) => {
        event.preventDefault();

        const message = newMessage.current.value;

        if (message.trim().length) {
            const myMessage = {
                message: message,
                uid: user.uid,
                date: new Date(),
                dialog_id: dialogId,
                name: user.name,
            };

            newMessage.current.value = "";

            // add and save message to firestore
            const dialogRef = doc(db, "dialogs", dialogId);
            const docSnap = await getDoc(dialogRef);

            // append message to existing dialogs
            if (docSnap.exists()) {
                const docData = docSnap.data();
                await updateDoc(dialogRef, {
                    messages: [...docData.messages, myMessage],
                });
            } else {
                // create a new dialogs
                await setDoc(doc(db, "dialogs", dialogId), {
                    messages: [myMessage],
                });
            }
        }
    };

    useEffect(() => {
        if (!dialog || !user) return;

        let myConvId = null;

        if (dialog.uid > user.uid) {
            myConvId = dialog.uid + user.uid;
        } else {
            myConvId = user.uid + dialog.uid;
        }

        setDialogId(myConvId);
        setIsLoading(false);
    }, [dialog, user]);

    useEffect(() => {
        if (!dialogId) return;

        const unsub = onSnapshot(doc(db, "dialogs", dialogId), (doc) => {
            const currentData = doc.data();

            if (currentData) {
                if (currentData.messages.length > 0) {
                    setMessages(currentData.messages);
                }
            } else {
                setMessages([]);
            }
        });

        return unsub;
    }, [dialogId]);

    useEffect(() => {
        function goToDialogs(event) {
            if (event.keyCode === 27 || event.code === "Escape") {
                history.goBack();
            }
        }

        document.addEventListener("keydown", (event) => goToDialogs(event));
        return () => {
            document.removeEventListener("keydown", (event) =>
                goToDialogs(event)
            );
        };
    }, [history]);

    return (
        <>
            <Header dialog={dialog} />

            <BodyComponent>
                {isLoading ? (
                    <Preloader />
                ) : (
                    <MessagesWrapper messages={messages} user={user} />
                )}

                <FormMessage onSubmit={sendMessage} newMessage={newMessage} />
            </BodyComponent>
        </>
    );
};
export default Messages;
