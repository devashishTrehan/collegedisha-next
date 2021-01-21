import { Routes, Theme, } from '@/Services/App.service';
import { Button, Typography, IconButton, useMediaQuery } from '@material-ui/core';
import { Bookmark, BookmarkBorder, CalendarToday, GetAppRounded, LocationOnOutlined, Share, StarRounded } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import React, { memo } from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import { InstituteListItem } from '@/Services/GraphQlDataTypes/Institutes';
import { NewsListItemTypes } from '@/Services/GraphQlDataTypes/News';



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
            '& img': {
                maxWidth: '100%',
                minHeight: 80,
            }
        },

    },
    InfoSetion: {
        padding: '0 8px 8px 15px',
        textAlign: 'left',
        width: 'calc(75%)',
        cursor: 'pointer',
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

interface Props extends NewsListItemTypes {
    onSave?: Function,
    onShare?: Function,
}

const defaultImage = '/assets/images/defaults/news.jpg'

const NewsListCard = memo(function (props: Props) {

    const { title, image, onSave, onShare, slug, publishedOn, category } = props;

    const isMobile = useMediaQuery('(max-width:769px)');
    const isTablet = useMediaQuery('(max-width:992px)');
    const router = useRouter();


    const styles = useStyles();

    const ViewDetails = (slug: string) => {
        router.push({
            pathname: `${Routes.News}/${category}/${slug}`
        })
    }


    return (
        <div className={classNames(styles.container)}>

            <div className={classNames(styles.ImageSection)}>
                <div className={'imageWrap'}>
                    <img src={image ? image : defaultImage} alt={''} />
                </div>
            </div>

            <div onClick={() => { ViewDetails(slug) }} className={classNames(styles.InfoSetion)}>
                <div className={'topSection'}>
                    <div className={'categoryContainer'}>
                        <Typography className={'category'} >{category}</Typography>
                    </div>
                    <div className={'nameContainer'}>
                        <Typography className={'productName'} >{title}</Typography>
                    </div>
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