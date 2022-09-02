import Dialogs from "./Dialogs/Dialogs";
import Header from "./Header/Header";
import BodyComponent from "../../components/Layout/Body/BodyComponent";
import { useEffect } from "react";
import { chatStore } from "../../store/chat";

export default function DialogsPage() {
  useEffect(() => {
    chatStore.getChats();
  }, []);
  return (
    <>
      <Header />
      <BodyComponent>
        <Dialogs />
      </BodyComponent>
    </>
  );
}
