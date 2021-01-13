import { Theme } from '@/Services/App.service';
import React, { useState } from 'react';
import { Button, Grid, makeStyles, Typography, useMediaQuery } from '@material-ui/core';
import classNames from 'classnames';
import { InstituteFaculty } from '@/Services/GraphQlDataTypes/Institutes';
import InputArea from './TextArea.component/TextArea.component';
import InputField from './TextField.component/TextField.component';



const useStyles = makeStyles({
    container: {
        boxShadow: Theme.boxShadow,
        borderRadius: Theme.radius1,
        padding: '20px 20px',
    },
    containerHead: {
        textAlign: 'left',
        marginBottom: 20,
        '& h4': {
            color: Theme.primary,
            fontFamily: 'gorditaMedium',
            textTransform: 'capitalize',
            fontSize: 22,

        }
    },
    reviewFormContainer: {
        marginTop: 50,
    }
})

const useCardStyles = makeStyles({
    container: {
        width: 160,
        height: '100%',
        transition: '0.3s',
        borderRadius: Theme.radius2,
        margin: 'auto',
        padding: 10,
        overflow: 'hidden',
        '& img': {
            maxWidth: '100%',
            margin: 'auto'
        },
        '&:hover': {
            boxShadow: Theme.boxShadow,
            borderColor: 'transparent',
        }
    },
    container_M: {
    }
})

interface CardProps {
    faculty: InstituteFaculty,
}

const defaultImage = '/assets/images/defaults/user.png';

const RenderCompanyCards = (companyCount: number) => {


    const isMobile = useMediaQuery('(max-width:769px)');
    const styles = useCardStyles();

    let companies = [];
    for (let i = 0; i < companyCount; i++) {
        companies.push(
            <Grid item key={i} >
                <div className={classNames(styles.container, { [styles.container_M]: isMobile })} >
                    <img src={`/assets/images/placementCompanies/${i + 1}.jpg`} alt='' />
                </div>
            </Grid>
        )
    }

    return companies;
}


export function RenderPlacement() {

    const companiesCount = 14;
    const isMobile = useMediaQuery('(max-width:769px)');
    const isTablet = useMediaQuery('(max-width:992px)');
    const styles = useStyles();

    return (
        <>
            <Grid container >
                <Grid item xs={12} md={9} className={styles.container} >
                    <div className={styles.containerHead}>
                        <Typography variant='h4'>Our Faculties</Typography>
                    </div>
                    <Grid container spacing={5} justify={isMobile ? 'center' : 'flex-start'}>
                        {
                            RenderCompanyCards(companiesCount)
                        }
                    </Grid>
                </Grid>
            </Grid>

            <div className={styles.reviewFormContainer}>
                <Grid container >
                    <Grid item xs={12} md={9} className={styles.container} >
                        <div className={styles.containerHead}>
                            <Typography variant='h4'>Write Review for college placement</Typography>
                        </div>

                        <div>
                            <form>

                                <Grid container spacing={3}>
                                    <Grid item xs={12}>

                                        <InputArea
                                            label='Write your college placement review here...'
                                            name="review"
                                            rowsMin={isMobile ? 15 : 25}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={4}>

                                        <InputField
                                            label='Your Name'
                                            name="name"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={4}>

                                        <InputField
                                            label='Email Address'
                                            name="email"
                                        />
                                    </Grid >
                                    <Grid item xs={12} md={4}>

                                        <InputField
                                            label='designation'
                                            name="designation"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <div
                                            style={{ textAlign: 'right' }}
                                        >

                                            <Button
                                                className='submitButton'
                                                color='primary'
                                                variant='contained'
                                            >Submit</Button>
                                        </div>
                                    </Grid>
                                </Grid>
                            </form>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </>
    );
}
