import InstituteListCard from '@/Components/InstituteListCard.component';
import DummyCards from '@/Components/DummyCard.component';
import { Filters } from '@/Components/Filter.component';
import { Footer } from '@/Components/Footer.component';
import { SubscribeSection } from '@/Components/Subscribe.component';
import { Routes, setLastNavigation } from '@/Services/App.service';
import { InstituteListItem } from '@/Services/GraphQlDataTypes/Institutes';
import { Grid, makeStyles, useMediaQuery } from '@material-ui/core';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import InstituteCard from '@/Components/InstituteCard.component';

interface Props {

}

const useStyles = makeStyles({

})

function Universities(props: Props) {

    const [universities, setUniversities] = useState<InstituteListItem[]>([])

    const isMobile = useMediaQuery('(max-width:600px)');
    const isTablet = useMediaQuery('(max-width:992px)');
    const breadcrumbs = [{ name: 'universities', endPoint: `${Routes.Universities}` }];

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
                            universities?.map((university: InstituteListItem, index: number) => {
                                if (isMobile) {
                                    return (<Grid item key={index} xs={12}>
                                        <InstituteListCard {...university} />
                                    </Grid>)
                                } else {
                                    return (<Grid item key={index}>
                                        <InstituteCard {...university} />
                                    </Grid>)
                                }
                            })
                        }

                        {
                            !isMobile ?
                                <DummyCards cardCount={universities.length} withGrid={true} />
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

export default Universities;



