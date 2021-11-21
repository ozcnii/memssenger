import styles from './HeaderComponent.module.css'

export default function HeaderComponent({children}) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                {children}
            </div>
        </div>
    )
}
