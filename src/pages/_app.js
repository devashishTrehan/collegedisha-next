import React, { useContext, useEffect, useState } from 'react';
import { CircularProgress, createMuiTheme, ThemeProvider } from '@material-ui/core';
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

  const [pageLoading, setPageLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {

    const RouteChangeStarthandler = () => {
      let mainPage = document.getElementById('__mainPage');
      if (mainPage) {
        mainPage.style.height = '100vh';
        mainPage.style.overflow = 'hidden';
      }
      setPageLoading(true);
    }

    const RouteChangeCompletehandler = () => {
      let mainPage = document.getElementById('__mainPage');
      if (mainPage) {
        mainPage.style.height = 'unset';
        mainPage.style.overflow = 'visible';
      }
      setPageLoading(false);
    }

    router.events.on('routeChangeStart', RouteChangeStarthandler);
    router.events.on('routeChangeComplete', RouteChangeCompletehandler);

    return () => {
      router.events.off('routeChangeStart', RouteChangeStarthandler);
      router.events.off('routeChangeComplete', RouteChangeCompletehandler);
    }
  }, [])

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      console.log = () => { }
    }

  }, [])

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
      {
        pageLoading ?
          <PageLoader />
          : null
      }
    </ThemeProvider>
  </>
}

export default MyApp;


const PageLoader = () => {
  return (
    <div style={{
      backgroundColor: Theme.primary + 'aa',
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: 1100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <CircularProgress />
    </div>
  )
}