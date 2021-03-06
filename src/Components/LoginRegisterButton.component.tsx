import { useMediaQuery } from '@material-ui/core';
import { CSSProperties, makeStyles } from '@material-ui/styles';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {  Theme } from '../Services/App.service';
import Routes from '@/Services/Routes';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';

interface PropType {
    labelOnSmall?: boolean,
    labelStyle?: CSSProperties
    iconStyle?: CSSProperties
    icons?: boolean
}

const useStyles = makeStyles({
    LoginRegisterButton: {
        textAlign:'left',
        '& .tiltLine': {
            fontSize: 20,
        },
        '& a': {
            color: '#666',
            fontWeight: 500,
            transition: '.3s',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'baseline',
            '&:hover': {
                color: Theme.TFontHeadColor,
            }
        },
        '&>Span ': {
            padding: 5,
            display: 'inline-flex',
            '& svg': {
                marginRight: 5,
                fontSize: 16,
            },
            '& span': {
                fontSize: 16,
            }
        }
    },
    LoginRegisterButton_T: {
        '& .tiltLine': {
            fontSize: 16,
        },
        '&>Span ': {
            padding: 3,
            '& svg': {
                marginRight: 3,
                fontSize: 14,
            },
            '& span': {
                fontSize: 14,
            }
        }
    },
})

export const LoginRegisterButton = (props: PropType) => {
    const styles = useStyles();
    const [showLabelInMobile, setShowLabelInMobile] = useState(false);
    const isMobile = useMediaQuery('(max-width:769px)');
    const isTablet = useMediaQuery('(max-width:992px)');

    useEffect(() => {
        if (showLabelInMobile !== props.labelOnSmall) {
            setShowLabelInMobile(Boolean(props.labelOnSmall));
        }
    }, [props?.labelOnSmall])


    const { icons } = props;
    return (
        <div className={classNames(styles.LoginRegisterButton, { [styles.LoginRegisterButton_T]: isTablet })} >
            <span>
                <Link href={{
                    pathname: Routes.Login,
                }}>
                    <a>
                        {
                            icons === false ?
                                null
                                : <FontAwesomeIcon icon={faLock} style={{ ...props.iconStyle }} />
                        }
                        {
                            (!isMobile || showLabelInMobile) && (<span className={'text'} style={{ ...props.labelStyle }}>Login</span>)
                        }
                    </a>
                </Link>
            </span>
            <i className={'tiltLine'} style={{ ...props.labelStyle }}>/</i>
            <span >
                <Link href={{
                    pathname: Routes.Register,
                }}>
                    <a>
                        {
                            icons === false ?
                                null
                                : <FontAwesomeIcon icon={faUser} style={{ ...props.iconStyle }} />
                        }
                        {
                            (!isMobile || showLabelInMobile) && (<span className={'text'} style={{ ...props.labelStyle }}>Register</span>)
                        }
                    </a>
                </Link>
            </span>
        </div>
    )
}

