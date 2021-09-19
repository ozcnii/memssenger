import styles from './MenuPage.module.css';
import userAvatar from './../../images/other/messange/userAvatar.png'
import { NavLink } from 'react-router-dom';

function MenuPage() {
    return (
        <>
            <div className={styles.background}>
                <div className={styles.container}>

                    <div className={styles.header}>
                        <div className={styles.top}>

                            <div className={styles.avatar}>
                                <img src={userAvatar} alt="" />
                            </div>

                            <button className={styles.back}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" opacity=".87"/><path d="M17.51 3.87L15.73 2.1 5.84 12l9.9 9.9 1.77-1.77L9.38 12l8.13-8.13z"/></svg>
                            </button>
                        </div>
                        <div className={styles.bottom}>
                            <div className={styles.name}>User Name</div>

                            <div className={styles.mail}>example@gamil.com</div>
                        </div>
                    </div>

                    <div className={styles.main}>
                        
                        <div className={styles.item}>Создать Чат</div>
                        <div className={styles.item}><NavLink to='/search'>Поиск</NavLink></div>
                        <div className={styles.item}>Настройки</div>
                        <div className={styles.item}>Пригласить Друзей</div>
                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default MenuPage