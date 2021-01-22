import DummyCards from '@/Components/DummyCard.component';
import { Filters } from '@/Components/Filter.component';
import { Footer } from '@/Components/Footer.component';
import { SubscribeSection } from '@/Components/Subscribe.component';
import { Routes } from '@/Services/App.service';
import { Grid, makeStyles, Typography, useMediaQuery } from '@material-ui/core';
import React, {  useState } from 'react';
import { CoachingListItem } from '@/Services/GraphQlDataTypes/Coachings';
import CoachingCard from '@/Components/CoachingCard.component';

interface Props {

}

const useStyles = makeStyles({

})

function CoachingsPage(props: Props) {

    const [Coachings, setCoachings] = useState<CoachingListItem[]>([
        { id: 1, slug: 'xyz-slug', name: 'Galgotias University', categories: ['abckjrtg;etr', 'atrhbc', 'abc', 'abtyrhthtehh  ytheh hytc',], tags: ['bca', 'cba'], description: 'We are a dedicated and smart team of professionals for the defense exam ie. NDA, CDS, AFCAT, Air Force, Navi, and another related exam. Our team consists of well-qualified professionals who are ready to work together at Shield Defence Academy Lucknow. Shield Defence Academy Lucknow brings the best insight in the prepar...', isSaved: false, image: 'https://www.collegedisha.com/collegedisha/coachingimage/15569549481540540309aakashlogo.png', location: 'noida, india', rating: 4.5, },
        { id: 2, slug: 'xyz-slug', name: 'Amity School Of Engineering And Technology', categories: ['abc', 'abc', 'abc', 'abc',], tags: ['bca', 'cba'], description: '', isSaved: true, image: 'https://www.collegedisha.com/collegedisha/coachingimage/1542182333catjee.png', location: 'agra, india', rating: 4.4, },
        { id: 3, slug: 'xyz-slug', name: 'GLA University [GLA]', categories: ['abc', 'abc', 'abc', 'abc',], tags: ['bca', 'cba'], description: 'We are a dedicated and smart team of professionals for the defense exam ie. NDA, CDS, AFCAT, Air Force, Navi, and another related exam. Our team consists of well-qualified professionals who are ready to work together at Shield Defence Academy Lucknow. Shield Defence Academy Lucknow brings the best insight in the prepar...', isSaved: false, image: 'https://www.collegedisha.com/collegedisha/coachingimage/1545638185engineers-academy.png', location: 'noida, india', rating: 3.5, },
        { id: 4, slug: 'xyz-slug', name: 'Sharda University', categories: ['abc', 'abc', 'abc', 'abc',], tags: ['bca', 'cba'], description: 'We are a dedicated and smart team of professionals for the defense exam ie. NDA, CDS, AFCAT, Air Force, Navi, and another related exam. Our team consists of well-qualified professionals who are ready to work together at Shield Defence Academy Lucknow. Shield Defence Academy Lucknow brings the best insight in the prepar...', isSaved: true, image: '', location: 'vishakha patnam, india', rating: 4.5, },
        { id: 5, slug: 'xyz-slug', name: 'Noida International University - [NIU]', categories: ['abc', 'abc', 'abc', 'abc',], tags: ['bca', 'cba'], description: '', isSaved: false, image: '', location: 'chennai, india', rating: 2.5, },
        { id: 6, slug: 'xyz-slug', name: 'Maharishi University of Information Technology ', categories: ['abc', 'abc', 'abc', 'abc',], tags: ['bca', 'cba'], description: '', isSaved: true, image: '', location: 'durg, india', rating: 4.8, },
        { id: 7, slug: 'xyz-slug', name: 'Babasaheb Bhimrao Ambedka University', categories: ['abc', 'abc', 'abc', 'abc',], tags: ['bca', 'cba'], description: 'We are a dedicated and smart team of professionals for the defense exam ie. NDA, CDS, AFCAT, Air Force, Navi, and another related exam. Our team consists of well-qualified professionals who are ready to work together at Shield Defence Academy Lucknow. Shield Defence Academy Lucknow brings the best insight in the prepar...', isSaved: false, image: '', location: 'shimla, india', rating: 2.5, },
        { id: 8, slug: 'xyz-slug', name: 'Kanpur Institute Of Technology', categories: ['abc', 'abc', 'abc', 'abc',], tags: ['bca', 'cba'], description: 'We are a dedicated and smart team of professionals for the defense exam ie. NDA, CDS, AFCAT, Air Force, Navi, and another related exam. Our team consists of well-qualified professionals who are ready to work together at Shield Defence Academy Lucknow. Shield Defence Academy Lucknow brings the best insight in the prepar...', isSaved: true, image: '', location: 'gaziabad, india', rating: 4.5, },
        { id: 9, slug: 'xyz-slug', name: 'Harcourt Butler Technical University', categories: ['abc', 'abc', 'abc', 'abc',], tags: ['bca', 'cba'], description: 'We are a dedicated and smart team of professionals for the defense exam ie. NDA, CDS, AFCAT, Air Force, Navi, and another related exam. Our team consists of well-qualified professionals who are ready to work together at Shield Defence Academy Lucknow. Shield Defence Academy Lucknow brings the best insight in the prepar...', isSaved: false, image: '', location: 'delhi, india', rating: 4.5, },
        // { id: 10,slug: 'xyz-slug', name: 'Motilal Nehru National Institute of Technology', isApplied: false, isSaved: true, image: '', location: 'nanital, india', rating: 3.5, },
        // { id: 11,slug: 'xyz-slug', name: 'Babu Banarsi Das Institute of Technology', isApplied: true, isSaved: false, image: '', location: 'noida, india', rating: 2.5, },
    ])

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



