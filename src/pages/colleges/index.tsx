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

interface Props {

}

const useStyles = makeStyles({

})

function Colleges(props: Props) {



    const [Colleges, setColleges] = useState<InstituteListItem[]>([
        { id: 1, slug: 'xyz-slug', name: 'Bennett University', isApplied: true, isSaved: false, image: '', location: 'noida, india', rating: 4.5, },
        { id: 2, slug: 'xyz-slug', name: 'Integral University', isApplied: false, isSaved: true, image: '', location: 'agra, india', rating: 4.4, },
        { id: 3, slug: 'xyz-slug', name: 'Shri Ramswaroop Memorial University', isApplied: true, isSaved: false, image: '', location: 'noida, india', rating: 3.5, },
        { id: 4, slug: 'xyz-slug', name: 'Sanskriti University', isApplied: true, isSaved: false, image: '', location: 'vishakha patnam, india', rating: 4.5, },
        { id: 5, slug: 'xyz-slug', name: 'Amity University', isApplied: true, isSaved: false, image: '', location: 'chennai, india', rating: 2.5, },
        { id: 6, slug: 'xyz-slug', name: 'Era University', isApplied: false, isSaved: true, image: '', location: 'durg, india', rating: 4.8, },
        { id: 7, slug: 'xyz-slug', name: 'Vaugh Institute of Agricultural Engineering and Technology', isApplied: true, isSaved: false, image: '', location: 'shimla, india', rating: 2.5, },
        { id: 8, slug: 'xyz-slug', name: 'Naraina Group Of Institutions', isApplied: false, isSaved: true, image: '', location: 'gaziabad, india', rating: 4.5, },
        { id: 9, slug: 'xyz-slug', name: 'IIMT University', isApplied: true, isSaved: false, image: '', location: 'delhi, india', rating: 4.5, },
        { id: 10, slug: 'xyz-slug', name: 'Swami Vivekanand Subharti University', isApplied: false, isSaved: true, image: '', location: 'nanital, india', rating: 3.5, },
        { id: 11, slug: 'xyz-slug', name: 'Rama University', isApplied: true, isSaved: false, image: '', location: 'noida, india', rating: 2.5, },
    ]);
    const isMobile = useMediaQuery('(max-width:600px)');
    const isTablet = useMediaQuery('(max-width:992px)');
    const [pageType, setPageType] = useState<'university' | 'college'>('university');
    const breadcrumbs = [{ name: 'colleges', endPoint: `/${Routes.Colleges}` }];

    const styles = useStyles();


    return (
        <>
            <CustomBreadCrumb breadcrumbs={breadcrumbs} />

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
                                            <InstitituteListCard {...college} />
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



