import styles from './Dialog.module.css'
import { NavLink } from 'react-router-dom';
import routes from '../../../routes/routes';

function Message({email, uid, setDialog, name}) {
    return (
        <>
            <NavLink to={routes.messages + `/${uid}` } className={styles.messageContainer} 
                onClick={() => setDialog({ email, uid, name }) }
                >
                <div className={styles.avatar}>
                    {/* <img src={ userAvatar ? userAvatar : userAvatart} alt="avatar" /> */}
                    {/* <img src="asd" alt="avatar"/> */}
                    <p></p>
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