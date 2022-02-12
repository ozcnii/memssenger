import Dialog from "../Dialog/Dialog";
import { useHistory } from "react-router";
import { useLayoutEffect } from "react";
import Preloader from "../../../components/Preloader/Preloader";
import { NavLink } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { chatStore } from "../../../store/chat.store";
import { userStore } from "../../../store/user.store";

const Dialogs = observer(() => {
  const history = useHistory();

  useLayoutEffect(() => {
    chatStore.getChats();

    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      userStore.setUser(user);
    } else {
      history.push("/");
    }
  }, [history]);

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
