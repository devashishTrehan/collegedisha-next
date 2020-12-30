import { Theme } from "@/Services/App.service";
import { makeStyles } from "@material-ui/styles";
import { Grid, Hidden, Typography, useMediaQuery } from '@material-ui/core';
import * as React from 'react';
import classNames from 'classnames';
import { SearchForm } from '@/Components/Search.component';


const SubscribeSectionStyles = makeStyles({
    container: {
        minHeight: 200,
        padding: `20px 5%`,
        backgroundImage: `url('/assets/images/subscribeBg.jpg')`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',

        '& .rightSec': {
            ...Theme.ContentRight
        },
        '& .formWrap': {
            display: 'flex',
            height: '100%',
            flexDirection: 'column',
            justifyContent: 'center',
        },
        '& .imageWrap': {
            height: 310,
            overflow: 'hidden',
            padding: `0 ${Theme.spacingMid}px`,
            backgroundSize: 'cover',
            animation: 'translateY 4s linear infinite',
            '& img': {
                height: '100%'
            }
        },
    },

})

export const SubscribeSection = () => {

    const styles = SubscribeSectionStyles();
    const isMobile = useMediaQuery('(max-width:600px)');


    return (
        <div className={styles.container}>
            <div className={classNames('container')}>

                <Grid container className={''} spacing={4} >
                    <Grid item className={'leftSec'} xs={12} md={6} >

                        <div className={'formWrap'}>
                            <Typography style={{ color: Theme.primary, margin: `${Theme.spacingMid}px 0`, textTransform: 'uppercase' }} variant={isMobile ? 'h5' : 'h4'} align='left' >
                                <span>Subscribe to our</span>
                                <br />
                                <span style={{ fontFamily: 'gorditaBold' }}>education portal</span>
                            </Typography>
                            <SearchForm inputProps={{ placeholder: 'Enter Email address' }} buttonText='Go' buttonIcon={'Go'} />
                        </div>

                    </Grid>

                    <Hidden smDown>
                        <Grid item className={'rightSec'} md={6}>
                            <div className={'imageWrap'}>
                                <img src='/assets/images/subscribeLeft.png' alt='' />
                            </div>
                        </Grid>
                    </Hidden>

                </Grid>

            </div>
        </div>
    )

}