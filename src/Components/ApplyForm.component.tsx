import { Button, Grid, Hidden, MenuItem, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Theme as MuiTheme } from '@material-ui/core';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import InputField from './TextField.component/TextField.component';
import SelectField from './SelectField.component/SelectField.component';
import { InstituteCourseType, InstituteListItem } from '@/Services/DataTypes/Institutes';
import Link from 'next/link';
import { Theme } from '@/Services/App.service';
import Routes from '@/Services/Routes';
import { FormHead } from './FormHead.component';

const useStyles = makeStyles((theme: MuiTheme) => ({
    container: {
        display: 'flex',
        '& .imageWrap': {
            width: '50%',
        },
        '& .formWrap': {
            width: '50%',
            padding: '30px 50px',
            [theme.breakpoints.down('sm')]: {
                width: '100%',
                padding: 20,
            },
            '& form': {
                width: '100%',
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
            }
        }
    },
    loginHelperText: {
        marginTop: 15,
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

}))


interface Form {
    name: string,
    phoneNumber: string,
    emailId: string,
    course: string,
    city: string,
    sourceUrl: string
}

interface Props {
    institute: InstituteListItem
}

function ApplyForm(props: Props) {

    const [Form, setForm] = useState<Form>({
        name: '',
        phoneNumber: '',
        course: '',
        city: '',
        sourceUrl: '',
        emailId: ''
    });
    const router = useRouter();
    const styles = useStyles();
    let inputRefs = [];

    const fieldChangeHandler = (field: string, value: any) => {
        setForm(prev => {
            return {
                ...prev,
                [field]: value
            }
        })
    }

    useEffect(() => {
        let path = router.asPath;
        fieldChangeHandler('sourceUrl', path);
    }, [])

    const { courses, name } = props.institute;

    return (
        <div className={styles.container}>

            <Hidden smDown>
                <div className='imageWrap' >
                    <img src={'assets/images/counsellingCard.webp'} />
                </div>
            </Hidden>

            <div className='formWrap'>

                <FormHead
                    title={'Thank You For your interest'}
                    subTitle={'Fill details to get notified of best colleges in India and free career counselling'}
                    titleProps={{ style: { fontSize: 18, textAlign: 'left', marginBottom: 5, } }}
                    subTitleProps={{ style: { fontSize: 12, textAlign: 'left', marginBottom: 15, } }} />

                <form>
                    <Grid container spacing={3}>
                        <Grid item xs={12} >
                            <InputField
                                ref={(ref: any) => { inputRefs[0] = ref }}
                                label='Fullname'
                                error={Form.name === ''}
                                errormessage='Name is required'
                                isrequired
                                name='name'
                                value={Form.name}
                                onValueChange={(event: any) => fieldChangeHandler(event.target.name, event?.target.value)} />
                        </Grid>
                        <Grid item xs={12} >
                            <InputField
                                ref={(ref: any) => { inputRefs[0] = ref }}
                                label='Phone Number'
                                error={Form.phoneNumber === ''}
                                errormessage='Phone Number is required'
                                isrequired
                                name='phoneNumber'
                                value={Form.phoneNumber}
                                onValueChange={(event: any) => fieldChangeHandler(event.target.name, event?.target.value)} />
                        </Grid>
                        <Grid item xs={12} >
                            <InputField
                                ref={(ref: any) => { inputRefs[0] = ref }}
                                label='Email Address'
                                error={Form.emailId === ''}
                                errormessage='Email Address is required'
                                isrequired
                                name='emailId'
                                value={Form.emailId}
                                onValueChange={(event: any) => fieldChangeHandler(event.target.name, event?.target.value)} />
                        </Grid>
                        <Grid item xs={12}  >
                            <SelectField
                                ref={(ref: any) => { inputRefs[3] = ref }}
                                label='Select your city'
                                error={Form.city === ''}
                                name='city'
                                value={Form.city}
                                onValueChange={(event: any) => fieldChangeHandler(event.target.name, event?.target.value)} >
                                {
                                    []?.map((year: number) => {
                                        return (
                                            <MenuItem key={year} value={year}>{year}</MenuItem>
                                        )
                                    })
                                }
                            </SelectField>
                        </Grid>

                        <Grid item xs={12} >
                            <SelectField
                                ref={(ref: any) => { inputRefs[3] = ref }}
                                label='Select Course'
                                error={Form.course === ''}
                                name='course'
                                value={Form.course}
                                onValueChange={(event: any) => fieldChangeHandler(event.target.name, event?.target.value)} >
                                {
                                    courses?.map((course: InstituteCourseType) => {
                                        return (
                                            <MenuItem key={course.value} value={course.value}>{course.label}</MenuItem>
                                        )
                                    })
                                }
                            </SelectField>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <div className='buttonContainer'>
                                <Button type='submit' variant='contained' color='primary'>Apply</Button>
                            </div>
                        </Grid>

                    </Grid>

                    <div>
                        <Typography className={styles.loginHelperText}>
                            <span>Already have an account?</span>
                            <span><Link href={Routes.Login}>Login Here</Link></span>
                        </Typography>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default ApplyForm;