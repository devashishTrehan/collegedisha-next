import { GetPageInitialData, Theme } from '@/Services/App.service';
import { ApiResponseHandler, GetNewsDetails, GetAllNews } from '@/Services/Api.service';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import { Grid, makeStyles, Typography, useMediaQuery } from '@material-ui/core';
import { NavbarContext } from '@/Context/Navbar.context';
import Routes from '@/Services/Routes';
import { detailedNews, } from '@/Services/DataTypes/News';
import MarkdownParser from '@/Components/MarkdownParser.component';
import classNames from 'classnames';
import { CalendarToday, CommentOutlined, VisibilityOutlined } from '@material-ui/icons';
import { ApiResponse, PageSEOProps } from '@/Services/Interfaces.interface';
import { DataPageWrapper, pageStateType } from '@/Components/DataPageWrapper.component';
import PageSEO from '@/Components/PageSEO.component';




const useStyles = makeStyles({
    container: {
        boxShadow: Theme.boxShadow,
        borderRadius: Theme.radius1,
        padding: 20,
        margin: '0px 0 30px',

    },
    Intro: {
        textAlign: 'left',
        borderLeft: `3px solid ${Theme.secondary}`,
        margin: '30px 0',
        padding: '10px 0 10px 20px',
        '& p': {
            fontStyle: 'italic',
        }
    },
    content: {

    }

})

interface Props {
    data: ApiResponse
}


const LastBreadcrumbs = [{ name: 'news', endPoint: `${Routes.News}` }];

const getData = async (params) => {

    return await GetNewsDetails(params);
}

const defaultImage = '/assets/images/defaults/institute.webp';


function newsDetailsPage(props: Props) {

    const { responseType, result, pageSeo: __pageSeo } = GetPageInitialData(props.data);

    const [newsDetails, setnewsDetails] = useState<detailedNews | null>(result ?? {});
    const [slugs, setSlugs] = useState<string[]>([]);
    // let currentPageUrl = `${LastBreadcrumbs[LastBreadcrumbs?.length - 1].endPoint}/${slugs[0]}`;
    const { navHeight } = useContext(NavbarContext);
    const { id, title } = newsDetails;
    const [loading, setLoading] = useState(false);
    const [pageState, setPageState] = useState<pageStateType>(responseType);
    const [pageSEO, setPageSEO] = useState<PageSEOProps>(__pageSeo);

    const isMobile = useMediaQuery('(max-width:769px)');
    const isTablet = useMediaQuery('(max-width:992px)');
    const styles = useStyles();
    const router = useRouter();




    return (
        <>
            <PageSEO data={pageSEO} />
            <DataPageWrapper loading={loading} pageState={pageState}>
                <div className='container'>
                    <div className='wrapper' style={{ padding: isMobile ? '20px 5%' : '30px 5%' }}>
                        <Grid container >
                            <Grid item xs={12} md={9} >
                                <div className={styles.container}>

                                    <ThisPageHeader {...newsDetails} />

                                    {
                                        newsDetails?.intro ?
                                            <div className={styles.Intro}>
                                                <MarkdownParser content={newsDetails?.intro} />
                                            </div>
                                            : null
                                    }

                                    <div className={styles.content}>
                                        <MarkdownParser content={newsDetails?.content} />
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </div>

            </DataPageWrapper>
        </>
    );
}

export default newsDetailsPage;


export async function getServerSideProps(context) {

    let returnData = { props: { data: null } }
    let response = await getData({ slug: context.params.newsSlug });
    if (response) {
        returnData.props.data = response.data;
    }
    return returnData;

}

// export async function getStaticPaths() {
//     const res = await GetAllNews({ userId: null, token: '' })
//     let news = [];
//     if (res) {
//         news = res?.data?.result;
//     }

//     let paths = news.map((news) => ({
//         params: { newsSlug: news.slug, categorySlug: news.category },
//     }))

//     return { paths, fallback: true }
// }


// export async function getStaticProps({ params }) {

//     let returnData = { props: { data: null }, revalidate: 1 }
//     let response = await getData({ slug: params?.newsSlug });
//     if (response) {
//         returnData.props.data = response.data;
//     }
//     return returnData;

// }


const ThisPageHeaderStyles = makeStyles({
    imageWrap: {
        animation: 'none !important',
        margin: '20px 0 0px !important',
        borderRadius: Theme.radius2,
        maxHeight: 'unset'
    },
    InfoWrap: {
        '& .title': {
            fontSize: 30,
            marginBottom: 8,
            color: Theme.TFontHeadColor,
            textAlign: 'left',
        },
        '& .detailWrap': {
            display: 'flex',
            margin: '0px -10px',
            '&>div': {
                display: 'flex',
                alignItems: 'center',
                margin: '0 10px',
                color: '#797979',
                '& p': {
                    fontSize: '14px !important',
                    margin: '0px !important',
                },
                '& svg': {
                    fontSize: 16,
                    marginRight: 3,
                }
            },
        },
    },
    InfoWrap_M: {
        '& .title': {
            fontSize: 20,
        },

    },
    sideNewsWrap: {
        position: 'absolute',
        margin: '-20px 0',
        width: '100%',
    }
})

export const ThisPageHeader = (props: detailedNews) => {

    const customStyles = ThisPageHeaderStyles();
    const [data, setData] = React.useState([]);

    const isMobile = useMediaQuery('(max-width:769px)');
    const isTablet = useMediaQuery('(max-width:992px)');
    const { title, image, commentCount, views, publishedOn } = props;
    return (
        <div style={{ marginTop: 0, }} >
            <div className={classNames('infoWrap', customStyles.InfoWrap, { [customStyles.InfoWrap_M]: isMobile })}  >
                <div >
                    <h1 className='title'>{title}</h1>
                </div>
                <div className={'detailWrap'}>
                    <div className='date'>
                        <CalendarToday />
                        <Typography>{publishedOn}</Typography>
                    </div>
                    <div className='views'>
                        <VisibilityOutlined />
                        <Typography>{views}</Typography>
                    </div>
                    <div className='commentCount'>
                        <CommentOutlined />
                        <Typography>{commentCount}</Typography>
                    </div>
                </div>
            </div>
            <div className={classNames('imageWrap', customStyles.imageWrap)} >
                <img src={image ? image : defaultImage} alt='' />
            </div>
        </div >
    )
}
