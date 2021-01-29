import InstituteListCard from '@/Components/InstituteListCard.component';
import DummyCards from '@/Components/DummyCard.component';
import { Filters } from '@/Components/Filter.component';
import { Footer } from '@/Components/Footer.component';
import { SubscribeSection } from '@/Components/Subscribe.component';
import { GetCookie, Routes, setLastNavigation, Storages, Theme } from '@/Services/App.service';
import { InstituteListItem } from '@/Services/DataTypes/Institutes';
import { Button, Grid, makeStyles, useMediaQuery } from '@material-ui/core';
import classNames from 'classnames';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import InstituteCard from '@/Components/InstituteCard.component';
import PageEndIndicator from '@/Components/PageEndIndicator.component';
import { ApiResponse } from '@/Services/Interfaces.interface';
import { ApiResponseHandler, GetInstituteList } from '@/Services/Api.service';
import { DataPageWrapper, pageStateType } from '@/Components/DataPageWrapper.component';


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

}

interface Props {
    data: any
}


const getData = async (params) => {

    return await GetInstituteList(params);
}

function InstitutesList(props: Props) {

    const [institutes, setInstitutes] = useState<InstituteListItem[] | null>(null);

    const isMobile = useMediaQuery('(max-width:600px)');
    const isTablet = useMediaQuery('(max-width:992px)');
    const [pageType, setPageType] = useState<'university' | 'college'>('university');
    const [pageState, setPageState] = useState<pageStateType>(null);
    const [loading, setLoading] = useState(false);
    const [pageOptions, setPageOptions] = useState<{ pageNo: number, hasNextPage: boolean }>({
        pageNo: 1,
        hasNextPage: true,
    });
    const breadcrumbs = [{ name: 'Institutes', endPoint: `${Routes.Institutes}` }];



    const styles = useStyles();

    const OnPageResponseHandler = (data, toAppend: boolean = false) => {
        let response = ApiResponseHandler(data, {
            onError: () => { },
            onFailed: () => { },
            onUnAuthenticated: () => { },
            onNoData: () => { setInstitutes(null) },
            onSuccess: () => {
                setInstitutes((prev => {
                    if (toAppend) {
                        return [...prev, ...data?.result]
                    } else {
                        return data?.result;
                    }
                }))
            },
        });

        setPageOptions((prev) => {
            return { pageNo: ++prev.pageNo, hasNextPage: data?.additionalData?.hasMore }
        })
        setPageState(response);
    }

    useEffect(() => {
        OnPageResponseHandler(props?.data);
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
            console.log('pageType----', type)
            setPageType(type);
            console.log('fetching');
            requestData(type, 1);
        }
    }

    const requestData = async (_pageType = pageType, _pageNo: number, toAppend: boolean = false) => {
        let userId = parseInt(GetCookie(Storages.UserId));
        let token = GetCookie(Storages.AccessToken);
        let response = await getData({ token: token, userId: userId, pageNo: _pageNo, category: _pageType });
        OnPageResponseHandler(response ? response.data : null, toAppend);
    }

    const RequestDataOnIntersection = (_pageType: 'university' | 'college') => {
        console.log('pageType', _pageType);
        if (pageOptions?.hasNextPage) {
            console.log('page options', pageOptions)
            requestData(_pageType, pageOptions?.pageNo, true)
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
                        <p style={{ background: 'gray', padding: 10, position: 'fixed', left: 0, top: 100, zIndex: 99 }}>length -- {institutes?.length}</p>
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

                        <DataPageWrapper loading={loading} pageState={pageState} >
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
                                    {
                                        console.log('page type in render', pageType)
                                    }
                                    <PageEndIndicator loading={loading} onIntersection={() => RequestDataOnIntersection(pageType)} />
                                </Grid>
                            </div>
                        </DataPageWrapper>

                    </div>

                </div>
            </div>
            <SubscribeSection />
            {/* <Footer /> */}
        </>
    );
}

export default InstitutesList;


export async function getServerSideProps(context) {

    let cookies = context.req.cookies;
    let token = cookies[Storages.AccessToken]
    let userId = parseInt(cookies[Storages.UserId])
    let returnData = { props: { data: null } }

    let response = await getData({ token: token, userId: userId });
    if (response) {
        returnData.props.data = response.data;
    }
    return returnData;

}

