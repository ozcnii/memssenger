import Dialogs from "./Dialogs/Dialogs";
import Header from "./Header/Header";
import BodyComponent from "../../components/Layout/Body/BodyComponent";

export default function DialogsPage() {
  return (
    <>
      <Header />
      <BodyComponent>
        <Dialogs />
      </BodyComponent>
    </>
  );
}
