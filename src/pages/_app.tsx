import React from 'react'
import { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'

import GlobalStyle from '../styles/global'
import theme from '../styles/theme'

import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css';
import '../styles/global.css'
import AvisoCookies from '../components/AvisoCookies'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme} >
     <AvisoCookies/>
      <Component {...pageProps} />
       
      <GlobalStyle />
      <ToastContainer />
      
    </ThemeProvider>
  )
}

export default MyApp
