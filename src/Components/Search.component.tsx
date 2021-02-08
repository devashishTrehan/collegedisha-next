
import { Button, Grid, IconButton, Typography, useMediaQuery, Theme as MuiTheme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import * as React from 'react';
import { useRouter } from 'next/router';
import { Routes, Theme } from '../Services/App.service';
import { Search as SearchIcon } from '@material-ui/icons';



const useStyles = makeStyles((theme: MuiTheme) => ({
    container: {
        backgroundColor: Theme.backgroundColor,
        width: '100%',
        borderRadius: 50,
        overflow: 'hidden',
        boxShadow: Theme.boxShadow,
        transition: '.4s',
    },
    form: (props: { height }) => ({
        // width: '100%',
        display: 'flex',
        flexDirection: 'row',
        borderRadius: 50,
        height: (props?.height ? props?.height : 70),
        [theme.breakpoints.down('xs')]: {
            height: 55
        }
    }),
    inputContainer: (props: { height }) => ({
        flexGrow: 1,
        height: '100%',
        '& input': {
            height: 'calc(100%)',
            width: '100%',
            backgroundColor: Theme.backgroundColor,
            padding: '0 10px 0 20px',
            boxSizing: 'border-box',
            fontSize: 16,
            letterSpacing: 1,
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
    }),
    submitButtonContainer: (props: { height }) => ({
        padding: 5,
        '& button': {
            height: '100%',
            fontSize: 20,
            width: (props?.height ? props?.height : 70) - 10,
            minWidth: 40,
            padding: 0,
            borderRadius: '50%',
            [theme.breakpoints.down('xs')]: {
                width: 45
            }

        }
    }),
}));

interface Props {
    height?: number,
    inputProps?: any
}

export const SearchForm = (props: Props) => {

    const [Form, setForm] = React.useState({
        keyword: '',
    });

    const [loading, setLoading] = React.useState(true);
    const router = useRouter();
    const isMobile = useMediaQuery('(max-width:767px');

    React.useEffect(() => {
        const query: any = router.query;
        setForm({ keyword: query?.keyword })
    }, [router.query])


    const styles = useStyles({ height: props?.height });

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
        // props.onSubmit && props.onsubmit()
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
                            loading ?
                                <Loader />
                                : <SearchIcon />
                        }
                    </Button>
                </div>
            </form>
        </div>
        // </div>
    )

}


const Loader = () => {

    return (
        <svg style={{ fill: Theme.secondary }} version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            width="40px" height="40px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xmlSpace="preserve">
            <path opacity="0.2" fill={'#ddd'} d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
         s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
         c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/>
            <path fill={'#ddd'} d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
         C22.32,8.481,24.301,9.057,26.013,10.047z">
                <animateTransform attributeType="xml"
                    attributeName="transform"
                    type="rotate"
                    from="0 20 20"
                    to="360 20 20"
                    dur="0.9s"
                    repeatCount="indefinite" />
            </path>
        </svg>
    )
}