import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";

import HeaderComponent from "../../../components/Layout/Header/HeaderComponent";
import routes from "../../../routes/routes";
import { useHistory } from "react-router";
import { observer } from "mobx-react-lite";
import { dialogStore } from "../../../store/dialog.store";
import { BackIcon } from "../../../components/Icons/BackIcon/BackIcon";

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
          <BackIcon />
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
