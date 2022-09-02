import s from "../LoginPage.module.css";
import { NavLink } from "react-router-dom";
import routes from "../../../routes/routes";
import { useRef, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Alert from "../../../components/Alert/Alert";
import { userStore } from "../../../store/user";
import { observer } from "mobx-react-lite";

const RegistrationPage = observer(() => {
  const [isLoading, setIsLoading] = useState(false);
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
    let text = "";

    if (
      myEmail &&
      myPassword &&
      myName &&
      myConfirmPassword &&
      myPassword === myConfirmPassword
    ) {
      try {
        setIsLoading(true);
        const newUser = await userStore.register(myEmail, myPassword, myName);
        if (newUser) {
          localStorage.setItem("user", JSON.stringify(newUser));
        }
        history.push("/chat");
      } catch (error) {
        text = error.message;
      } finally {
        setIsLoading(false);
      }
    } else if (myPassword !== myConfirmPassword) {
      text = "Пароли не совпадают";
    } else {
      text = "Все поля должны быыть заполнены";
    }

    setAlertText(text);
    setShowAlert(true);
  };

  useEffect(() => {
    if (userStore.user) {
      history.push(routes.dialogs);
    }
  }, [history]);

  return (
    <>
      {showAlert && <Alert message={alertText} closeAlert={setShowAlert} />}

      <div className={s.container}>
        <div className={s.title}>Регистрация</div>

        <form onSubmit={register} className={s.form}>
          <input
            type="email"
            ref={email}
            placeholder="Эл. адрес"
            className={s.login}
            required
          />

          <input
            type="text"
            ref={password}
            placeholder="Пароль"
            className={s.password}
            required
          />

          <input
            type="text"
            ref={confirmPassword}
            placeholder="Подтвердите пароль"
            className={s.passwordConfirm}
            required
          />

          <input
            type="text"
            ref={userName}
            placeholder="Введите ваше имя"
            className={s.passwordConfirm}
            required
          />

          <button type="submit" className={s.submit}>
            {isLoading ? "Загрузка..." : "Регистрация"}
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
