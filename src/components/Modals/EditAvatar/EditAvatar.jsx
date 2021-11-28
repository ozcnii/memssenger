import s from './../EditName/EditName.module.css';
import ReactDOM from 'react-dom';
import { collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from './../../../firebase';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useState } from 'react';

export default function EditName({ setModal, user, setUser }) {
    return ReactDOM.createPortal((
        <Modal setModal={setModal} user={user} setUser={setUser} />
    ), document.body)
}

function Modal({ setModal, user, setUser}) {

    const [isLoading, setIsLoading] = useState(false);

    const onChange = async (event) => {
        
        setIsLoading(true)
        
        event.preventDefault();

        const file = event.target.files[0]; 
        
        const avatarName = user.uid +  '_avatar';
        
        const storage = getStorage();
        const storageRef = ref(storage, avatarName);

        let avatarUrl = '';

        await uploadBytes(storageRef, file).then((snapshot) => {
            
            getDownloadURL(ref(storage, avatarName))
            .then((url) => {
                avatarUrl = url
            })
            .catch((error) => {
                console.log(error);
            });
        });

        let docID = '';

        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            docID = doc.id;
        });
    
        const avatarRef = doc(db, "users", docID);

        await updateDoc(avatarRef, {
            avatar: avatarUrl
        });

        const newUser = {...user, avatar: avatarUrl};
        setUser(newUser); 
        
        localStorage.setItem(
            'user',
            JSON.stringify(newUser)
        );
        
        setIsLoading(false)
        setModal(false);
    };  

    const onClose = (event) => {
        event.stopPropagation();

        if (event.target.dataset.close === 'close') { 
            setModal(false)
        }        
    };

    return (
        <div className={s.modal} data-close="close" onClick={onClose}>
            <div className={s.modalContent}>
                <form onChange={onChange} className={s.form}>

                    { !isLoading && (
                        <>
                            <label className={s.labelAvatar} htmlFor="avatar">
                                Выберите файл
                            </label>

                            <input className={s.inputAvatar} type="file" id="avatar" />
                        </>
                    )}

                    { isLoading && (
                        <div className={s.labelAvatar}>
                            loading...
                        </div>
                    )}

                </form>

                {
                    !isLoading && (
                        <button onClick={onClose} data-close="close" className={s.close}>Отменить</button>
                    )
                }
                
            </div>
        </div>
    )
}