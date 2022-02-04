import { NavLink } from "react-router-dom";
import routes from "../../../../routes/routes";
import { dialogStore } from "../../../../store/dialog.store";
import styles from "./LastItem.module.css";
import { motion } from "framer-motion/dist/framer-motion";

function LastItem({ user }) {
  const { name, uid, email, avatar } = user;

  return (
    <motion.div layout>
      <NavLink
        to={routes.messages + `/${user.uid}`}
        onClick={() =>
          dialogStore.setActiveDialog({ email, uid, name, avatar })
        }
      >
        <div className={styles.container}>
          <div className={styles.avatar}>
            <img src={user.avatar ? user.avatar : null} alt="" />
          </div>
          <div className={styles.info}>
            <div className={`${styles.title} text-mw`}> {user.name} </div>
            <div className={`${styles.date} text-mw`}> {user.email} </div>
          </div>
        </div>
      </NavLink>
    </motion.div>
  );
}
export default LastItem;
