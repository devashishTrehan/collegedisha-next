import { Theme, } from '@/Services/App.service';
import { Button, Typography, IconButton, useMediaQuery } from '@material-ui/core';
import { Bookmark, BookmarkBorder, GetAppRounded, LocationOnOutlined, Share, StarRounded } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import React, { memo } from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import { InstituteListItem } from '@/Services/DataTypes/Institutes';
import Link from 'next/link';



const useStyles = makeStyles({
    container: {
        width: '100%',
        minHeight: 100,
        margin: 'auto',
        display: 'flex',
        alignItems: 'center',
        background: Theme.backgroundColor,
        borderRadius: Theme.radius2,
        boxShadow: Theme.boxShadow,
    },
    ImageSection: {
        width: 100,
        height: '100%',
        '& .imageWrap': {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            '& img': {
                maxWidth: '100%',
            }
        },

    },
    InfoSetion: {
        padding: 10,
        textAlign: 'left',
        width: 'calc(100% - 100px)',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        justifyContent: 'space-between',
        textTransform: 'capitalize',
        '& .topSection': {
            '& .nameContainer': {

                '& .productName': {
                    color: Theme.fontColorSecondary,
                    fontFamily: 'gorditaMedium',
                    fontSize: 15,
                },
                '& .locationWrap': {
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    color: Theme.fontLight,
                    '& *': {
                        fontSize: 12,
                    },
                    '& svg': {
                        color: Theme.fontLight,
                        fontSize: 14,
                        verticalAlign: 'middle',
                        marginLeft: -4
                    }

                },
                '& .ratingWrap': {
                    color: Theme.fontColorSecondary,
                    display: 'flex',
                    float: 'right',
                    flexDirection: 'row',
                    alignItems: 'baseline',
                    fontSize: 12,
                    marginLeft: 5,
                    '& svg': {
                        fontSize: 11,
                    }
                },
            }
        },

        '& .footerSection': {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 10,
            '& .applyButton': {
                padding: '3px 18px',
                fontSize: 10,
            },
            '& .actionButtonWrap': {
                display: 'flex',
                alignItems: 'center',
                '& .actionButton': {
                    padding: 5,
                    marginRight: -5,
                    marginLeft: 5,
                    color: Theme.fontColorSecondary,
                    '& svg': {
                        fontSize: 20,
                    }
                }
            },
        },
    },
})

interface Props extends InstituteListItem {
    onSave?: Function,
    onDownload?: Function,
    onApply?: Function,
    onShare?: Function,
}

const defaultImage = '/assets/images/defaults/institute.webp'

const InstituteListCard = memo(function (props: Props) {

    const { name, location, thumbnail, rating, isApplied, isSaved, onDownload, onApply, onSave, onShare, slug } = props;

    const isMobile = useMediaQuery('(max-width:769px)');
    const isTablet = useMediaQuery('(max-width:992px)');
    const router = useRouter();


    const styles = useStyles();

    console.log('rendering list card')

    return (
        <div className={classNames(styles.container)}>

            <div className={classNames(styles.ImageSection)}>
                <div className={'imageWrap'}>
                    <img src={thumbnail ? thumbnail : defaultImage} alt={name} />
                </div>
            </div>

            <div className={classNames(styles.InfoSetion)}>
                <div className={'topSection'}>

                    <Link href={`${router.asPath}/${slug}`}>
                        <a style={{ display: 'block' }}>
                            <div className={'nameContainer'}>
                                <span className={'ratingWrap'}>
                                    <FontAwesomeIcon icon={faStar} />
                                    <span>{rating}</span>
                                </span>

                                <Typography className={'productName'} >{name}</Typography>
                                <div className={'locationWrap'}>
                                    <LocationOnOutlined />
                                    <Typography className={'location'}>{location}</Typography>
                                </div>

                            </div>
                        </a>
                    </Link>
                </div>

                <div className={classNames('footerSection')}>
                    <Button variant='contained' color={'primary'} className={'applyButton'} disabled={isApplied}
                        onClick={() => onApply && onApply()}
                    >{
                            isApplied ?
                                'Applied'
                                : 'Apply'
                        }</Button>

                    <div className={'actionButtonWrap'}>

                        <IconButton className={'actionButton'} onClick={() => onSave && onSave()}>
                            {
                                isSaved ?
                                    <Bookmark />
                                    : <BookmarkBorder />
                            }
                        </IconButton>
                        <IconButton className='actionButton' onClick={() => onDownload && onDownload()}>
                            <GetAppRounded />
                        </IconButton>

                        <IconButton className='actionButton' onClick={() => onShare && onShare()}>
                            <Share />
                        </IconButton>
                    </div>
                </div>
            </div>

        </div>
    );
})


export default InstituteListCard;