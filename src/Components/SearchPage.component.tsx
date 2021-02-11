
import { Divider, IconButton, Typography, useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import * as React from 'react';
import { Theme } from '../Services/App.service';
import { ArrowForward, Close, Search as SearchIcon } from '@material-ui/icons';
import classNames from 'classnames';
import { SearchForm } from './Search.component';

// const useStyles = ;

export const SearchPage = (props: any) => {


    const [isActive, setActive] = React.useState(false);
    const [largestSide, setLargestSide] = React.useState(0);
    const isMobile = useMediaQuery('(max-width:767px');
    const [form, setForm] = React.useState<{ item: string, city: string }>({
        item: '',
        city: ''
    })

    React.useEffect(() => {
        let { innerHeight, innerWidth } = window;
        if (innerHeight > innerWidth) {
            setLargestSide(innerHeight);
        } else {
            setLargestSide(innerWidth);
        }
    }, [])


    const useStyles = makeStyles({
        closeButton: {
            position: 'absolute',
            right: 20,
            top: 20,
            color: '#ddd',
        },
        mainContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            '&.active': {
                overflow: 'hidden',
                transition: '.5s',
                width: '100vw',
                zIndex: 9,
                top: 0,
                left: 0,
                position: 'fixed',
                backgroundColor: Theme.primary + '99',
                height: '100vh',
                animation: '$OpenPage 1s forwards',
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
        },
        searchWrap: {
            width: 700,
            maxWidth: '95%',
            margin: 'auto',

        },
        ORSeparator: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '30px 0',
            '& .divider': {
                width: 50,
                backgroundColor: '#ddd',
            },
            '& .text': {
                color: '#ddd',
                fontSize: 14,
                padding: '0 10px'
            }
        },
        selectWrap: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            '& .select': {
                minWidth: 100,
                margin: '0 10px',
                background: 'transparent',
                color: '#ddd',
                fontSize: 16,
                border: 'none',
                borderBottom: `1px solid #ddd`,
                paddingBottom: 5,
                '& option': {
                    background: Theme.primary,
                }
            },
            '& .text': {
                color: '#ddd',
                fontSize: 16,
                paddingBottom: 5,
                fontFamily: 'gorditaMedium'
            },

        }
    });

    const styles = useStyles();

    const KeyPressHandler = (event) => {
        console.log(event.key + ' pressed')
        if (event.key === 'Escape') {
            ClosePage();
        }
    }


    React.useEffect(() => {
        document.addEventListener('keyup', KeyPressHandler)
        return () => {
            document.removeEventListener('keyup', KeyPressHandler)
        }

    }, [])


    const ClosePage = () => {

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
        <>
            {
                isActive &&
                <>
                    <div id='_searchPage_' className={classNames(styles.mainContainer, { 'active': isActive })}>

                        <div className={styles.closeButton}><IconButton onClick={ClosePage}><Close /></IconButton></div>

                        <div className={styles.searchWrap}>
                            <SearchForm height={60} />

                            <div className={styles.ORSeparator}>
                                <Divider className='divider' />
                                <Typography className='text'>OR</Typography>
                                <Divider className='divider' />
                            </div>

                            <div className={styles.selectWrap}>
                                <Typography className='text'>Find best</Typography>
                                <select className='select' >
                                    <option value='college'>college</option>
                                    <option value='university'>university</option>
                                    <option value='coaching'>coaching</option>
                                </select>
                                <Typography className='text'>in</Typography>
                                <select className='select'>
                                    <option value='agra'>agra</option>
                                    <option value='noida'>noida</option>
                                    <option value='gaziabad'>gaziabad</option>
                                </select>
                                <Typography className='text'>city</Typography>

                                <IconButton color='secondary' style={{ marginLeft: 15 }}>
                                    <ArrowForward />
                                </IconButton>
                            </div>

                        </div>
                    </div>
                </>
            }
            <IconButton onClick={OpenPage}><SearchIcon /></IconButton>
        </>
    )

}



const useFormStyles = makeStyles({

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
        height: 60,
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
            width: 50,
            height: 50
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
})


// const _SearchForm = (props) => {


//     const [Form, setForm] = React.useState({
//         keyword: '',
//     });

//     const styles = useFormStyles();
//     const router = useRouter();
//     const isMobile = useMediaQuery('(max-width:767px');


//     React.useEffect(() => {
//         const query: any = router.query;
//         setForm({ keyword: query?.keyword })
//     }, [router.query])

//     const fieldChangeHandler = (event) => {
//         event.stopPropagation();
//         let { name: field, value } = event.target;
//         setForm(prev => {
//             return {
//                 ...prev,
//                 [field]: value
//             }
//         })
//     }

//     const submit = (event: any) => {
//         event.preventDefault();
//         console.log(Form);
//         props.onSubmit && props.onsubmit()
//     }

//     return (
//         <div className={styles.container}>
//             <form className={styles.form} onSubmit={submit} >

//                 <div className={styles.inputContainer}>

//                     <input
//                         placeholder='Search Colleges, Courses, Coaching'
//                         value={Form.keyword}
//                         autoComplete={'off'}
//                         name={'keyword'}
//                         {...props?.inputProps}
//                         onChange={fieldChangeHandler}
//                     />
//                 </div>
//                 <div className="clearfix"></div>

//                 <div className={styles.submitButtonContainer}>
//                     <IconButton color='primary' type='submit'>
//                         <SearchIcon />
//                         {/* {
//                             isMobile ?
//                                 <>
//                                     {
//                                         props.buttonIcon ?
//                                             props.buttonText
//                                             : <SearchIcon />
//                                     }
//                                 </>
//                                 : <Typography variant='button' style={{ textTransform: 'capitalize', padding: '0 15px', fontSize: 16 }}>
//                                     {
//                                         props.buttonText ?
//                                             props.buttonText
//                                             : 'Search'
//                                     }
//                                 </Typography>
//                         } */}
//                     </IconButton>
//                 </div>
//             </form>
//         </div>
//     )
// }