import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Theme, } from '../Services/App.service';
import { IconButton, useMediaQuery } from '@material-ui/core';
import { Close, } from '@material-ui/icons';
import { MenuContext } from '../Context/Menu.Context';
import { C_MenuList } from './MultiLevelList.component';
import { LoginRegisterButton } from './LoginRegisterButton.component';


const useStyles = makeStyles({

  container: {
    width: 250,
    maxWidth: '60vw'
  },
  logoContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '5px 10px',
    "& button": {
      padding: 10,
      marginRight: -10
    }
  },
  LogoWrap: {
    width: 100,
    '& img': {
      width: '100%',
      height: '100%'
    }
  },
  menuIcon: {
    marginRight: 10,
    color: 'gray',
    fontSize: 14
  },
  UserMenuIcon: {
    width: 40,
    height: 40,
    marginLeft: 10,
  },
  profileImageButtonWrap: {
    position: 'relative',
    cursor: 'pointer',
    "& div": {
      display: 'flex',
      flexDirection: 'row',
      color: 'gray',
      justifyContent: 'center',
      alignItems: 'center'
    },
    '& p': {
      fontSize: 12,
      fontWeight: 600,
      margin: 0
    },
    '& .arrow': {
      transition: '.5s',
      marginLeft: 5
    },
    '& .arrow-down': {
      transform: 'rotate(180deg)',
    }
  },
  profileMenuWrap: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  profileImageButton: {
    width: 40,
    height: 40,
    padding: 0,
    minWidth: 0,
    overflow: 'hidden',
    "& img": {
      width: '100%',
    },

  },
  UnverifiedEmailIndicator: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: 'red',
    top: 4,
    right: -2
  },

})


function DrawerComponent(props: any) {

  const [DrawerOpen, setDrawerOpen] = React.useState(false);
  const { MenuList } = React.useContext(MenuContext);

  const styles = useStyles();

  const customStyles = {
    toggleButton: {
      border: 'none',
      fontSize: '20px',
      color: Theme.fontColor
    }
  }

  const isMobile = useMediaQuery('(max-width:769px)');
  const isTablet = useMediaQuery('(max-width:992px)');


  return (
    <>
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <div className={styles.LogoWrap}>
            <img src={'/assets/images/BLogo.png'} alt='' />
          </div>
          <span><IconButton style={{ padding: 10 }} onClick={() => props.onClose && props.onClose()}><Close /></IconButton></span>
        </div>
        <div style={{ padding: '0 10px', margin: '0 -3px' }}>
          <LoginRegisterButton
            onRegisterClick={() => { }}
            onLoginClick={() => { }}
            labelOnSmall={true}
            labelStyle={{
              fontSize: 12,
              marginTop: 2,
            }}
          />
        </div>
        <C_MenuList list={MenuList} parentIndex={'list'} />

      </div>
    </>
  );
}

export default DrawerComponent

