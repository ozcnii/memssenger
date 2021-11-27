import Dialog from './../Dialog/Dialog';
import BodyComponent from '../../Universals/Body/BodyComponent';
import { useHistory } from 'react-router';
import { useEffect, useState } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from './../../../firebase';
import Preloader from '../../Preloader/Preloader';

function Dialogs({ user, setUser, chats, setChats, setDialog}) {
    
    const history = useHistory();

    const [isLoading, setIsLoading] = useState(true);

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

    return (
        <>
            <BodyComponent>
                
                { isLoading
                    ? ( 
                        <Preloader />
                    ) : (
                    <>
                        {chats.map( (user) => <Dialog key={user.uid} user={user} setDialog={setDialog} />)}
                    </> )
                }
            </BodyComponent>
        </>
    );
}

export default Dialogs;
  