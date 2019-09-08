import App from 'next/app'
import Head from 'next/head'
import React from 'react'
import * as palx from 'palx'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { ThemeProvider, createGlobalStyle } from 'styled-components'

const theme = {
  colors: palx('#1DB954'),
  space: [0, 6, 12, 18, 24, 36, 72, 108, 144, 288, 432],
  breakpoints: ['40em', '52em', '64em']
}

const GlobalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
`

library.add(fab)

export default class MyApp extends App {
  render () {
    const { Component, pageProps } = this.props
    return (
      <ThemeProvider theme={theme}>
        <React.Fragment>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.2/css/all.min.css" integrity="sha256-zmfNZmXoNWBMemUOo1XUGFfc0ihGGLYdgtJS3KCr/l0=" crossorigin="anonymous" />
          <Head>

          </Head>
          <GlobalStyle />
          <Component {...pageProps} />
          <link rel="stylesheet" href="https://unpkg.com/blocks.css/dist/blocks.min.css" />
        </React.Fragment>
      </ThemeProvider>
    )
  }
}
