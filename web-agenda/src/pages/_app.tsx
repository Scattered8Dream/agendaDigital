import React from 'react'
import { NextPage } from 'next'
import { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'
import 'animate.css'

import '../styles/index.scss'
import 'react-toastify/dist/ReactToastify.min.css'

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <ToastContainer />
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <Component {...pageProps} />
    </>
  )
}

export default App
