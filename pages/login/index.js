import {useCookies} from 'react-cookie'
import {useState, useEffect} from 'react'
import Router from 'next/router'

export default function Login() {
    const [usernameInput, setUsernameInput] = useState()
    const [passwordInput, setPasswordInput] = useState()
    const [loggedin, setLoggedin] = useState()
    const [cookie, setCookie] = useCookies(["loggedin"])

    useEffect(() => {
        if(cookie.loggedin == undefined) {
            setCookie("loggedin", JSON.stringify({loggedin: false}), {
                path: "/",
                maxAge: 3600, // Expires after 1hr
                sameSite: true,
            })
        }
        setLoggedin(cookie.loggedin.loggedin)
        console.log(loggedin)
    })

    function Login() {
        if(!cookie.loggedin.loggedin) {
            if(usernameInput == "user" && passwordInput == "pass") {
                try {
                    setCookie("loggedin", JSON.stringify({loggedin: true}), {
                        path: "/",
                        maxAge: 3600, // Expires after 1hr
                        sameSite: true,
                    })
                    setLoggedin(true)
                    Router.push("/admin")
                }
                catch {
    
                }
            } 
        }
    }

    return (
        <>
        <h1>{loggedin ? "Logged in" : ""}</h1>
        <h1>Username</h1>
        <input onChange={(e) => {setUsernameInput(e.target.value)}}></input>
        <h2>Password</h2>
        <input onChange={(e) => {setPasswordInput(e.target.value)}}></input>
        <button onClick={() => {Login()}}>Login</button>
        </>
    )
}