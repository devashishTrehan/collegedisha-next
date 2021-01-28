
import { Button, Grid, IconButton, Typography, useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import * as React from 'react';
import { useRouter } from 'next/router';
import { Routes, Theme } from '../Services/App.service';
import { Close, Search as SearchIcon } from '@material-ui/icons';
import classNames from 'classnames';

// const useStyles = ;

export const SearchPage = (props: any) => {

    const [Form, setForm] = React.useState({
        keyword: '',
    });

    const [isActive, setActive] = React.useState(false);
    const [largestSide, setLargestSide] = React.useState(0);
    const router = useRouter();
    const isMobile = useMediaQuery('(max-width:767px');
    console.log('isMobile', isMobile);

    React.useEffect(() => {
        let { innerHeight, innerWidth } = window;
        if (innerHeight > innerWidth) {
            setLargestSide(innerHeight);
        } else {
            setLargestSide(innerWidth);
        }
    }, [])

    React.useEffect(() => {
        const query: any = router.query;
        setForm({ keyword: query?.keyword })
    }, [router.query])


    const useStyles = makeStyles({
        mainContainer: {
            '&.active': {
                overflow: 'hidden',
                transition: '.5s',
                width: '100vw',
                top: 0,
                left: 0,
                position: 'fixed',
                backgroundColor: '#0008',
                height: '100vh',
                animation: '$OpenPage 1s forwards',
            }
        },

        container: {
            backgroundColor: '#ddd9',
            width: 580,
            maxWidth: '80%',
            margin: 'auto',
            padding: 10,
            borderRadius: Theme.radius2,
            overflow: 'hidden',
            transition: '.4s',
        },
        form: {
            // width: '100%',
            display: 'flex',
            flexDirection: 'row',
            margin: -5,
            height: isMobile ? 50 : 60,
        },
        inputContainer: {
            flexGrow: 1,
            height: '100%',
            padding: 5,
            '& input': {
                height: 'calc(100%)',
                width: '100%',
                backgroundColor: Theme.backgroundColor,
                padding: '0 10px',
                boxSizing: 'border-box',
                fontSize: 16,
                letterSpacing: 1,
                borderRadius: Theme.radius2,
                border: 'none',
                transition: '.3s',
                '&:focus': {
                    border: 'none',
                    outline: 'none',
                    boxShadow: Theme.boxShadow
                },
                '&::placeholder': {
                    fontSize: 12,
                    letterSpacing: 1,
                    fontFamily: 'Gordita',
                    textTransform: 'capitalize',
                }
            },
            '& svg': {
                margin: '0 10px',
                width: isMobile ? 40 : 50,
                height: props?.height ? props.height : isMobile ? 40 : 50
            }
        },
        submitButtonContainer: {
            padding: 5,
            '& button': {
                height: '100%',
                borderRadius: Theme.radius2,
                fontSize: 20,
            }
        },
        "@keyframes OpenPage": {
            "0%": {

                backdropFilter: 'blur( 0px)',
                clipPath: 'circle(40px at right)'
            },
            "100%": {
                clipPath: `circle(${largestSide}px at center)`,
                backdropFilter: 'blur( 4.5px)',
            }
        }
    });

    const styles = useStyles();

    const fieldChangeHandler = (field: string, value: any) => {
        setForm(prev => {
            return {
                ...prev,
                [field]: value
            }
        })
    }

    // React.useEffect(() => {

    //     window.addEventListener('keyup', (event) => {
    //         if (event.key === 'Escape') {
    //             ClosePage();
    //         }
    //     })

    //     return () => {
    //         window.removeEventListener('keyup', () => {
    //             console.log('keypress listener removed');

    //         })
    //     }

    // }, [])

    const submit = (event: any) => {
        event.preventDefault();
        console.log(Form);
        props.onSubmit && props.onsubmit()
    }

    const ClosePage = () => {

        // let mainContainer = document.getElementById('_searchpage_');

        setActive(false);
        let mainPage = document.getElementById('__mainPage');
        mainPage.style.overflow = 'unset';
        mainPage.style.height = 'auto';
    }

    const OpenPage = () => {
        setActive(true);
        let mainPage = document.getElementById('__mainPage');
        mainPage.style.overflow = 'hidden';
        mainPage.style.height = '100vh';
    }


    return (
        <div id='_searchpage_' className={classNames(styles.mainContainer, { 'active': isActive })}>
            {
                isActive ?
                    <>
                        <IconButton onClick={ClosePage}><Close /></IconButton>
                        <div className={styles.container}>
                            <form className={styles.form} onSubmit={submit} >

                                <div className={styles.inputContainer}>

                                    <input
                                        placeholder='Search Colleges, Courses, Coaching'
                                        value={Form.keyword}
                                        autoComplete={'off'}
                                        name={'keyword'}
                                        {...props?.inputProps}
                                        onChange={(event: any) => fieldChangeHandler(event?.target?.name, event?.target.value)}
                                    />
                                </div>
                                <div className="clearfix"></div>

                                <div className={styles.submitButtonContainer}>
                                    <Button variant='contained' color='primary' type='submit'>
                                        {
                                            isMobile ?
                                                <>
                                                    {
                                                        props.buttonIcon ?
                                                            props.buttonText
                                                            : <SearchIcon />
                                                    }
                                                </>
                                                : <Typography variant='button' style={{ textTransform: 'capitalize', padding: '0 15px', fontSize: 16 }}>
                                                    {
                                                        props.buttonText ?
                                                            props.buttonText
                                                            : 'Search'
                                                    }
                                                </Typography>
                                        }
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </>
                    : <IconButton onClick={OpenPage}><SearchIcon /></IconButton>
            }
        </div>
    )

}