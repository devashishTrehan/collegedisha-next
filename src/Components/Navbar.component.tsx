import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Routes, Theme, } from '@/Services/App.service';
import Link from 'next/link';
import { useRouter, withRouter } from 'next/router';
import { AppBar, Drawer, IconButton, Slide, Toolbar, Tooltip, useMediaQuery, useScrollTrigger, } from '@material-ui/core';
import classNames from 'classnames';
import { Domain, Menu as MenuIcon } from '@material-ui/icons';
import DrawerComponent from '@/Components/Drawer.component';
import { MenuContext } from '@/Context/Menu.context';
import { MenuListInterface } from '@/Services/Interfaces.interface';
import { MultiLevelList } from '@/Components/MultiLevelList2.component';
import { LoginRegisterButton } from '@/Components/LoginRegisterButton.component';
import { SearchPage } from '@/Components/SearchPage.component';

const useStyles = makeStyles({

  navBar: {
    // boxShadow: `0px 2px 10px 0px #ccc`,
    backgroundColor: '#fff !important',
    color: Theme.primary,
    boxShadow: Theme.boxShadowLight,
  },
  LogoWrap: {
    width: 190,
    // width: 135,
    marginTop: 7,
    cursor: 'pointer',
    '& img': {
      width: '100%',
      height: '100%'
    }
  },
  LogoWrap_M: {
    width: 120,
    // width: 100,
  },

  navLinkSectionsWrap: {
    display: 'flex',
    padding: '0 calc(5% - 10px)',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  LinkWrap: {
    '& .link': {
      position: 'relative',
      display: 'inline-block',
      lineHeight: '64px',
      margin: '0 20px',
    },
    '& a': {
      textDecoration: 'none',
      // color: '#666',
      color: '#4a5568',
      fontWeight: 500,
      padding: '0 10px',
      fontSize: '15px',
    },
    '& span:hover': {
      // '&::after': {
      //   transform: 'scaleX(1)',
      // },
      '& a': {
        color: Theme.TFontHeadColor,
      },
      '& .menu': {
        display: 'block'
      }
    },
    '& .menuItem': {
      position: 'relative',

    },
    '& .menuItem:hover': {
      '& .menu': {
        display: 'block'
      }
    }

  },
  LinkWrap_T: {
    padding: '0px 20px ',
    '& .link': {
      margin: '0 10px',
      '& a': {
        fontSize: '14px',
        padding: '0',
      }
    },

  },
  collapsible: {
    // backgroundColor: Theme.backgroundColor,
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
  row: {
    display: 'flex',
    flexDirection: 'row'
  },

})


function NavBar(props: any) {

  const [DrawerOpen, setDrawerOpen] = React.useState(false);
  const { MenuList } = React.useContext(MenuContext);
  const { user } = { user: { id: 0 } };
  const [__window, setWindow] = React.useState<null | Window>(null);

  React.useEffect(() => {
    setWindow(window);
  }, [])

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
  const router = useRouter();



  function HideOnScroll(props: any) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({ target: window ? window() : undefined });

    return (
      <Slide appear={false} direction="down" in={!trigger}>
        {children}
      </Slide>
    );
  }

  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event?.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return 0;
    }

    setDrawerOpen(open);
  };




  return (
    <>
      {/* <HideOnScroll {...props}> */}
      <AppBar className={styles.navBar}>
        <div className={styles.navLinkSectionsWrap}>
          <Toolbar>
            <div onClick={() => router.replace(Routes.Home)} className={classNames(styles.LogoWrap, { [styles.LogoWrap_M]: isMobile })}>
              <img src={'/assets/images/BLogo.png'} alt='College Disha' />
            </div>
          </Toolbar>
          {
            !isTablet && (
              <Toolbar className={classNames(styles.LinkWrap, { [styles.LinkWrap_T]: __window?.innerWidth < 1200 })}>
                {
                  MenuList?.map((item: MenuListInterface, index: number) => {
                    return (
                      <div key={index} className={'menuItem'} >

                        <span className='link' >
                          <Link href={Routes.Home} ><a>{item.label}</a></Link>
                        </span>

                        {/* <div className='menu' > */}
                        <MultiLevelList list={item?.list} parentIndex={'navMenu'} />
                        {/* </div> */}
                      </div>
                    )
                  })
                }

              </Toolbar>)
          }
          <Toolbar style={{ paddingLeft: 5 }} >
            <SearchPage style={{ padding: 10, marginRight: 5 }} />
            {
              user?.id ?
                <div className={styles.profileImageButtonWrap}>
                  <Tooltip title={'User Profile'}>
                    <IconButton className={styles.profileImageButton} aria-controls="simple-menu" aria-haspopup="true" onClick={() => router.push(`${Routes.Profile}/${'user?.slug'}`)}>
                      <img src={false ? Domain + 'user.profilePicture' : '/assets/images/user.png'} alt='Profile Picture' />
                    </IconButton>
                  </Tooltip>
                  {
                    true ?
                      <Tooltip title={'Email not verified'}>
                        <span className={styles.UnverifiedEmailIndicator}></span>
                      </Tooltip>
                      : null
                  }
                </div>

                : <LoginRegisterButton onLoginClick={() => true} onRegisterClick={() => true} />

            }
            {
              isTablet && (
                <IconButton onClick={toggleDrawer(true)} >
                  <MenuIcon />
                </IconButton>
              )
            }
          </Toolbar>
        </div>
        <ScrollIndicator />
      </AppBar>
      {/* </HideOnScroll> */}

      <Drawer anchor={'left'} open={DrawerOpen} onClose={toggleDrawer(false)} >
        <DrawerComponent onClose={toggleDrawer(false)} />
      </Drawer>
    </>
  );
}

export default withRouter(NavBar)


const ScrollIndicator = () => {

  const [scrolled, setScrolled] = React.useState(0);
  const router = useRouter();

  React.useEffect(() => {
    window.addEventListener('scroll', (event) => {
      let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      let scrolled = (winScroll / height) * 100;
      setScrolled(scrolled);
    })

    return (() => {
      window.removeEventListener('scroll', () => {
        console.log('event removed');
      })
    })
  }, [router.asPath])

  return (
    <div style={{ height: 3, width: '100%' }}>
      <div style={{ height: '100%', width: `${scrolled}%`, background: Theme.primary }}></div>
    </div>
  )
}