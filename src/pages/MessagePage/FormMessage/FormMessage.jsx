import React from 'react'
import s from '../Messages.module.css'

export default function FormMessage({ onSubmit, newMessage }) {
    return (
        <div className={s.wrapper}>
            <div className={s.formWrapper}>

                <form className={s.form} onSubmit={onSubmit}>

                    <input ref={newMessage} className={s.input} type="text" placeholder='Сообщение' />
                    
                    <button className={s.send}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M4.01 6.03l7.51 3.22-7.52-1 .01-2.22m7.5 8.72L4 17.97v-2.22l7.51-1M2.01 3L2 10l15 2-15 2 .01 7L23 12 2.01 3z"/></svg>
                    </button>

                </form>
            </div>
        </div>
    )
}
