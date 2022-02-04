import { Route, Switch, Redirect, HashRouter } from "react-router-dom";
import routes from "./routes/routes";
import DialogsPage from "./pages/DialogsPage";
import Messages from "./pages/MessagePage";
import SearchPage from "./pages/SearchPage";
import SettingsPage from "./pages/SettingsPage";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/LoginPage/RegistrationPage/RegistrationPage";

function App() {
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
}

export default App;
