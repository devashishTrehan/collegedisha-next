import * as React from 'react';
import NavBar from '@/Components/Navbar.component';
import { useMediaQuery } from '@material-ui/core';
import MenuContextProvider from './Menu.context';
import { useRouter } from 'next/router';

interface NavbarState {
    navHeight: number,
    openSearch: Function,
    closeSearch: Function,
    searchOpen: boolean
    // scrollPercent: number,
}

const defaultState: NavbarState = {
    navHeight: 64,
    searchOpen: false,
    openSearch: () => { },
    closeSearch: () => { }
    // scrollPercent: 0,
}

const navStateValues = {
    navSmall: 59,
    navRegular: 67,
}

export const NavbarContext = React.createContext<NavbarState>(defaultState);

function NavbarContextProvider(props: any) {

    const [navHeight, setNavHeight] = React.useState(defaultState.navHeight);
    // const [scrollPercent, setScrollPercent] = React.useState(defaultState.scrollPercent);
    const [searchOpen, setSearchOpen] = React.useState(defaultState.searchOpen);
    const isMobile = useMediaQuery('(max-width:600px)');
    const isTablet = useMediaQuery('(max-width:992px)');

    const router = useRouter();

    const openSearch = () => {
        setSearchOpen(true);
    }

    const closeSearch = () => {
        setSearchOpen(false);
    }

    React.useEffect(() => {
        if (isMobile) {
            setNavHeight(navStateValues.navSmall);
        } else {
            setNavHeight(navStateValues.navRegular);
        }
    }, [isMobile])

    return (
        <NavbarContext.Provider value={{
            navHeight: navHeight,
            searchOpen: searchOpen,
            openSearch: openSearch,
            closeSearch: closeSearch,
            // scrollPercent: scrollPercent
        }}>
            <MenuContextProvider>
                <NavBar />
            </MenuContextProvider>
            <div style={{ paddingTop: navHeight, flexGrow: 1, }}>
                {
                    props.children
                }
            </div>
        </NavbarContext.Provider >
    );

}

export default NavbarContextProvider;