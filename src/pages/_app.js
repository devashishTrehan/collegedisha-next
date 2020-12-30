import React, { useEffect } from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { Theme } from '@/Services/App.service';
import NavBar from '@/Components/Navbar.component';
import CustomBreadCrumb from '@/Components/CustomBreadCrumb.component';
import '../styles/globals.css'
import { useRouter } from 'next/router';
import MenuContextProvider from '@/Context/Menu.Context';
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


function MyApp({ Component, pageProps }) {

  const router = useRouter()

  // useEffect(() => {
  //   const handleRouteChange = (url, { shallow }) => {
  //     console.log(
  //       `App is changing to ${url} ${shallow ? 'with' : 'without'
  //       } shallow routing`
  //     )
  //   }

  //   const handleRouteChangeEnd = (url, { shallow }) => {
  //     console.log(
  //       `App has changed to ${url} ${shallow ? 'with' : 'without'
  //       } shallow routing`
  //     )
  //   }

  //   router.events.on('routeChangeStart', handleRouteChange)
  //   router.events.on('routeChangeComplete', handleRouteChangeEnd)

  //   // If the component is unmounted, unsubscribe
  //   // from the event with the `off` method:
  //   return () => {
  //     router.events.off('routeChangeStart', handleRouteChange)
  //     router.events.off('routeChangeComplete', handleRouteChangeEnd)
  //   }
  // }, [])

  return <>
    <ThemeProvider theme={theme}>
      <>
        <MenuContextProvider>
          <NavBar />
        </MenuContextProvider>
        <div style={{ paddingTop: 64, flexGrow: 1, }}>
          <CustomBreadCrumb breadcrumbs={[]} />
          <Component {...pageProps} />
        </div>
      </>
    </ThemeProvider>
  </>
}

export default MyApp
