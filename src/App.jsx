import {
  Route,
  Switch,
  Redirect,
  HashRouter,
  useHistory,
} from "react-router-dom";
import routes from "./routes/routes";
import DialogsPage from "./pages/DialogsPage";
import Messages from "./pages/MessagePage";
import SearchPage from "./pages/SearchPage";
import SettingsPage from "./pages/SettingsPage";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/LoginPage/RegistrationPage/RegistrationPage";
import { observer } from "mobx-react-lite";
import { chatStore } from "./store/chat";
import { userStore } from "./store/user";
import { useEffect, useState } from "react";
import Preloader from "./components/Preloader/Preloader";

const App = observer(() => {
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    (async () => {
      const user = JSON.parse(localStorage.getItem("user"));

      if (user && user.uid) {
        await userStore.getMe(user?.uid);

        chatStore.getChats();
      } else {
        history.push("/");
      }

      setIsLoading(false);
    })();
  }, [history]);

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <HashRouter>
      <div className="header-background"></div>

      <Switch>
        <Route exact path="/" render={() => <Redirect to={routes.login} />} />
        <Route path={routes.dialogs} render={() => <DialogsPage />} />

        <Route path={routes.messages + "/:id"} render={() => <Messages />} />
        <Route path={routes.settings} render={() => <SettingsPage />} />
        <Route path={routes.search} render={() => <SearchPage />} />

        <Route path={routes.login} render={() => <LoginPage />} />
        <Route path={routes.registr} render={() => <RegistrationPage />} />

        <Route path="*" render={() => <Redirect to={routes.dialogs} />} />
      </Switch>
    </HashRouter>
  );
});

export default App;
