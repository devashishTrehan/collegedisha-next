import InstituteListCard from '@/Components/InstituteListCard.component';
import DummyCards from '@/Components/DummyCard.component';
import { Filters } from '@/Components/Filter.component';
import { Footer } from '@/Components/Footer.component';
import { SubscribeSection } from '@/Components/Subscribe.component';
import { GetCookie, GetPageInitialData, setLastNavigation, Storages } from '@/Services/App.service';
import Routes from '@/Services/Routes';
import { InstituteListItem } from '@/Services/DataTypes/Institutes';
import { Grid, makeStyles, useMediaQuery } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import InstituteCard from '@/Components/InstituteCard.component';
import { DataPageWrapper, pageStateType } from '@/Components/DataPageWrapper.component';
import PageEndIndicator from '@/Components/PageEndIndicator.component';
import { ApiResponseHandler, GetInstituteList } from '@/Services/Api.service';
import { ApiResponse, PageSEOProps } from '@/Services/Interfaces.interface';
import PageSEO from '@/Components/PageSEO.component';


const useStyles = makeStyles({

})

const getData = async (params) => {

    return await GetInstituteList({ ...params, category: 'university' });
}

interface Props {
    data: ApiResponse
}

function Universities(props: Props) {

    const { responseType, result, pageSeo: __pageSeo } = GetPageInitialData(props.data);

    const [universities, setUniversities] = useState<InstituteListItem[]>(result ?? [])
    const isMobile = useMediaQuery('(max-width:600px)');
    const isTablet = useMediaQuery('(max-width:992px)');
    const breadcrumbs = [{ name: 'universities', endPoint: `${Routes.Universities}` }];
    const [loading, setLoading] = useState(false);
    const [infiniteLoading, setInfiniteLoading] = useState(false);
    const [pageState, setPageState] = useState<pageStateType>(responseType);
    const [pageSEO, setPageSEO] = useState<PageSEOProps>(__pageSeo);
    let pageOptions = useRef({
        pageNo: 1,
        hasMore: true,
    })


    const styles = useStyles();

    const OnPageResponseHandler = (data, toAppend: boolean = false) => {
        let response = ApiResponseHandler(data, {
            onError: () => { },
            onFailed: () => { },
            onUnAuthenticated: () => { },
            onNoData: () => { setUniversities(null) },
            onSuccess: () => {
                setUniversities((prev => {
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


    const requestData = async (_pageNo: number, toAppend: boolean = false) => {
        let userId = parseInt(GetCookie(Storages.UserId));
        let token = GetCookie(Storages.AccessToken);
        setInfiniteLoading(true);
        let response = await getData({ token: token, userId: userId, pageNo: _pageNo });
        setInfiniteLoading(false);
        OnPageResponseHandler(response ? response.data : null, toAppend);
    }


    function RequestDataOnIntersection() {
        console.log('page options in intraction', pageOptions.current)
        if (pageOptions.current.hasMore) {
            requestData(pageOptions?.current?.pageNo, true)
        } else {
            console.log('No data to fetch');
        }
    }

    useEffect(() => {
        setLastNavigation(breadcrumbs);
    }, [])


    return (
        <>
            <PageSEO data={pageSEO} />
            <div className='container'>
                <div style={{ padding: '20px 5% 0' }}>
                    <Filters />
                </div>
            </div>

            <DataPageWrapper loading={loading} pageState={pageState}>
                <div className='container'>
                    <div className='wrapper'>
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
                                    <DummyCards cardCount={universities?.length} withGrid={true} />
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

export default Universities;



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
