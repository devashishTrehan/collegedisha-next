
import { Grid, Typography, useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import * as React from 'react';
import { Theme } from '@/Services/App.service';
import classNames from 'classnames';
import { PageHead } from '@/Components/PageHead.component';
import { Footer } from '@/Components/Footer.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';


const useStyles = makeStyles({
  SectionBackground: {
    // backgroundImage: `url(/assets/images/founderBg1.png),url(/assets/images/founderBg2.png)`,
    // backgroundPosition: 'left center , right center',
    // backgroundRepeat: 'no-repeat',

  },
  wrapper: {
    padding: ' 100px 5%',

  },
  CardWrap: {
    position: 'relative',
    width: 340,
    maxWidth: '100%',
    margin: 'auto',
    '& .background': {
      transition: '.5s',
      zIndex: -1,
      content: '""',
      backgroundImage: `url(/assets/images/founderCardBg1.png),url(/assets/images/DotsShape1.png)`,
      backgroundPosition: '0% 100%,100% 0%',
      backgroundSize: '70%,60px',
      backgroundRepeat: 'no-repeat',
      transform: 'scale(1.20)',
      width: '100%',
      height: '100%',
      position: 'absolute',
    },
  },
  Card: {
    width: '100%',
    padding: Theme.spacingMid,
    borderRadius: Theme.radius2,
    boxShadow: Theme.boxShadow,
    backgroundColor: Theme.backgroundColor,

    '& .imageWrap': {
      width: 100,
      height: 100,
      borderRadius: '50%',
      overflow: 'hidden',
      margin: 'auto',
      '& img': {
        width: '100%',
        height: '100%',
      },
    },
    '& .head': {
      margin: -5,
      padding: Theme.spacingLess,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      '& .name': {
        color: Theme.primary,
        fontSize: 14,
        margin: 5,
        fontFamily: 'gorditaMedium',
        textTransform: 'capitalize'
      },
      '& .designation': {
        margin: 5,
        fontSize: 14,
        color: '#888',
        textTransform: 'capitalize'
      }
    },
    '& .description': {
      fontSize: 12,
      color: Theme.fontColor,
      lineHeight: '24px'
    },
    '& .SMGroup': {
      display: 'flex',
      flexDirection: 'row',
      margin: '20px -10px 0',
      justifyContent: 'center',
      fontSize: 16,
      '& span': {
        width: 36,
        height: 36,
        padding: 5,
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        transition: '.3s',
        '& svg': {
          color: Theme.primary,
          fontSize: 18,
          transition: '.3s',
        },
        '&:hover': {
          '& svg': {
            color: Theme.secondary,
          }
        }
      },
    }

  },

})

interface SocialLinks {
  facebook: string,
  twitter: string,
  instagram: string,
}

interface Founder {
  name: string,
  designation: string,
  image: string,
  description: string,
  socialLinks: SocialLinks,
}

interface FounderListProps {
  founder: Founder,
  index: number,

}


function FounderPage(props: any) {

  const isMobile = useMediaQuery('(max-width:600px)');
  const isTablet = useMediaQuery('(max-width:992px)');

  const styles = useStyles();


  const FounderList: Founder[] = [
    {
      name: 'Dileep Jaiswal',
      designation: 'director',
      image: 'founder1.jpg',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi hic cumque voluptates obcaecati distinctio',
      socialLinks: {
        facebook: '',
        twitter: '',
        instagram: '',
      }
    },
    {
      name: 'Jainendra kumar',
      designation: 'director',
      image: 'founder2.jpg',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi hic cumque voluptates obcaecati distinctio',
      socialLinks: {
        facebook: '',
        twitter: '',
        instagram: '',
      }
    },
  ]



  const RenderFounderCard = (props: FounderListProps) => {

    const { index, founder: { name, description, designation, image, socialLinks: { facebook, instagram, twitter } } } = props;


    return (
      <Grid item xs={12} sm={6} key={index} >

        <div className={styles.CardWrap}>
          <div className='background' style={index % 2 !== 0 ? {
            backgroundImage: `url(/assets/images/founderCardBg2.png),url(/assets/images/DotsShape1.png)`,
            backgroundPosition: '100% 100%,0% 0%',
          } : {}}></div>

          <div className={styles.Card}>
            <div className='imageWrap'>
              <img src={`/assets/images/founders/${image}`} alt={name} />
            </div>

            <div className='head'>
              <span><Typography variant='h6' className='name' >{name}</Typography></span>
              <span><Typography className='designation'>{designation}</Typography></span>
            </div>
            <Typography className='description'>{description}</Typography>

            <div className="SMGroup">
              <span>
                <a href={facebook}>
                  <FontAwesomeIcon icon={faFacebookF} />
                </a>
              </span>
              <span>
                <a href={twitter}>
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
              </span>
              <span>
                <a href={instagram}>
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
              </span>
            </div>
          </div>
        </div>
      </Grid >
    )
  }

  const FounderCard = React.useMemo(() => RenderFounderCard, []);


  React.useEffect(() => {
  }, [])

  return (

    <>
      <PageHead PageName='Founders' />

      <div className={styles.SectionBackground}>

        <div className='container'>

          <div className={styles.wrapper}>
            <Grid container spacing={5} >
              {
                FounderList?.map((founder: Founder, index: number) => {
                  return <FounderCard founder={founder} index={index} />
                })
              }
            </Grid>

          </div>
        </div>

      </div>

      <Footer />
    </>

  );
}

export default FounderPage;