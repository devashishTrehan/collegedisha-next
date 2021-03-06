import { MemoizedClipText, Theme, } from '@/Services/App.service';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccessTimeOutlined from '@material-ui/icons/AccessTimeOutlined';
import Bookmark from '@material-ui/icons/Bookmark';
import BookmarkBorder from '@material-ui/icons/BookmarkBorder';
import CalendarToday from '@material-ui/icons/CalendarToday';
import Share from '@material-ui/icons/Share';
import ThumbUpOutlined from '@material-ui/icons/ThumbUpOutlined';
import { makeStyles } from '@material-ui/styles';
import React, { memo, useEffect, useState } from 'react';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { ArticleListItemTypes } from '@/Services/DataTypes/article';
import Link from 'next/link';
import { useMediaQuery } from '@material-ui/core';
import Image from 'next/image';



const useStyles = makeStyles({
    container: {
        width: '100%',
        minHeight: 80,
        display: 'flex',
        height: '100%',
        overflow: 'hidden',
        background: Theme.backgroundColor,
        borderRadius: Theme.radius2,
        boxShadow: Theme.boxShadow,
    },
    containerCard: {
        flexDirection: 'column',
    },

    ImageSection: {
        width: '25%',
        // height: '100%',
        '& .imageWrap': {
            width: '100%',
            position: 'relative',
            '&>div': {
                maxWidth: '100%',
                minHeight: 80,
            }
        },

    },

    ImageSectionCard: {
        width: '100%',
    },
    InfoSetion: {
        padding: '8px 8px 8px 15px',
        textAlign: 'left',
        width: 'calc(75%)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        textTransform: 'capitalize',
        '& .topSection': {
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            '& .dateContainer': {
                display: 'flex',
                color: Theme.fontLight,
                '& svg': {
                    fontSize: 12,
                    marginRight: 3,
                },
                '& .date': {
                    fontSize: 10,
                    padding: 0,
                },

            },
            '& .nameContainer': {
                margin: '8px 0',
                '& .productName': {
                    color: Theme.fontColorSecondary,
                    fontFamily: 'gorditaMedium',
                    fontSize: 12,
                },

            },

        },
        '& .footerSection': {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            '& .applyButton': {
                padding: '3px 18px',
                fontSize: 10,
            },
            '& .actionButtonWrap': {
                display: 'flex',
                alignItems: 'center',
                marginLeft: -10,
                '& .actionButton': {
                    padding: '0px 5px',
                    marginRight: -5,
                    marginLeft: 5,
                    display: 'flex',
                    alignItems: 'center',
                    color: Theme.fontLight,
                    '& p': {
                        fontSize: 12,
                    },
                    '& svg': {
                        fontSize: 16,
                    }
                }
            },
        },
    },
    InfoSetionCard: {
        padding: '15px',
        width: 'calc(100%)',
    }
})

interface Props extends ArticleListItemTypes {
    onSave?: Function,
    onShare?: Function,
    type?: 'list' | 'card'
}

const defaultImage = '/assets/images/defaults/news.webp'

const ClipText = MemoizedClipText();

const ArticleListCard = memo(function (props: Props) {

    const { title, thumbnail, onSave, onShare, slug, publishedOn, isSaved, readTime, voteCount } = props;

    const isMobile = useMediaQuery('(max-width:769px)');
    const [type, setType] = useState<'list' | 'card'>('list');
    const isTablet = useMediaQuery('(max-width:992px)');
    const router = useRouter();

    useEffect(() => {
        if (props?.type === 'card') {
            setType('card')
        } else {
            setType('list')
        }
    }, [props?.type])

    const styles = useStyles();

    const ViewDetails = (slug: string) => {
        router.push({
            pathname: `${router.asPath}/${slug}`
        })
    }


    return (
        <div className={classNames(styles.container, { [styles.containerCard]: type === 'card' })}>

            <div className={classNames(styles.ImageSection, { [styles.ImageSectionCard]: type === 'card' })}>
                <div className={'imageWrap'}>
                    {
                        props.type === 'card' ?
                            <img src={thumbnail ? thumbnail : defaultImage} alt={''} />
                            : <Image layout={'fill'} src={thumbnail ? thumbnail + '?tr=w-100,dpr-1' : defaultImage} alt={title} />
                    }
                </div>
            </div>

            <div className={classNames(styles.InfoSetion, { [styles.InfoSetionCard]: type === 'card' })}>
                <div className={'topSection'} >
                    <div className={'dateContainer'}>
                        <CalendarToday style={{ marginRight: 3, }} />
                        <Typography className='date'>{publishedOn}</Typography>
                    </div>

                    <Link href={`${router.asPath}/${slug}`} >
                        <a style={{ textDecoration: 'none' }}>
                            <div className={'nameContainer'}>
                                <Typography className={'productName'} >{ClipText(title)}</Typography>
                            </div>
                        </a>
                    </Link>

                </div>
                <div className={classNames('footerSection')}>

                    <div className={'actionButtonWrap'}>

                        <div className={'actionButton'}>
                            <Typography>{voteCount}</Typography>
                            <ThumbUpOutlined style={{ marginLeft: 3, }} />
                        </div>
                        <div className={'actionButton'}>
                            <AccessTimeOutlined style={{ marginRight: 3, }} />
                            <Typography>{readTime}</Typography>
                        </div>
                        <IconButton className={'actionButton'} onClick={() => onSave && onSave()}>
                            {

                                isSaved ?
                                    <Bookmark />
                                    : <BookmarkBorder />
                            }
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


export default ArticleListCard;