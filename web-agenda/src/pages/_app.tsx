import React from 'react'
import { NextPage } from 'next'
import { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'
import 'animate.css'

import { AuthProvider } from '../hooks/auth'

import '../styles/index.scss'
import 'react-toastify/dist/ReactToastify.min.css'

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <AuthProvider>
        <ToastContainer />
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
        <Component {...pageProps} />
      </AuthProvider>
    </>
  )
}

export default App
