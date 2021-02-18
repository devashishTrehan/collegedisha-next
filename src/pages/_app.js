import React, { useContext, useEffect, useState } from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { Theme } from '@/Services/App.service';
import { CopyRightStrip } from '@/Components/CopyRightStrip.component';
import '../styles/globals.css'
import { useRouter } from 'next/router';
import { AppContextProvider } from '@/Context/App.context';
import { UserContextProvider } from '@/Context/User.context';
import NavbarContextProvider, { NavbarContext } from '@/Context/Navbar.context';
import CustomBreadCrumb, { UrlObject } from '@/Components/CustomBreadCrumb.component';
import Head from 'next/head';
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


// export function reportWebVitals(metric) {
//   console.log('metrices', metric)
// }


function MyApp(props) {

  const router = useRouter();

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      console.log = () => { }
    }
  })

  return <>
    <ThemeProvider theme={theme}>
      <div id='__mainPage' style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Head >
          <title>College disha</title>
        </Head>
        <AppContextProvider>
          <UserContextProvider>
            <NavbarContextProvider>
              <div id='App'>
                <MyAppMainComponent {...props} />
              </div>
            </NavbarContextProvider>
          </UserContextProvider>
        </AppContextProvider>

        <CopyRightStrip style={{ backgroundColor: Theme.copyrightStripBackground, color: '#fff' }} />
      </div>
    </ThemeProvider>
  </>
}

export default MyApp
