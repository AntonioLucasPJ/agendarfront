import styles from './alert.module.css'
export function AlertMessage({ msg }) {
    return (
        <div className={styles.alertaflutuante}>
            <div className={styles.message}>
                <p className={styles.textaviso}>{msg}</p>
            </div>
        </div>

    )
}