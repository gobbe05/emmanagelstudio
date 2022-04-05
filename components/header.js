import styles from ".//home.module.css"
import {useState} from "react"
import Link from "next/link"

export default function Header() {
    const [openMenu, setOpenMenu] = useState()

    return (
        <>
        <div className={styles.headerCTR}>
        <div className={styles.instagramCTR}>
          <a href="https://www.instagram.com/emma_nagelstudio/"><img src="/instagram.png" className={styles.instagram}></img></a>
          <h5>emma_nagelstudio</h5>
          <a href="https://www.tiktok.com/@emma_nagelstudio?lang=sv-SE"><img src="/tiktok.png" className={styles.instagram}></img></a>
          <h5>emma_nagelstudio</h5>
        </div>
        <div className={styles.headermainCTR}>
          <div className={styles.logoCTR}>
            <Link href="/"><img src="/logga.png"></img></Link>
          </div>
          
          <div onClick={() => {setOpenMenu(true)}} className={styles.hamburgerCTR}>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        <div className={openMenu ? styles.open + " " +styles.sidemenuCTR : styles.close + " " + styles.sidemenuCTR}>
          <div onClick={() => {setOpenMenu(false)}} className={styles.hamburgertwoCTR}>
            <div className={styles.crossone}></div>
            <div className={styles.crosstwo}></div>
          </div>
          <div onClick={() => setOpenMenu(false)} className={styles.linksCTR}> 
          <Link href="/"><h1 className={styles.pointer}>Hem</h1></Link>
            <Link href="/tider"><h1 className={styles.pointer}>Tider</h1></Link>
            <Link href="/prislista"><h1 className={styles.pointer}>Prislista</h1></Link>
            <Link href="/galleri"><h1 className={styles.pointer}>Galleri</h1></Link>
            <Link href="/om-mig"><h1 className={styles.pointer}>Om Mig</h1></Link>
          </div>
          <div className={styles.sidemenuSocialsCTR}>
          <div>
            <a href="https://www.instagram.com/emma_nagelstudio/"><img src="/instagram.png" className={styles.instagram}></img></a>
            <h5>emma_nagelstudio</h5>
          </div>
          <div>
            <a href="https://www.tiktok.com/@emma_nagelstudio?lang=sv-SE"><img src="/tiktok.png" className={styles. instagram}></img></a>
            <h5>emma_nagelstudio</h5>
          </div>
        </div>
        </div>
      </div>
        </>
    )
}