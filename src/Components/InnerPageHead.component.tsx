import { Typography, useMediaQuery, Theme as MuiTheme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useContext, } from 'react';
import classNames from 'classnames';
import { Theme } from '../Services/App.service';
import { NavbarContext } from '@/Context/Navbar.context';
import { LocationOnOutlined, Visibility } from '@material-ui/icons';
import { Rating } from '@material-ui/lab';

const useStyles = makeStyles((theme: MuiTheme) => ({
    backgroundContainer: {
        backgroundImage: "url('/assets/images/innerPages/instituteBanner.jpg')",
        backgroundSize: '100%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right',
    },
    headContainer: {
        '& .wrap': {
            display: 'flex',
            textAlign: 'left',
            verticalAlign: 'middle',
            alignItems: 'flex-start',
            [theme.breakpoints.down('xs')]: {
                display: 'block'
            }
        },
        '& .imageWrap': {
            width: '50%',
            borderRadius: Theme.radius2,
            boxShadow: Theme.boxShadow,
            overflow: 'hidden',
            [theme.breakpoints.down('xs')]: {
                width: '100%'
            }
        },
        '& .detailWrap': {
            padding: '0 0 20px',
            margin: '0px 0 0px 20px',
            textTransform: 'capitalize',
            color: Theme.primary,
            width: 'calc(50%)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            [theme.breakpoints.down('xs')]: {
                width: 'calc(100%)',
                padding: '0 0 10px',
                margin: '20px 0 0px 0px',
            },
            '& .name': {
                fontFamily: 'gorditaMedium',
                textTransform: 'uppercase',
                fontSize: 22,
                [theme.breakpoints.down('xs')]: {
                    fontSize: 16,
                },
            },
            '& .location': {
                color: 'gray',
                fontSize: 18,
                [theme.breakpoints.down('xs')]: {
                    fontSize: 14,
                    marginRight: 3,
                },
                '& svg': {
                    fontSize: 20,
                    verticalAlign: 'middle',
                    marginRight: 5,
                    marginLeft: -3,
                }

            },
            '& .views': {
                fontFamily: 'gorditaMedium',
                marginRight: 5,
                fontSize: 14,
                [theme.breakpoints.down('xs')]: {
                    fontSize: 10,
                    marginRight: 3,
                },

                '& svg': {
                    fontSize: 16,
                    marginRight: 5,
                    verticalAlign: 'middle',
                    [theme.breakpoints.down('xs')]: {
                        fontSize: 12,
                    },
                }

            },
            '& .ratingWrap': {
                display: 'flex',
                alignItems: 'center',
                marginTop: 5,
                '& .subWrap': {
                    display: 'flex',
                    '& .rating': {
                        fontSize: 18,
                        [theme.breakpoints.down('xs')]: {
                            fontSize: 14,
                        },
                    },
                    '& .total': {
                        fontFamily: 'gorditaMedium',
                        margin: '0 6px',
                        fontSize: 8,
                        [theme.breakpoints.down('xs')]: {
                            margin: '0 3px',
                            fontSize: 6,
                        },
                        '& p': {
                            verticalAlign: 'middle',
                            padding: 0,
                        }
                    }
                }
            },
            '& .group': {
                margin: '10px 0',
                [theme.breakpoints.down('xs')]: {
                    margin: '8px 0',
                }

            }
        }
    },
    HeadContainerSmallImage: {
        '& .wrap': {
            display: 'flex',
        },
        '& .imageWrap': {
            width: '150px',
            [theme.breakpoints.down('xs')]: {
                width: '120px'
            }
        },
        '& .detailWrap': {
            padding: '0 0 20px',
            margin: '0px 0 0px 20px',
            width: 'calc(100% - 150px)',
            [theme.breakpoints.down('xs')]: {
                width: 'calc(100% - 120px)'
            },
        }
    },
}))

interface Props {
    id: number,
    name: string,
    thumbnail: string,
    rating: number,
    location?: string,
    isApplied?: boolean,
    isSaved?: boolean,
    slug: string,
    views?: number,
    onSave?: Function,
    defaultImage?: string,
    onDownload?: Function,
    onApply?: Function,
    onShare?: Function,
    smallImage?: boolean
}


export const InnerPageHead = (props: Props) => {

    const isMobile = useMediaQuery('(max-width:769px)');
    const isTablet = useMediaQuery('(max-width:992px)');
    const styles = useStyles();
    const { navHeight } = useContext(NavbarContext);


    const { id, name, location, thumbnail, rating, isApplied, isSaved, views, defaultImage: d_image } = props;

    const defaultImage = d_image ? d_image : '/assets/images/defaults/institute.jpg';

    return (
        <div className={classNames('container', styles.backgroundContainer)} >
            <div className='wrapper' style={{ padding: isMobile ? '30px 5%' : '60px 5%' }}>


                <div className={classNames(styles.headContainer, { [styles.HeadContainerSmallImage]: props?.smallImage })}>
                    <div className='wrap'>
                        <div className='imageWrap'>
                            <img src={thumbnail ? thumbnail : defaultImage} alt='' />
                        </div>
                        <div className='detailWrap'>
                            <div className='group'>
                                <Typography variant='h4' className='name'>{name}</Typography>
                                {
                                    location ?
                                        <Typography variant='h6' className='location'><LocationOnOutlined />{location}</Typography>
                                        : null
                                }
                            </div>


                            <div className='group'>

                                {
                                    views > -1 ?
                                        <Typography className='views'><Visibility />{views}</Typography>
                                        : null
                                }
                                {
                                    rating > -1 ?
                                        <div className='ratingWrap' >
                                            <span className='subWrap'>
                                                <span className='rating'>{rating}</span>
                                                <span className='total'>
                                                    <p>out</p>
                                                    <p>of 5</p>
                                                </span>
                                            </span>
                                            <Rating precision={0.5} value={rating} readOnly size='small' />
                                        </div>
                                        : null
                                }

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}