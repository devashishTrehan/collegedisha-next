import { Routes, Theme } from '@/Services/App.service';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import CustomBreadCrumb, { UrlObject } from '@/Components/CustomBreadCrumb.component';
import { Grid, makeStyles, Typography, useMediaQuery } from '@material-ui/core';
import { NavbarContext } from '@/Context/Navbar.context';
import { PageNavigation } from '@/Components/PageNavigation.component';
import { InnerPageHead } from '@/Components/InnerPageHead.component';
import { detailedBoard } from '@/Services/GraphQlDataTypes/Boards';
import MarkdownParser from '@/Components/MarkdownParser.component';




const useStyles = makeStyles({


})

interface Props {
    breadcrumbs: UrlObject[]
}


const LastBreadcrumbs = [{ name: 'boards', endPoint: `${Routes.Boards}` }];

const defaultImage = '/assets/images/defaults/institute.jpg';


function BoardDetailsPage(props: Props) {

    const [boardDetails, setBoardDetails] = useState<detailedBoard | null>({
        name: 'abc Board',
        isApplied: true,
        isSaved: true,
        id: 1,
        image: '',
        rating: 3.4,
        views: 2345,
        slug: '',
        boardSections: {
            Information: '',
            ['registration form']: 'registration-form',
            syllabus: 'syllabus',
            ['time table']: 'time-table',
            ['admit card']: 'admit-card',
            result: 'result',
        },
        initialSection: {
            title: 'it is title',
            content: `# It is heading
            and it is paragraph
            **it is list**
            - l1
            - l2
            - l3`
        }
    });
    const [slugs, setSlugs] = useState<string[]>([]);
    let currentPageUrl = `${LastBreadcrumbs[LastBreadcrumbs?.length - 1].endPoint}/${slugs[0]}`;
    const [breadCrumbs, setBreadCrumbs] = useState<UrlObject[]>([]);
    const { navHeight } = useContext(NavbarContext);
    const { id, name, boardSections, initialSection } = boardDetails;
    let sectionList = Object.keys(boardSections);
    const [currentSection, setCurrentSection] = useState<string>(boardSections[sectionList[0]]);

    const isMobile = useMediaQuery('(max-width:769px)');
    const isTablet = useMediaQuery('(max-width:992px)');
    const styles = useStyles();
    const router = useRouter();

    useEffect(() => {
        if (router.query.boardSlug?.length) {
            let slugList = router.query.boardSlug as string[];
            console.log('slug list', slugList);

            setSlugs(slugList);

            if (!breadCrumbs?.length) {

                setBreadCrumbs((prev: UrlObject[]) => {
                    return [...LastBreadcrumbs, { name: boardDetails ? boardDetails.name : slugList[0], endPoint: `${currentPageUrl}` }];
                });
            }

            currentPageUrl = `${LastBreadcrumbs[LastBreadcrumbs?.length - 1].endPoint}/${slugList[0]}`
        }
    }, [router.query?.boardSlug])

    useEffect(() => {
        console.log('slugs', slugs);
        console.log('slugs', slugs[1]);
        if (slugs && (slugs[1] !== currentSection)) {
            setCurrentSection(slugs[1]);
        }
    }, [slugs])

    const showpageSection = (section: string) => {
        setBreadCrumbs((prev: UrlObject[]) => {
            if (prev.length > 2) {
                prev.length = 2;
            }
            console.log('breadCrumbs', prev)
            let route = prev[prev.length - 1].endPoint;
            console.log('breadCrumbs', [...prev, { endPoint: `${route}/${boardSections[section]}`, name: section }])
            return [...prev, { endPoint: `${route}/${boardSections[section]}`, name: section }];
        })
        router.push({
            pathname: currentPageUrl + `/${boardSections[section]}`,
        }, undefined, { shallow: true })
    }


    return (
        <div>

            <InnerPageHead {...boardDetails} />

            <PageNavigation pageSections={boardSections} currentSection={currentSection} onLinkClick={(section: string) => showpageSection(section)} />


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
    );
}

export default BoardDetailsPage;



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
        const { query: { boardSlug } } = router;
        console.log('boardSlug', boardSlug)
        if (boardSlug?.length) {
            let sectionSlug = boardSlug[1];
            sectionSlug && FetchData(sectionSlug);
        }
    }, [router.query?.boardSlug])

    return (
        <div className={styles.container}>
            <div className={'containerHead'}>
                <Typography variant='h1' >{data.title}</Typography>
            </div>
            <MarkdownParser content={data.content} />
        </div>
    )


}
