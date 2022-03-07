import styles from ".//home.module.css"

export default function Footer() {
    return (
        <div className={styles.footerCTR}>
          <div className={styles.socialsCTR}>
            <div className={styles.instagramCTR}>
              <img src="/instagram.png" className={styles.instagram}></img>
              <h5>emma_nagelstudio</h5>
            </div>
            <div className={styles.instagramCTR}>
              <img src="/tiktok.png" className={styles.instagram}></img>
              <h5>emma_nagelstudio</h5>
            </div>
          </div>
      </div>
    )
}