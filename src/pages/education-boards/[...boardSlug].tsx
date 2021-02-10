import { GetCookie, GetPageInitialData, Routes, Storages, Theme } from '@/Services/App.service';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { UrlObject } from '@/Components/CustomBreadCrumb.component';
import { Grid, makeStyles, Typography, useMediaQuery } from '@material-ui/core';
import { NavbarContext } from '@/Context/Navbar.context';
import { PageNavigation } from '@/Components/PageNavigation.component';
import { InnerPageHead } from '@/Components/InnerPageHead.component';
import { detailedBoard } from '@/Services/DataTypes/Boards';
import MarkdownParser from '@/Components/MarkdownParser.component';
import { DataPageWrapper, pageStateType } from '@/Components/DataPageWrapper.component';
import { ApiResponse, PageSEOProps } from '@/Services/Interfaces.interface';
import { ApiResponseHandler, GetAllBoardClasses, GetBoardDetails, GetBoardSectionDetails } from '@/Services/Api.service';
import PageSEO from '@/Components/PageSEO.component';




const useStyles = makeStyles({


})

interface Props {
    data: ApiResponse
}


const LastBreadcrumbs = [{ name: 'boards', endPoint: `${Routes.Boards}` }];

const defaultImage = '/assets/images/defaults/institute.jpg';

const getData = async (params) => {

    return await GetBoardDetails({ ...params });
}

function BoardDetailsPage(props: Props) {
    const { responseType, result, pageSeo: __pageSeo } = GetPageInitialData(props.data);

    const [boardDetails, setBoardDetails] = useState<detailedBoard | null>(result ?? {});
    const [slugs, setSlugs] = useState<string[]>([]);
    const { navHeight } = useContext(NavbarContext);
    const { id, name, boardSections, initialSection } = boardDetails;
    const [loading, setLoading] = useState(false);
    const [pageState, setPageState] = useState<pageStateType>(responseType);
    const [pageSeo, setPageSeo] = useState<PageSEOProps>(__pageSeo);
    const isMobile = useMediaQuery('(max-width:769px)');
    const styles = useStyles();
    const router = useRouter();


    useEffect(() => {
        if (router.query.boardSlug?.length) {
            let slugList = router.query.boardSlug as string[];
            if (!slugList[1]) {
                slugList[1] = ''
            }
            setSlugs([...slugList]);
        }
    }, [router.query?.boardSlug])

    useEffect(() => {
        console.log('page data', props)
        OnPageResponseHandler(props?.data);
    }, [props.data])


    const OnPageResponseHandler = (data) => {
        let response = ApiResponseHandler(data, {
            onNoData: () => { setBoardDetails(null) },
            onSuccess: () => {
                setBoardDetails(data?.result);
            },
        });
        console.log('detail page data', data);
        setPageState(response);
    }


    const showpageSection = (section: string) => {
        router.push({
            pathname: `${Routes.Boards}/${slugs[0]}/${boardSections[section]}`,
        }, undefined, { shallow: true })
    }

    return (
        <div>
            <PageSEO data={pageSeo} />
            <DataPageWrapper loading={loading} pageState={pageState} >
                <>
                    <InnerPageHead {...boardDetails} />

                    {
                        boardSections ?
                            <PageNavigation pageSections={boardSections} currentSection={slugs[1]} onLinkClick={(section: string) => showpageSection(section)} />
                            : null
                    }

                    {
                        initialSection ?
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
                            : null
                    }
                </>
            </DataPageWrapper>

        </div>
    );
}

export default BoardDetailsPage;


export async function getStaticPaths() {
    const res = await GetAllBoardClasses();
    let classes = [];
    if (res) {
        classes = res?.data?.result;
    }

    let paths = [];
    classes?.map((board) => {
        let sections = [];
        if (board?.pageSections) {
            sections = Object.values(board?.pageSections);
        } else {
            sections = [''];
        }

        sections.map((section) => {
            paths.push({
                params: { boardSlug: [board.slug, section] },
            })
        })
    })
    return { paths, fallback: true }
}


export async function getStaticProps({ params }) {

    let returnData = { props: { data: null }, revalidate: 1 }
    let response = await getData({ slug: params?.boardSlug[0], section: params?.boardSlug[1] });
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
    const [section, setSection] = useState(router.query?.boardSlug);
    const styles = sectionStyles();
    const [loading, setLoading] = useState(false);
    const [pageState, setPageState] = useState<pageStateType>('__request_success__');
    const [pageSEO, setPageSEO] = useState<PageSEOProps>(null);


    const requestData = async (sectionSlug: string) => {
        let boardSlug = router?.query?.boardSlug[0];
        let userId = parseInt(GetCookie(Storages.UserId));
        let token = GetCookie(Storages.AccessToken);
        setLoading(true);
        let response = await GetBoardSectionDetails({ token: token, userId: userId, slug: boardSlug, section: sectionSlug });
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
        const { query: { boardSlug } } = router;
        console.log('boardSlug', boardSlug[1], section)
        let sectionSlug = boardSlug[1];
        if (!sectionSlug) {
            sectionSlug = '';
        }
        if (sectionSlug !== section) {
            sectionSlug && requestData(sectionSlug);
            setSection(sectionSlug);
        }
    }, [router.query?.boardSlug])

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
