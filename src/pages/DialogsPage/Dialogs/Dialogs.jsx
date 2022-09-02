import Dialog from "../Dialog/Dialog";
import Preloader from "../../../components/Preloader/Preloader";
import { NavLink } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { chatStore } from "../../../store/chat";

const Dialogs = observer(() => {
  return (
    <>
      {chatStore.loading ? (
        <Preloader />
      ) : chatStore.dialogs.length !== 0 && chatStore.users.length !== 0 ? (
        <>
          {chatStore.dialogs.map((dialog) => (
            <Dialog key={dialog[0].dialog_id} dialog={dialog} />
          ))}
        </>
      ) : (
        <>
          <div className="not-dialogs">Сообщений не найдено</div>
          <div className="to-search">
            <NavLink to={"search"}> К списку пользователей </NavLink>
          </div>
        </>
      )}
    </>
  );
});

export default Dialogs;
