
import { Button, Grid, Typography, useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import * as React from 'react';
import { useRouter } from 'next/router';
import { Routes, Theme } from '../Services/App.service';
import { Search as SearchIcon } from '@material-ui/icons';

// const useStyles = ;

export const SearchForm = (props: any) => {

    const [Form, setForm] = React.useState({
        keyword: '',
    });

    const router = useRouter();
    const isMobile = useMediaQuery('(max-width:767px');
    console.log('isMobile', isMobile);

    React.useEffect(() => {
        const query: any = router.query;
        setForm({ keyword: query?.keyword })
    }, [router.query])


    const useStyles = makeStyles({
        container: {
            backgroundColor: '#ddd9',
            width: '100%',
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

    const submit = (event: any) => {
        event.preventDefault();
        console.log(Form);
        props.onSubmit && props.onsubmit()
    }

    return (
        // <div >
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
        // </div>
    )

}