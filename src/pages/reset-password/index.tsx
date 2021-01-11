
import { Button, Divider, Typography, useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import * as React from 'react';
import { Routes, Theme, ValidateFields } from '@/Services/App.service';
import InputField from '@/Components/TextField.component/TextField.component';
import { useRouter } from 'next/router';
import CustomBreadCrumb from '@/Components/CustomBreadCrumb.component';


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
  form: {
    width: '100%',
    backgroundColor: Theme.backgroundColor,
    padding: `${Theme.spacingLess}px ${Theme.spacingMore}px ${Theme.spacingMore}px`,
    boxShadow: Theme.boxShadow,
    borderRadius: Theme.radius2,
    '& .formHead': {
      textAlign: 'center',
      '& .imageWrap': {
        width: 140,
        margin: '25px auto',
        '& img': {
          width: '100%',
        }
      },
      '& .subHeading': {
        margin: '10px 0'
      },
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



function ResetPasswordPage(props: any) {

  const [Form, setForm] = React.useState({
    password: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = React.useState(false);
  const [errorMessages, setErrorMessages]: any = React.useState([]);
  const isMobile = useMediaQuery('(max-width:600px)');
  const isTablet = useMediaQuery('(max-width:992px)');

  const router = useRouter();

  let inputRefs: any = [];


  const styles = useStyles();


  const submitForm = (event: React.FormEvent) => {
    event.preventDefault();
    const formErrorConditions = [!Form.password, Form.password !== Form.confirmPassword];

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

  const NavigateTo = (page: string) => {
    router.replace(page)
  }

  return (

    <>

      <CustomBreadCrumb breadcrumbs={[{ name: 'reset-password', endPoint: `${Routes.ResetPassword}` }]} />


      <div className={styles.sectionBackground}>
        <div className='container'>

          <div className={styles.wrapper}>


            <div className={styles.formContainer}>


              <div className={styles.form} style={isMobile ? { padding: 0 } : {}}>


                <div className='formHead'>
                  <div className='FormLogoWrap' onClick={() => NavigateTo(Routes.Home)}>
                    <img src='assets/images/BLogo.png' alt='College Disha' />
                  </div>

                  <Divider />

                  <div className='imageWrap' >
                    <img src='assets/images/resetPassword.png' alt='' />
                  </div>

                  <div><Typography variant={'h1'} className={'heading'}>Reset Your Password</Typography></div>
                  <div><Typography variant={'body1'} className={'subHeading'}> What would you like your new password to be?</Typography></div>
                </div>

                <form onSubmit={submitForm} >
                  <div className='inputContainer'>
                    <InputField
                      ref={(ref: any) => { inputRefs[1] = ref }}
                      label='Password'
                      error={Form.password === ''}
                      errormessage='Password is required'
                      isrequired
                      type='password'
                      name="password"
                      variant='outlined'
                      size='small'
                      color='primary'
                      value={Form.password}
                      onValueChange={(event: any) => fieldChangeHandler(event.target.name, event?.target.value)} />
                  </div>

                  <div className='inputContainer'>
                    <InputField
                      ref={(ref: any) => { inputRefs[1] = ref }}
                      label='Confirm Password'
                      error={Form.confirmPassword !== Form.password}
                      errormessage="Passwords doesn't match"
                      isrequired
                      type='assword'
                      name="confirmPassword"
                      variant='outlined'
                      size='small'
                      color='primary'
                      value={Form.confirmPassword}
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

export default ResetPasswordPage;