import InstituteListCard from '@/Components/InstituteListCard.component';
import DummyCards from '@/Components/DummyCard.component';
import { Filters } from '@/Components/Filter.component';
import { Footer } from '@/Components/Footer.component';
import { SubscribeSection } from '@/Components/Subscribe.component';
import { Routes, setLastNavigation, Theme } from '@/Services/App.service';
import { InstituteListItem } from '@/Services/GraphQlDataTypes/Institutes';
import { Button, Grid, makeStyles, useMediaQuery } from '@material-ui/core';
import classNames from 'classnames';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import InstituteCard from '@/Components/InstituteCard.component';

interface Props {

}

const useStyles = makeStyles({
    buttonsContainer: {
        display: 'flex',
        flexDirection: 'row',
        // boxShadow: '5px 5px 25px 0 #aeaec067',
        // padding: Theme.spacingLess,
        // borderRadius: Theme.radius1,
        margin: '20px -20px 0',
        '& .buttonWrap': {
            position: 'relative',
            borderRadius: `${Theme.radius1}px ${Theme.radius1}px 0 0`,
            marginRight: 8,
            overflow: 'hidden',
            '& button': {
                padding: '10px 25px',
                borderRadius: `${Theme.radius1}px ${Theme.radius1}px 0 0`,
                fontFamily: 'gorditaMedium',
            },
            '& .activeHelper': {
                position: 'absolute',
                width: '0%',
                height: '100%',
                transition: '.3s',
                backgroundColor: Theme.backgroundColor,
                '&.active': {
                    width: '100%',
                }
            },
            '& .underlay': {
                position: 'absolute',
                width: '100%',
                height: '100%',
                backgroundColor: Theme.backgroundColor,
            },
            '& .arrowDown': {
                backgroundColor: Theme.secondary + '44',
                width: 20,
                height: 12,
                position: 'absolute',
                bottom: 0,
                left: 'calc(50% - 10px)',
                transition: '.3s',
                clipPath: 'polygon(0% 0%,100% 0%,50% 100%,0% 0%)',
                '&.active': {
                    bottom: -12,
                }
            },
        }
    },
    filterContentWrap: {
        backgroundColor: Theme.backgroundColor,
        padding: '0 20px 20px',
        margin: '0 -20px',
        borderRadius: Theme.radius1
    }
})

function Institutes(props: Props) {

    const [universities, setUniversities] = useState<InstituteListItem[]>([
        { id: 1, slug: 'xyz-slug', name: 'Galgotias University', isApplied: true, isSaved: false, image: '', location: 'noida, india', rating: 4.5, },
        { id: 2, slug: 'xyz-slug', name: 'Amity School Of Engineering And Technology', isApplied: false, isSaved: true, image: '', location: 'agra, india', rating: 4.4, },
        { id: 3, slug: 'xyz-slug', name: 'GLA University [GLA]', isApplied: true, isSaved: false, image: '', location: 'noida, india', rating: 3.5, },
        { id: 4, slug: 'xyz-slug', name: 'Sharda University', isApplied: false, isSaved: true, image: '', location: 'vishakha patnam, india', rating: 4.5, },
        { id: 5, slug: 'xyz-slug', name: 'Noida International University - [NIU]', isApplied: true, isSaved: false, image: '', location: 'chennai, india', rating: 2.5, },
        { id: 6, slug: 'xyz-slug', name: 'Maharishi University of Information Technology ', isApplied: false, isSaved: true, image: '', location: 'durg, india', rating: 4.8, },
        { id: 7, slug: 'xyz-slug', name: 'Babasaheb Bhimrao Ambedka University', isApplied: true, isSaved: false, image: '', location: 'shimla, india', rating: 2.5, },
        { id: 8, slug: 'xyz-slug', name: 'Kanpur Institute Of Technology', isApplied: false, isSaved: true, image: '', location: 'gaziabad, india', rating: 4.5, },
        { id: 9, slug: 'xyz-slug', name: 'Harcourt Butler Technical University', isApplied: true, isSaved: false, image: '', location: 'delhi, india', rating: 4.5, },
        // { id: 10, slug: 'xyz-slug', name: 'Motilal Nehru National Institute of Technology', isApplied: false, isSaved: true, image: '', location: 'nanital, india', rating: 3.5, },
        // { id: 11, slug: 'xyz-slug', name: 'Babu Banarsi Das Institute of Technology', isApplied: true, isSaved: false, image: '', location: 'noida, india', rating: 2.5, },
    ])

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
    const breadcrumbs = [{ name: 'Institutes', endPoint: `${Routes.Institutes}` }];

    const styles = useStyles();

    useEffect(() => {
        setLastNavigation(breadcrumbs);
        document.body.style.backgroundColor = Theme.secondary + '11';
        return (() => {
            document.body.style.backgroundColor = Theme.backgroundColor;
        })
    }, [])

    const renderUniverities = () => {
        return (
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
        )
    }

    const renderColleges = () => {
        return (
            <Grid container spacing={5} justify='space-evenly'>
                {
                    Colleges?.map((college: InstituteListItem, index: number) => {
                        if (isMobile) {

                            return (<Grid item key={index} xs={12}>
                                <InstituteListCard {...college} />
                            </Grid>)
                        } else {
                            return (<Grid item key={index}>
                                <InstituteCard {...college} />
                            </Grid>)
                        }
                    })
                }
                {
                    !isMobile ?
                        <DummyCards cardCount={Colleges.length} withGrid={true} />
                        : null
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
            <Head>
                <title>Institutes</title>
            </Head>

            <div className='container'>
                <div className='wrapper' style={{ paddingTop: 0 }}>

                    <div className={styles.buttonsContainer} >

                        <div className='buttonWrap'>

                            {/* <div className={classNames('arrowDown', { 'active': pageType === 'university' })}></div> */}
                            {/* <div className='underlay'></div> */}

                            <div className={classNames('activeHelper', { 'active': pageType === 'university' })}></div>
                            <Button color='primary' onClick={() => changePageType('university')}>Universities</Button>
                        </div>

                        <div className='buttonWrap' >

                            {/* <div className={classNames('arrowDown', { 'active': pageType === 'college' })}></div> */}
                            {/* <div className='underlay'></div> */}

                            <div className={classNames('activeHelper', { 'active': pageType === 'college' })}></div>
                            <Button color='primary' onClick={() => changePageType('college')}>Colleges</Button>
                        </div>

                    </div>

                    <div className={styles.filterContentWrap} style={{ borderTopLeftRadius: pageType === 'university' ? 0 : Theme.radius1, padding: isMobile ? '0 10px 20px' : '0 20px 20px' }}>
                        <div style={{ padding: '30px 0 40px' }}>
                            <Filters />
                        </div>
                        <div className='clearfix'></div>
                        <div>
                            {
                                pageType === 'college' ?
                                    renderColleges()
                                    : renderUniverities()
                            }
                        </div>
                    </div>

                </div>
            </div>
            <SubscribeSection />
            <Footer />
        </>
    );
}

export default Institutes;



