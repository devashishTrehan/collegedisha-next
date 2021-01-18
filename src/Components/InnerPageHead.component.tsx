import { ListItem, Typography, useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import { Theme } from '../Services/App.service';
import { NavbarContext } from '@/Context/Navbar.context';
import { LocationOnOutlined, Visibility } from '@material-ui/icons';
import { Rating } from '@material-ui/lab';

const useStyles = makeStyles({
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
        },
        '& .imageWrap': {
            width: 180,
            height: 180,
            borderRadius: Theme.radius2,
            boxShadow: Theme.boxShadow,
            overflow: 'hidden',
        },
        '& .detailWrap': {
            padding: '0 0 20px',
            margin: '-10px 0 -10px 20px',
            textTransform: 'capitalize',
            color: Theme.primary,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',

            '& .name': {
                fontFamily: 'gorditaMedium',
                textTransform: 'uppercase',
                fontSize: 24,
            },
            '& .location': {
                color: 'gray',
                fontSize: 18,
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
                '& svg': {
                    fontSize: 16,
                    marginRight: 5,
                    verticalAlign: 'middle',
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
                    },
                    '& .total': {
                        fontFamily: 'gorditaMedium',
                        margin: '0 6px',
                        fontSize: 8,
                        '& p': {
                            verticalAlign: 'middle'
                        }
                    }
                }
            },
            '& .group': {
                margin: '10px 0',
            }
        }
    },
    headContainer_M: {

        '& .imageWrap': {
            width: 100,
            height: 100,
            borderRadius: Theme.radius1,
        },
        '& .detailWrap': {
            padding: '10px 0',
            margin: '-5px 0 -5px 10px',

            '& .name': {
                fontSize: 18,
            },
            '& .location': {
                fontSize: 14,
                marginRight: 3,
                '& svg': {
                    fontSize: 16,
                }
            },
            '& .views': {
                fontSize: 10,
                marginRight: 3,
                '& svg': {
                    fontSize: 12,
                }

            },
            '& .ratingWrap': {
                '& .subWrap': {
                    '& .rating': {
                        fontSize: 14,
                    },
                    '& .total': {
                        margin: '0 3px',
                        fontSize: 6,
                    }
                }
            },
            '& .group': {
                margin: '8px 0',
            }
        }
    },
})

interface Props {
    id: number,
    name: string,
    image: string,
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
}


export const InnerPageHead = (props: Props) => {

    const isMobile = useMediaQuery('(max-width:769px)');
    const isTablet = useMediaQuery('(max-width:992px)');
    const styles = useStyles();
    const { navHeight } = useContext(NavbarContext);


    const { id, name, location, image, rating, isApplied, isSaved, views, defaultImage: d_image } = props;

    const defaultImage = d_image ? d_image : '/assets/images/defaults/institute.jpg';

    return (
        <div className={classNames('container', styles.backgroundContainer)} >
            <div className='wrapper' style={{ padding: isMobile ? '30px 5%' : '60px 5%' }}>


                <div className={classNames(styles.headContainer, { [styles.headContainer_M]: isMobile })}>
                    <div className='wrap'>
                        <div className='imageWrap'>
                            <img src={image ? image : defaultImage} alt='' />
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