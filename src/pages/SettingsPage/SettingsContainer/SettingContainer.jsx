import { useHistory } from "react-router";
import BodyComponent from "../../../components/Layout/Body/BodyComponent";
import s from "./SettingsContainer.module.css";
import { useEffect } from "react";
import routes from "../../../routes/routes";
import { useState } from "react";
import EditName from "../../../components/Modals/EditName/EditName";
import EditAvatar from "../../../components/Modals/EditAvatar/EditAvatar";
import Alert from "../../../components/Alert/Alert";
import { userStore } from "../../../store/user.store";
import { observer } from "mobx-react-lite";

const SettingsContainer = observer(() => {
  const user = userStore.user;

  const [editNameModal, setEditNameModal] = useState(false);
  const [editAvatarModal, setEditAvatarModal] = useState(false);
  const [showAlert, setAlert] = useState(false);
  const [alertText, setAlertText] = useState(null);

  const history = useHistory();

  const logout = () => {
    localStorage.setItem("user", null);
    userStore.setUser(null);
    history.push(routes.login);
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      userStore.setUser(user);
    }
  }, []);

  const showEditNameModal = () => {
    setEditNameModal(true);
  };

  const showEditAvatarModal = () => {
    setEditAvatarModal(true);
  };

  const saveToBuffer = async () => {
    const copyText =
      "Привет, я использую Memssenger для общения с друзьями. Присоединяйся по ссылке: https://ozcnii.github.io/memssenger";
    try {
      await navigator.clipboard.writeText(copyText);
      const alertText = "Пригласительное сообщение скопировано в буфер обмена";
      setAlertText(alertText);
      setAlert(true);
    } catch (e) {
      const alertText =
        "Произошла ошибка во время копирования пригласительного сообщения";
      setAlertText(alertText);
      setAlert(true);
    }
  };
  return (
    <>
      {editNameModal && <EditName setModal={setEditNameModal} />}

      {editAvatarModal && <EditAvatar setModal={setEditAvatarModal} />}
      {showAlert && <Alert message={alertText} closeAlert={setAlert} />}

      <BodyComponent>
        {user ? (
          <>
            <div className={s.main}>
              <div className={s.top}>
                <div className={s.avatar}>
                  {user?.avatar && <img src={user.avatar} alt="" />}
                </div>

                <div className={s.info}>
                  <div className={`${s.userName} text-mw-100`}>
                    {user.name}{" "}
                  </div>
                  <div className="text-mw-100">{user.email}</div>
                </div>
              </div>
            </div>

            <div className={s.settings}>
              <div className={s.edit} onClick={showEditAvatarModal}>
                <div className={s.icon}>
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="user-astronaut"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path
                      fill="currentColor"
                      d="M64 224h13.5c24.7 56.5 80.9 96 146.5 96s121.8-39.5 146.5-96H384c8.8 0 16-7.2 16-16v-96c0-8.8-7.2-16-16-16h-13.5C345.8 39.5 289.6 0 224 0S102.2 39.5 77.5 96H64c-8.8 0-16 7.2-16 16v96c0 8.8 7.2 16 16 16zm40-88c0-22.1 21.5-40 48-40h144c26.5 0 48 17.9 48 40v24c0 53-43 96-96 96h-48c-53 0-96-43-96-96v-24zm72 72l12-36 36-12-36-12-12-36-12 36-36 12 36 12 12 36zm151.6 113.4C297.7 340.7 262.2 352 224 352s-73.7-11.3-103.6-30.6C52.9 328.5 0 385 0 454.4v9.6c0 26.5 21.5 48 48 48h80v-64c0-17.7 14.3-32 32-32h128c17.7 0 32 14.3 32 32v64h80c26.5 0 48-21.5 48-48v-9.6c0-69.4-52.9-125.9-120.4-133zM272 448c-8.8 0-16 7.2-16 16s7.2 16 16 16 16-7.2 16-16-7.2-16-16-16zm-96 0c-8.8 0-16 7.2-16 16v48h32v-48c0-8.8-7.2-16-16-16z"
                    ></path>
                  </svg>
                </div>
                <span>Изменить аватар </span>
              </div>

              <div className={s.edit} onClick={showEditNameModal}>
                <div className={s.icon}>
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="far"
                    data-icon="edit"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                  >
                    <path
                      fill="currentColor"
                      d="M402.3 344.9l32-32c5-5 13.7-1.5 13.7 5.7V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h273.5c7.1 0 10.7 8.6 5.7 13.7l-32 32c-1.5 1.5-3.5 2.3-5.7 2.3H48v352h352V350.5c0-2.1.8-4.1 2.3-5.6zm156.6-201.8L296.3 405.7l-90.4 10c-26.2 2.9-48.5-19.2-45.6-45.6l10-90.4L432.9 17.1c22.9-22.9 59.9-22.9 82.7 0l43.2 43.2c22.9 22.9 22.9 60 .1 82.8zM460.1 174L402 115.9 216.2 301.8l-7.3 65.3 65.3-7.3L460.1 174zm64.8-79.7l-43.2-43.2c-4.1-4.1-10.8-4.1-14.8 0L436 82l58.1 58.1 30.9-30.9c4-4.2 4-10.8-.1-14.9z"
                    ></path>
                  </svg>
                </div>
                <span>Изменить имя</span>
              </div>

              <a
                href="https://github.com/ttenapp/memssenger"
                target="blank"
                className={s.edit}
              >
                <div className={s.icon}>
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="question"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                  >
                    <path
                      fill="currentColor"
                      d="M202.021 0C122.202 0 70.503 32.703 29.914 91.026c-7.363 10.58-5.093 25.086 5.178 32.874l43.138 32.709c10.373 7.865 25.132 6.026 33.253-4.148 25.049-31.381 43.63-49.449 82.757-49.449 30.764 0 68.816 19.799 68.816 49.631 0 22.552-18.617 34.134-48.993 51.164-35.423 19.86-82.299 44.576-82.299 106.405V320c0 13.255 10.745 24 24 24h72.471c13.255 0 24-10.745 24-24v-5.773c0-42.86 125.268-44.645 125.268-160.627C377.504 66.256 286.902 0 202.021 0zM192 373.459c-38.196 0-69.271 31.075-69.271 69.271 0 38.195 31.075 69.27 69.271 69.27s69.271-31.075 69.271-69.271-31.075-69.27-69.271-69.27z"
                    ></path>
                  </svg>
                </div>
                <span>Информация</span>
              </a>

              <div className={s.edit} onClick={saveToBuffer}>
                <div className={s.icon}>
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="user-friends"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 512"
                  >
                    <path
                      fill="currentColor"
                      d="M192 256c61.9 0 112-50.1 112-112S253.9 32 192 32 80 82.1 80 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C51.6 288 0 339.6 0 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zM480 256c53 0 96-43 96-96s-43-96-96-96-96 43-96 96 43 96 96 96zm48 32h-3.8c-13.9 4.8-28.6 8-44.2 8s-30.3-3.2-44.2-8H432c-20.4 0-39.2 5.9-55.7 15.4 24.4 26.3 39.7 61.2 39.7 99.8v38.4c0 2.2-.5 4.3-.6 6.4H592c26.5 0 48-21.5 48-48 0-61.9-50.1-112-112-112z"
                    ></path>
                  </svg>
                </div>
                <span>Пригласить друзей</span>
              </div>

              <div className={s.edit + " " + s.last} onClick={logout}>
                <div className={s.icon}>
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="sign-out-alt"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="currentColor"
                      d="M497 273L329 441c-15 15-41 4.5-41-17v-96H152c-13.3 0-24-10.7-24-24v-96c0-13.3 10.7-24 24-24h136V88c0-21.4 25.9-32 41-17l168 168c9.3 9.4 9.3 24.6 0 34zM192 436v-40c0-6.6-5.4-12-12-12H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h84c6.6 0 12-5.4 12-12V76c0-6.6-5.4-12-12-12H96c-53 0-96 43-96 96v192c0 53 43 96 96 96h84c6.6 0 12-5.4 12-12z"
                    ></path>
                  </svg>
                </div>
                <span>Выход</span>
              </div>
            </div>
          </>
        ) : null}
      </BodyComponent>
    </>
  );
});

export default SettingsContainer;
