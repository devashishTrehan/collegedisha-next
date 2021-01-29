import { Theme } from '@/Services/App.service';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useEffect, useState } from 'react';

const useStyles = makeStyles({

    container: {
        '& .imageWrap': {
            width: 140,
            margin: '25px auto',
            '& img': {
                width: '100%',
            }
        },
        '& .subHeading': {
            margin: '10px 0',
            fontSize: 13,
            marginBottom: 0,
            '& span': {
                color: Theme.secondary
            }
        },
    },


})

interface Props {
    email: string
}

export const MailSent = (props: Props) => {

    const [email, setEmail] = useState(props.email)

    const styles = useStyles();

    useEffect(() => {
        setEmail(props.email)
    }, [props.email])

    return (
        <div className={styles.container}>
            <div className='imageWrap'>
                <img src='/assets/images/emailVerify.webp' alt='' />
            </div>

            <div><Typography variant={'h1'} className={'heading'}>Confirm Your Email</Typography></div>
            <div><Typography variant={'body1'} className={'subHeading'}>We have sent mail to <span>{email}</span> to confirm the validity of your email address. After receiving the email follow the link provided to complete your registration</Typography></div>
        </div>
    )
}