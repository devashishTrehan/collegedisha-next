import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Theme, } from '../Services/App.service';
import { Typography, useMediaQuery } from '@material-ui/core';
import { MenuContext } from '../Context/Menu.context';
import { C_MenuList } from './MultiLevelList.component';
import { LoginRegisterButton } from './LoginRegisterButton.component';


const useStyles = makeStyles({

  container: {
    width: 270,
    maxWidth: '100vw',

  },
  head: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '25px 15px',
    backgroundColor: Theme.primary,
  },
  profileWrap: {
    width: 40,
    height: 40,
    borderRadius: '50%',
    overflow: 'hidden',
    '& img': {
      width: '100%',
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
        <div className={styles.head}>
          <div className={styles.profileWrap}>
            <img src={'' ? '' : '/assets/images/defaults/user.png'} alt={''} />
          </div>
          <div style={{ paddingLeft: 10, width: 'calc(100% - 40px)' }}>
            <div style={{ marginLeft: -3 }}>
              <LoginRegisterButton
                icons={false}
                labelOnSmall={true}
                labelStyle={{
                  fontSize: 13,
                  fontFamily: 'gorditaMedium',
                  color: '#eee'
                }}
              />
            </div>
            <Typography style={{ fontSize: 12, color: '#eee', textAlign: 'left' }}>For personalized results</Typography>
          </div>
        </div>

        {/* <div style={{ display: 'flex', alignItems: 'center', padding: 10, color: Theme.fontColor, backgroundColor: Theme.primary + '11' }}>
          <PauseCircleOutline style={{ transform: 'rotate(90deg)', marginRight: 5, fontSize: 20 }} />
          <Typography style={{ fontSize: 13 }}>Browse By Category</Typography>
        </div> */}

        <C_MenuList onLinkClick={() => { props.onClose() }} list={MenuList} parentIndex={'list'} />

      </div>
    </>
  );
}

export default DrawerComponent

