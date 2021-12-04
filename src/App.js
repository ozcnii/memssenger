import { BrowserRouter, Route, Switch, Redirect, HashRouter} from 'react-router-dom';
import routes from './routes/routes';
import DialogsPage from './components/DialogsPage/DialogsPage';
import Messages from './components/MessagePage/Messages';
import SearchPage from './components/SearchPage/SearchPage';
import SettingsPage from './components/SettingsPage/SettingsPage';
import LoginPage from './components/LoginPage/LoginPage';
import RegistrationPage from './components/LoginPage/RegistrationPage/RegistrationPage';
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
