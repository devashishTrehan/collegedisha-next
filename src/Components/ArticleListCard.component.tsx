import { Theme, } from '@/Services/App.service';
import { Typography, IconButton, useMediaQuery, } from '@material-ui/core';
import { AccessTimeOutlined, Bookmark, BookmarkBorder, CalendarToday, Share, ThumbUpOutlined } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import React, { memo, useEffect, useState } from 'react';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { ArticleListItemTypes } from '@/Services/DataTypes/article';



const useStyles = makeStyles({
    container: {
        width: '100%',
        minHeight: 80,
        display: 'flex',
        overflow: 'hidden',
        background: Theme.backgroundColor,
        borderRadius: Theme.radius2,
        boxShadow: Theme.boxShadow,
    },
    containerCard: {
        flexDirection: 'column'
    },

    ImageSection: {
        width: '25%',
        height: '100%',
        '& .imageWrap': {
            width: '100%',
            '& img': {
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
        cursor: 'pointer',
        textTransform: 'capitalize',
        '& .topSection': {
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            cursor: 'pointer',
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

const defaultImage = '/assets/images/defaults/news.jpg'

const ArticleListCard = memo(function (props: Props) {

    const { title, image, onSave, onShare, slug, publishedOn, isSaved, readTime, voteCount } = props;

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
                    <img src={image ? image : defaultImage} alt={''} />
                </div>
            </div>

            <div onClick={() => { ViewDetails(slug) }} className={classNames(styles.InfoSetion, { [styles.InfoSetionCard]: type === 'card' })}>
                <div className={'topSection'} onClick={() => ViewDetails(slug)}>
                    <div className={'dateContainer'}>
                        <CalendarToday style={{ marginRight: 3, }} />
                        <Typography className='date'>{publishedOn}</Typography>
                    </div>
                    <div className={'nameContainer'}>
                        <Typography className={'productName'} >{title}</Typography>
                    </div>
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