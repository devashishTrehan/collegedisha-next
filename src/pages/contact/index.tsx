
import { Grid, Hidden, makeStyles, Typography, useMediaQuery } from '@material-ui/core';
import { Email, LocationOn, Phone } from '@material-ui/icons';
import * as React from 'react';
import { Footer, SocialMediaGroup } from '@/Components/Footer.component';
import { PageHead } from '@/Components/PageHead.component';
import { ContactInfo, Theme } from '@/Services/App.service';
import classNames from 'classnames';
import { QueryForm } from '@/Components/Forms/QueryForm.page';
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
  mapContainer: {
    borderRadius: Theme.radius2,
    boxShadow: Theme.boxShadow,
    padding: Theme.spacingMid,
  },
  formContainer: {
    margin: '10px 0 0',
    width: 500,
    minHeight: 460,
    padding: 30,
    backgroundColor: '#fff',
    borderRadius: 10,
    boxShadow: Theme.boxShadow,
    maxWidth: '100%',
    scrollbarWidth: 'thin',
    scrollbarColor: `${Theme.primary} #fff0`,
  },
  InfoCard: {
    margin: 'auto',
    width: 300,
    minHeight: 250,
    borderRadius: Theme.radius2,
    padding: Theme.spacingMore,
    backgroundColor: '#fff',
    maxWidth: '100%',
    scrollbarWidth: 'thin',
    scrollbarColor: `${Theme.primary} #fff0`,
    display: 'flex',
    flexDirection: 'column',
    transition: '.3s',
    boxShadow: Theme.boxShadow,

    '&:hover': {
      boxShadow: 'none',
    },

    '& .icon': {
      '& svg': {
        fontSize: 50,
        marginTop: 10,
        color: Theme.primary,
      }
    },

    '& .title': {
      fontSize: 18,
      fontWeight: 600,
      color: Theme.primary,
    },

    '& .infoText': {
      color: Theme.fontColor,
      flexGrow: 1,
      fontSize: 14,
      fontWeight: 600,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    }
  }
})

function Contact(props: any) {

  const isMobile = useMediaQuery('(max-width:600px)');
  const isTablet = useMediaQuery('(max-width:992px)');

  const styles = useStyles();

  interface CardProps {
    card: {
      title: string,
      info: string[],
      icon?: JSX.Element,
    }
  }



  const InfoCard = (props: CardProps) => {

    const { title, info, icon } = props.card;

    return (
      <div className={styles.InfoCard} >
        {
          icon &&
          <div className='icon' >
            {
              icon
            }
          </div>
        }
        <h5 className='title'>{title}</h5>

        <div className='infoText'>
          {
            info?.map((info: string, index: number) => <p key={index} >{info}</p>)
          }
        </div>
      </div >
    )
  }

  React.useEffect(() => {
  }, [])


  return (

    <>
      <PageHead PageName='Contact Us' />
      <div className='container'>

        <div className={styles.wrapper}>
          <div className={classNames('sectionHead', styles.sectionHead)}>
            <h5 className='heading1' >Get In Touch With Us</h5>
            <p className={'bodyText'} >Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa ducimus corporis quas</p>
          </div>

          <Grid container spacing={8} >

            <Hidden smDown>
              <Grid item xs={12} md={6}>
                <div>
                  <div className='leftImageWrap'>
                    <img src={'/assets/images/contactUs.png'} alt='' />
                  </div>

                  <div>
                    <Typography style={{ fontSize: 14 }}>Follow us on</Typography>
                    <SocialMediaGroup style={{ marginTop: 0, justifyContent: 'center' }} color={Theme.primary} />
                  </div>

                </div>
              </Grid>
            </Hidden>

            <Grid item xs={12} md={6}>
              <div style={{ width: '100%', display: 'flex', justifyContent: isTablet ? 'center' : 'flex-end' }}>
                <div className={styles.formContainer}>
                  <QueryForm />
                </div>
              </div>

            </Grid>
          </Grid>

        </div>

      </div>

      <div className='container'>

        <div className={styles.wrapper} style={{ margin: `40px 0` }}>
          <div className={classNames('sectionHead', styles.sectionHead)}>
            <h5 className='heading1'>Other Information</h5>
            <p className={'bodyText'} >Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa ducimus corporis quas</p>
          </div>

          <Grid container spacing={3} justify='center' >

            <Grid item xs={12} sm={6} md={4} >
              <InfoCard card={{ title: 'Email', info: [ContactInfo.email], icon: <Email /> }} />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <InfoCard card={{ title: 'Phone Number', info: [ContactInfo.phone, `+91-${ContactInfo.mobile}`], icon: <Phone /> }} />
            </Grid>

            <Grid item xs={12} sm={6} md={4} >
              <InfoCard card={{ title: 'Address', info: [ContactInfo.address.sec1, ContactInfo.address.sec2], icon: <LocationOn /> }} />
            </Grid>
          </Grid>

        </div>

        <div className="container">
          <div className={styles.wrapper} >
            <div className={styles.mapContainer}>
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.4323099306525!2d77.37498531460365!3d28.616802691544546!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfab660337499%3A0xa23a31cd784f2da0!2sBALJ%20Technology%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1605850181179!5m2!1sen!2sin" width="100%" height="350" style={{ border: 'none' }} aria-hidden="false" ></iframe>
            </div>
          </div>
        </div>

      </div>

      <SubscribeSection />
      <Footer />
    </>

  );
}

export default Contact;