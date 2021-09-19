import styles from './App.module.css'

import HomePage from "./components/HomePage/HomePage";
import HomeHeaderContent from './components/HomePage/HomeHeaderContent/HomeHeaderContent';

import SearchPage from "./components/SearchPage/SearchPage";
import SearchHeaderContent from './components/SearchPage/SearchHeaderContent/SearchHeaderContent';

import MenuPage from './components/MenuPage/MenuPage';
import { BrowserRouter, Route } from 'react-router-dom';
import SettingsHeaderContent from './components/SettingsPage/SettingsHeaderContent/SettingsHeaderContent';
import SettingsPage from './components/SettingsPage/SettingsPage';

function App() {
  return (
    <BrowserRouter>

      <header className={styles.header}>

        <Route exact path="/" render={ ()=> <HomeHeaderContent/> }/>

        <Route path="/home" render={ ()=> <HomeHeaderContent/> }/>
        <Route path="/search" render={ ()=> <SearchHeaderContent/> }/>
        <Route path='/settings'render={()=> <SettingsHeaderContent/> } />

      </header>


      <main className={styles.main}>
        <Route exact path="/" render={ ()=> <HomePage/> }/>

        <Route path="/home" render={ ()=> <HomePage/> }/>
        <Route path="/search" render={ ()=> <SearchPage/> }/>
        <Route path='/settings'render={()=> <SettingsPage/> } />

      </main>

      <div className={styles.menu}>
        {/* if (menu == visible { return MenuPage}, else return 0) */}
        {/* <MenuPage/> */}
      </div>
    </BrowserRouter>
  );
}

export default App;