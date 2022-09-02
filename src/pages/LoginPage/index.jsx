import s from "./LoginPage.module.css";
import { NavLink } from "react-router-dom";
import routes from "../../routes/routes";
import { useRef, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Alert from "../../components/Alert/Alert";
import { userStore } from "../../store/user";
import { observer } from "mobx-react-lite";

const LoginPage = observer(() => {
  const [isLoading, setIsLoading] = useState(false);
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
      setIsLoading(true);
      try {
        const user = await userStore.login(myEmail, myPassword);
        localStorage.setItem("user", JSON.stringify(user));
        history.push(routes.dialogs);
      } catch (error) {
        setAlertText(error.message);
        setShowAlert(true);
      } finally {
        setIsLoading(false);
      }
    } else {
      setAlertText("Все поля должны быыть заполнены");
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
            type="email"
            placeholder="Эл. адрес"
            className={s.login}
            required
          />

          <input
            ref={password}
            type="password"
            placeholder="Пароль"
            className={s.password}
            required
          />

          <button type="submit" className={s.submit}>
            {isLoading ? "Загрузка..." : "Войти"}
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
