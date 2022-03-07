import styles from '../../components/pricelist.module.css'

export default function Pricelist() {
    return (
        <div className={styles.pricelistBODY}>
            <div className={styles.pricelistCTR}>
            <div className={styles.pricesCTR}>
                <u><h1>Prislista</h1></u>
                <div className={styles.linesCTR}>
                    <h2 className={styles.h2}>Basic set : 250kr</h2>
                    <div className={styles.line}></div>
                    <h2 className={styles.h2}>Basic + färg: 280kr</h2>
                    <div className={styles.line}></div>
                    <h2 className={styles.h2}>Avancerat : 350kr</h2>
                    <div className={styles.line}></div>
                    <h2 className={styles.h2}>Påfyllning : 220kr</h2>
                    <div className={styles.line}></div>
                    <h2 className={styles.h2}>Borttagning : 200kr</h2>
                </div>
            </div>
            <div className={styles.timesCTR}>
            <div className={styles.pricesCTR}>
                <u><h1>Uppskattad tid</h1></u>
                <div className={styles.linesCTR}>
                    <h2 className={styles.h2}>Nytt set : 2h</h2>
                    <div className={styles.line}></div>
                    <h2 className={styles.h2}>Avancerat : 2.5h - 4h</h2>
                    <div className={styles.line}></div>
                    <h2 className={styles.h2}>Påfyllning : 2h</h2>
                    <div className={styles.line}></div>
                    <h2 className={styles.h2}>Borttagning : 1h</h2>
                </div>
            </div>
            </div>
        </div>
        </div>
    )
}