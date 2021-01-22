
import { Button, Divider, Typography, useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import * as React from 'react';
import { Theme } from '@/Services/App.service';
import classNames from 'classnames';
import { PageHead } from '@/Components/PageHead.component';
import { Footer } from '@/Components/Footer.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';


const useStyles = makeStyles({
  wrapper: {
    padding: ' 0px 5% 50px',
  },
  container: {
    width: 820,
    maxWidth: '100%',
    margin: '50px auto',
    boxShadow: Theme.boxShadow,
    borderRadius: Theme.radius2,
    overflow: 'hidden'
  },
  headContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& button .buttonText': {
      alignItems: 'center',
      fontSize: 10,
      color: Theme.error,
      '& svg': {
        marginRight: 5,
      }
    }
  },
  heading: {
    fontSize: 16,
    fontFamily: 'gorditaMedium',
    color: Theme.primary,
    padding: '10px 0',
    textAlign: 'left',
  },
  textContent: {
    textAlign: 'left',
    color: Theme.fontColorSecondary,
    fontSize: 12,
    lineHeight: '24px',
    margin: '10px 0',

  }

})



function DisclaimerPage(props: any) {

  const isMobile = useMediaQuery('(max-width:600px)');
  const isTablet = useMediaQuery('(max-width:992px)');

  const styles = useStyles();



  React.useEffect(() => {
  }, [])

  return (

    <>



      <PageHead PageName='Disclaimer' />

      <div className='container'>

        <div className={styles.wrapper}>

          <div className={styles.container} style={{ padding: isMobile ? 20 : 40 }}>

            <div className={styles.headContainer}>
              <Typography variant={'h1'} className={classNames(styles.heading)} >Disclaimer</Typography>
              <div>
                <Button>
                  <span className='buttonText'>
                    <FontAwesomeIcon icon={faExclamationTriangle} />
                    <span>Report Error</span>
                  </span>
                </Button>
              </div>
            </div>

            <Typography className={styles.textContent}>All information (including; that of colleges, universities, fee structures, their courses, exams, reviews, rankings, events etc.) on collegedisha.com has been compiled from internet sources, college websites and other reliable sources available on the public domain. While every effort has been executed to present the Information in most comprehensive, accurate and updated form during its compilation, yet collegedisha.com does not take any kind of responsibility regarding the content.The publisher is not responsible for any specific change in notification or upgradation and are not liable for any damages or negative consequences from any action, application or preparation , to any person reading or following the information provided on our website.</Typography>

            <Divider light={true} />

            <Typography className={styles.textContent}>The Information and content provided, may become antiquated partially or completely due to time lapse, unaltered, incomplete or incorrect altogether, even after sincere efforts of updation on regular intervals to ensure high quality. As the content in the site is only for reference purposes, the users are advised to refer respective original websites of colleges in case there is any kind of doubt and if possible inform us to do the necessary changes to make collegedisha.com a considerably useful site for its visitors.</Typography>

            <Divider light={true} />

            <Typography className={styles.textContent}>However if you have found any inappropriate or wrong information/data on the site, inform us by sending your requests on our " Report an Error " tab. We will try to revert to your requests asap.</Typography>

          </div>

        </div>

      </div>

      <Footer />
    </>

  );
}

export default DisclaimerPage;