import { Theme} from '@/Services/App.service';
import { Button, Typography, useMediaQuery, Grid } from '@material-ui/core';
import { ArrowRightAlt,  Schedule } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import React, { memo } from 'react';
import classNames from 'classnames';
import { CourseFees, CourseListItem } from '@/Services/GraphQlDataTypes/Courses';



const useStyles = makeStyles({
    container: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        borderRadius: Theme.radius2,
        overflow: 'hidden',
        textAlign: 'left',
        border: '1px solid #ddd',
    },
    LeftSection: {
        width: 200,
        padding: 10,
        background: Theme.primary,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        color: '#fff',
        '& .desc_point': {
            display: 'flex',
            margin: '5px 0',
            '& svg': {
                fontSize: 16,
                marginRight: 5,
            },
            '&>p': {
                fontSize: 13,
            },
            ' & .courseName': {
                fontSize: 16,
            }
        },

        '& .feesWrap': {
            display: 'flex',
            fontFamily: 'gorditaMedium',
            '& .fees': {
                fontSize: 12,
            },
            '& .helper': {
                margin: '0 3px',
                fontSize: 8,
                '& p': {
                    verticalAlign: 'middle'
                }
            }
        },
        '& .applyButton': {
            display: 'flex',
            color: '#fffe',
            alignItems: 'center',
            cursor: 'pointer',
            textTransform: "capitalize",
            padding: '8px 0',
            justifyContent: 'flex-start',

            '&:hover': {
                '& svg': {
                    transform: 'translate(10px,0)',
                }
            },
            '& p': {
                fontSize: 12,
                marginRight: 5,
            },
            '& svg': {
                transition: '.3s',
            }
        }
    },
    RightSection: {
        padding: '10px 10px 10px 20px',
        flexGrow: 1,
        color: Theme.primary,
        // backgroundColor: Theme.secondary + '11',
        '& .streamListWrap': {
            '&>p': {
                color: '#666',
                fontSize: 14,
                marginBottom: 5,
            },
            '& .streamList': {
                overflow: 'auto',
                height: 100,
                paddingLeft: 18,
                fontSize: 14,
                '&::-webkit-scrollbar': {
                    width: 2,
                },
                '&::-webkit-scrollbar-track': {
                    width: 2,
                    background: '#ddd',
                },
                '& li::marker': {
                    fontSize: 20,
                    color: Theme.primary,
                },
            }
        },
        '& .feesBreakdownWrap': {
            display: 'flex',
            paddingTop: 10,
            alignItems: 'center',
            '&>p': {
                fontSize: 12,
                color: '#666',
            },
            '& .list': {
                display: 'flex',
                paddingLeft: 10,
                textAlign: 'center',
                textTransform: 'capitalize',
                overflow: 'auto',
                '&::-webkit-scrollbar': {
                    height: 2,
                },
                '&::-webkit-scrollbar-track': {
                    height: 2,
                    background: '#ddd',
                },
                '& .item': {
                    borderRight: '1px solid #aaa',
                    padding: '0 10px',
                    '&:last-child': {
                        borderRight: 'none',
                    },
                    '& .frequency': {
                        fontSize: 11,
                        color: '#666'
                    },
                    '& .amount': {
                        fontSize: 12,
                        fontFamily: 'gorditaMedium',
                    }
                }
            }
        },
    },
    container_M: {
        flexDirection: 'column',
    },
    LeftSection_M: {
        width: '100%',
    },
    RightSection_M: {
        padding: 10,
        flexGrow: 0,
        width: '100%',
        '& .streamListWrap': {
            '&>p': {
                fontSize: 13,
            },
            '& .streamList': {
                paddingLeft: 15,
                '& li::marker': {
                    fontSize: 16,
                },
            }
        },
    },
})

const FormatAmount = (amount: number, currency: string) => {
    return amount.toLocaleString('en', { style: 'currency', currency: currency }).replace('.00', '');
}

interface Props extends CourseListItem {

}

const defaultImage = '/assets/images/defaults/exam.jpg'

const CourseCard = memo(function (props: Props) {

    const { id, name, totalFees, duration, feesBreakdown, type, streams } = props;

    const isMobile = useMediaQuery('(max-width:769px)');
    const isTablet = useMediaQuery('(max-width:992px)');


    const styles = useStyles();


    return (
        <div className={classNames(styles.container, { [styles.container_M]: isMobile })}>
            <div className={classNames(styles.LeftSection, { [styles.LeftSection_M]: isMobile })}>
                <div>

                    <Grid container>
                        <Grid item xs={6} >
                            <div className='desc_point'>
                                <Typography className='courseName'>{name}</Typography>
                            </div>
                        </Grid>
                        <Grid item xs={6} >
                            <div className='desc_point' style={{ justifyContent: isMobile ? 'flex-end' : 'unset' }}>
                                <span className='feesWrap'>
                                    <span className='fees'>{FormatAmount(totalFees.amount, totalFees.currency)}</span>
                                    <span className='helper'>
                                        <p>Total</p>
                                        <p>fees</p>
                                    </span>
                                </span>
                            </div>
                        </Grid>
                        <Grid item xs={6} >
                            <div className='desc_point' >

                                <Typography style={{ textTransform: 'uppercase' }}>{type}</Typography>
                            </div>
                        </Grid>
                        <Grid item xs={6} >
                            <div className='desc_point' style={{ justifyContent: isMobile ? 'flex-end' : 'unset' }}>
                                <Schedule />
                                <Typography>{duration}</Typography>
                            </div>
                        </Grid>
                    </Grid>
                </div>
                <Button color='primary' className='applyButton'>
                    <Typography>Apply for this course</Typography>
                    <ArrowRightAlt />
                </Button>
            </div>

            <div className={classNames(styles.RightSection, { [styles.RightSection_M]: isMobile })}>
                <div className='streamListWrap'>
                    <Typography>Course Stream</Typography>
                    <ul className='streamList'>
                        {
                            streams?.map((stream: string, index: number) => {
                                return <li key={index}>{stream}</li>
                            })
                        }
                    </ul>

                </div>
                <div className='feesBreakdownWrap'>
                    <Typography>Yearly fees</Typography>
                    <div className='list'>
                        {
                            feesBreakdown?.map((stream: CourseFees, index: number) => {
                                return (
                                    <div key={index} className='item'>
                                        <Typography className='frequency'>{`${stream.frequency} ${index + 1}`}</Typography>
                                        <Typography className='amount'>{FormatAmount(stream.amount, stream.currency)}</Typography>
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>
            </div>

        </div>
    );
})


export default CourseCard;