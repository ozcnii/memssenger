import styles from './LastItem.module.css'
import userAvatart from './../../../../images/other/userAvatar.png'

function LastItem() {
    return (
        <div className={styles.container}>
            <div className={styles.avatar}>
                <img src={userAvatart} alt="avatar" />
            </div>

            <div className={styles.info}>
                <div className={styles.title}>User Name</div> 
                <div className={styles.date}> Последняя активность 22:30</div>
            </div>
        </div>
    )
}
export default LastItem