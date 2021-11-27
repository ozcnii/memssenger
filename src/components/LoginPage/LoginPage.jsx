import s from './LoginPage.module.css';
import { NavLink } from 'react-router-dom';
import routes from '../../routes/routes';
import { useRef, useEffect } from 'react';
import { auth } from './../../firebase';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { useHistory } from 'react-router-dom';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from './../../firebase';

export default function LoginPage({ setUser }) {

    const history = useHistory();

    const email = useRef(null);
    const password = useRef(null);

    const login = async (event) => {
        event.preventDefault()
        const myEmail = email.current.value.trim();
        const myPassword = password.current.value.trim();

        if (myEmail && myPassword) {
    
            try {
                const responseFromAuth = await signInWithEmailAndPassword(
                    auth,
                    myEmail,
                    myPassword,
                );
                
                let myName = null;
                let myAvatar = null;
                const userId = responseFromAuth.user.uid;
                    
                const citiesRef = collection(db, "users");
                const q = query(citiesRef, where("email", "==", myEmail));
                
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    myName = doc.data().name
                    myAvatar = doc.data().avatar
                });

                // save user to localStorage;
                localStorage.setItem(
                    'user',
                    JSON.stringify({
                        email: myEmail,
                        uid: userId,
                        name: myName,
                        avatar: myAvatar
                    })
                );
                
                // set user an active in app;
                setUser({
                    email: myEmail,
                    uid: userId, 
                    name: myName,
                    avatar: myAvatar
                });
                
                history.push(routes.dialogs);
    
            } catch (error) {
                alert(error)
            }
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
            <div className={s.title}>Вход</div>  

            <form onSubmit={login} className={s.form}>
                <input ref={email} type="text" placeholder='Эл. адрес' className={s.login} />

                <input ref={password} type="password" placeholder='Пароль' className={s.password} />

                <button type='submit' className={s.submit}>Войти</button>

                <div>
                    <NavLink to={routes.registr} className={s.registr}>Регистрация</NavLink>
                </div>
            </form> 
              
        </div>
    )
}
