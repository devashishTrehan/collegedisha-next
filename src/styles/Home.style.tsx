import { makeStyles } from '@material-ui/styles';
import { Theme } from '@/Services/App.service';



export const HeaderStyles = makeStyles({
  container: (navHeight) => ({
    backgroundImage: `url('/assets/images/headerBg.webp')`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundPosition: 'bottom',
    minHeight: `calc(100vh - ${navHeight}px)`,
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
  }),
  particleSystem: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
  containerTablet: {
    minHeight: 800,
  },
  HeadWrapper: {
    padding: '0 5%',
    textAlign: 'left',
    marginTop: 0,
    paddingBottom: 50,
  },
  banner1: {
    position: 'absolute',
  },
  CounsellingCard: {
    boxShadow: Theme.boxShadow,
    borderRadius: Theme.radius3,
    padding: Theme.spacingMid,
    backgroundColor: Theme.backgroundColor,
    maxWidth: '90%',
    width: 330,
    '& .imgWrap': {
      width: '100%',
      minHeight: 180,
      '& img': {
        width: '100%',
      }
    },
    '&>div': {
    },
    '& h5': {
      textTransform: 'capitalize',
    },
    '& button': {
      marginTop: Theme.spacingLess,
    },
  },
  headLeftContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center'

  },
  HeadContainer: {
    margin: '6% 0',
    maxWidth: '100%',
    '& h3:last-child': {
      display: 'inline-block',
      maxWidth: '100%',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      margin: '0 auto',
      padding: '10px 0',
      paddingRight: 3,
      letterSpacing: '1px',
      '& span': {
        fontWeight: 600,
        fontFamily: 'gorditaBold',
        color: Theme.primary
      }
      // animation: 'Typing 8s steps(40, end), BlinkCaret .75s step-end infinite',
    }
  },
  HeadContainer_S: {
    '& h3:last-child': {
      padding: '6px 0',
      fontSize: 30,
      paddingRight: 3,
    }
  },
  imageWrap: {
    position: 'relative',
    maxWidth: 100,
    backgroundSize: 'cover',
  },
  filledImageAddon: {
    position: 'absolute'
  },
  userTypeHead: {
    color: Theme.secondary,
    fontWeight: 600
  },
  downButton: {
    width: 60,
    height: 60,
    left: 'calc(50% - 30px)',
    bottom: 0,
    position: 'absolute',
    color: Theme.primary,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& svg': {
      fontSize: 50
    }
  },
})



export const ContentCardStyles = makeStyles({
  pageContent: {
    padding: '0 5%'
  },
  cardContainer: {
    backgroundImage: `url(/assets/images/counsellingShape1.webp),url(/assets/images/DotsShape1.webp)`,
    backgroundPosition: 'left top,right bottom',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'unset, 120px 120px',
    animation: 'MoveBackground2 4s linear infinite',
    '& .shape2': {
      position: 'absolute',
      right: '0px',
      bottom: '10px',
      zIndex: -1,
      animation: 'Wander 10s infinite',
    },

  },
  StepsContainer: {
    textAlign: 'left',
    maxWidth: 420,
    position: 'relative',
    '& .stepCard': {
      boxShadow: Theme.boxShadow,
      backgroundColor: Theme.backgroundColor,
      display: 'flex',
      flexDiraction: 'row',
      borderRadius: Theme.radius2,
      margin: '20px 0',
      cursor: 'pointer',
      userSelect: 'none',
      transition: '.3s',
      '& .imageWrap': {
        width: 100,
        margin: 10,
        padding: 10,
        '& img': {
          width: '100%',
          height: '100%',
          border: '1px solid #eee',
          transition: '.3s',
          borderRadius: '10px',
        }
      },
      '& .infoWrap': {
        margin: '10px 10px 10px 0',
        flexGrow: 1,
        '& h5': {
          fontSize: 15,
          marginBottom: 8,
          color: Theme.TFontHeadColor,
          fontFamily: 'gorditaMedium',
        },
        '& p': {
          display: 'flex',
          margin: '8px 0',
          fontSize: Theme.bodyTextSize,
        },
        '& svg': {
          color: Theme.secondary,
          fontSize: 16,
          marginRight: 5
        }
      },
      '& .iconWrap': {
        display: 'flex',
        alignItems: 'center',
        margin: 10,
        '& span': {
          transition: '.3s',
          borderRadius: '50%',
          width: 30,
          height: 30,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: Theme.secondary + '22',
          color: Theme.secondary,
          display: 'flex',
          '& svg': {
            fontSize: 28,
            fontWeight: 600,
          }
        },
      },
    }
  },
  StepsContainer_M: {
    padding: 5,
    '& .stepCard': {
      '& .imageWrap': {
        width: 60,
      },
      '& .infoWrap': {
        '& h5': {
          fontSize: 14,
        },
        '& p': {
          display: 'none',
        },
      },
      '& .iconWrap': {
        display: 'none',
      },
    }
  },
  StepsContainer_T: {
    display: 'flex',
    flexDirection: 'row',
    boxShadow: Theme.boxShadow,
    borderRadius: Theme.radius2,
    justifyContent: 'center',
    maxWidth: 'unset',
    margin: '20px 0',
    padding: 5,
    '& .stepCard': {
      boxShadow: 'none',
      backgroundColor: Theme.backgroundColor,
      display: 'block',
      margin: '0 5px',
      textAlign: 'center',
      '& .imageWrap': {
        width: 80,
        margin: 0,
        padding: 5,
      },
      '& .infoWrap': {
        margin: 0,
        '& h5': {
          fontSize: 14,
          margin: 0,
        },
        '& p': {
          display: 'none',
        },
      },
      '& .iconWrap': {
        display: 'none',
      },
    }
  },
  CarouselContainer: {
    // paddingBottom: '50px',
    textAlign: 'left',
    '& .carouselCard': {
      borderRadius: Theme.radius2,
      margin: '20px 0',
      '& .imageWrap': {
        width: '100%',
        minHeight: 220,
        maxHeight: 300,
        overflow: 'hidden',
        margin: '10px auto',
        animation: 'translateY 4s linear infinite',
        '& img': {
          width: '100%',
          height: '100%'
        }
      },
      '& .infoWrap': {
        flexGrow: 1,
        textAlign: 'center',
        '& h5': {
          fontSize: 18,
          marginBottom: 8,
          color: Theme.primary
        },
        '& p': {
          width: '100%',
          margin: '8px 0',
          fontSize: 16,
        },
      },
    },
    '& .buttonsContainer': {
      display: 'flex',
      justifyContent: 'center',
      '& button': {
        backgroundColor: Theme.primary + '22',
        padding: 2,
        margin: '0 10px',
        '& svg': {
          color: Theme.primary,
          fontSize: 30
        }
      }
    }
  },
})

