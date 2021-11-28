import styles from './Dialog.module.css'
import { NavLink } from 'react-router-dom';
import routes from '../../../routes/routes';

function Message({ user, setDialog }) {

    const {name, uid, email, avatar} = user;

    return (
        <>
            <NavLink to={routes.messages + `/${uid}` } className={styles.messageContainer} 
                    onClick={() => setDialog({ email, uid, name, avatar }) }
                >
                <div className={styles.avatar}>
                    { user?.avatar && <img src={user.avatar} alt="" /> }
                </div>

                <div className={styles.info}>
                    <div className={styles.top}>
                        <div className={styles.userName}>{name}</div> 
                        <div className={styles.date}>{'12.10'}</div>
                    </div>
                    <div className={styles.bottom}>{'lastMessage'}</div>
                </div>
            </NavLink>
        </>
    );
}

export default Message; 