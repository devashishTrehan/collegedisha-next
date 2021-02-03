import DummyCards from '@/Components/DummyCard.component';
import { Filters } from '@/Components/Filter.component';
import { Footer } from '@/Components/Footer.component';
import { SubscribeSection } from '@/Components/Subscribe.component';
import { GetCookie, GetPageInitialData, Routes, Storages } from '@/Services/App.service';
import { Grid, makeStyles, Typography, useMediaQuery } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import { CoachingListItem } from '@/Services/DataTypes/Coachings';
import CoachingCard from '@/Components/CoachingCard.component';
import { ApiResponseHandler, GetCoachingList } from '@/Services/Api.service';
import { ApiResponse, PageSEOProps } from '@/Services/Interfaces.interface';
import { pageStateType } from '@/Components/DataPageWrapper.component';
import PageEndIndicator from '@/Components/PageEndIndicator.component';


const useStyles = makeStyles({

})


interface Props {
    data: ApiResponse,
}

const getData = async (params) => {

    return await GetCoachingList({ ...params });
}

function CoachingsPage(props: Props) {

    const { responseType, result, pageSeo: __pageSeo } = GetPageInitialData(props.data);


    const [Coachings, setCoachings] = useState<CoachingListItem[]>(result ?? [])
    const isMobile = useMediaQuery('(max-width:600px)');
    const isTablet = useMediaQuery('(max-width:992px)');
    const [loading, setLoading] = useState(false);
    const [infiniteLoading, setInfiniteLoading] = useState(false);
    const [pageState, setPageState] = useState<pageStateType>(responseType);
    const [pageSeo, setPageSeo] = useState<PageSEOProps>(__pageSeo);

    const styles = useStyles();
    let pageOptions = useRef({
        pageNo: 1,
        hasMore: true,
    })

    const OnPageResponseHandler = (data: ApiResponse, toAppend: boolean = false) => {
        let response = ApiResponseHandler(data, {
            onNoData: () => { setCoachings(null) },
            onSuccess: () => {
                setCoachings((prev => {
                    if (toAppend) {
                        return [...prev, ...data?.result]
                    } else {
                        return data?.result;
                    }
                }))
            },
        });
        setPageSeo(data?.additionalData?.pageSEO);
        if (response === '__request_success__') {
            let newOptions = {
                pageNo: pageOptions.current.pageNo + 1,
                hasMore: data?.additionalData?.hasMore
            };
            pageOptions.current = newOptions;
        }
        console.log('pageOptions after change', pageOptions.current);
        if (!toAppend) {
            setPageState(response);
        }
    }

    useEffect(() => {
        // if (props?.data?.result !== Colleges) {
        //     console.log('props data chnaged')
        OnPageResponseHandler(props?.data);
        // }
    }, [props?.data])


    const requestData = async (_pageNo: number, toAppend: boolean = false) => {
        let userId = parseInt(GetCookie(Storages.UserId));
        let token = GetCookie(Storages.AccessToken);
        setInfiniteLoading(true);
        let response = await getData({ token: token, userId: userId, pageNo: _pageNo });
        setInfiniteLoading(false);
        OnPageResponseHandler(response ? response.data : null, toAppend);
    }


    function RequestDataOnIntersection() {
        console.log('page options in intraction', pageOptions.current);

        if (pageOptions.current.hasMore) {
            requestData(pageOptions?.current?.pageNo, true)
        } else {
            console.log('No data to fetch');
        }
    }


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
                            <PageEndIndicator loading={infiniteLoading} onIntersection={() => RequestDataOnIntersection()} />
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