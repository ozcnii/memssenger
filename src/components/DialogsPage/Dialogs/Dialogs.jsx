import Dialog from './../Dialog/Dialog';
import BodyComponent from '../../Universals/Body/BodyComponent';
import { useHistory } from 'react-router';
import { useEffect, useState } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from './../../../firebase';
import Preloader from '../../Preloader/Preloader';
import { NavLink } from 'react-router-dom';

function Dialogs({ user, setUser, chats, setChats, setDialog}) {

    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);
    const [dialogs, setDialogs] = useState([]);

    useEffect(()=> {
        const user = JSON.parse(localStorage.getItem('user'))
    
        if (user) {
            setUser(user)
        } else {
            history.push('/')
        }

    }, [history, setUser]);
    
    useEffect(() => {
        if (!user) return
 
        (async () => {
            const querySnapshop = await getDocs(collection(db, 'users'));
            const filteredUsers = querySnapshop.docs
                .map(doc => doc.data())
                .filter(doc => doc.uid !== user.uid)

            setChats(filteredUsers);
            setIsLoading(false);
        })()
        
    }, [user, setChats]);
    

    useEffect(() => {
        const authUser = user; 

        (async () => {
            const authUserDialogs = await getAuthUserDialogs(authUser);
            setDialogs(authUserDialogs)
        })()
        
    }, [user])

    const getAuthUserDialogs = async (authUser) => {
        const querySnapshop = await getDocs(collection(db, 'dialogs'));
        const allMessages = querySnapshop.docs.map(doc => doc.data());

        const authUserDialogs = [];
        
        allMessages.forEach(message => {
            if (message.messages[0].dialog_id.includes(authUser?.uid)) {
                authUserDialogs.push(message.messages)
            }
        })

        return authUserDialogs;
    }

    return (
        <>
            <BodyComponent>
                
            { isLoading
                ? ( <Preloader /> ) 
                : ( dialogs.length !== 0 
                    ? <>
                        {chats.map( (chat) => <Dialog key={chat.uid} user={chat} setDialog={setDialog} authUser={user} dialogs={dialogs} />)}
                    </> 
                    : <> 
                        <div className='not-dialogs'>Сообщений не найдено</div>
                        <div className='to-search'>
                            <NavLink to={'search'}> К списку пользователей </NavLink>
                        </div>
                    </>)  
            }
                
            </BodyComponent>
        </>
    );
}

export default Dialogs;