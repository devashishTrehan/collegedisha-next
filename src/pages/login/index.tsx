
import { Button, Divider, Typography, useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import * as React from 'react';
import { Routes, Theme, ValidateFields } from '@/Services/App.service';
import InputField from '@/Components/TextField.component/TextField.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGoogle, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';
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
      '& .heading': {
        margin: '25px 0 10px',
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
      justifyContent: 'space-between',
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
  LoginButtonGroupWrap: {
    padding: '10px 20px',
    '& .helperText': {
      fontSize: 10,
      fontWeight: 600,
      color: Theme.fontColor,
      textAlign: 'left',
      marginBottom: 10,
    },
    '& .buttonGroup': {
      alignItems: 'flex-left',
      textAlign: 'left',
      margin: -5,
      '& button': {
        backgroundColor: '#ccc5',
        boxShadow: 'none',
        margin: 5,
        padding: '5px 5px',
        '&>span': {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'baseline',
        },
        '& .label': {
          fontSize: 10,
          textTransform: 'capitalize',
          margin: 0,
          fontFamily: 'gorditaMedium'
        },
        '& .icon': {
          borderRadius: '50%',
          width: '20px',
          height: '20px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 5,
          '& svg': {
            color: '#fff',
            fontSize: 10
          }
        }
      }
    }
  },
  registerHelperText: {
    padding: '10px 20px',
    fontSize: 12,
    color: Theme.fontColor,
    textAlign: 'left',
    '& > span:last-child': {
      '& a': {
        textDecoration: 'none',
        marginLeft: 5,
        fontFamily: 'gorditaMedium',
        color: Theme.primary,
        cursor: 'pointer'
      }
    }
  }


})



function LoginPage(props: any) {

  const [Form, setForm] = React.useState({
    email: '',
    password: '',
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
    const formErrorConditions = [!Form.email, !Form.password];

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

              <div className='decImageWrap' style={{ left: -250 }}>
                <img src='assets/images/LoginLeft.png' alt='' />
              </div>
              <div className='decImageWrap' style={{ right: -250 }}>
                <img src='assets/images/LoginRight.png' alt='' />
              </div>

              <div className={styles.form} style={isMobile ? { padding: 0 } : {}}>

                <div className='formHead'>

                  <div className='FormLogoWrap' onClick={() => router.replace(Routes.Home)}>
                    <img src='assets/images/BLogo.png' alt='College Disha' />
                  </div>

                  <Divider />

                  <div><Typography variant={'h1'} className={'heading'}>Login to account</Typography></div>
                  <div><Typography variant={'body1'} className={'subHeading'}>To keep connected with us please login with your personal information by email address and password</Typography></div>
                </div>


                <form onSubmit={submitForm} >
                  <div className='inputContainer'>
                    <InputField
                      ref={(ref: any) => { inputRefs[0] = ref }}
                      label='Email'
                      variant='outlined'
                      size='small'
                      error={Form.email === ''}
                      errormessage='Email is required'
                      isrequired
                      name='email'
                      color='primary'
                      value={Form.email}
                      onValueChange={(event: any) => fieldChangeHandler(event.target.name, event?.target.value)} />
                  </div>

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

                  <div className='inputContainer buttonContainer'>
                    <Button type='submit' variant='contained' color='primary'>Login</Button>
                    <div><span>Forget Password</span></div>
                  </div>

                </form>

                <div className={styles.LoginButtonGroupWrap}>
                  <Typography className={'helperText'}>Or Login With</Typography>
                  <div className={'buttonGroup'}>
                    <Button type='submit' variant='contained'>
                      <span className='icon' style={{ backgroundColor: '#4267B2' }}><FontAwesomeIcon icon={faFacebookF} /></span>
                      <p className='label'>Facebook</p>
                    </Button>

                    <Button type='submit' variant='contained'>
                      <span className='icon' style={{ backgroundColor: '#DB4A39' }}><FontAwesomeIcon icon={faGoogle} /></span>
                      <p className='label'>Google</p>
                    </Button>

                    <Button type='submit' variant='contained'>
                      <span className='icon' style={{ backgroundColor: '#0E78A8' }}><FontAwesomeIcon icon={faLinkedinIn} /></span>
                      <p className='label'>LinkedIn</p>
                    </Button>
                  </div>
                </div>

                <div>
                  <Typography className={styles.registerHelperText}>
                    <span>Don't have an account?</span>
                    <span><Link href={Routes.Register}>Register Now</Link></span>
                  </Typography>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>


    </>

  );
}

export default LoginPage;