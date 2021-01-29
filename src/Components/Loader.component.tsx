import { Theme } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import * as React from 'react';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            position: 'relative',
            display: 'flex',
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(4)',
        },
    }),
);

export const Loader = (props: any) => {

    const classes = useStyles();

    return (
        <div style={{ width: '100%', height: '100%', backgroundColor: '#0004', position: 'absolute', top: 0, left: 0, borderRadius: 10, zIndex: 9 }}>
            <div className={classes.root}>

                <div className="folding-cube-container">
                    <div className="folding-cube">
                        <div className="cube1 cube"></div>
                        <div className="cube2 cube"></div>
                        <div className="cube4 cube"></div>
                        <div className="cube3 cube"></div>
                    </div>
                </div>

            </div>
        </div>
    )

}