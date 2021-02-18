
import { useMediaQuery, Theme as MuiTheme, Dialog, } from '@material-ui/core';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles, } from '@material-ui/styles';
import * as React from 'react';
import { Theme } from '../Services/App.service';
import { Close, Search as SearchIcon } from '@material-ui/icons';
import classNames from 'classnames';
import { CircularLoader } from './Search.component';
import { useRouter } from 'next/router';
import { NavbarContext } from '@/Context/Navbar.context';
import { SearchResultItem } from '@/Services/DataTypes/SearchResult';
import Image from 'next/image';
import { Rating } from '@material-ui/lab';
import Link from 'next/link';

// const useStyles = ;

export const SearchPage = (props: any) => {


    const [isActive, setActive] = React.useState(false);
    const { searchOpen, closeSearch } = React.useContext(NavbarContext);
    const router = useRouter();
    const isMobile = useMediaQuery('(max-width:767px');


    React.useEffect(() => {

    }, [])

    React.useEffect(() => {
        if (searchOpen) {
            setActive(searchOpen);
        }
    }, [searchOpen])

    React.useEffect(() => {

        const RouteChangehandler = () => {
            ClosePage();
        }

        router.events.on('routeChangeStart', RouteChangehandler)

        return () => {
            router.events.off('routeChangeStart', RouteChangehandler);
        }
    }, [])




    const useStyles = makeStyles({
        closeButton: {
            position: 'absolute',
            right: 20,
            top: 20,
            color: '#ddd',
        },
        searchWrap: {
            width: '100%'
        },

    });

    const styles = useStyles();


    const ClosePage = () => {

        setActive(false);
        closeSearch();
        // let mainPage = document.getElementById('__mainPage');
        // mainPage.style.overflow = 'unset';
        // mainPage.style.height = 'auto';
    }

    const OpenPage = () => {
        setActive(true);
    }

    // const Transition = React.forwardRef(function Transition(props, ref) {
    //     return <Slide direction="left" ref={ref} {...props} />;
    // });


    return (
        <>

            <Dialog
                open={isActive}
                fullScreen
                hideBackdrop
                onEscapeKeyDown={ClosePage}
                // TransitionComponent={Transition}
                PaperProps={{ style: { backgroundColor: Theme.primary + '99' } }} >
                <div id='_searchPage_' >


                    <div className={styles.searchWrap}>
                        <_SearchForm height={60} onClose={ClosePage} />

                    </div>
                </div>
            </Dialog>
            <IconButton onClick={OpenPage}><SearchIcon /></IconButton>
        </>
    )

}



