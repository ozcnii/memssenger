import s from './../LoginPage.module.css';
import { NavLink } from 'react-router-dom';
import routes from '../../../routes/routes';
import { useRef, useEffect } from 'react';
import { auth, db } from './../../../firebase';
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { addDoc, collection } from '@firebase/firestore';
import { useHistory } from 'react-router-dom';

export default function RegistrationPage({ setUser }) {

    const history = useHistory();

    const email = useRef(null);
    const password = useRef(null);
    const confirmPassword = useRef(null);
    const userName = useRef(null);

    const register = async (event) => {
        event.preventDefault()

        const myEmail = email.current.value.trim();
        const myPassword = password.current.value.trim();
        const myConfirmPassword = confirmPassword.current.value.trim();
        const myName = userName.current.value.trim();

        if (myEmail && myPassword && myName && myConfirmPassword && myPassword === myConfirmPassword) {
                try {
                    const responseFromAuth = await createUserWithEmailAndPassword(
                        auth,
                        myEmail,
                        myPassword,
                    );
                    
                    const userId = responseFromAuth.user.uid;
        
                    // saving to firebase;
                    await addDoc(collection(db, 'users'), {
                        email: myEmail,
                        uid: userId,
                        name: myName,
                    });
        
                    // save user to localStorage;
                    localStorage.setItem(
                        'user',
                        JSON.stringify({
                            email: myEmail,
                            uid: userId,
                            name: myName,
                        })
                    );
                    
                    // set user an active in app;
                    setUser({
                        email: myEmail,
                        uid: userId, 
                        name: myName,
                    });
                    
                    history.push('/chat');
        
                } catch (error) {
                    alert(error)
                }
        } else if (myPassword !== myConfirmPassword) {
            alert('Пароли не совпадают')
        } else {
            alert('Все поля должны быыть заполнены');
        }
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));

        if (user) {
            setUser(user);
            history.push(routes.dialogs);
        };

    }, [history, setUser]);

    return (
        <div className={s.container}>
            <div className={s.title}>Регистрация</div>  

            <form onSubmit={register} className={s.form}>
                <input type="text" ref={email} placeholder='Эл. адрес' className={s.login} />

                <input type="text" ref={password} placeholder='Пароль' className={s.password} />

                <input type="text" ref={confirmPassword} placeholder='Подтвердите пароль' className={s.passwordConfirm} />

                <input type="text" ref={userName} placeholder='Введите ваше имя' className={s.passwordConfirm} />

                <button type='submit' className={s.submit}>Регистрация</button>

                <div>
                    <NavLink to={routes.login} className={s.logIn}>Войти</NavLink>
                </div>
            </form>   

        </div>
    )
}
