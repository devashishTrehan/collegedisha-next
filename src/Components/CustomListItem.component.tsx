import { Theme, NFormatter } from '@/Services/App.service';
import { Button, Typography, IconButton, useMediaQuery } from '@material-ui/core';
import { Bookmark, BookmarkBorder, GetAppRounded, LocationOnOutlined, Share, StarRateRounded, StarRounded, Visibility } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import React, { memo } from 'react';
import classNames from 'classnames';



const useStyles = makeStyles({
    container: {
        width: 250,
        minHeight: 320,
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '100%',
        background: Theme.backgroundColor,
        borderRadius: Theme.radius2,
        boxShadow: Theme.boxShadow,
        overflow: 'hidden',
        '&:hover': {
            '& .imageWrap': {
                filter: 'blur(6px)',
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
        height: 160,
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
})

interface Props {
    name: string,
    location: string,
    rating: number,
    image?: string,
    onSave?: Function,
    onDownload?: Function,
    onApply?: Function,
    onShare?: Function,
    isApplied?: boolean,
    isSaved?: boolean,
}

const defaultImage = '/assets/images/defaults/institute.jpg'

const CustomListItem = memo(function (props: Props) {

    const { name, location, image, rating, isApplied, isSaved, onDownload, onApply, onSave, onShare } = props;

    const isMobile = useMediaQuery('(max-width:769px)');
    const isTablet = useMediaQuery('(max-width:992px)');


    const styles = useStyles();


    return (
        <div className={classNames(styles.container)}>
            <div className={classNames(styles.HeadSection)}>
                <div className={'imageWrap'}>
                    <img src={image ? image : defaultImage} alt={name} />
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
            <div className={classNames(styles.InfoSetion)}>
                <Typography className={'productName'} >{name}</Typography>
                <div className={'locationWrap'}>
                    <LocationOnOutlined />
                    <Typography className={'location'}>{location}</Typography>
                </div>

            </div>
            <div className={classNames(styles.footerSection)}>
                <Button variant='contained' color={'primary'} className={'applyButton'} disabled={isApplied}
                    onClick={() => onApply && onApply()}
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
})


export default CustomListItem;