const useFormStyles = makeStyles((theme: MuiTheme) => ({
    container: (props: { height }) => ({
        backgroundColor: Theme.backgroundColor,
        maxWidth: '100%',
        width: '100%',
        margin: '0 auto',
        borderRadius: 0,
        overflow: 'hidden',
        height: (props?.height ? props?.height : 70),
        boxShadow: Theme.boxShadow,
        transition: '.4s',

    }),
    mainContainer: (props: { height }) => ({
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth:'1450px',
        margin: '0 auto',
        height: '100vh',
        transition: '.4s',
    }),
    form: (props: { height }) => ({
        // width: '100%',
        display: 'flex',
        flexDirection: 'row',
        borderRadius: 50,
        height: (props?.height ? props?.height : 70),
        [theme.breakpoints.down('xs')]: {
            height: 60
        }
    }),
    inputContainer: (props: { height }) => ({
        flexGrow: 1,
        height: '100%',
        display: 'flex',
        '& input': {
            height: 'calc(100%)',
            width: '100%',
            backgroundColor: Theme.backgroundColor,
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
    submitIconContainer: (props: { height }) => ({
        padding: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: (props?.height ? props?.height : 70)
    }),
    resultContainer: (props: { height }) => ({
        width: '100%',
        maxHeight: `calc(100vh - ${(props?.height ? props?.height : 70)}px)`,
        '& ul': {
            listStyle: 'none',
            width: '100%',
            height: '100%',
            overflowY: 'auto',
            borderTop: `1px solid ${Theme.primary + 44}`,
            '& >li': {
                width: '100%',
                backgroundColor: Theme.backgroundColor,
                borderBottom: `1px solid ${Theme.primary + 44}`,

                '& .listItemWrap': {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 10,
                    cursor: 'pointer',

                    '& .imageWrap': {
                        width: 40,
                        height: 40,
                        borderRadius: Theme.radius2,
                        overflow: 'hidden',
                        flexShrink: 0,
                        margin: '0 10px',
                        [theme.breakpoints.down('xs')]: {
                            width: '35px !important',
                            height: '35px !important',
                        },
                        '& .elementSymbol': {
                            width: '100%',
                            height: '100%',
                            backgroundColor: Theme.primary + '55',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            '& p': {
                                textTransform: 'uppercase',
                                color: Theme.secondary,
                                fontFamily: 'gorditaMedium',
                                [theme.breakpoints.down('xs')]: {
                                    fontSize: '14px !important',
                                }
                            }
                        }
                    },
                    '& .title': {
                        flexGrow: 1,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        '& p': {
                            // maxWidth: '100%',
                            fontSize: 18,
                            padding: 0,
                            fontFamily: 'gorditaMedium',
                            color: Theme.primary,
                            textAlign: 'left',
                            [theme.breakpoints.down('sm')]: {
                                fontSize: '16px !important',
                            },
                            [theme.breakpoints.down('xs')]: {
                                fontSize: '14px !important',
                            }
                        }
                    },
                    '& .type-rate-wrap': {
                        flexShrink: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-end',
                        justifyContent: 'center',
                        margin: '0 10px',
                        '& p': {
                            padding: '3px 6px',
                            minWidth: 50,
                            fontSize: 11,
                            borderRadius: Theme.radius1,
                            backgroundColor: '#ddd',
                            marginBottom: 5,
                            color: Theme.fontColor,
                            [theme.breakpoints.down('xs')]: {
                                fontSize: '9px !important',
                            }
                        },
                        '& .rating': {
                            '& .ratePoint': {
                                [theme.breakpoints.down('xs')]: {
                                    fontSize: 12
                                }
                            }
                        }
                    },
                    '&:last-child': {
                        borderBottom: `none`,
                    }
                }
            }
        }
    })
}));


const _SearchForm = (props) => {


    const [Form, setForm] = React.useState({
        keyword: '',
    });
    const [searchResultState, setSearchResultState] = React.useState(null);
    const [results, setResults] = React.useState<SearchResultItem[]>([
        { elementId: 1, displayTitle: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Lorem, ipsum dolor sit amet consectetur adipisicing elit.', elementType: 'college', elementSymbol: '', ratePoints: 3.4, identifier: '234-abc-college', url: 'exams/xyz' },
        { elementId: 1, displayTitle: 'abc college', elementType: 'university', elementSymbol: '', ratePoints: 3.4, identifier: '234-abc-college', url: 'exams/xyz' },
        { elementId: 1, displayTitle: 'abc college', elementType: 'Exam', elementSymbol: '', ratePoints: 3.4, identifier: '234-abc-college', url: 'exams/xyz' },
        { elementId: 1, displayTitle: 'abc college', elementType: 'Article', elementSymbol: '', ratePoints: 3.4, identifier: '234-abc-college', url: 'exams/xyz' },
        { elementId: 1, displayTitle: 'abc college', elementType: 'News', elementSymbol: '', ratePoints: 3.4, identifier: '234-abc-college', url: 'exams/xyz' },
        { elementId: 1, displayTitle: 'abc college', elementType: 'college', elementSymbol: '', ratePoints: 3.4, identifier: '234-abc-college', url: 'exams/xyz' },
        { elementId: 1, displayTitle: 'abc college', elementType: 'college', elementSymbol: '', ratePoints: 3.4, identifier: '234-abc-college', url: 'exams/xyz' },
        { elementId: 1, displayTitle: 'abc college', elementType: 'college', elementSymbol: '', ratePoints: 3.4, identifier: '234-abc-college', url: 'exams/xyz' },
        { elementId: 1, displayTitle: 'abc college', elementType: 'college', elementSymbol: '', ratePoints: 3.4, identifier: '234-abc-college', url: 'exams/xyz' },
        { elementId: 1, displayTitle: 'abc college', elementType: 'college', elementSymbol: '', ratePoints: 3.4, identifier: '234-abc-college', url: 'exams/xyz' },
        { elementId: 1, displayTitle: 'abc college', elementType: 'college', elementSymbol: '', ratePoints: 3.4, identifier: '234-abc-college', url: 'exams/xyz' },
        { elementId: 1, displayTitle: 'abc college', elementType: 'college', elementSymbol: '', ratePoints: 3.4, identifier: '234-abc-college', url: 'exams/xyz' },
        { elementId: 1, displayTitle: 'abc college', elementType: 'college', elementSymbol: '', ratePoints: 3.4, identifier: '234-abc-college', url: 'exams/xyz' },
        { elementId: 1, displayTitle: 'abc college', elementType: 'college', elementSymbol: '', ratePoints: 3.4, identifier: '234-abc-college', url: 'exams/xyz' },
        { elementId: 1, displayTitle: 'abc college', elementType: 'college', elementSymbol: '', ratePoints: 3.4, identifier: '234-abc-college', url: 'exams/xyz' },
        { elementId: 1, displayTitle: 'abc college', elementType: 'college', elementSymbol: '', ratePoints: 3.4, identifier: '234-abc-college', url: 'exams/xyz' },
        { elementId: 1, displayTitle: 'abc college', elementType: 'college', elementSymbol: '', ratePoints: 3.4, identifier: '234-abc-college', url: 'exams/xyz' },
        { elementId: 1, displayTitle: 'abc college', elementType: 'college', elementSymbol: '', ratePoints: 3.4, identifier: '234-abc-college', url: 'exams/xyz' },
    ]);
    const [isFocused, setIsFocused] = React.useState(false);
    const styles = useFormStyles({ height: props?.height });
    const [loading, setLoading] = React.useState(false);
    const router = useRouter();
    const isMobile = useMediaQuery('(max-width:767px');
    let SearchTimeout = React.useRef(null);


    React.useEffect(() => {
        const query: any = router.query;
        setForm({ keyword: query?.keyword })
    }, [router.query])

    const fieldChangeHandler = (event) => {
        event.stopPropagation();
        let { name: field, value } = event.target;
        setForm(prev => {
            return {
                ...prev,
                [field]: value
            }
        })
        SearchResult();
    }

    const SearchResult = () => {
        clearTimeout(SearchTimeout.current);
        SearchTimeout.current = setTimeout(() => {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
            }, 1000)
        }, 500);
    }

    const submit = (event: any) => {
        event.preventDefault();
        console.log(Form);
        // props.onSubmit && props.onsubmit()
    }

    const focusHandler = () => {
        console.log('focused');
        setIsFocused(true);
    }

    const blurHandler = () => {
        console.log('blurred');
        setIsFocused(false);
    }

    return (
        <div className={classNames(styles.mainContainer)}>

            <div className={classNames(styles.container)}>
                <form className={styles.form} onSubmit={submit} >

                    <div className={styles.inputContainer}>


                        <div className={styles.submitIconContainer}>
                            <IconButton disabled>
                                <SearchIcon />
                            </IconButton>
                        </div>

                        <div className="clearfix"></div>

                        <input
                            placeholder='Search Colleges, Courses, Coaching'
                            value={Form.keyword}
                            autoComplete={'off'}
                            name={'keyword'}
                            {...props?.inputProps}
                            onFocus={focusHandler}
                            // onBlur={blurHandler}
                            onChange={fieldChangeHandler}
                        />

                        <div className="clearfix"></div>

                        <div className={styles.submitIconContainer}>
                            {
                                loading ?
                                    <IconButton disabled color={'primary'}>
                                        <CircularLoader />
                                    </IconButton>

                                    : <IconButton onClick={() => props?.onClose && props?.onClose()}><Close /></IconButton>
                            }
                        </div>
                    </div>
                </form>
            </div>
            {
                isFocused && results?.length ?
                    // <DataPageWrapper pageState={searchResultState}>
                    <div className={styles.resultContainer}>
                        <ul>
                            {
                                results?.map((result: SearchResultItem) => {
                                    return (
                                        <li>
                                            <Link href={result?.url}>
                                                <a style={{ display: 'block' }}>
                                                    <div className='listItemWrap'>

                                                        <div className='imageWrap'>
                                                            {
                                                                result.elementSymbol ?
                                                                    <Image layout='fill' src={result.elementType} />
                                                                    : <div className='elementSymbol'><Typography>{result.elementType[0]}</Typography></div>
                                                            }
                                                        </div>
                                                        <div className='title'>
                                                            <Typography >{result.displayTitle}</Typography>
                                                        </div>
                                                        <div className='type-rate-wrap'>
                                                            <Typography>{result.elementType}</Typography>
                                                            {
                                                                result?.ratePoints ?
                                                                    <Rating className='rating' classes={{ decimal: 'ratePoint' }} precision={0.5} size='small' readOnly value={result.ratePoints} />
                                                                    : null
                                                            }
                                                        </div>

                                                    </div>
                                                </a>
                                            </Link>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    // </DataPageWrapper>
                    : null
            }
        </div>
    )
}