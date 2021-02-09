import { DataPageWrapper, pageStateType } from '@/Components/DataPageWrapper.component';
import DummyCards from '@/Components/DummyCard.component';
import ExamCard from '@/Components/ExamCard.component';
import { ExamCategories } from '@/Components/ExamCategories.component';
import { Footer } from '@/Components/Footer.component';
import PageEndIndicator from '@/Components/PageEndIndicator.component';
import PageSEO from '@/Components/PageSEO.component';
import { SubscribeSection } from '@/Components/Subscribe.component';
import { NavbarContext } from '@/Context/Navbar.context';
import { ApiResponseHandler, GetExamsHome, GetExamsList } from '@/Services/Api.service';
import { GetCookie, GetPageInitialData, Storages, Theme } from '@/Services/App.service';
import { ExamListItem, ExamCategoryType } from '@/Services/DataTypes/Exams';
import { ApiResponse, PageSEOProps } from '@/Services/Interfaces.interface';
import { Divider, Grid, Hidden, makeStyles, Typography, useMediaQuery } from '@material-ui/core';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useRef, useState } from 'react';

interface Props {
    data: ApiResponse,
}

const SectionSpacing = 50;

const useStyles = makeStyles({

    listContentWrap: {
        display: 'flex',
        justifyContent: 'left',
        '& .examListWrap': {
            '& .listcontainer': {
                marginRight: SectionSpacing,
                borderRadius: Theme.radius2,
                position: 'sticky',
                // boxShadow: Theme.boxShadow,
                // padding: `${Theme.spacingMore}px 0px`,
                backgroundColor: Theme.backgroundColor,
            }
        },
        '& .examCardsWrap': {
            borderRadius: Theme.radius2,
            backgroundColor: Theme.backgroundColor,
            // padding: `${Theme.spacingMore}px ${Theme.spacingMid}px`,
        },
    }
})

const getData = async (params) => {

    return await GetExamsHome({ ...params });
}


function CategoryExams(props: Props) {

    const { responseType, result, pageSeo: __pageSeo } = GetPageInitialData(props.data);

    const [exams, setExams] = useState<ExamListItem[]>(result?.examList ?? [])
    const [categories, setCategories] = useState<ExamCategoryType[]>(result?.examcategories ?? [])
    const [currentCategory, setCurrentCategory] = useState({
        label: '',
        url: ''
    });
    const currentCategoryRef = useRef('');
    const isMobile = useMediaQuery('(max-width:600px)');
    const isTablet = useMediaQuery('(max-width:992px)');
    const [loading, setLoading] = useState(false);
    const [infiniteLoading, setInfiniteLoading] = useState(false);
    const [pageState, setPageState] = useState<pageStateType>(responseType);
    const [pageSeo, setPageSeo] = useState<PageSEOProps>(__pageSeo);
    const { navHeight } = useContext(NavbarContext);
    const router = useRouter();
    let pageOptions = useRef({
        pageNo: 1,
        hasMore: true,
    })


    const OnPageResponseHandler = (data: ApiResponse, toAppend: boolean = false) => {
        let response = ApiResponseHandler(data, {
            onNoData: () => {
                setExams((prev => {
                    if (toAppend) {
                        return [...prev]
                    } else {
                        return [];
                    }
                }))
            },
            onSuccess: () => {
                setExams((prev => {
                    if (toAppend) {
                        return [...prev, ...data?.result]
                    } else {
                        return data?.result?.examList;
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
        OnPageResponseHandler(props?.data);
        if (props?.data?.result?.examCategories?.length) {
            setCategories(props?.data?.result?.examCategories);
        }
    }, [props?.data])

    useEffect(() => {
        let categorySlug = router?.query?.examCategorySlug as string;
        console.log('routerSlug', router);
        if (categorySlug) {
            let category = categorySlug.split('-')[0];
            setCurrentCategory({ label: category, url: categorySlug });
            currentCategoryRef.current = categorySlug;
        }
    }, [router?.query])


    const requestData = async (_pageNo: number, toAppend: boolean = false) => {
        let userId = parseInt(GetCookie(Storages.UserId));
        let token = GetCookie(Storages.AccessToken);
        setInfiniteLoading(true);
        let response = await GetExamsList({ token: token, userId: userId, pageNo: _pageNo, category: currentCategoryRef.current });
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

    useEffect(() => {
        document.body.style.backgroundColor = Theme.secondary + '08';
        return (() => {
            document.body.style.backgroundColor = Theme.backgroundColor;
        })
    }, [])

    const styles = useStyles();



    return (
        <>
            <PageSEO data={pageSeo} />

            <div className='container'>
                <div style={{ padding: '20px 5% 0' }}>
                    <Typography variant='h1' className={'pageHeading'}>List of all {currentCategory.label} exams in India</Typography>
                </div>
            </div>

            <DataPageWrapper pageState={pageState}>

                <div className='container'>
                    <div className='wrapper'>

                        <div className={styles.listContentWrap}>

                            <Hidden smDown>

                                <div className='examListWrap'>
                                    <div className='listcontainer' style={{ top: navHeight + 10 }}>
                                        <div style={{ marginBottom: 20, }}>
                                            <div className='containerHead'>
                                                <Typography variant='h4' style={{ fontSize: 18 }}>Exams category</Typography>
                                            </div>
                                            <Divider light />
                                        </div>
                                        <ExamCategories active={currentCategory.url} data={categories} />
                                    </div>
                                </div>
                            </Hidden>

                            <div className='examCardsWrap'>
                                <div className='containerHead'>
                                    <Typography variant='h4' style={{ fontSize: 18 }}>Top Entrance exams</Typography>
                                </div>
                                <Grid container spacing={isMobile ? 3 : 6} justify='space-evenly'>
                                    {
                                        exams?.map((university: ExamListItem, index: number) => {
                                            return (<Grid item key={index}
                                            >
                                                {/* <CustomListItem {...university} /> */}
                                                <ExamCard {...university} />
                                            </Grid>)
                                        })
                                    }

                                    <DummyCards spacing={6} cardSize={{ width: { small: 220, regular: 220 }, minHeight: 20 }} cardCount={exams?.length} withGrid={true} />

                                </Grid>
                                <PageEndIndicator loading={infiniteLoading} onIntersection={RequestDataOnIntersection} />
                            </div>
                        </div>
                    </div>
                </div>
            </DataPageWrapper>

            <SubscribeSection />
            <Footer />
        </>
    );
}

export default CategoryExams;


export async function getStaticPaths() {

    let response = await GetExamsHome({ category: '', userId: 0, token: '' });

    let categories = [];
    if (response) {
        categories = response?.data?.result?.examCategories;
    }
    let paths = categories?.map((category) => {
        return { params: { examCategorySlug: category.url } }
    })

    return { paths, fallback: true }

}

export async function getStaticProps({ params }) {

    let { examCategorySlug } = params;
    let returnData = { props: { data: null }, revalidate: 1 }
    let response = await getData({ token: '', userId: '', category: examCategorySlug });
    if (response) {
        returnData.props.data = response.data;
    }
    return returnData;

}
