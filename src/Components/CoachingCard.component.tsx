import { Theme } from '@/Services/App.service';
import { detailedInstitute } from '@/Services/GraphQlDataTypes/Institutes';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import CustomBreadCrumb, { UrlObject } from '@/Components/CustomBreadCrumb.component';
import { Chip, Grid, ListItem, makeStyles, Tooltip, Typography, useMediaQuery } from '@material-ui/core';
import { LocationOnOutlined, Visibility } from '@material-ui/icons';
import { Rating } from '@material-ui/lab';
import classNames from 'classnames';
import { NavbarContext } from '@/Context/Navbar.context';
import { CoachingListItem } from '@/Services/GraphQlDataTypes/Coachings';




const useStyles = makeStyles({
    cardContainer: {
        border: '1px solid #eee',
        borderRadius: Theme.radius2,
        padding: 20,
        transition: '.3s',
        '&:hover': {
            borderColor: 'transparent',
            boxShadow: Theme.boxShadow,
        },
        '& *::-webkit-scrollbar': {
            height: 3,
            borderRadius: 5,
        },
        '& *::-webkit-scrollbar-track': {
            backgroundColor: 'transparent',
        },
        '& *::-webkit-scrollbar-thumb': {
            backgroundColor: '#ccc',
        },
    },
    headContainer: {
        marginBottom: 15,
        cursor: 'pointer',
        '& .wrap': {
            display: 'flex',
            textAlign: 'left',
            verticalAlign: 'middle',
            alignItems: 'flex-start',
        },
        '& .imageWrap': {
            width: 100,
            height: 100,
        },
        '& .detailWrap': {
            padding: '0 0 10px 0',
            width: 'calc(100% - 100px)',
            margin: '-10px 0 -10px 10px',
            textTransform: 'capitalize',
            color: Theme.primary,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',

            '& .name': {
                fontFamily: 'gorditaMedium',
                textTransform: 'uppercase',
                fontSize: 18,
                lineHeight: '24px',
            },
            '& .location': {
                color: 'gray',
                fontSize: 14,
                '& svg': {
                    fontSize: 16,
                    verticalAlign: 'middle',
                    marginLeft: -2,
                }

            },
        },
        '& .ratingWrap': {
            display: 'flex',
            alignItems: 'center',
            marginTop: 5,
            '& .subWrap': {
                display: 'flex',
                '& .rating': {
                    fontSize: 16,
                },
                '& .total': {
                    fontFamily: 'gorditaMedium',
                    margin: '0 5px',
                    fontSize: 7,
                    '& p': {
                        verticalAlign: 'middle'
                    }
                }
            }
        },
        '& .group': {
            margin: '10px 0',
        }
    },
    InfoSection: {
        textAlign: 'left',
        marginTop: 15,
        '& .chip': {
            height: 'unset',
            margin: 3,
            borderRadius: 3,
            color: Theme.fontColorSecondary,
        },
        '& .description': {
            '& p': {
                color: '#666',
                fontSize: 14,
            },
            margin: '15px 0',
        },
        '& .categoryList': {
            marginBottom: 10,
            marginLeft: -3,
            display: 'flex',
            overflow: 'auto',
            '& .chip': {
                padding: 4,

            }
        },
        '& .tagListWrap': {
            display: 'flex',
            marginTop: 10,
            alignItems: 'center',
            '& >p': {
                color: '#666',
                fontSize: 14,
                marginBottom: 5,
                marginRight: 5,
            },
            '& .tagList': {
                overflow: 'auto',
                display: 'flex',
                marginLeft: -3,
                width: '100%',
                '& .chip': {
                    padding: 5,
                    backgroundColor: '#f8f8f8',

                }
            }
        },
    },
    cardContainer_M: {
        padding: 10,
    },
    headContainer_M: {
        marginBottom: 10,
        '& .imageWrap': {
            width: 70,
            height: 70,
            borderRadius: Theme.radius1,
        },
        '& .detailWrap': {
            margin: '-5px 0 -5px 10px',
            width: 'calc(100% - 70px)',

            '& .name': {
                fontSize: 12,
                lineHeight: '20px',
            },
            '& .location': {
                fontSize: 12,
                marginRight: 3,
                '& svg': {
                    fontSize: 14,
                }
            },
            '& .views': {
                fontSize: 10,
                marginRight: 3,
                '& svg': {
                    fontSize: 12,
                }

            },
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
    },
    InfoSection_M: {
        marginTop: 10,
        '& .description': {
            margin: '10px 0',
            textAlign: 'justify',
        },
        '& .chip': {
            fontSize: 12,
            padding: '3px 0px !important',
        },
    },
})

interface Props extends CoachingListItem {
    onSave?: Function,
    onDownload?: Function,
    // onApply?: Function,
    onShare?: Function,
    // isApplied?: boolean,
}

const pageSections = {
    Information: 'Information',
    ['courses & fees']: 'courses-fees',
    admission: 'admission',
    ['review & rating']: 'review',
    gallery: 'gallery',
    faculty: 'college-faculty',
    hostel: 'hostel',
    placement: 'placement',
}

const defaultImage = '/assets/images/defaults/institute.jpg';


function CoachingCard(props: Props) {

    const { name, location, image, rating, isSaved, onDownload, onSave, description, onShare, slug, categories, tags } = props;

    // let currentPageUrl = `${props.breadcrumbs[props.breadcrumbs?.length - 1].endPoint}/${slugs[0]}`;
    const [breadCrumbs, setBreadCrumbs] = useState<UrlObject[]>([]);
    const { navHeight } = useContext(NavbarContext);

    const isMobile = useMediaQuery('(max-width:769px)');
    const isTablet = useMediaQuery('(max-width:992px)');
    const router = useRouter();


    const styles = useStyles();

    const ViewDetails = (slug: string) => {
        router.push({
            pathname: `${router.asPath}/${slug}`
        })
    }

    const renderRating = (rating: number) => {
        return (
            <div className='group'>
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
            </div>
        )
    }

    return (
        <div className={classNames(styles.cardContainer, { [styles.cardContainer_M]: isMobile })}>

            <div onClick={() => ViewDetails(slug)} className={classNames(styles.headContainer, { [styles.headContainer_M]: isMobile })}>
                <div className='wrap'>
                    <div className='imageWrap'>
                        <img src={image ? image : defaultImage} alt='' />
                    </div>
                    <div className='detailWrap'>
                        <div className='group'>
                            <Typography variant='h4' className='name'>{name}</Typography>
                            <Typography variant='h6' className='location'><LocationOnOutlined />{location}</Typography>
                        </div>
                        {
                            !isMobile ?
                                renderRating(rating)
                                : null
                        }
                    </div>
                </div>
                {
                    isMobile ?
                        renderRating(rating)
                        : null
                }
            </div>
            <div className={classNames(styles.InfoSection, { [styles.InfoSection_M]: isMobile })}>
                <div className='categoryList'>
                    {
                        categories?.map((category: string) => {
                            return (
                                <Chip key={category} label={category} className='chip' variant='outlined' />
                            )
                        })
                    }
                </div>
                {
                    !isMobile ?
                        <div className='description'>
                            <Typography>{description}</Typography>
                        </div>
                        : null
                }
                <div className='tagListWrap'>
                    <Typography>Tags:</Typography>
                    <div className='tagList'>
                        {
                            categories?.map((tag: string) => {
                                return (
                                    <Chip key={tag} label={tag} className='chip' />
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CoachingCard;

