import s from "./LoginPage.module.css";
import { NavLink } from "react-router-dom";
import routes from "../../routes/routes";
import { useRef, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Alert from "../../components/Alert/Alert";
import { userStore } from "../../store/user";
import { observer } from "mobx-react-lite";

const LoginPage = observer(() => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState(null);

  const history = useHistory();
  const email = useRef(null);
  const password = useRef(null);

  const login = async (event) => {
    event.preventDefault();
    const myEmail = email.current.value.trim();
    const myPassword = password.current.value.trim();

    if (myEmail && myPassword) {
      try {
        await userStore.login(myEmail, myPassword);
        history.push(routes.dialogs);
      } catch (error) {
        setAlertText(error.message);
        setShowAlert(true);
      }
    } else {
      const text = "Все поля должны быыть заполнены";
      setAlertText(text);
      setShowAlert(true);
    }
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
        <div className={s.title}>Вход</div>

        <form onSubmit={login} className={s.form}>
          <input
            ref={email}
            type="text"
            placeholder="Эл. адрес"
            className={s.login}
          />

          <input
            ref={password}
            type="password"
            placeholder="Пароль"
            className={s.password}
          />

          <button type="submit" className={s.submit}>
            {userStore.loading ? "Загрузка..." : "Войти"}
          </button>

          <div>
            <NavLink to={routes.registr} className={s.registr}>
              Регистрация
            </NavLink>
          </div>
        </form>
      </div>
    </>
  );
});

export default LoginPage;
