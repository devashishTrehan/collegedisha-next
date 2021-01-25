import React, { useContext, useEffect, useState } from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { Theme } from '@/Services/App.service';
import { CopyRightStrip } from '@/Components/CopyRightStrip.component';
import '../styles/globals.css'
import { useRouter } from 'next/router';
import GraphClientContextProvider from '@/Context/GraphClient.context';
import NavbarContextProvider, { NavbarContext } from '@/Context/Navbar.context';
import CustomBreadCrumb, { UrlObject } from '@/Components/CustomBreadCrumb.component';
// import './fonts/gordita/Gordita';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: Theme.primary
    },
    secondary: {
      main: Theme.secondary
    },
  },
  typography: {
    fontFamily: `'Gordita', 'sans-serif'`
  }
})

function MyAppMainComponent({ Component, pageProps }) {

  return (
    <div >
      <CustomBreadCrumb />
      <Component {...pageProps} />
    </div>
  )
}

function MyApp(props) {

  const router = useRouter();



  return <>
    <ThemeProvider theme={theme}>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>

        <GraphClientContextProvider>
          <NavbarContextProvider>
            <div id='App'>
              <MyAppMainComponent {...props} />
            </div>
          </NavbarContextProvider>
        </GraphClientContextProvider>

        <CopyRightStrip style={{ backgroundColor: Theme.copyrightStripBackground, color: '#fff' }} />
      </div>
    </ThemeProvider>
  </>
}

export default MyApp
