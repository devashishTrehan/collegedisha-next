import { Routes, Theme } from '@/Services/App.service';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import CustomBreadCrumb, { UrlObject } from '@/Components/CustomBreadCrumb.component';
import { Grid, makeStyles, Typography, useMediaQuery } from '@material-ui/core';
import { NavbarContext } from '@/Context/Navbar.context';
import { PageNavigation } from '@/Components/PageNavigation.component';
import { InnerPageHead } from '@/Components/InnerPageHead.component';
import { detailedNews } from '@/Services/GraphQlDataTypes/News';
import MarkdownParser from '@/Components/MarkdownParser.component';




const useStyles = makeStyles({


})

interface Props {
    breadcrumbs: UrlObject[]
}


const LastBreadcrumbs = [{ name: 'news', endPoint: `${Routes.News}` }];

const defaultImage = '/assets/images/defaults/institute.jpg';


function newsDetailsPage(props: Props) {

    const [newsDetails, setnewsDetails] = useState<detailedNews | null>({
        title: 'Top 10 colleges in greater noida',
        isSaved: true,
        id: 1,
        image: '',
        views: 2345,
        slug: 'xyz',
        intro: 'string',
        commentCount: 123,
        content: 'jfvpui',
        category: 'news',
        publishedOn: '23-12-2020',
        author: 'dev trehan',
    });
    const [slugs, setSlugs] = useState<string[]>([]);
    let currentPageUrl = `${LastBreadcrumbs[LastBreadcrumbs?.length - 1].endPoint}/${slugs[0]}`;
    const [breadCrumbs, setBreadCrumbs] = useState<UrlObject[]>([]);
    const { navHeight } = useContext(NavbarContext);
    const { id, title } = newsDetails;


    const isMobile = useMediaQuery('(max-width:769px)');
    const isTablet = useMediaQuery('(max-width:992px)');
    const styles = useStyles();
    const router = useRouter();

    useEffect(() => {
        if (router.query.newslug?.length) {
            let slugList = router.query.newslug as string[];
            console.log('slug list', slugList);

            setSlugs(slugList);

            if (!breadCrumbs?.length) {

                setBreadCrumbs((prev: UrlObject[]) => {
                    return [...LastBreadcrumbs, { name: newsDetails ? newsDetails.title : slugList[0], endPoint: `${currentPageUrl}` }];
                });
            }

            currentPageUrl = `${LastBreadcrumbs[LastBreadcrumbs?.length - 1].endPoint}/${slugList[0]}`
        }
    }, [router.query?.newslug])




    return (
        <div>
            <CustomBreadCrumb breadcrumbs={breadCrumbs} />




            <div className='container'>
                <div className='wrapper' style={{ padding: isMobile ? '20px 5%' : '50px 5%' }}>
                    <Grid container >
                        <Grid item xs={12} md={9} >
                            {
                                // <RenderPageSection {...initialSection} />
                            }
                        </Grid>
                    </Grid>
                </div>
            </div>

        </div>
    );
}

export default newsDetailsPage;



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
    content: string
}

const RenderPageSection = (props: PageSectionProps) => {

    const router = useRouter();
    const [data, setData] = useState(props);

    const styles = sectionStyles();

    const FetchData = async (slug: string) => {
        console.log('fetching Data');
    }

    useEffect(() => {
        const { query: { newslug } } = router;
        console.log('newslug', newslug)
        if (newslug?.length) {
            let sectionSlug = newslug[1];
            sectionSlug && FetchData(sectionSlug);
        }
    }, [router.query?.newslug])

    return (
        <div className={styles.container}>
            <div className={'containerHead'}>
                <Typography variant='h1' >{data.title}</Typography>
            </div>
            <MarkdownParser content={data.content} />
        </div>
    )


}
