import styles from '../../components/ommig.module.css'

export default function OmMig() {
    return (
        <div className={styles.mainCTR}>
        <div className={styles.informationCTR}>
            <div className={styles.pictureCTR}>
                    <img src="/nagelbilder/2.jpg"></img>
            </div>

            <div className={styles.namnCTR}>
                <h1>Emma Eskerin</h1>
                <h3>Halmstad</h3>
            </div>
        </div>
        <div className={styles.textCTR}>

        </div>
        </div>
    )
}