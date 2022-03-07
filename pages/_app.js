// pages/_app.js
import Head from 'next/head'
import '../styles/globals.css'
import Header from "../components/header"
import Footer from "../components/footer"

export default function MyApp({ Component, pageProps }) {
  return (
    <>
    <Head>
        <title>Emma Nagelstudio</title>
        <link rel="apple-touch-icon" href="/logga.png"/>
        <link rel="shortcut icon" href="/logga.ico" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
    <Header />
    <Component {...pageProps} />
    <Footer />
    </>
  )

}