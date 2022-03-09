import styles from '../../components/galleri.module.css'
import {useCookies} from 'react-cookie'
import { useState, useEffect } from 'react'

export async function getServerSideProps() {
    const res = await fetch("http://localhost:3000/api/getimages")
    const data = await res.json()

    if(data) {
        console.log("Succesfully loaded items from server")
    }

    return {props: {data: data}}
}


export default function Galleri() {
    const [arrayOfPosts, setArrayOfPosts] = useState([])
    const [loggedIn, setLoggedIn] = useCookies(["loggedin"])

    async function GetImages() {
        const response = await fetch('/api/getimages', {
          method: "GET",
          headers: {
              'Content-Type': "application/json"
          }
      })
        const result = await response.json()
        setArrayOfPosts(result)
      }
    
    useEffect(() => {
        GetImages()
    })
    
    return (
        <>
        <div className={styles.galleriCTR}>
            {
                arrayOfPosts.map((post) => {
                    console.log(post)
                    return (
                        <div key={post.title} className={styles.postCTR}>
                            <div className={styles.profileCTR}>
                                <img src={post.image}></img>
                                <a href="https://www.instagram.com/emma_nagelstudio/"><b>emma_nagelstudio</b></a>
                            </div>
                            <div className={styles.imageCTR}>
                                <img src={post.image}></img>
                            </div>
                            <div className={styles.descriptionCTR}> 
                                <div className={styles.likesaveCTR}>
                                    <img src={"https://www.transparentpng.com/thumb/instagram-heart/2pLraG-instagram-heart-emoji-free-download-transparent.png"}></img>
                                    <img src={"/save-instagram.png"}></img>
                                </div>
                                <div className={styles.commentCTR}>
                                    <p><b>emma_nagelstudio </b>{post.title} <br></br> {post.comment}</p>
                                </div>
                            </div>
                        </div>
                    )
                })
            }         
        </div>
    </>
    )
}
