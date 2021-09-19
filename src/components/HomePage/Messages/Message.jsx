import styles from './Message.module.css'
import userAvatart from './../../../images/other/messange/userAvatar.png'
function Message() {
    return (
        <>
            <div className={styles.messageContainer}>
                <div className={styles.avatar}>
                    <img src={userAvatart} alt="avatar" />
                </div>

                <div className={styles.info}>
                    <div className={styles.top}>
                        <div className={styles.title}>User Name</div> 
                        <div className={styles.date}>22:30</div>
                    </div>
                    <div className={styles.bottom}>Lorem ipsum dolor sit amet.</div>
                </div>
            </div>
        </>
    );
}

export default Message; 