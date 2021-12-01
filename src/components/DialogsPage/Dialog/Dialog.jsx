import styles from './Dialog.module.css'
import { NavLink } from 'react-router-dom';
import routes from '../../../routes/routes';
import { useEffect, useState } from 'react';
import getDate from './../../../utils/get_date';

import { collection, getDocs } from "firebase/firestore";
import { db } from './../../../firebase';

function Message({ user, setDialog, authUser }) {

    const [lastMessage, setLastMessage] = useState(null);
    const [isLoading, setIsLoading]  = useState(true);
    const {name, uid, email, avatar} = user;

    useEffect( () => {

        (async () => {
            const authUserDialogs = await getAuthUserDialogs(authUser, user);
            const lastMessage = await getLastMessage(authUserDialogs, user);
            await setLastMessage(lastMessage)
            await setIsLoading(false)
        })()

    }, [authUser, user])

    const getAuthUserDialogs = async (authUser, user) => {
        const querySnapshop = await getDocs(collection(db, 'dialogs'));
        const allMessages = querySnapshop.docs.map(doc => doc.data());

        const messages = [];

        allMessages.forEach( m => {
            m.messages.forEach( message => {
                if (message.dialog_id === (user.uid + authUser.uid) || message.dialog_id === (authUser.uid + user.uid)) {
                    messages.push(m.messages)           
                } 
            })
        })
    
        return [...new Set(messages)]
    }
    
    const getLastMessage = async (authUserDialogs, user) => {
        let lastMessage = null;

        authUserDialogs.forEach( dialog => {
            const dialog_id = dialog[0].dialog_id;
           
            if (dialog_id.includes(user.uid)) {
                lastMessage = dialog[dialog.length -1 ]; 
            }

        })
        
        if (lastMessage !== null) {
            const date = getDate(lastMessage?.date)
            const newLastMessage = {
                ...lastMessage, date
            }

            return newLastMessage
        }
    }

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
                        <div className={styles.date}>
                            { isLoading ? null : (lastMessage ? lastMessage?.date : null) }
                        </div>
                    </div>
                    <div className={styles.bottom}>{
                        isLoading 
                        ? 'Загрузка...'
                        : (lastMessage 
                            ? lastMessage.uid === authUser.uid ? `Вы: ${lastMessage.message}` : lastMessage.message
                            : 'Сообщений не найдено')
                    }</div>
                </div>
            </NavLink>
        </>
    );
}

export default Message;