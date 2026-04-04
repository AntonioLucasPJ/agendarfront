import styles from './Modal.module.css'
import trash from  './src/trash.png'
export function Modal({ titulo, description, onclick,returnhome}) {
    return (
        <div className={styles.layout_overlay}>
            <div className={styles.background}>
                <div className={styles.closepopup}>
                    <button className={styles.btn_closepop}
                        onClick={onclick}>X</button>
                </div>
                <div className={styles.modalsucesso}>
                    <h1>{titulo}</h1>
                    <p>{description}</p>
                </div>
                <button
                    className={styles.btn_concluir}
                    onClick={returnhome}
                >Return Home</button>
            </div>
        </div>
    )
}
export function ModalDelete({ titulo, description, onclick, ondelete }) {
    return (
        <div className={styles.layout_overlay}>
            <div className={styles.backgrounddelete}>
                <div className={styles.closepopup}>
                    <button className={styles.btn_closepop}
                        onClick={onclick}>X</button>
                </div>
                <img className={styles.trashicon} src={trash}></img>
                <div className={styles.modal}>
                    <h1>{titulo}</h1>
                    <p>{description}</p>
                </div>
                <div className={styles.divbtn}>
                    <button
                        className={styles.btn_cancelar}
                        onClick={onclick}
                    >Cancelar</button>
                    <button
                        className={styles.btn_deletar}
                        onClick={ondelete}
                    >Deletar</button>
                </div>
            </div>
        </div>

    )
}