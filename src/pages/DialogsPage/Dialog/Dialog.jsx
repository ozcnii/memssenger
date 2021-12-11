import styles from './Dialog.module.css'
import { NavLink } from 'react-router-dom';
import routes from '../../../routes/routes';
import { useEffect, useState } from 'react';
import getDate from '../../../utils/get_date';

function Message({ user, setDialog, authUser, dialogs }) {

    const [lastMessage, setLastMessage] = useState(null);
    const [isLoading, setIsLoading]  = useState(true);
    const {name, uid, email, avatar} = user;

    useEffect( () => {
        const lastMessage = getLastMessage(dialogs, user);
        setLastMessage(lastMessage);
        setIsLoading(false)
    }, [dialogs, user])


    const getLastMessage = (dialogs, user) => {
        let lastMessage = [];

        dialogs.forEach( dialog => {
            if (dialog[0].dialog_id.includes(user.uid)) {
                const lastIndex = dialog.length - 1    
                lastMessage = dialog[lastIndex]
            } 
        })
        
        if (lastMessage.length !== 0) {
            const date = getDate(lastMessage.date)
            const newLastMessage = {
                ...lastMessage, date
            }
            lastMessage = newLastMessage
        }

        return lastMessage
    }
    return (
        <>
            {
                lastMessage && lastMessage.length !== 0 
                ? (<NavLink to={routes.messages + `/${uid}` } className={styles.messageContainer} 
                        onClick={() => setDialog({ email, uid, name, avatar }) }
                    >
                    <div className={styles.avatar}>
                        { user?.avatar && <img src={user.avatar} alt="" /> }
                    </div>

                    <div className={styles.info}>
                        <div className={styles.top}>
                            <div className={styles.userName}>{name}</div> 
                            <div className={styles.date}>
                                { isLoading 
                                    ? null 
                                    : (
                                        lastMessage.length === 0 ? null : lastMessage?.date
                                ) }
                    
                            </div>
                        </div>
                        <div className={styles.bottom}>{
                            isLoading 
                            ? 'Загрузка...'
                            : (lastMessage.length !== 0 
                                ? lastMessage.uid === authUser.uid ? `Вы: ${lastMessage.message}` : lastMessage.message
                                : 'Сообщений не найдено')

                        }</div>
                    </div>
                </NavLink>)
                : null
            }
        </>
    );
}

export default Message;