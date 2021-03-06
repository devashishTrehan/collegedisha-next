import { MemoizedClipText, Theme, } from '@/Services/App.service';
import Routes from '@/Services/Routes';
import { Typography, useMediaQuery } from '@material-ui/core';
import { CalendarToday } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import React, { memo } from 'react';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { NewsListItemTypes } from '@/Services/DataTypes/News';
import Link from 'next/link';
import Image from 'next/image';



const useStyles = makeStyles({
    container: {
        width: '100%',
        minHeight: 80,
        margin: '20px auto',
        display: 'flex',
        overflow: 'hidden',
        background: Theme.backgroundColor,
        borderRadius: Theme.radius2,
        boxShadow: Theme.boxShadow,
    },
    ImageSection: {
        width: '25%',
        height: '100%',
        '& .imageWrap': {
            width: '100%',
            position: 'relative',
            '&>div': {
                maxWidth: '100%',
                minHeight: 80,
            }
        },

    },
    InfoSetion: {
        padding: '0 8px 8px 15px',
        textAlign: 'left',
        width: 'calc(75%)',
        textTransform: 'capitalize',
        '& .topSection': {
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            '& .categoryContainer': {

                '& .category': {
                    display: 'inline',
                    padding: '5px 10px 3px',
                    background: 'orange',
                    fontSize: 10,
                    lineHeight: '14px',
                    color: '#fff',
                },

            },
            '& .nameContainer': {
                flexGrow: 1,
                margin: '8px 0',
                '& .productName': {
                    color: Theme.fontColorSecondary,
                    fontFamily: 'gorditaMedium',
                    fontSize: 12,
                },

            },
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

            }
        },
    }
})

const ClipText = MemoizedClipText();

interface Props extends NewsListItemTypes {
    onSave?: Function,
    onShare?: Function,
}

const defaultImage = '/assets/images/defaults/news.webp'

const NewsListCard = memo(function (props: Props) {

    const { title, image, onSave, onShare, slug, publishedOn, categorySlug, category } = props;

    const isMobile = useMediaQuery('(max-width:769px)');
    const isTablet = useMediaQuery('(max-width:992px)');
    const router = useRouter();


    const styles = useStyles();



    return (
        <div className={classNames(styles.container)}>

            <div className={classNames(styles.ImageSection)}>
                <div className={'imageWrap'}>
                    <Image layout={'fill'} src={image ? image + '?tr=w-100,dpr-1' : defaultImage} alt={title} />
                </div>
            </div>

            <div className={classNames(styles.InfoSetion)}>
                <div className={'topSection'}>
                    <div className={'categoryContainer'}>
                        <Typography className={'category'} >{category}</Typography>
                    </div>

                    <Link href={`${Routes.News}/${categorySlug}/${slug}`} >
                        <a style={{ textDecoration: 'none' }}>
                            <div className={'nameContainer'}>
                                <Typography className={'productName'} >{ClipText(title, 100)}</Typography>
                            </div>
                        </a>
                    </Link>

                    <div className={'dateContainer'}>
                        <CalendarToday />
                        <Typography className={'date'} >{publishedOn}</Typography>
                    </div>
                </div>

            </div>

        </div>
    );
})


export default NewsListCard;