import { Theme, NFormatter } from '@/Services/App.service';
import { Button, Typography, IconButton, useMediaQuery } from '@material-ui/core';
import { Bookmark, BookmarkBorder, GetAppRounded, LocationOnOutlined, Share, StarRateRounded, StarRounded, Visibility } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import React, { memo, useContext, useMemo } from 'react';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { InstituteListItem } from '@/Services/DataTypes/Institutes';
import Link from 'next/link';
import Image from 'next/image';
import { AppContext } from '@/Context/App.context';
import ApplyForm from './ApplyForm.component';



const useStyles = makeStyles({
    container: {
        width: 250,
        minHeight: 260,
        margin: 'auto',
        display: 'flex',
        height: '100%',
        flexDirection: 'column',
        maxWidth: '100%',
        background: Theme.backgroundColor,
        borderRadius: Theme.radius2,
        boxShadow: Theme.boxShadow,
        overflow: 'hidden',
        '&:hover': {
            '& .imageWrap img': {
                filter: 'blur(6px)',
                transform: 'scale(1.15)',
            },
            '& .viewsWrap': {
                right: -120,
            },
            '& .actionButtonWrap': {
                left: 0,
                '& .actionButton': {
                    transform: 'translate(0,0)',
                }
            }
        }
    },
    HeadSection: {
        width: '100%',
        minHeight: 130,
        position: 'relative',
        overflow: 'hidden',
        '& *': {
            transition: '.3s',
        },
        '& .imageWrap': {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            '& img': {
                width: '100%',

            }
        },
        '& .viewsWrap': {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            position: 'absolute',
            right: 0,
            top: 20,
            background: '#0006',
            padding: '3px 8px',
            fontSize: 12,
            color: '#fff',
            verticalAlign: 'middle',
            // transition: '.3s',
            '& svg': {
                fontSize: 16,
                marginRight: 5,
            }
        },
        '& .actionButtonWrap': {
            width: '25%',
            position: 'absolute',
            height: '100%',
            top: 0,
            left: '-25%',
            backgroundColor: '#0006',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            '& .actionButton': {
                color: Theme.primary,
                width: 35,
                height: 35,
                margin: 5,
                background: '#fff6',
                borderRadius: '50%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                transform: 'translate(100px,0)',
                transitionDelay: '.05s',
                '& svg': {
                    fontSize: 20,
                }
            }
        }
    },
    InfoSetion: {
        padding: 15,
        textAlign: 'left',
        flexGrow: 1,
        textTransform: 'capitalize',
        cursor: 'pointer',
        '& .productName': {
            color: Theme.fontColorSecondary,
            fontFamily: 'gorditaMedium',
            fontSize: 15,
        },
        '& .locationWrap': {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            color: "#444",
            '& *': {
                fontSize: 14,
            },
            '& svg': {
                fontSize: 20,
                verticalAlign: 'middle',
                marginLeft: -4
            }

        }
    },
    footerSection: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: `0px ${Theme.spacingMid}px ${Theme.spacingMid}px`,
        '& .applyButton': {
            padding: '5px 20px',
            fontSize: 12,
        },
        '&>div': {
            color: Theme.fontColorSecondary,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            '& *': {
                verticalAlign: 'middle'
            },
            '& .ratingWrap': {
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                fontSize: 14,
                paddingRight: 8,
                borderRight: `1px solid #ccc`,
            },
            '& .saveButtonWrap': {
                padding: 5,
                marginRight: -5,
                marginLeft: 5,
                color: Theme.fontColorSecondary,

            }
        }
    },

    container_T: {
        width: 200,
        minHeight: 200,
    },
    HeadSection_T: {
        '& .actionButtonWrap': {
            '& .actionButton': {
                color: Theme.primary,
                width: 30,
                height: 30,
                '& svg': {
                    fontSize: 18,
                }
            }
        }
    },
    InfoSetion_T: {
        padding: Theme.spacingLess,
        '& .productName': {
            fontSize: 13,
        },
        '& .locationWrap': {
            '& *': {
                fontSize: 12,
            },
            '& svg': {
                fontSize: 16,
                marginLeft: -3
            }

        }
    },
    footerSection_T: {
        padding: `0px ${Theme.spacingLess}px ${Theme.spacingLess}px`,
        '& .applyButton': {
            padding: '5px 10px',
            fontSize: 10,
        },
    }
})

interface Props extends InstituteListItem {
    onSave?: Function,
    onDownload?: Function,
    onApply?: Function,
    onShare?: Function,
}

const defaultImage = '/assets/images/defaults/institute.webp'

const InstituteCard = memo(function (props: Props) {

    const { name, location, thumbnail, rating, isSaved, isApplied, onDownload, onApply, onSave, onShare, slug } = props;

    const isMobile = useMediaQuery('(max-width:769px)');
    const isTablet = useMediaQuery('(max-width:992px)');
    const router = useRouter();
    const { showModal } = useContext(AppContext);


    const styles = useStyles();

    console.log('rendering card')

    const ApplyInInstitute = (institute: InstituteListItem) => {
        if (false) {

        } else {
            showModal(<ApplyForm institute={institute} />, 'md')

        }
    }


    const renderCard = useMemo(() => {

        return (
            <div className={classNames(styles.container, { [styles.container_T]: isTablet })}>
                <div className={classNames(styles.HeadSection, { [styles.HeadSection_T]: isTablet })}>
                    <div className={'imageWrap'}>
                        <Image layout={'fill'} src={thumbnail ? thumbnail + '?tr=w-260,dpr-1' : defaultImage} alt={name} />
                    </div>

                    <div className={'actionButtonWrap'}>
                        <IconButton className='actionButton' onClick={() => onDownload && onDownload()}>
                            <GetAppRounded />
                        </IconButton>

                        <IconButton className='actionButton' onClick={() => onShare && onShare()}>
                            <Share />
                        </IconButton>
                    </div>
                </div>
                <div className={classNames(styles.InfoSetion, { [styles.InfoSetion_T]: isTablet })}>

                    <Link href={`${router.asPath}/${slug}`}>
                        <a>
                            <Typography className={'productName'} >{name}</Typography>
                            <div className={'locationWrap'}>
                                <LocationOnOutlined />
                                <Typography className={'location'}>{location}</Typography>
                            </div>
                        </a>
                    </Link>

                </div>
                <div className={classNames(styles.footerSection, { [styles.footerSection_T]: isTablet })}>
                    <Button variant='contained' color={'primary'} className={'applyButton'} disabled={isApplied}
                        onClick={() => ApplyInInstitute(props)}
                    >{
                            isApplied ?
                                'Applied'
                                : 'Apply'
                        }</Button>
                    <div >
                        <span className={'ratingWrap'}>
                            <StarRateRounded />
                            <span>{rating}</span>
                        </span>
                        <IconButton className={'saveButtonWrap'} onClick={() => onSave && onSave()}>
                            {
                                isSaved ?
                                    <Bookmark />
                                    : <BookmarkBorder />
                            }
                        </IconButton>
                    </div>
                </div>

            </div>
        );
    }, [])

    return renderCard;
})


export default InstituteCard;