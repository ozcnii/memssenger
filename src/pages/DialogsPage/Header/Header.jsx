import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import HeaderComponent from "../../../components/Layout/Header/HeaderComponent";
import routes from "../../../routes/routes";
import { SearchIcon } from "../../../components/Icons/SearchIcon/SearchIcon";
import { MenuIcon } from "../../../components/Icons/MenuIcon/MenuIcon";

function Header() {
  return (
    <>
      <HeaderComponent>
        <NavLink to={routes.settings} className={styles.menuButton}>
          <MenuIcon />
        </NavLink>

        <div className="appTitle">Memssenger</div>

        <NavLink to={routes.search} className={styles.searchButton}>
          <SearchIcon />
        </NavLink>
      </HeaderComponent>
    </>
  );
}

export default Header;
