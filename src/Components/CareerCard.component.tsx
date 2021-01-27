import { Theme, NFormatter, MemoizedClipText, Routes } from '@/Services/App.service';
import { Button, Typography, IconButton, useMediaQuery, Theme as MuiTheme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { memo, useState } from 'react';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { InstituteListItem } from '@/Services/GraphQlDataTypes/Institutes';
import { CareerListItem } from '@/Services/GraphQlDataTypes/CareerOptions';



const useStyles = makeStyles((theme: MuiTheme) => ({
    container: (props: { width: number }) => ({
        width: props.width ? props.width : 350,
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
            '& .imageWrap': {
                filter: 'blur(6px)',
            },
            '& .viewsWrap': {
                right: -120,
            },
            '& .actionButtonWrap': {
                right: 0,
                '& .actionButton': {
                    transform: 'translate(0,0)',
                }
            }
        }
    }),
    HeadSection: {
        width: '100%',
        minHeight: 100,
        maxHeight: 190,
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
            width: '75%',
            position: 'absolute',
            height: '100%',
            top: 0,
            right: '-75%',
            backgroundColor: '#0009',
            overflow: 'hidden',
            '& ul': {
                listStyle: 'none',
                padding: '10px 10px 10px 15px',
                overflowY: 'auto',
                height: '100%',
                '& a': {
                    textDecoration: 'none',
                    '& li': {
                        // '&::before': {
                        //     content: "'\u25CF'",
                        //     fontSize: 14,
                        //     marginRight: 3,
                        // },
                        color: '#fff',
                        textAlign: 'left',
                    }
                }
            }
        }
    },
    InfoSetion: {
        padding: 10,
        textAlign: 'left',
        flexGrow: 1,
        textTransform: 'capitalize',
        cursor: 'pointer',
        '& .productName': {
            color: Theme.fontColorSecondary,
            fontFamily: 'gorditaMedium',
            fontSize: 15,
            [theme.breakpoints.down('sm')]: {
                fontSize: 13,
            }
        },
    },
    footerSection: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: `0px ${Theme.spacingLess}px ${Theme.spacingLess}px`,
        '& .coursesNo': {
            color: Theme.primary,
            fontSize: 12,
        },
        '& .applyButton': {
            padding: '0px 8px',
            '& p': {
                fontSize: 12,
                textTransform: 'capitalize'
            }
        },
        '&>div': {
            color: Theme.fontColorSecondary,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            '& *': {
                verticalAlign: 'middle'
            },
        }
    },
}))

interface Props extends CareerListItem {
    width?: number
}

const ClipText = MemoizedClipText();


const defaultImage = '/assets/images/defaults/institute.jpg'

const CareerCard = memo(function (props: Props) {

    const { name, image, courses, slug } = props;
    const [showList, setShowList] = useState(false);
    const isMobile = useMediaQuery('(max-width:769px)');
    const isTablet = useMediaQuery('(max-width:992px)');
    const router = useRouter();


    const styles = useStyles({ width: props?.width });

    const ViewDetails = (slug: string) => {
        router.push({
            pathname: `${router.asPath}/${slug}`
        })
    }

    return (
        <div className={classNames(styles.container)}>
            <div className={classNames(styles.HeadSection)}>
                <div className={'imageWrap'}>
                    <img src={image ? image : defaultImage} alt={name} />
                </div>

                <div className={'actionButtonWrap'}>
                    <ul>
                        {
                            courses?.map((course: { name: string, slug: string }) => {
                                return <Link href={`${Routes.CareerOptions}/${slug}/${course.slug}`}>
                                    <a>
                                        <li>{course.name}</li>
                                    </a>
                                </Link>
                            })
                        }
                    </ul>
                </div>
            </div>
            <div onClick={() => ViewDetails(slug)} className={classNames(styles.InfoSetion)}>
                <Typography className={'productName'} >{ClipText(name)}</Typography>

            </div>
            <div className={classNames(styles.footerSection)}>

                <Typography className='coursesNo'>{courses?.length ? courses.length : 'No'} course{courses?.length > 1 ? 's' : ''}</Typography>

                {
                    courses?.length ?

                        <Button size='small' className='applyButton' color='primary'>
                            <Typography >View All</Typography>
                        </Button>
                        : null
                }
            </div>

        </div>
    );
})


export default CareerCard;