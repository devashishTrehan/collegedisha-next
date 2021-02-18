import InstituteListCard from '@/Components/InstituteListCard.component';
import DummyCards from '@/Components/DummyCard.component';
import { Filters } from '@/Components/Filter.component';
import { Footer } from '@/Components/Footer.component';
import { SubscribeSection } from '@/Components/Subscribe.component';
import Routes from '@/Services/Routes';
import { GetCookie, GetPageInitialData, setLastNavigation, Storages, Theme } from '@/Services/App.service';
import { InstituteListItem } from '@/Services/DataTypes/Institutes';
import { Button, Grid, makeStyles, useMediaQuery } from '@material-ui/core';
import classNames from 'classnames';
import Head from 'next/head';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import InstituteCard from '@/Components/InstituteCard.component';
import PageEndIndicator from '@/Components/PageEndIndicator.component';
import { ApiResponse, PageSEOProps } from '@/Services/Interfaces.interface';
import { ApiResponseHandler, GetInstituteList } from '@/Services/Api.service';
import { DataPageWrapper, pageStateType } from '@/Components/DataPageWrapper.component';
import PageSEO from '@/Components/PageSEO.component';
import { useRouter } from 'next/router';


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


interface Props {
    data: ApiResponse
}


const getData = async (params) => {

    return await GetInstituteList(params);
}

function InstitutesList(props: Props) {

    const { responseType, result, pageSeo: __pageSeo } = GetPageInitialData(props.data);

    const [institutes, setInstitutes] = useState<InstituteListItem[] | null>(result ?? []);
    const isMobile = useMediaQuery('(max-width:600px)');
    const isTablet = useMediaQuery('(max-width:992px)');
    // const [pageType, setPageType] = useState<'university' | 'college'>('university');
    // const pageTypeRef = useRef(pageType);
    const [loading, setLoading] = useState(false);
    const [infiniteLoading, setInfiniteLoading] = useState(false);
    const [pageState, setPageState] = useState<pageStateType>(responseType);
    const [pageSEO, setPageSEO] = useState<PageSEOProps>(__pageSeo);
    const router = useRouter();
    let pageOptions = useRef({
        pageNo: 1,
        hasMore: true,
    })
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
        if (response === '__request_success__') {
            let newOptions = {
                pageNo: pageOptions.current.pageNo + 1,
                hasMore: data?.additionalData?.hasMore
            };
            pageOptions.current = newOptions;
        }
        if (!toAppend) {
            setPageState(response);
        }
    }

    useEffect(() => {
        OnPageResponseHandler(props?.data);
    }, [props?.data])



    useEffect(() => {
        setLastNavigation(breadcrumbs);
        // document.body.style.backgroundColor = Theme.secondary + '11';
        // return (() => {
        //     document.body.style.backgroundColor = Theme.backgroundColor;
        // })
    }, [])


    // const changePageType = (type: 'university' | 'college') => {
    //     if (pageType !== type) {
    //         console.log('pageType----', type)
    //         setPageType(type);
    //         pageTypeRef.current = type;
    //         pageOptions.current = { pageNo: 1, hasMore: true };
    //         console.log('fetching');
    //         requestData(type, 1);
    //     }
    // }

    const requestData = async (_pageNo: number, toAppend: boolean = false) => {
        let userId = parseInt(GetCookie(Storages.UserId));
        let token = GetCookie(Storages.AccessToken);
        let query = router.query;
        setInfiniteLoading(true);
        let response = await getData({ token: token, userId: userId, pageNo: _pageNo, courseName: query?.courseName, courseType: query?.courseType });
        setInfiniteLoading(false);
        OnPageResponseHandler(response ? response.data : null, toAppend);
    }


    function RequestDataOnIntersection() {
        console.log('page options in intraction', pageOptions)
        if (pageOptions.current?.hasMore) {
            requestData(pageOptions?.current?.pageNo, true)
        } else {
            console.log('No data to fetch');
        }
    }



    return (
        <>
            <PageSEO data={pageSEO} />
            <div className='container'>
                <div className='wrapper' style={{ paddingTop: 0 }}>

                    {/* <div className={styles.buttonsContainer} >
                        <div className='buttonWrap'>

                            <div className={classNames('activeHelper', { 'active': pageType === 'university' })}></div>
                            <Button color='primary' onClick={() => changePageType('university')}>Universities</Button>
                        </div>

                        <div className='buttonWrap' >


                            <div className={classNames('activeHelper', { 'active': pageType === 'college' })}></div>
                            <Button color='primary' onClick={() => changePageType('college')}>Colleges</Button>
                        </div>

                    </div> */}

                    <div className={styles.filterContentWrap} >
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
                                    <PageEndIndicator loading={infiniteLoading} onIntersection={() => RequestDataOnIntersection()} />
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
    let query = context.query;
    let token = cookies[Storages.AccessToken]
    let userId = parseInt(cookies[Storages.UserId])
    let returnData = { props: { data: null } }

    let response = await getData({ token: token, userId: userId, courseName: query?.courseName, courseType: query?.courseType });
    if (response) {
        returnData.props.data = response.data;
    }
    return returnData;

}
