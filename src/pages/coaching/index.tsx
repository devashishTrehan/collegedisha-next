import DummyCards from '@/Components/DummyCard.component';
import { Filters } from '@/Components/Filter.component';
import { Footer } from '@/Components/Footer.component';
import { SubscribeSection } from '@/Components/Subscribe.component';
import { Routes } from '@/Services/App.service';
import { Grid, makeStyles, Typography, useMediaQuery } from '@material-ui/core';
import React, {  useState } from 'react';
import { CoachingListItem } from '@/Services/DataTypes/Coachings';
import CoachingCard from '@/Components/CoachingCard.component';

interface Props {

}

const useStyles = makeStyles({

})

function CoachingsPage(props: Props) {

    const [Coachings, setCoachings] = useState<CoachingListItem[]>([])

    const isMobile = useMediaQuery('(max-width:600px)');
    const isTablet = useMediaQuery('(max-width:992px)');
    const breadCrumbs = [{ name: 'coachings', endPoint: `${Routes.Coachings}` }];

    const styles = useStyles();



    return (
        <>

            <div className='container'>
                <div className='wrapper' style={{ padding: '20px 5% 0' }}>
                    <Typography variant='h1' className='pageHeading'>List of Top coachings</Typography>
                </div>
            </div>

            <div className='container'>
                <div style={{ padding: '20px 5% 0' }}>
                    <Filters />
                </div>
            </div>

            <div className='container'>
                <div className='wrapper'>
                    <Grid container justify='flex-start'>
                        <Grid item md={9} >
                            <Grid container spacing={5} justify='space-evenly'>
                                {
                                    Coachings?.map((coaching: CoachingListItem, index: number) => {
                                        // if (isMobile) {
                                        return (<Grid item key={index} xs={12}>
                                            <CoachingCard {...coaching} />
                                        </Grid>)
                                        // } 
                                    })
                                }

                                {
                                    !isMobile ?
                                        <DummyCards cardCount={Coachings.length} withGrid={true} />
                                        : null
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </div>
            <SubscribeSection />
            <Footer />
        </>
    );
}

export default CoachingsPage;



