import s from "../LoginPage.module.css";
import { NavLink } from "react-router-dom";
import routes from "../../../routes/routes";
import { useRef, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Alert from "../../../components/Alert/Alert";
import { userStore } from "../../../store/user.store";
import { observer } from "mobx-react-lite";

const RegistrationPage = observer(({ setUser }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState(null);

  const history = useHistory();

  const email = useRef(null);
  const password = useRef(null);
  const confirmPassword = useRef(null);
  const userName = useRef(null);

  const register = async (event) => {
    event.preventDefault();

    const myEmail = email.current.value.trim();
    const myPassword = password.current.value.trim();
    const myConfirmPassword = confirmPassword.current.value.trim();
    const myName = userName.current.value.trim();

    if (
      myEmail &&
      myPassword &&
      myName &&
      myConfirmPassword &&
      myPassword === myConfirmPassword
    ) {
      try {
        const newUser = await userStore.register(myEmail, myPassword, myName);
        if (newUser !== undefined) {
          localStorage.setItem("user", JSON.stringify(newUser));
        }

        history.push("/chat");
      } catch (error) {
        const text = error.message;
        setAlertText(text);
        setShowAlert(true);
      }
    } else if (myPassword !== myConfirmPassword) {
      const text = "Пароли не совпадают";
      setAlertText(text);
      setShowAlert(true);
    } else {
      const text = "Все поля должны быыть заполнены";
      setAlertText(text);
      setShowAlert(true);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      setUser(user);
      history.push(routes.dialogs);
    }
  }, [history, setUser]);

  return (
    <>
      {showAlert && <Alert message={alertText} closeAlert={setShowAlert} />}

      <div className={s.container}>
        <div className={s.title}>Регистрация</div>

        <form onSubmit={register} className={s.form}>
          <input
            type="text"
            ref={email}
            placeholder="Эл. адрес"
            className={s.login}
          />

          <input
            type="text"
            ref={password}
            placeholder="Пароль"
            className={s.password}
          />

          <input
            type="text"
            ref={confirmPassword}
            placeholder="Подтвердите пароль"
            className={s.passwordConfirm}
          />

          <input
            type="text"
            ref={userName}
            placeholder="Введите ваше имя"
            className={s.passwordConfirm}
          />

          <button type="submit" className={s.submit}>
            {userStore.loading ? "Загрузка..." : "Регистрация"}
          </button>

          <div>
            <NavLink to={routes.login} className={s.logIn}>
              Войти
            </NavLink>
          </div>
        </form>
      </div>
    </>
  );
});

export default RegistrationPage;
