import * as React from 'react';
import NavBar from '@/Components/Navbar.component';
import { useMediaQuery } from '@material-ui/core';
import MenuContextProvider from './Menu.context';

interface NavbarState {
    navHeight: number,
}

const defaultState: NavbarState = {
    navHeight: 64,
}

const navStateValues = {
    navSmall: 56,
    navRegular: 64,
}

export const NavbarContext = React.createContext<NavbarState>(defaultState);

function NavbarContextProvider(props: any) {

    const [navHeight, setNavHeight] = React.useState(defaultState.navHeight);
    const isMobile = useMediaQuery('(max-width:600px)');
    const isTablet = useMediaQuery('(max-width:992px)');


    React.useEffect(() => {
        if (isMobile) {
            setNavHeight(navStateValues.navSmall);
        } else {
            setNavHeight(navStateValues.navRegular);
        }
    }, [isMobile])

    return (
        <NavbarContext.Provider value={{
            navHeight: navHeight
        }}>
            <MenuContextProvider>
                <NavBar />
            </MenuContextProvider>
            {
                props.children
            }
        </NavbarContext.Provider >
    );

}

export default NavbarContextProvider;