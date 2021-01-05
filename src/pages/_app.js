import React, { useEffect } from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { Theme } from '@/Services/App.service';
import { BASE_URL } from '@/Services/Api.service';
import NavBar from '@/Components/Navbar.component';
import CustomBreadCrumb from '@/Components/CustomBreadCrumb.component';
import { CopyRightStrip } from '@/Components/CopyRightStrip.component';
import '../styles/globals.css'
import { useRouter } from 'next/router';
import MenuContextProvider from '@/Context/Menu.Context';
import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
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


const Client = new ApolloClient({
  uri: BASE_URL + 'fetch-query/',
  cache: new InMemoryCache()
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

  useEffect(() => {
    Client.query({
      query: gql`{ allColleges {
          name
        }
      }
      `
    }).then(result => console.log('graphql result', result)).catch(error => console.log('graphql error', error))
  })

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
        <CopyRightStrip style={{ backgroundColor: Theme.primary, color: '#fff' }} />
      </>
    </ThemeProvider>
  </>
}

export default MyApp
