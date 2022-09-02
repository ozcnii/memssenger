import { useHistory } from "react-router";
import s from "./SettingsContainer.module.css";
import { useEffect } from "react";
import routes from "../../../routes/routes";
import { useState } from "react";
import EditName from "../../../components/Modals/EditName/EditName";
import EditAvatar from "../../../components/Modals/EditAvatar/EditAvatar";
import Alert from "../../../components/Alert/Alert";
import { userStore } from "../../../store/user.store";
import { observer } from "mobx-react-lite";
import { AvatarIcon } from "../../../components/Icons/AvatarIcon/AvatarIcon";
import { EditNameIcon } from "../../../components/Icons/EditNameIcon/EditNameIcon";
import { InviteIcon } from "../../../components/Icons/InviteIcon/InviteIcon";
import { LogoutIcon } from "../../../components/Icons/LogoutIcon/LogoutIcon";
import { InformationIcon } from "../../../components/Icons/InformationIcon/InformationIcon";

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

      {user ? (
        <>
          <div className={s.main}>
            <div className={s.top}>
              <div className={s.avatar}>
                {user?.avatar && <img src={user.avatar} alt="" />}
              </div>

              <div className={s.info}>
                <div className={`${s.userName} text-mw-100`}>{user.name} </div>
                <div className="text-mw-100">{user.email}</div>
              </div>
            </div>
          </div>

          <div className={s.settings}>
            <div className={s.edit} onClick={showEditAvatarModal}>
              <div className={s.icon}>
                <AvatarIcon />
              </div>
              <span>Изменить аватар </span>
            </div>

            <div className={s.edit} onClick={showEditNameModal}>
              <div className={s.icon}>
                <EditNameIcon />
              </div>
              <span>Изменить имя</span>
            </div>

            <a
              href="https://github.com/ttenapp/memssenger"
              target="blank"
              className={s.edit}
            >
              <div className={s.icon}>
                <InformationIcon />
              </div>
              <span>Информация</span>
            </a>

            <div className={s.edit} onClick={saveToBuffer}>
              <div className={s.icon}>
                <InviteIcon />
              </div>
              <span>Пригласить друзей</span>
            </div>

            <div className={s.edit + " " + s.last} onClick={logout}>
              <div className={s.icon}>
                <LogoutIcon />
              </div>
              <span>Выход</span>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
});

export default SettingsContainer;
