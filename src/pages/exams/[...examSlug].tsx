import { GetCookie, GetPageInitialData, Storages, Theme } from '@/Services/App.service';
import Routes from '@/Services/Routes';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { Grid, makeStyles, Typography, useMediaQuery } from '@material-ui/core';
import { NavbarContext } from '@/Context/Navbar.context';
import { PageNavigation } from '@/Components/PageNavigation.component';
import MarkdownParser from '@/Components/MarkdownParser.component';
import { detailedExam } from '@/Services/DataTypes/Exams';
import { ApiResponse, PageSEOProps } from '@/Services/Interfaces.interface';
import { DataPageWrapper, pageStateType } from '@/Components/DataPageWrapper.component';
import PageSEO from '@/Components/PageSEO.component';
import { ApiResponseHandler, GetExamDetails, GetExamSectionDetails, GetExamsList } from '@/Services/Api.service';




const useStyles = makeStyles({


})

interface Props {
    data: ApiResponse
}


const LastBreadcrumbs = [{ name: 'exams', endPoint: `${Routes.Exams}` }];

const defaultImage = '/assets/images/defaults/institute.jpg';

const getData = async (params) => {

    return await GetExamDetails(params);

}

function examDetailsPage(props: Props) {
    const { responseType, result, pageSeo: __pageSeo } = GetPageInitialData(props.data);

    const [examDetails, setExamDetails] = useState<detailedExam | null>(result ?? {});
    const [slugs, setSlugs] = useState<string[]>([]);
    const { navHeight } = useContext(NavbarContext);
    const { id, name, examSections, initialSection } = examDetails;
    const [loading, setLoading] = useState(false);
    const [pageState, setPageState] = useState<pageStateType>(responseType);
    const [pageSeo, setPageSeo] = useState<PageSEOProps>(__pageSeo);
    const isMobile = useMediaQuery('(max-width:769px)');
    const styles = useStyles();
    const router = useRouter();


    useEffect(() => {
        if (router.query.examSlug?.length) {
            let slugList = router.query.examSlug as string[];
            if (!slugList[1]) {
                slugList[1] = ''
            }
            setSlugs([...slugList]);
        }
    }, [router.query?.examSlug])

    useEffect(() => {
        console.log('page data', props)
        OnPageResponseHandler(props?.data);
    }, [props.data])


    const OnPageResponseHandler = (data) => {
        let response = ApiResponseHandler(data, {
            onError: () => { },
            onFailed: () => { },
            onUnAuthenticated: () => { },
            onNoData: () => { setExamDetails(null) },
            onSuccess: () => {
                setExamDetails(data?.result);
            },
        });
        console.log('detail page data', data);
        setPageState(response);
    }


    const showpageSection = (section: string) => {
        router.push({
            pathname: `${Routes.Exams}/${slugs[0]}/${examSections[section]}`,
        }, undefined, { shallow: true })
    }


    return (
        <>
            <PageSEO data={pageSeo} />
            <DataPageWrapper loading={loading} pageState={pageState} >
                <div>

                    <PageNavigation pageSections={examSections} currentSection={slugs[1]} onLinkClick={(section: string) => showpageSection(section)} />


                    <div className='container'>
                        <div className='wrapper' style={{ padding: isMobile ? '20px 5%' : '50px 5%' }}>
                            <Grid container >
                                <Grid item xs={12} md={9} >
                                    {
                                        <RenderPageSection {...initialSection} />
                                    }
                                </Grid>
                            </Grid>
                        </div>
                    </div>

                </div>
            </DataPageWrapper>
        </>
    );
}

export default examDetailsPage;


export async function getStaticPaths() {
    const res = await GetExamsList({ size: 10000, pageNo: 1, userId: null, token: '' })
    let exams = [];
    if (res) {
        exams = res?.data?.result.examList;
    }

    let paths = [];
    exams?.map((exam) => {
        let sections = exam?.links;
        sections.map((section) => {
            paths.push({
                params: { examSlug: [exam.slug, section.url] },
            })
        })
    })
    return { paths, fallback: true }
}


export async function getStaticProps({ params }) {

    let returnData = { props: { data: null }, revalidate: 1 }
    let response = await getData({ slug: params?.examSlug[0], section: params?.examSlug[1] });
    if (response) {
        returnData.props.data = response.data;
    }
    return returnData;

}



//   ------ section styles start------   \\
const sectionStyles = makeStyles({
    container: {
        boxShadow: Theme.boxShadow,
        borderRadius: Theme.radius1,
        padding: '20px',
        margin: '30px 0',

    },
})
//   ------ section styles end------   \\


interface PageSectionProps {
    title: string
    content: string,
}

const RenderPageSection = (props: PageSectionProps) => {

    const router = useRouter();
    const [data, setData] = useState(props);
    const [section, setSection] = useState(router.query?.examSlug);
    const styles = sectionStyles();
    const [loading, setLoading] = useState(false);
    const [pageState, setPageState] = useState<pageStateType>('__request_success__');
    const [pageSEO, setPageSEO] = useState<PageSEOProps>(null);


    const requestData = async (sectionSlug: string) => {
        let examSlug = router?.query?.examSlug[0];
        let userId = parseInt(GetCookie(Storages.UserId));
        let token = GetCookie(Storages.AccessToken);
        setLoading(true);
        let response = await GetExamSectionDetails({ token: token, userId: userId, slug: examSlug, section: sectionSlug });
        setLoading(false);
        console.log('response data', response);
        OnPageResponseHandler(response ? response.data : null);
    }

    const OnPageResponseHandler = (data: ApiResponse) => {
        let response = ApiResponseHandler(data, {
            onNoData: () => { setData(null) },
            onSuccess: () => {
                setData(data.result)
            },
        });
        setPageSEO(data?.additionalData?.pageSEO);
        setPageState(response);
    }

    useEffect(() => {
        const { query: { examSlug } } = router;
        console.log('examSlug', examSlug[1], section)
        let sectionSlug = examSlug[1];
        if (!sectionSlug) {
            sectionSlug = '';
        }
        if (sectionSlug !== section) {
            sectionSlug && requestData(sectionSlug);
            setSection(sectionSlug);
        }
    }, [router.query?.examSlug])

    return (
        <>
            <PageSEO data={pageSEO} />
            <DataPageWrapper loading={loading} pageState={pageState}>

                <div className={styles.container}>
                    <div className={'containerHead'}>
                        <Typography variant='h1' >{data.title}</Typography>
                    </div>
                    <MarkdownParser content={data.content} />
                </div>
            </DataPageWrapper>
        </>
    )


}
