import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { Theme } from '../Services/App.service';

const useStyles = makeStyles({
    background: {
        padding: '50px 0',
    },
    wrapper: {
        padding: '0 5%',
    },
    heading: {
        fontSize: '2.3rem',
        color: Theme.primary,
        fontFamily: 'gorditaMedium',
    }
})

interface Props {
    backgroundImageName?: string,
    PageName?: string,
    children?: JSX.Element
}

// interface PropsWithPageName extends Props {
// }

// interface PropsWithChildren extends Props {
// }

export const PageHead = (props: Props) => {

    const styles = useStyles();

    return (
        <div className={styles.background} style={{ backgroundImage: `url(/assets/images/patternUnit.jpg)` }}>
            <div className='container'>
                <div className={styles.wrapper}>
                    {
                        props.children ?
                            props.children
                            : <Typography className={styles.heading} variant='h1'>{props.PageName}</Typography>
                    }
                </div>
            </div>
        </div>
    )
}