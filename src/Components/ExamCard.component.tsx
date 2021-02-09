import { Routes, Theme } from '@/Services/App.service';
import { Typography, useMediaQuery, Theme as MuiTheme } from '@material-ui/core';
import { Link as LinkIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import React, { memo } from 'react';
import classNames from 'classnames';
import { ExamListItem, ExamListItemLink } from '@/Services/DataTypes/Exams';
import Link from 'next/link';



const useStyles = makeStyles((theme: MuiTheme) => ({
    container: {
        width: 220,
        minHeight: 220,
        margin: 'auto',
        display: 'flex',
        height: '100%',
        flexDirection: 'column',
        maxWidth: '100%',
        background: Theme.backgroundColor,
        borderRadius: Theme.radius2,
        overflow: 'hidden',
        border: '1px solid #d6d6d6',
        transition: '.3s',
        [theme.breakpoints.down('sm')]: {
            minHeight: 160
        },
        [theme.breakpoints.down('xs')]: {
            width: '100%'
        },
        '&:hover': {
            boxShadow: Theme.boxShadow,
            borderColor: 'transparent',
        }
    },
    HeadSection: {
        width: '100%',
        position: 'relative',
        padding: `25px ${Theme.spacingMid}px 0`,
        borderBottom: '1px solid #d6d6d6',
        marginBottom: 30,
        '& *': {
            transition: '.3s',
        },
        '& .imageWrap': {
            width: 50,
            height: 50,
            marginBottom: -25,
            // borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden',
            backgroundColor: Theme.backgroundColor,
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
    },
    InfoSetion: {
        padding: 15,
        textAlign: 'left',
        flexGrow: 1,
        textTransform: 'capitalize',
        '& .examName': {
            color: Theme.fontColorSecondary,
            fontFamily: 'gorditaMedium',
            fontSize: 15,
        },
        '& .subTitleWrap': {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            '& *': {
                fontFamily: 'gorditaMedium',
                color: "#777",
                fontSize: 11,
            }

        }
    },
    footerSection: {
        padding: `0px 15px 15px`,

        '& .footerTitleWrap': {
            display: 'flex',
            color: Theme.fontLight,
            alignItems: 'center',
            '& svg': {
                fontSize: 16,
                color: Theme.primary,
                marginRight: 5,
            },
            '& p': {
                color: "#777",
                fontSize: 10,
                textTransform: 'capitalize',
                fontFamily: 'gorditaMedium'
            }
        },
        '& .links': {
            padding: 0,
            textAlign: 'left',
            '& p': {
                display: 'inline-block',
                '& a': {
                    color: Theme.primary,
                    textDecoration: 'none',
                    fontSize: 11,
                    fontFamily: 'gorditaMedium',
                    margin: '2px 8px 2px 0',
                    padding: '3px 8px 3px 0',
                }
            }
        }
    },

    HeadSection_T: {
        marginBottom: 25,
        padding: `15px ${Theme.spacingLess}px 0`,
        '& .imageWrap': {
            width: 50,
            height: 50,
            marginBottom: -25,
        },
    },
    InfoSetion_T: {
        padding: Theme.spacingLess,
        '& .examName': {
            fontSize: 13,
        },
        '& .subTitleWrap': {
            '& *': {
                fontSize: 10,
            },
        },

    },
    footerSection_T: {
        padding: `0px ${Theme.spacingLess}px ${Theme.spacingLess}px`,
        '& .footerTitleWrap': {
            '& svg': {
                fontSize: 16,

            },
            '& p': {
                fontSize: 10,
                textTransform: 'capitalize'
            },
        },
        '& .links': {
            '& p': {
            }
        }
    }
}))

interface Props extends ExamListItem {

}

const defaultImage = '/assets/images/defaults/exam.jpg'

const ExamCard = memo(function (props: Props) {

    const { id, title, image, subTitle, links, slug } = props;

    const isMobile = useMediaQuery('(max-width:769px)');
    const isTablet = useMediaQuery('(max-width:992px)');


    const styles = useStyles();


    return (
        <div className={classNames(styles.container)}>
            <Link href={`${Routes.Exams}/${slug}`}>
                <a style={{ textDecoration: 'none' }}>
                    
                    <div className={classNames(styles.HeadSection, { [styles.HeadSection_T]: isTablet })}>
                        <div className={'imageWrap'}>
                            <img src={image ? image : defaultImage} alt={title} />
                        </div>

                    </div>
                    <div className={classNames(styles.InfoSetion, { [styles.InfoSetion_T]: isTablet })}>
                        <Typography className={'examName'} >{title}</Typography>
                        <div className={'subTitleWrap'}>
                            <Typography className={'subTitle'}>{subTitle}</Typography>
                        </div>
                    </div>
                </a>
            </Link>

            <div className={classNames(styles.footerSection, { [styles.footerSection_T]: isTablet })}>
                <span className='footerTitleWrap'>
                    <LinkIcon />
                    <Typography>other useful links</Typography>
                </span>
                <div className='links'>
                    {
                        links?.map((link: ExamListItemLink, index: number) => {
                            return (
                                <p key={index}>
                                    <Link href={link.url} >
                                        <a
                                            style={
                                                (links?.length - 1) !== index
                                                    ? { borderRight: '1px solid #ccc' }
                                                    : {}}>{link.label}</a>
                                    </Link>
                                </p>
                            )
                        })
                    }
                </div>
            </div>

        </div>
    );
})


export default ExamCard;