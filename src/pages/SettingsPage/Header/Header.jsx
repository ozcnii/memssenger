import styles from "./Header.module.css";
import { NavLink } from "react-router-dom";
import HeaderComponent from "../../../components/Layout/Header/HeaderComponent";
import { BackIcon } from "../../../components/Icons/BackIcon/BackIcon";
import { SearchIcon } from "../../../components/Icons/SearchIcon/SearchIcon";

export default function Header() {
  return (
    <HeaderComponent>
      <NavLink to="/im" className={styles.backButton}>
        <BackIcon />
      </NavLink>

      <div>Настройки</div>

      <NavLink to="/search" className={styles.searchButton}>
        <SearchIcon />
      </NavLink>
    </HeaderComponent>
  );
}
