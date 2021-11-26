import s from './../EditName/EditName.module.css';
import ReactDOM from 'react-dom';

import { getStorage, ref, uploadBytes, list, getDownloadURL } from "firebase/storage";
import { useState } from 'react';

export default function EditName({ setModal }) {
    return ReactDOM.createPortal((
        <Modal setModal={setModal} />
    ), document.body)
}

function Modal({ setModal}) {

    const [avatar, setAvatar] = useState(null)

    const onChange = async (event) => {
        event.preventDefault();
        
        // console.log(event.target.files[0]);

        const file = event.target.files[0]; 
        
        const avatarName = 'uid' + '___________' + 'avatar';
        
        const storage = getStorage();
        const storageRef = ref(storage, avatarName);

        // 'file' comes from the Blob or File API
        
        uploadBytes(storageRef, file).then((snapshot) => {
            console.log('Uploaded a blob or file!');
            
            getDownloadURL(ref(storage, avatarName))
            .then((url) => {
                console.log(url);
                setAvatar(url)
            })
            .catch((error) => {
                
            });
        });

        
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
                    <input type="file" />
                </form>
               
                { (avatar && ( <img src={avatar} alt="" /> )) }

                <button onClick={onClose} data-close="close" className={s.close}>Отменить</button>
            </div>
        </div>
    )
}

