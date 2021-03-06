
import { Button, Divider, Typography, useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import * as React from 'react';
import Routes from '@/Services/Routes';
import { Theme, ValidateFields } from '@/Services/App.service';
import InputField from '@/Components/TextField.component/TextField.component';
import { useRouter } from 'next/router';
import { MailSent } from '@/Components/MailSent.component';


const useStyles = makeStyles({
  sectionBackground: {
    overflow: 'hidden'
  },
  wrapper: {
    padding: '30px 5% 50px',
  },
  formContainer: {
    width: 500,
    maxWidth: '100%',
    margin: 'auto',
    position: 'relative',
    '& .decImageWrap': {
      position: 'absolute',
      bottom: 0,
      width: '250px',
      zIndex: '-1',
    }
  },
  ORSeparator: {
    position: 'relative',
    height: 40,
    '& .divider': {
      position: 'absolute',
      width: 200,
      top: 17,
      left: 'calc(50% - 100px)'
    },
    '& .text': {
      position: 'absolute',
      textTransform: 'uppercase',
      fontSize: 14,
      width: 60,
      height: '100%',
      margin: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 2,
      left: 'calc(50% - 30px)',
      backgroundColor: Theme.backgroundColor,
      color: '#666',
    }
  },
  form: {
    width: '100%',
    backgroundColor: Theme.backgroundColor,
    padding: `${Theme.spacingMid}px ${Theme.spacingMore}px ${Theme.spacingMore}px`,
    boxShadow: Theme.boxShadow,
    borderRadius: Theme.radius2,
    '& .formHead': {
      textAlign: 'center',
    },
    '& .inputContainer': {
      padding: '10px 20px',
      textAlign: 'left',
    },
    '& .buttonContainer': {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      flexGrow: 1,
      justifyContent: 'center',
      '& button': {
        fontSize: 12,
        fontFamily: 'gorditaMedium',
        textTransform: 'capitalize',
        padding: '10px 30px',
        borderRadius: 8
      },
      '&>div>span': {
        fontSize: 12,
        padding: Theme.spacingLess,
        color: Theme.fontColorSecondary,
        cursor: 'pointer'
      }
    }
  },


})



function EmailVerificationPage(props: any) {

  const [Form, setForm] = React.useState({
    OTP: '',
  });

  const [Email, setEmail] = React.useState('test@mail.com');
  const [loading, setLoading] = React.useState(false);
  const [errorMessages, setErrorMessages]: any = React.useState([]);
  const isMobile = useMediaQuery('(max-width:600px)');
  const isTablet = useMediaQuery('(max-width:992px)');

  const router = useRouter();

  let inputRefs: any = [];


  const styles = useStyles();


  const submitForm = (event: React.FormEvent) => {
    event.preventDefault();
    const formErrorConditions = [!Form.OTP];

    ValidateFields(formErrorConditions, inputRefs);
  }

  const fieldChangeHandler = (field: string, value: any) => {
    setForm(prev => {
      return {
        ...prev,
        [field]: value
      }
    })
  }

  React.useEffect(() => {
  }, [])

  return (

    <>

      <div className={styles.sectionBackground}>
        <div className='container'>

          <div className={styles.wrapper}>


            <div className={styles.formContainer}>


              <div className={styles.form} style={isMobile ? { padding: 0 } : {}}>



                <div className='FormLogoWrap' onClick={() => router.replace(Routes.Home)}>
                  <img src='assets/images/BLogo.svg' alt='College Disha' />
                </div>

                <Divider />

                <MailSent email={Email} />


                <div className={styles.ORSeparator}>
                  <Divider className='divider' />
                  <Typography className='text'>OR</Typography>
                </div>

                <form onSubmit={submitForm} >


                  <div className='inputContainer'>
                    <Typography style={{ color: Theme.fontColorSecondary, fontSize: 12, textAlign: 'center', margin: '10px 0 20px' }}>Enter the OTP received in yor email</Typography>
                    <InputField
                      ref={(ref: any) => { inputRefs[1] = ref }}
                      label='Enter OTP'
                      error={Form.OTP === ''}
                      errormessage='OTP is required'
                      type='OTP'
                      name="OTP"
                      value={Form.OTP}
                      onValueChange={(event: any) => fieldChangeHandler(event.target.name, event?.target.value)} />
                  </div>


                  <div className='inputContainer buttonContainer'>
                    <Button type='submit' variant='contained' color='primary'>Reset</Button>

                  </div>

                </form>

              </div>
            </div>
          </div>

        </div>
      </div>


    </>

  );
}

export default EmailVerificationPage;