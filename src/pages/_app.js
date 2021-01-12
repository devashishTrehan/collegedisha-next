import React, { useEffect } from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { Theme } from '@/Services/App.service';
import NavBar from '@/Components/Navbar.component';
import { CopyRightStrip } from '@/Components/CopyRightStrip.component';
import '../styles/globals.css'
import { useRouter } from 'next/router';
import MenuContextProvider from '@/Context/Menu.context';
import GraphClientContextProvider from '@/Context/GraphClient.context';
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


  return <>
    <ThemeProvider theme={theme}>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <MenuContextProvider>
          <NavBar />
        </MenuContextProvider>
        <div style={{ paddingTop: 64, flexGrow: 1, }}>

          <GraphClientContextProvider>

            <Component {...pageProps} />

          </GraphClientContextProvider>

        </div>
        <CopyRightStrip style={{ backgroundColor: Theme.copyrightStripBackground, color: '#fff' }} />
      </div>
    </ThemeProvider>
  </>
}

export default MyApp
