import { Theme } from "@/Services/App.service";
import { makeStyles } from "@material-ui/styles";
import { Grid, Hidden, Typography, useMediaQuery, Theme as MuiTheme } from '@material-ui/core';
import * as React from 'react';
import classNames from 'classnames';
import { SearchForm } from '@/Components/Search.component';


const SubscribeSectionStyles = makeStyles((theme: MuiTheme) => ({
    container: {
        minHeight: 200,
        padding: `20px 5%`,
        backgroundImage: `url('/assets/images/subscribeBg.webp')`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',


        '& .textWrap': {
            display: 'flex',
            height: '100%',
            flexDirection: 'column',
            justifyContent: 'center',
            '& .text': {
                color: '#fff',
                textTransform: 'uppercase',
                fontSize: 24,
                [theme.breakpoints.down('sm')]: {
                    fontSize: 20
                },
                [theme.breakpoints.down('xs')]: {
                    fontSize: 18
                }

            }
        },
        '& .rightSec': {
            display: 'flex',
            alignItems: 'center',
            '& form': {
                height: 40,
                display: 'flex',
                width: 310,
                maxWidth: '100% !important',
                borderRadius: Theme.radius2,
                overflow: 'hidden',
                boxShadow: Theme.boxShadow,
                // flexWrap: 'wrap',
                '& input': {
                    height: "100%",
                    flexGrow: 1,
                    border: 'none',
                    width: 'calc(100% - 77px)',
                    padding: '5px 10px',
                },
                '& button': {
                    padding: '5px 10px',
                    background: Theme.primary,
                    color: '#fff',
                    border: 'none',
                }
            }
        }
    },
    wrapper: {
        padding: `20px`,
        width: 780,
        minHeight: 160,
        display: 'flex',
        alignItems: 'center',
        maxWidth: '100% !important',
        borderRadius: Theme.radius2,
        backgroundImage: `url('/assets/images/subscribeLeft.webp')`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    }

}))

export const SubscribeSection = () => {

    const styles = SubscribeSectionStyles();
    const isMobile = useMediaQuery('(max-width:600px)');

    const subscribe = (event: React.FormEvent) => {
        event.preventDefault();
    }


    return (
        <div className={styles.container}>

            <div className={classNames('container', styles.wrapper)} >

                <Grid container spacing={2}>
                    <Grid item className={'leftSec'} xs={12} sm={6} >

                        <div className={'textWrap'}>
                            <Typography className='text' variant={'h6'} align='left' >
                                <span>Subscribe to our</span>
                                <br />
                                <span style={{ fontFamily: 'gorditaBold' }}>education portal</span>
                            </Typography>
                        </div>

                    </Grid>

                    <Grid item className={'rightSec'} xs={12} sm={6}>
                        <form className='form' onSubmit={subscribe}>
                            <input placeholder='Enter Email Address' />
                            <button type='submit' >subscribe</button>
                        </form>
                    </Grid>

                </Grid>

            </div>
        </div>
    )

}