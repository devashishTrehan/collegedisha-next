import InstituteListCard from '@/Components/InstituteListCard.component';
import DummyCards from '@/Components/DummyCard.component';
import { Filters } from '@/Components/Filter.component';
import { Footer } from '@/Components/Footer.component';
import { SubscribeSection } from '@/Components/Subscribe.component';
import { GetCookie, Routes, setLastNavigation, Storages } from '@/Services/App.service';
import { InstituteListItem } from '@/Services/DataTypes/Institutes';
import { Grid, makeStyles, useMediaQuery } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import InstituteCard from '@/Components/InstituteCard.component';
import { ApiResponseHandler, GetInstituteList } from '@/Services/Api.service';
import { ApiResponse } from '@/Services/Interfaces.interface';
import { DataPageWrapper, pageStateType } from '@/Components/DataPageWrapper.component';
import PageEndIndicator from '@/Components/PageEndIndicator.component';


const useStyles = makeStyles({

})


interface Props {
    data: ApiResponse
}

const getData = async (params) => {

    return await GetInstituteList({ ...params, category: 'college' });
}

function Colleges(props: Props) {



    const [Colleges, setColleges] = useState<InstituteListItem[] | null>([]);
    const isMobile = useMediaQuery('(max-width:600px)');
    const isTablet = useMediaQuery('(max-width:992px)');
    const breadcrumbs = [{ name: 'colleges', endPoint: `/${Routes.Colleges}` }];
    const [loading, setLoading] = useState(false);
    const [infiniteLoading, setInfiniteLoading] = useState(false);
    const [pageState, setPageState] = useState<pageStateType>(null);

    let pageOptions: { pageNo: number, hasMore: boolean } = {
        pageNo: 1,
        hasMore: true,
    }

    const styles = useStyles();

    const OnPageResponseHandler = (data, toAppend: boolean = false) => {
        let response = ApiResponseHandler(data, {
            onError: () => { },
            onFailed: () => { },
            onUnAuthenticated: () => { },
            onNoData: () => { setColleges(null) },
            onSuccess: () => {
                setColleges((prev => {
                    if (toAppend) {
                        return [...prev, ...data?.result]
                    } else {
                        return data?.result;
                    }
                }))
            },
        });
        if (response === '__request_success__') {
            pageOptions = {
                pageNo: pageOptions.pageNo + 1,
                hasMore: data?.additionalData?.hasMore
            }
        }
        console.log('pageOptions after change', pageOptions, data.result[0].id);
        setPageState(response);
    }

    useEffect(() => {
        if (props?.data?.result !== Colleges) {
            console.log('props data chnaged')
            OnPageResponseHandler(props?.data);
        }
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
        console.log('page options in intraction', pageOptions);
        debugger
        if (pageOptions.hasMore) {
            requestData(pageOptions?.pageNo, true)
        } else {
            console.log('No data to fetch');
        }
    }

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


            <p style={{ background: 'gray', padding: 10, position: 'fixed', left: 0, top: 100, zIndex: 99 }}>length -- {Colleges?.length}</p>


            <DataPageWrapper loading={loading} pageState={pageState}>

                <div className='container'>
                    <div className='wrapper'>
                        <Grid container spacing={5} justify='space-evenly'>
                            {
                                Colleges?.map((college: InstituteListItem, index: number) => {
                                    if (isMobile) {

                                        return (
                                            <Grid item key={index} xs={12}>
                                                <InstituteListCard {...college} />
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
                        <PageEndIndicator loading={infiniteLoading} onIntersection={() => RequestDataOnIntersection()} />
                    </div>
                </div>
            </DataPageWrapper>
            <SubscribeSection />
            <Footer />
        </>
    );
}

export default Colleges;


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
