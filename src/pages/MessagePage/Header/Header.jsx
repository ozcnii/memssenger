import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";

import HeaderComponent from "../../../components/Layout/Header/HeaderComponent";
import routes from "../../../routes/routes";
import { useHistory } from "react-router";
import { observer } from "mobx-react-lite";
import { dialogStore } from "../../../store/dialog.store";

const Header = observer(() => {
  const history = useHistory();
  const dialog = dialogStore.activeDialog;
  if (!dialog) {
    history.push(routes.dialogs);
    return null;
  }

  return (
    <>
      <HeaderComponent>
        <NavLink to={routes.dialogs} className={styles.backButton}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#000000"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
          </svg>
        </NavLink>

        <div className="appTitle text-mw">{dialog.name}</div>

        <div className={styles.userAvatar}>
          <img src={dialog?.avatar} alt="" />
        </div>
      </HeaderComponent>
    </>
  );
});

export default Header;
