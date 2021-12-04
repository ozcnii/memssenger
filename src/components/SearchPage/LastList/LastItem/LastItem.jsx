import { NavLink } from 'react-router-dom'
import routes from '../../../../routes/routes'
import styles from './LastItem.module.css'

function LastItem({ user, setDialog }) {
    
    const {name, uid, email, avatar} = user;

    return (
        <NavLink to={routes.messages + `/${user.uid}`}
            onClick={() => setDialog({ email, uid, name, avatar }) }>
            <div className={styles.container}>
                <div className={styles.avatar}>
                    <img src={ user.avatar ? user.avatar : null } />
                </div>

                <div className={styles.info}>
                    <div className={styles.title}> {user.name} </div> 
                    <div className={styles.date}> {user.email} </div>
                </div>
            </div>
        </NavLink>
    )
}
export default LastItem