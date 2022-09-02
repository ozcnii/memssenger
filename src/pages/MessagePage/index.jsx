import Header from "./Header/Header";
import BodyComponent from "../../components/Layout/Body/BodyComponent";
import FormMessage from "./FormMessage/FormMessage";
import MessagesWrapper from "./MessagesWrapper/MessagesWrapper";
import { useEffect } from "react";
import { db } from "../../firebase";
import { doc, onSnapshot } from "@firebase/firestore";
import Preloader from "../../components/Preloader/Preloader";
import { observer } from "mobx-react-lite";
import { dialogStore } from "../../store/dialog";

const Messages = observer(() => {
  useEffect(() => {
    dialogStore.createDialogId();
  }, []);

  useEffect(() => {
    if (!dialogStore.dialogId) return;

    const unsub = onSnapshot(
      doc(db, "dialogs", dialogStore.dialogId),
      (doc) => {
        const currentData = doc.data();

        if (currentData) {
          if (currentData.messages.length > 0) {
            dialogStore.setMessages(currentData.messages);
          }
        } else {
          dialogStore.setMessages([]);
        }
      }
    );

    return () => {
      unsub();
      dialogStore.setAll();
    };
  }, []);

  return (
    <>
      <Header />

      <BodyComponent>
        {dialogStore.loading ? <Preloader /> : <MessagesWrapper />}

        <FormMessage />
      </BodyComponent>
    </>
  );
});
export default Messages;
