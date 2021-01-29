import { Theme } from '@/Services/App.service';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Theme as MuiTheme } from '@material-ui/core';
import React from 'react';


const useStyles = makeStyles((theme: MuiTheme) => ({
    container: {
        padding: '30px 20px',
        width: 780,
        maxWidth: '100%',
        margin: '30px auto',
        boxShadow: Theme.boxShadow,
        borderRadius: Theme.radius2
    },
    imagwWrap: {
        width: 200,
        margin: '0 auto 30px',
        '& img': {
            width: '100%',
        }

    },
    message: {
        '& .head': {
            fontSize: 22,
            fontFamily: 'gorditaMedium',
            textTransform: 'capitalize',
            color: Theme.primary,
            marginBottom: 20,
            [theme.breakpoints.down('xs')]: {
                fontSize: 18
            }
        },
        '& .desc': {
            fontSize: 16,
            color: Theme.fontColorSecondary,
            lineHeight: '24px',
            [theme.breakpoints.down('xs')]: {
                fontSize: 14
            }
        }
    },
}))


function WentWrongComponent(props) {

    const styles = useStyles();

    return (
        <div className={styles.container}>
            <div className={styles.imagwWrap}>
                <img src='/assets/images/wentWrong.webp' />
            </div>

            <div className={styles.message}>
                <Typography className='head'>{`Oops! \n Something went wrong`}</Typography>
                <Typography className='desc'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus ab iste perspiciatis veniam aliquid repellendus sit itaque.</Typography>
            </div>
        </div>
    );
}

export default WentWrongComponent;