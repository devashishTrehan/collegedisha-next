import InstituteListCard from '@/Components/InstituteListCard.component';
import DummyCards from '@/Components/DummyCard.component';
import { Filters } from '@/Components/Filter.component';
import { Footer } from '@/Components/Footer.component';
import { SubscribeSection } from '@/Components/Subscribe.component';
import { Routes, setLastNavigation } from '@/Services/App.service';
import { InstituteListItem } from '@/Services/GraphQlDataTypes/Institutes';
import { Grid, makeStyles, useMediaQuery } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import InstituteCard from '@/Components/InstituteCard.component';

interface Props {

}

const useStyles = makeStyles({

})

function Colleges(props: Props) {



    const [Colleges, setColleges] = useState<InstituteListItem[] | null>([]);
    const isMobile = useMediaQuery('(max-width:600px)');
    const isTablet = useMediaQuery('(max-width:992px)');
    const [pageType, setPageType] = useState<'university' | 'college'>('university');
    const breadcrumbs = [{ name: 'colleges', endPoint: `/${Routes.Colleges}` }];

    const styles = useStyles();


    useEffect(() => {
        setLastNavigation(breadcrumbs);
    }, [])


    return (
        <>

            <div className='container'>
                <div style={{ padding: '20px 5% 0' }}>
                    <Filters />
                </div>
            </div>

            <div className='container'>
                <div className='wrapper'>
                    <Grid container spacing={5} justify='space-evenly'>
                        {
                            Colleges?.map((college: InstituteListItem, index: number) => {
                                if (isMobile) {

                                    return (
                                        <Grid item key={index} xs={12}>
                                            <InstituteListCard {...college} />
                                        </Grid>
                                    )
                                } else {
                                    return (
                                        <Grid item key={index}>
                                            <InstituteCard {...college} />
                                        </Grid>
                                    )
                                }
                            })
                        }
                        {
                            !isMobile ?
                                <DummyCards cardCount={Colleges.length} withGrid={true} />
                                : null
                        }

                    </Grid>
                </div>
            </div>
            <SubscribeSection />
            <Footer />
        </>
    );
}

export default Colleges;



