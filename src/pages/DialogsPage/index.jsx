import Dialogs from "./Dialogs/Dialogs";
import Header from "./Header/Header";

export default function DialogsPage({
    user,
    setUser,
    chats,
    setChats,
    setDialog,
}) {
    return (
        <>
            <Header />
            <Dialogs
                user={user}
                setUser={setUser}
                chats={chats}
                setChats={setChats}
                setDialog={setDialog}
            />
        </>
    );
}
