import Dialog from "../Dialog/Dialog";
import BodyComponent from "../../../components/Layout/Body/BodyComponent";
import { useHistory } from "react-router";
import { useEffect } from "react";

import Preloader from "../../../components/Preloader/Preloader";
import { NavLink } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { chatStore } from "../../../store/chat.store";
import { userStore } from "../../../store/user.store";

const Dialogs = observer(() => {
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      userStore.setUser(user);
    } else {
      history.push("/");
    }
  }, [history]);

  useEffect(() => {
    chatStore.getChats();
  }, []);

  return (
    <>
      <BodyComponent>
        {chatStore.loading ? (
          <Preloader />
        ) : chatStore.dialogs.length !== 0 ? (
          <>
            {chatStore.users.map((user) => (
              <Dialog key={user.uid} user={user} dialogs={chatStore.dialogs} />
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
      </BodyComponent>
    </>
  );
});

export default Dialogs;
