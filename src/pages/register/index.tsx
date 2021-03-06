
import { Button, Divider, Grid, MenuItem, Typography, useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import * as React from 'react';
import { Theme, ValidateFields } from '@/Services/App.service';
import Routes from '@/Services/Routes';
import InputField from '@/Components/TextField.component/TextField.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGoogle, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';
import DateField from '@/Components/DateField.component/DateField.component';
import SelectField from '@/Components/SelectField.component/SelectField.component';
import { useRouter } from 'next/router';


const useStyles = makeStyles({
  sectionBackground: {
    overflow: 'hidden'
  },
  wrapper: {
    padding: '30px 5% 50px',
  },
  SelectOption: {
    lineHeight: '30px',
    color: '#fff',
    backgroundColor: Theme.primary,
    '&:hover': {
      backgroundColor: Theme.secondary
    }
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
      textAlign: 'left',
      '& .heading': {
        margin: '25px 0 5px',
      },
    },
    '& .fieldsContainer': {
      padding: '0px 10px',
    },
    '& .inputContainer': {
      padding: '10px',
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
  loginHelperText: {
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



function RegisterPage(props: any) {

  const [Form, setForm] = React.useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    DOB: '',
    gender: '',
    mobile: '',
    address: '',
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
    const formErrorConditions = [!Form.name, !Form.email, !Form.password, !Form.password !== !Form.confirmPassword, !Form.DOB, !Form.gender, !Form.mobile, !Form.address];

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
                <img src='assets/images/LoginLeft.webp' alt='' />
              </div>
              <div className='decImageWrap' style={{ right: -250 }}>
                <img src='assets/images/LoginRight.webp' alt='' />
              </div>

              <div className={styles.form} style={isMobile ? { padding: 0 } : {}}>

                <div className='formHead'>

                  <div className='FormLogoWrap' onClick={() => router.replace(Routes.Home)}>
                    <img src='assets/images/BLogo.svg' alt='College Disha' />
                  </div>

                  <Divider />

                  <div><Typography variant={'h1'} className={'heading'}>Register new account</Typography></div>
                  <div><Typography variant={'body1'} className={'subHeading'}>Use the form below to create new account</Typography></div>
                </div>

                <form onSubmit={submitForm} >
                  <Grid container className={'fieldsContainer'} >

                    <Grid item xs={12} md={6}>
                      <div className='inputContainer'>
                        <InputField
                          ref={(ref: any) => { inputRefs[0] = ref }}
                          label='Name'
                          error={Form.name === ''}
                          errormessage='Name is required'
                          name='name'
                          value={Form.name}
                          onValueChange={(event: any) => fieldChangeHandler(event.target.name, event?.target.value)} />
                      </div>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <div className='inputContainer'>
                        <InputField
                          ref={(ref: any) => { inputRefs[1] = ref }}
                          label='Email'
                          variant='outlined'
                          size='small'
                          error={Form.email === ''}
                          errormessage='Email is required'
                          name='email'
                          value={Form.email}
                          onValueChange={(event: any) => fieldChangeHandler(event.target.name, event?.target.value)} />
                      </div>
                    </Grid>


                    <Grid item xs={12} md={6}>
                      <div className='inputContainer'>
                        <InputField
                          ref={(ref: any) => { inputRefs[2] = ref }}
                          label='Password'
                          error={Form.password === ''}
                          errormessage='Password is required'
                          type='password'
                          name="password"
                          value={Form.password}
                          onValueChange={(event: any) => fieldChangeHandler(event.target.name, event?.target.value)} />
                      </div>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <div className='inputContainer'>
                        <InputField
                          ref={(ref: any) => { inputRefs[3] = ref }}
                          label='Re Enter Password'
                          error={Form.password !== Form.confirmPassword}
                          errormessage="Passwords doesn't match"
                          type='password'
                          name="confirmPassword"
                          value={Form.confirmPassword}
                          onValueChange={(event: any) => fieldChangeHandler(event.target.name, event?.target.value)} />
                      </div>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <div className='inputContainer'>
                        <DateField
                          ref={(ref: any) => { inputRefs[4] = ref }}
                          label='Date of Birth'
                          error={!Form.DOB}
                          errormessage="Date of birth is required"
                          type='date'
                          name="DOB"
                          value={Form.DOB}
                          onValueChange={(event: any) => fieldChangeHandler(event.target.name, event?.target.value)} />
                      </div>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <div className='inputContainer'>
                        <SelectField
                          ref={(ref: any) => { inputRefs[5] = ref }}
                          label='gender'
                          error={!Form.gender}
                          errormessage="Gender is required"
                          name="gender"
                          value={Form.gender}
                          onValueChange={(event: any) => fieldChangeHandler(event.target.name, event?.target.value)}>

                          <MenuItem value='' >--Select--</MenuItem>
                          <MenuItem value='female'  >Female </MenuItem>
                          <MenuItem value='male' >Male</MenuItem>
                          <MenuItem value='others' >Others</MenuItem>

                        </SelectField>
                      </div>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <div className='inputContainer'>
                        <InputField
                          ref={(ref: any) => { inputRefs[6] = ref }}
                          label='Contact number'
                          error={Form.mobile === ''}
                          errormessage='Contact number is required'
                          type='number'
                          name='mobile'
                          value={Form.mobile}
                          onValueChange={(event: any) => fieldChangeHandler(event.target.name, event?.target.value)} />
                      </div>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <div className='inputContainer'>
                        <InputField
                          ref={(ref: any) => { inputRefs[7] = ref }}
                          label='Address'
                          error={Form.address === ''}
                          errormessage='Address is required'
                          name='address'
                          value={Form.address}
                          onValueChange={(event: any) => fieldChangeHandler(event.target.name, event?.target.value)} />
                      </div>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <div className='inputContainer buttonContainer'>
                        <Button type='submit' variant='contained' color='primary'>Register</Button>
                      </div>
                    </Grid>

                  </Grid>
                </form>

                <div className={styles.LoginButtonGroupWrap}>
                  <Typography className={'helperText'}>Or Register With</Typography>
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
                  <Typography className={styles.loginHelperText}>
                    <span>Already have an account?</span>
                    <span><Link href={Routes.Login}>Login Here</Link></span>
                  </Typography>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div >


    </>

  );
}

export default RegisterPage;