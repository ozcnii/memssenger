import s from './BodyComponent.module.css'

export default function BodyComponent({children}) {
    return (
        <div className={s.container}>
            {children}
        </div>
    )
}
