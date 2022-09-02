import styles from "./Header.module.css";
import { NavLink } from "react-router-dom";
import HeaderComponent from "../../../components/Layout/Header/HeaderComponent";
import routes from "../../../routes/routes";
import { useRef } from "react";
import { BackIcon } from "../../../components/Icons/BackIcon/BackIcon";

function Header({ searchUsers }) {
  const searchRef = useRef();

  const onChange = () => {
    searchUsers(searchRef);
  };

  return (
    <>
      <HeaderComponent>
        <NavLink to={routes.dialogs} className={styles.backButton}>
          <BackIcon />
        </NavLink>

        <input
          type="text"
          placeholder="Поиск"
          className={styles.input}
          onChange={onChange}
          ref={searchRef}
        />
      </HeaderComponent>
    </>
  );
}

export default Header;
