import { Theme } from '@/Services/App.service';
import React, { useEffect, useState } from 'react';
import { Grid, makeStyles, Typography, useMediaQuery } from '@material-ui/core';
import { ReviewRatingItems } from '@/Services/GraphQlDataTypes/Review';
import classNames from 'classnames';

const useStyles = makeStyles({
    container: {
        '& .containerHead': {
            '& h4': {
                display: 'inline-block',
                marginBottom: 10,
            }
        }
    },
    RateItem: {
        display: 'flex',
        margin: 'auto',
        '& .imageWrap': {
            width: 40,
            height: 40,
            marginRight: 8,
        },
        '& .rateWrap': {
            '& p': {
                textAlign: 'left',
                textTransform: 'capitalize',
                '&.rating': {
                    fontSize: 14,
                    color: Theme.primary,
                    fontWeight: 600,
                },
                '&.ratingName': {
                    fontSize: 12,
                    color: '#666',
                }
            }
        }
    },
    reviewList: {
        marginTop: 50,
    }
})

interface Props {
    institute: {
        id: number,
        name: string
    }
}

// ----- Review section start ----- \\
export function RenderReview(props: Props) {

    const styles = useStyles();
    const totalRatePoints = 10;
    const { id, name } = props.institute;
    const [overallRating, setOverallRating] = useState(0);
    const isMobile = useMediaQuery('(max-width:769px)');

    const ratings: ReviewRatingItems = {
        academic: 5,
        accommodation: 2,
        faculty: 7,
        infrastructure: 6,
        placement: 7,
        social: 8
    }

    const getOverallRating = () => {
        let ratingList = Object.keys(ratings);
        let finalRating = 0;
        if (ratingList?.length) {
            let AddedRatePoints = ratingList?.reduce((sum: string, rating: string) => {
                return parseInt(sum) + ratings[rating];
            }, 0)
            finalRating = Math.ceil(parseInt(AddedRatePoints) / ratingList.length);
        }
        setOverallRating(finalRating);
    }

    useEffect(() => {
        getOverallRating();
    }, [])

    return (
        <div className={classNames('pageSectionContainer', styles.container)}>
            <div className={'containerHead'}>
                <Typography variant='h4' >{name} rating</Typography>
                <Typography variant='h4' style={{ float: 'right', fontFamily: 'gordita', fontSize: 14 }}>Overall rating {overallRating}/{totalRatePoints}</Typography>
            </div>
            <Grid container spacing={4}>
                {
                    Object.keys(ratings)?.map((rating: string, index: number) => {
                        return (
                            <Grid item md={4} key={index}>
                                <div className={styles.RateItem}>
                                    <div className='imageWrap'>
                                        <img src={`/assets/images/instituteRatings/${rating}.png`} alt='' />
                                    </div>
                                    <div className='rateWrap'>
                                        <Typography className='rating'>{ratings[rating]}/{totalRatePoints}</Typography>
                                        <Typography noWrap className='ratingName'>{rating}</Typography>
                                    </div>
                                </div>
                            </Grid>
                        )

                    })
                }
            </Grid>
        </div>
    );
}
// ----- Review section end ----- \\
