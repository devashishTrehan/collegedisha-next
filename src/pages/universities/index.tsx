import CustomBreadCrumb from '@/Components/CustomBreadCrumb.component';
import InstitituteCard from '@/Components/InstituteCard.component';
import InstitituteListCard from '@/Components/InstituteListCard.component';
import DummyCards from '@/Components/DummyCard.component';
import { Filters } from '@/Components/Filter.component';
import { Footer } from '@/Components/Footer.component';
import { SubscribeSection } from '@/Components/Subscribe.component';
import { Routes } from '@/Services/App.service';
import { InstituteListItem } from '@/Services/GraphQlDataTypes/Institutes';
import { Grid, makeStyles, useMediaQuery } from '@material-ui/core';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import InstituteCard from '@/Components/InstituteCard.component';
import InstituteListCard from '@/Components/InstituteListCard.component';

interface Props {

}

const useStyles = makeStyles({

})

function Universities(props: Props) {

    const [universities, setUniversities] = useState<InstituteListItem[]>([
        { id: 1, name: 'Galgotias University', isApplied: true, isSaved: false, image: '', location: 'noida, india', rating: 4.5, },
        { id: 2, name: 'Amity School Of Engineering And Technology', isApplied: false, isSaved: true, image: '', location: 'agra, india', rating: 4.4, },
        { id: 3, name: 'GLA University [GLA]', isApplied: true, isSaved: false, image: '', location: 'noida, india', rating: 3.5, },
        { id: 4, name: 'Sharda University', isApplied: false, isSaved: true, image: '', location: 'vishakha patnam, india', rating: 4.5, },
        { id: 5, name: 'Noida International University - [NIU]', isApplied: true, isSaved: false, image: '', location: 'chennai, india', rating: 2.5, },
        { id: 6, name: 'Maharishi University of Information Technology ', isApplied: false, isSaved: true, image: '', location: 'durg, india', rating: 4.8, },
        { id: 7, name: 'Babasaheb Bhimrao Ambedka University', isApplied: true, isSaved: false, image: '', location: 'shimla, india', rating: 2.5, },
        { id: 8, name: 'Kanpur Institute Of Technology', isApplied: false, isSaved: true, image: '', location: 'gaziabad, india', rating: 4.5, },
        { id: 9, name: 'Harcourt Butler Technical University', isApplied: true, isSaved: false, image: '', location: 'delhi, india', rating: 4.5, },
        // { id: 10, name: 'Motilal Nehru National Institute of Technology', isApplied: false, isSaved: true, image: '', location: 'nanital, india', rating: 3.5, },
        // { id: 11, name: 'Babu Banarsi Das Institute of Technology', isApplied: true, isSaved: false, image: '', location: 'noida, india', rating: 2.5, },
    ])

    const isMobile = useMediaQuery('(max-width:600px)');
    const isTablet = useMediaQuery('(max-width:992px)');
    const breadCrumbs = [{ name: 'universities', endPoint: `${Routes.Universities}` }];

    const styles = useStyles();



    return (
        <>

            <CustomBreadCrumb breadcrumbs={breadCrumbs} />


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
                                return (<Grid item key={index}
                                >
                                    {/* <InstituteListCard {...university} /> */}
                                    <InstituteCard {...university} />
                                </Grid>)
                            })
                        }

                        <DummyCards cardCount={universities.length} withGrid={true} />

                    </Grid>
                </div>
            </div>
            <SubscribeSection />
            <Footer />
        </>
    );
}

export default Universities;



