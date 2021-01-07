import CustomCard from '@/Components/CustomCard.component';
import CustomListItem from '@/Components/CustomListItem.component';
import { Filters } from '@/Components/Filter.component';
import { Footer } from '@/Components/Footer.component';
import { SubscribeSection } from '@/Components/Subscribe.component';
import { InstituteListItem } from '@/Services/GraphQlDataTypes/Institutes';
import { Button, Grid, useMediaQuery } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

interface Props {

}

function Institutes(props: Props) {

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

    const [Colleges, setColleges] = useState<InstituteListItem[]>([
        { id: 1, name: 'Bennett University', isApplied: true, isSaved: false, image: '', location: 'noida, india', rating: 4.5, },
        { id: 2, name: 'Integral University', isApplied: false, isSaved: true, image: '', location: 'agra, india', rating: 4.4, },
        { id: 3, name: 'Shri Ramswaroop Memorial University', isApplied: true, isSaved: false, image: '', location: 'noida, india', rating: 3.5, },
        { id: 4, name: 'Sanskriti University', isApplied: true, isSaved: false, image: '', location: 'vishakha patnam, india', rating: 4.5, },
        { id: 5, name: 'Amity University', isApplied: true, isSaved: false, image: '', location: 'chennai, india', rating: 2.5, },
        { id: 6, name: 'Era University', isApplied: false, isSaved: true, image: '', location: 'durg, india', rating: 4.8, },
        { id: 7, name: 'Vaugh Institute of Agricultural Engineering and Technology', isApplied: true, isSaved: false, image: '', location: 'shimla, india', rating: 2.5, },
        { id: 8, name: 'Naraina Group Of Institutions', isApplied: false, isSaved: true, image: '', location: 'gaziabad, india', rating: 4.5, },
        { id: 9, name: 'IIMT University', isApplied: true, isSaved: false, image: '', location: 'delhi, india', rating: 4.5, },
        { id: 10, name: 'Swami Vivekanand Subharti University', isApplied: false, isSaved: true, image: '', location: 'nanital, india', rating: 3.5, },
        { id: 11, name: 'Rama University', isApplied: true, isSaved: false, image: '', location: 'noida, india', rating: 2.5, },
    ]);
    const isMobile = useMediaQuery('(max-width:600px)');
    const isTablet = useMediaQuery('(max-width:992px)');
    const [pageType, setPageType] = useState<'university' | 'college'>('university')

    const renderUniverities = () => {
        return (
            <Grid container spacing={5} justify='space-evenly'>
                {
                    universities?.map((university: InstituteListItem, index: number) => {
                        return (<Grid item key={index}
                        >
                            {

                            }
                            {/* <CustomListItem {...university} /> */}
                            <CustomCard {...university} />
                        </Grid>)
                    })
                }
            </Grid>
        )
    }

    const renderColleges = () => {
        return (
            <Grid container spacing={5} justify='space-evenly'>
                {
                    Colleges?.map((university: InstituteListItem, index: number) => {
                        return (<Grid item key={index}
                        >
                            {

                            }
                            {/* <CustomListItem {...university} /> */}
                            <CustomCard {...university} />
                        </Grid>)
                    })
                }
            </Grid>
        )
    }

    const changePageType = (type: 'university' | 'college') => {
        if (pageType !== type) {
            setPageType(type);
        }
    }

    return (
        <>
            <Filters />
            <Button onClick={() => changePageType('university')}>University</Button>
            <Button onClick={() => changePageType('college')}>College</Button>
            <div className='container'>
                <div className='wrapper'>
                    {
                        pageType === 'college' ?
                            renderColleges()
                            : renderUniverities()
                    }
                </div>
            </div>
            <SubscribeSection />
            <Footer />
        </>
    );
}

export default Institutes;