export const CounsellingStyles = makeStyles({
  mainContainer: {
    padding: '30px 5%',
    backgroundImage: `url('/assets/images/wave.webp'),url('/assets/images/counselling-left-shape.webp'),url('/assets/images/counselling-right-shape.webp')`,
    backgroundRepeat: 'no-repeat',
    // backgroundPosition: 'bottom, left ,right',
    backgroundSize: 'contain,',
    animation: 'MoveBackgroundUpDown 3s linear infinite',
    '& .leftSec': {
      maxWidth: 500,
      margin: 'auto',
      '& button': {
        marginTop: 30
      }
    },
    '& .imageWrap': {
      width: 300,
      minHeight: 300,
      overflow: 'hidden',
      display: 'flex',
      justifyContent: 'flex-start',
      marginBottom: 30,
      position: 'relative',
      animation: 'translateY 4s linear infinite',
      '& img': {
        width: '100%',
        transition: 'ease-in-out .5s',
        position: 'absolute',
        left: 'calc(100% + 5px)',
        transform: 'rotateZ(90deg)',
      },
      '& .active': {
        left: 0,
        transform: 'rotateZ(0deg)',
      }
    },
    '& .rightSec': {
      display: 'flex',
      alignItems: 'center'
    }
  },
  formToggler: {
    marginBottom: '15px',
    userSelect: 'none',
    '& span': {
      fontSize: '16px',
      margin: '0 5px',
      cursor: 'pointer',
      transition: '.3s',
    },
    '& .active': {
      color: Theme.secondary,
      fontSize: 18
    }
  },
  formContainer: {
    margin: '10px 0 0',
    width: 500,
    minHeight: 460,
    borderRadius: Theme.radius2,
    boxShadow: Theme.boxShadow,
    padding: '30px',
    backgroundColor: Theme.backgroundColor,
    maxWidth: '100%',
    scrollbarWidth: 'thin',
    scrollbarColor: `${Theme.primary} #fff0`
  },
  formsWrapper: {
    position: 'relative',
    '& .form': {
      background: Theme.backgroundColor,
    }
  },
  textWrap: {
    textTransform: 'capitalize',
    textAlign: 'left',
    margin: `${Theme.spacingMore}px 0`,
    '& p': {
      marginTop: Theme.spacingMid,
      fontSize: 14
    }
  }
})

export const FeatureSectionStyles = makeStyles({
  FeaturesBackground: {
    backgroundImage: `url(/assets/images/DotsShape1.webp),url(/assets/images/FeaturesShape2.webp),url(/assets/images/FeaturesShape3.webp)`,
    backgroundPosition: 'left top,right center,left bottom',
    backgroundRepeat: 'no-repeat',
    animation: 'MoveBackground 8s linear infinite',
  },

  FeaturesContainer: {
    width: '100%',
    height: '100%',
    padding: '0px 5%',
  },
  card: {
    boxShadow: Theme.boxShadow,
    borderRadius: Theme.radius2,
    width: 250,
    minHeight: 300,
    display: 'flex',
    transition: '.5s',
    overflow: 'visible',
    position: 'relative',
    background: Theme.backgroundColor,
    margin: 'auto',
    '&:hover': {
      transform: 'scale(1.06)',
      '&::after': {
        transform: 'scale(1.15)',
      },
    },
    '&::after': {
      transition: '.5s',
      zIndex: -1,
      content: '""',
      backgroundImage: `url(/assets/images/DotsShape1.webp),url(/assets/images/counsellingShape2.webp)`,
      backgroundPosition: 'left top,right bottom',
      backgroundSize: '50px auto,50px auto',
      backgroundRepeat: 'no-repeat',
      width: '100%',
      height: '100%',
      position: 'absolute',
      // filter: 'blur(3px)'
    },
    '& .infoWrap': {
      textAlign: 'left',
      flexGrow: 1,
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: 10,
      '& .title': {
        padding: 5,
        fontSize: 16,
        textTransform: 'capitalize',
        fontFamily: 'gorditaMedium',

      },
      '& .desc': {
        padding: 5,
        fontSize: 12,
      },
    },
  },
})
