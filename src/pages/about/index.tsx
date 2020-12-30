
import { Grid, Hidden, Typography, useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import * as React from 'react';
import { Footer } from '../../Components/Footer.component';
import { Theme } from '../../Services/App.service';
import classNames from 'classnames';
import { PageHead } from '../../Components/PageHead.component';
import { SubscribeSection } from '@/Components/Subscribe.component';

const useStyles = makeStyles({
  wrapper: {
    padding: '30px 5%',
  },
  sectionHead: {
    '& .heading1': {
      fontSize: '30px',
    },
    '& .bodyText': {
      fontSize: '14px',
    }
  },
  card: {
    boxShadow: Theme.boxShadow,
    borderRadius: Theme.radius2,
    width: 250,
    minHeight: 250,
    display: 'flex',
    transition: '.5s',
    overflow: 'visible',
    position: 'relative',
    background: '#fff',
    margin: 'auto',
    '&:hover': {
      transform: 'scale(1.06)',
      '&::before': {
        transform: 'scale(1.20)',
      },
    },
    '&::before': {
      transition: '.5s',
      zIndex: -1,
      content: '""',
      backgroundImage: `url(/assets/images/DotsShape1.png),url(/assets/images/counsellingShape2.png)`,
      backgroundPosition: 'left top,right bottom',
      backgroundSize: '50px auto,50px auto',
      backgroundRepeat: 'no-repeat',
      transform: 'scale(0.9)',
      width: '100%',
      height: '100%',
      position: 'absolute',
      // filter: 'blur(3px)'
    },
    '& .infoCard ': {
      margin: 'auto',
      width: '300px',
      minHeight: '250px',
      padding: '30px',
      maxWidth: '100%',
      borderRadius: '10px',
      backgroundColor: '#fff',
      scrollbarWidth: 'thin',
      scrollbarColor: `${Theme.primary} #fff0`,
      display: 'flex',
      flexDirection: 'column',
      '& .imageWrap': {
        width: '45px',
        height: '45px',
        margin: 'auto',
        marginBottom: '10px',

        '& img ': {
          width: '100%',
          height: '100%',
        }
      },

      '& .title': {
        fontSize: '16px',
        fontWeight: 600,
        margin: '10px 0',
        color: Theme.primary,
        textTransform: 'uppercase',
      },

      '& .infoText': {
        color: Theme.fontColor,
        flexGrow: 1,
        fontSize: '12px',
        fontWeight: 600,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }
    }
  },
  midSecWrap: {
    backgroundImage: `url('/assets/images/AboutQuoteBg.png')`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    position: 'relative',
    '& .decoItem': {
      position: 'absolute',
    },
    '& .decoItem:nth-child(odd)': {
      animation: 'translateX 3s linear infinite',
    },
    '& .decoItem:nth-child(even)': {
      animation: 'translateY 3s linear infinite',
    }

  },
  AboutInfo: {
    textAlign: 'left',
    fontSize: 14,
    '& p': {
      margin: '10px 0',
      lineHeight: '24px',

    },
    '& ul': {
      paddingLeft: 16,
      fontSize: 14,
      '& li': {
        marginBottom: 5
      }
    }

  }
})

function About(props: any) {

  const isMobile = useMediaQuery('(max-width:600px)');
  const isTablet = useMediaQuery('(max-width:992px)');
  const [__window, setWindow] = React.useState<null | Window>(null);

  React.useEffect(() => {
    setWindow(window);
  }, [])

  const styles = useStyles();

  const ServiceList1 = [
    { title: 'Top Colleges', info: ['Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa ducimus corporis'], image: 'section1Image1.svg' },
    { title: 'Top Courses', info: ['Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa ducimus corporis'], image: 'section1Image2.svg' },
    { title: 'Counselling', info: ['Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa ducimus corporis quas'], image: 'section1Image3.svg' },
    { title: 'Career', info: ['Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa ducimus corporis quas'], image: 'section1Image4.svg' },
  ]

  const ServiceList2 = [
    { title: '200 courses', info: ['Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa ducimus corporis'], image: 'section1Image2.svg' },
    { title: 'expert guidance', info: ['Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa ducimus corporis'], image: 'section1Image3.svg' },
    { title: 'bright future', info: ['Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa ducimus corporis quas'], image: 'section1Image4.svg' },
  ]

  interface Card {
    title: string,
    info: string[],
    image?: string,
  }

  interface CardProps {
    card: Card
  }

  const InfoCard = (props: CardProps) => {

    const { title, info, image } = props.card;

    return (
      <div className={classNames(styles.card, 'card')}>
        <div className='infoCard' >
          {
            image &&
            <div className='imageWrap' >
              <img alt='' src={`/assets/images/${image}`} />
            </div>
          }
          <h5 className='title'>{title}</h5>

          <div className='infoText'>
            {
              info?.map((info: string, index: number) => <p key={index} >{info}</p>)
            }
          </div>
        </div >
      </div>
    )
  }

  React.useEffect(() => {
  }, [])


  return (

    <>

      <PageHead PageName={'About Us'} />

      <div className='container'>

        <div className={styles.wrapper}>

          <Grid container spacing={8}>

            <Grid item xs={12} md={6}>


              <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
                <div style={{ textAlign: 'left' }}>
                  <Typography>About</Typography>
                  <div className={classNames('sectionHead', styles.sectionHead)} style={{ margin: '0 0 0 -3px' }}>
                    <h5 className='heading1' >College Disha</h5>
                  </div>
                </div>
                <div className={styles.AboutInfo}>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque, a deserunt neque quasi alias dignissimos ipsum, ducimus ex cum enim quibusdam eum perferendis sint obcaecati minus delectus rerum exercitationem? Repellat?</p>

                  <ul>
                    <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
                    <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. </li>
                    <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
                    <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
                  </ul>
                </div>
              </div>

            </Grid>

            <Hidden smDown>
              <Grid item xs={12} md={6}>
                <div>
                  <div className='RightImageWrap'>
                    <img src={'/assets/images/aboutUs.png'} alt='' />
                  </div>

                </div>
              </Grid>
            </Hidden>
          </Grid>

        </div>

      </div>

      <div className='container'>

        <div className='wrapper' style={{ margin: `50px 0` }}>
          <Typography>Welcome To </Typography>
          <div className={classNames('sectionHead', styles.sectionHead)}>
            <h5 className='heading1'>College Disha</h5>
            <p className={'bodyText'} >Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa ducimus corporis quas</p>
          </div>

          <Grid container spacing={8} justify='center' >
            {
              ServiceList1?.map((card: Card) => {
                return (
                  <Grid item
                    xs={__window?.innerWidth / 2 >= 305 ? 6 : 12}
                    sm={__window?.innerWidth / 3 >= 305 ? 4 : 6}
                    md={__window?.innerWidth / 4 >= 305 ? 3 : 4} >
                    <InfoCard card={card} />
                  </Grid>
                )
              })
            }
          </Grid>

        </div>
      </div>

      <div className={classNames('container', styles.midSecWrap)}>
        {
          !isTablet && (
            <>
              <div className='decoItem' style={{ top: 60, left: 250 }}><img src='/assets/images/innerShape4.png' alt='' /></div>
              <div className='decoItem' style={{ bottom: 10, left: 10 }}><img src='/assets/images/innerShape1.png' alt='' /></div>
              <div className='decoItem' style={{ top: 0, right: 30 }}><img src='/assets/images/innerShape3.png' alt='' /></div>
              <div className='decoItem' style={{ bottom: 50, right: 80 }}><img src='/assets/images/innerShape1.png' alt='' /></div>
              <div className='decoItem' style={{ top: 45, left: 75 }}><img src='/assets/images/innerShape2.png' alt='' /></div>
            </>
          )
        }
        <div className='wrapper' style={{ margin: `40px 0` }}>
          <div style={{ color: '#fff', padding: '30px 0', }}>
            <Typography variant='h5' style={{ fontFamily: 'gorditaMedium', marginBottom: 10 }}>"We are here to help you building your career"</Typography>
            <Typography variant='h6'>Find the best career guidance and get admitted to top eminent institutes </Typography>
          </div>
        </div>
      </div>

      <div className='container'>

        <div className='wrapper' style={{ margin: `40px 0` }}>
          <div className={classNames('sectionHead', styles.sectionHead)}>
            <h5 className='heading1'>Who we are & what we do</h5>
            <p className={'bodyText'} >Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa ducimus corporis quas</p>
          </div>

          <Grid container spacing={8} justify='center' >

            {
              ServiceList2?.map((card: Card) => {
                return (
                  <Grid item xs={12} sm={6} md={4} >
                    <InfoCard card={card} />
                  </Grid>
                )
              })
            }

          </Grid>

        </div>
      </div>

      <SubscribeSection />
      <Footer />
    </>

  );
}

export default About;
