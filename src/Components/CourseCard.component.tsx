import { Theme, NFormatter } from '@/Services/App.service';
import { Button, Typography, IconButton, useMediaQuery, Divider, Grid } from '@material-ui/core';
import { ArrowRightAlt, Label, Link as LinkIcon, Schedule } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import React, { memo } from 'react';
import classNames from 'classnames';
import { ExamListItem, ExamListItemLink } from '@/Services/GraphQlDataTypes/Exams';
import { CourseFees, CourseListItem } from '@/Services/GraphQlDataTypes/Courses';



const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'row',
        borderRadius: Theme.radius2,
        overflow: 'hidden',
        textAlign: 'left',
        boxShadow: Theme.boxShadow
    },
    LeftSection: {
        width: 200,
        padding: 10,
        background: Theme.primary,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        color: '#fff',
        '& .c_label': {
            color: '#fff8',
            fontSize: 14,
        },
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
        padding: 10,
        flex: 1,
        color: Theme.primary,
        // backgroundColor: Theme.secondary + '11',
        '& .streamListWrap': {

        },
        '& .feesBreakdownWrap': {
            display: 'flex',
            '& .list': {
                display: 'flex',

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
        <div className={classNames(styles.container)}>
            <div className={classNames(styles.LeftSection)}>
                <div>

                    <Typography className='c_label'>Course</Typography>
                    <Grid container>
                        <Grid item xs={6} >
                            <div className='desc_point'>
                                <Typography className='courseName'>{name}</Typography>
                            </div>
                        </Grid>
                        <Grid item xs={6} >
                            <div className='desc_point'>
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
                            <div className='desc_point'>

                                <Typography style={{ textTransform: 'uppercase' }}>{type}</Typography>
                            </div>
                        </Grid>
                        <Grid item xs={6} >
                            <div className='desc_point'>
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
            <div className={classNames(styles.RightSection)}>
                <div className='streamListWrap'>
                    <Typography>Course Stream</Typography>
                    <ul className='streamListWrap'>
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
                                    <div key={index}>
                                        <Typography>{`${stream.frequency} ${index + 1}`}</Typography>
                                        <Typography>{FormatAmount(stream.amount, stream.currency)}</Typography>
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