import Header from "./Header/Header";
import SettingsContainer from "./SettingsContainer/SettingsContainer";
import BodyComponent from "../../components/Layout/Body/BodyComponent";

export default function SettingsPage() {
  return (
    <>
      <Header />
      <BodyComponent>
        <SettingsContainer />
      </BodyComponent>
    </>
  );
}
