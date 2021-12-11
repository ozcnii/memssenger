import { BrowserRouter, Route, Switch, Redirect, HashRouter} from 'react-router-dom';
import routes from './routes/routes';
import DialogsPage from './pages/DialogsPage/DialogsPage';
import Messages from './pages/MessagePage/Messages';
import SearchPage from './pages/SearchPage/SearchPage';
import SettingsPage from './pages/SettingsPage/SettingsPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegistrationPage from './pages/LoginPage/RegistrationPage/RegistrationPage';
import { useState } from 'react';


function App() {

  const [user, setUser] = useState(null)

  const [chats, setChats] = useState([]);
  const [dialog, setDialog] = useState(null);

  return (
    // <BrowserRouter>
      <HashRouter>
        
        <div className='header-background'></div>

        <Switch>
            <Route exact path='/' render={ () =>  <Redirect to={routes.login} /> }/>

            <Route path={routes.dialogs } render={() => (
                <DialogsPage user={user} 
                  setUser={setUser} 
                  chats={chats}
                  setChats={setChats}
                  setDialog={setDialog}
                />) } />

            <Route path={routes.messages + '/:id'} render={() => <Messages dialog={dialog} user={user} />} />
            <Route path={routes.settings} render={() => <SettingsPage setUser={setUser} user={user} /> } />
            <Route path={routes.search } render={() => <SearchPage user={user} setDialog={setDialog} />} />

            <Route path={routes.login} render={() => <LoginPage user={user} setUser={setUser} />} />
            <Route path={routes.registr} render={() => <RegistrationPage  user={user} setUser={setUser}/>} />

            <Route path='*' render={() => <Redirect to={routes.dialogs} />} />
        </Switch>

    </HashRouter>
    // </BrowserRouter>
  );
}

export default App;
