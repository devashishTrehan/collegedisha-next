import InstituteListCard from '@/Components/InstituteListCard.component';
import DummyCards from '@/Components/DummyCard.component';
import { Filters } from '@/Components/Filter.component';
import { Footer } from '@/Components/Footer.component';
import { SubscribeSection } from '@/Components/Subscribe.component';
import { AppPageValues, Routes, setLastNavigation, Theme } from '@/Services/App.service';
import { InstituteListItem } from '@/Services/GraphQlDataTypes/Institutes';
import { Button, Grid, makeStyles, useMediaQuery } from '@material-ui/core';
import classNames from 'classnames';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import InstituteCard from '@/Components/InstituteCard.component';
import { useLazyQuery } from '@apollo/client';
import { getColleges, PageInfo, ResponseHandler } from '@/Services/GraphQl.service';
import { AppClient } from '@/Context/GraphClient.context';
import PageEndIndicator from '@/Components/PageEndIndicator.component';
import { ApiResponse } from '@/Services/Interfaces.interface';
import NoResult from '@/Components/NoResult.component';


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

interface propData extends ApiResponse {
    allColleges: {
        pageInfo: PageInfo,
        edges: { node: InstituteListItem }[]
    }
}

interface Props {
    data: propData
}

function InstitutesList(props: Props) {

    const [institutes, setInstitutes] = useState<InstituteListItem[] | null>(null);

    const isMobile = useMediaQuery('(max-width:600px)');
    const isTablet = useMediaQuery('(max-width:992px)');
    const [pageType, setPageType] = useState<'university' | 'college'>('university');
    const [pageOptions, setPageOptions] = useState<{ first: number, after: string, hasNextPage: boolean }>({
        first: AppPageValues.itemsPerPage,
        after: '',
        hasNextPage: true,
    });
    const [getData, { loading, fetchMore, data, error }] = useLazyQuery(getColleges, { variables: { category: pageType }, onCompleted: () => { } })
    const breadcrumbs = [{ name: 'Institutes', endPoint: `${Routes.Institutes}` }];



    const styles = useStyles();

    const handleResponseData = (data: propData) => {
        let { pageInfo, edges } = data.allColleges;
        // setInstitutes(prev => {
        //     if (prev) {
        //         return [...prev, ...edges];
        //     } else {
        //         return [...edges]
        //     }
        // });
        setPageOptions((prev) => {
            return {
                ...prev,
                after: pageInfo.endCursor,
                hasNextPage: pageInfo.hasNextPage
            }
        })
    }

    useEffect(() => {
        let response = ResponseHandler(props.data);
        console.log('handeled data', props.data)
        console.log('handeled prop response', response)
    }, [props.data])



    useEffect(() => {
        setLastNavigation(breadcrumbs);
        document.body.style.backgroundColor = Theme.secondary + '11';
        return (() => {
            document.body.style.backgroundColor = Theme.backgroundColor;
        })
    }, [])


    const changePageType = (type: 'university' | 'college') => {
        if (pageType !== type) {
            setPageType(type);
            console.log('fetching');
            getData({ variables: { category: type } })
        }
    }

    // if (loading) {
    //     return (<p>Loading</p>)
    // }

    // if (error) {
    //     return (
    //         <>
    //             <p>{error.name}</p>
    //             <p>{error.extraInfo}</p>
    //         </>
    //     )
    // }

    return (
        <>
            <Head>
                <title>Institutes</title>
            </Head>
            <NoResult />
            <div className='container'>
                <div className='wrapper' style={{ paddingTop: 0 }}>

                    <div className={styles.buttonsContainer} >

                        <div className='buttonWrap'>

                            <div className={classNames('activeHelper', { 'active': pageType === 'university' })}></div>
                            <Button color='primary' onClick={() => changePageType('university')}>Universities</Button>
                        </div>

                        <div className='buttonWrap' >


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
                            <Grid container spacing={5} justify='space-evenly'>
                                {
                                    institutes?.map((institute: InstituteListItem) => {
                                        if (isMobile) {

                                            return (<Grid item key={institute.id} xs={12}>
                                                <InstituteListCard {...institute} />
                                            </Grid>)
                                        } else {
                                            return (<Grid item key={institute.id}>
                                                <InstituteCard {...institute} />
                                            </Grid>)
                                        }
                                    })
                                }
                                {
                                    !isMobile ?
                                        <DummyCards cardCount={institutes?.length} withGrid={true} />
                                        : null
                                }

                            </Grid>
                        </div>
                    </div>

                </div>
            </div>
            <PageEndIndicator loading={loading} onIntersection={() => getData()} />
            <SubscribeSection />
            <Footer />
        </>
    );
}

export default InstitutesList;


export async function getServerSideProps(context) {

    let response = await AppClient.query({
        query: getColleges,
        variables: { category: "university" }
    }).then(response => response).catch(error => {
        console.log('g-error--', error);
        return { data: null }
    })
    console.log('g-server-data', response)
    return {
        props: { data: response?.data },
    }
}

