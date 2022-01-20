import Header from "./Header/Header";
import SettingsContainer from "./SettingsContainer/SettingContainer";

export default function SettingsPage({ setUser, user }) {
    return (
        <>
            <Header />
            <SettingsContainer setUser={setUser} user={user} />
        </>
    );
}
