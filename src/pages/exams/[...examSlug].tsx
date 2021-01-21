import { Routes, Theme } from '@/Services/App.service';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import CustomBreadCrumb, { UrlObject } from '@/Components/CustomBreadCrumb.component';
import { Grid, makeStyles, Typography, useMediaQuery } from '@material-ui/core';
import { NavbarContext } from '@/Context/Navbar.context';
import { PageNavigation } from '@/Components/PageNavigation.component';
import { InnerPageHead } from '@/Components/InnerPageHead.component';
import MarkdownParser from '@/Components/MarkdownParser.component';
import { detailedExam } from '@/Services/GraphQlDataTypes/Exams';




const useStyles = makeStyles({


})

interface Props {
    breadcrumbs: UrlObject[]
}


const LastBreadcrumbs = [{ name: 'exams', endPoint: `${Routes.Exams}` }];

const defaultImage = '/assets/images/defaults/institute.jpg';


function examDetailsPage(props: Props) {

    const [examDetails, setExamDetails] = useState<detailedExam | null>({
        name: 'abc Board',
        id: 1,
        views: 2345,
        slug: '',
        examSections: {
            Information: '',
            ['application form']: 'application-form',
            dates: 'dates',
            pattern: 'pattern',
            syllabus: 'syllabus',
            ['answer key']: 'answer-key',
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
    const [currentPageUrl, setCurrentPageUrl] = useState('');
    const { navHeight } = useContext(NavbarContext);
    const { id, name, examSections, initialSection } = examDetails;
    let sectionList = Object.keys(examSections);
    const [currentSection, setCurrentSection] = useState<string>(examSections[sectionList[0]]);

    const isMobile = useMediaQuery('(max-width:769px)');
    const isTablet = useMediaQuery('(max-width:992px)');
    const styles = useStyles();
    const router = useRouter();

    useEffect(() => {
        if (router.query.examSlug?.length) {
            let slugList = router.query.examSlug as string[];
            setSlugs(slugList);
        }
    }, [router.query?.examSlug])

    useEffect(() => {
        let currentPath = router.asPath;
        let pages = currentPath.split('/');
        if (pages?.length > 3) {
            pages.length = 3;
            let newUrl = pages.join('/');
            console.log('currentPages 2', newUrl)
            setCurrentPageUrl(newUrl);
        } else {
            setCurrentPageUrl(currentPath);
        }
        console.log('currentPageUrl 2', router)
    }, [router.query])

    useEffect(() => {
        if (slugs && (slugs[1] !== currentSection)) {
            setCurrentSection(slugs[1]);
        }
    }, [slugs])

    const showpageSection = (section: string) => {
        router.push({
            pathname: currentPageUrl + `/${examSections[section]}`,
        }, undefined, { shallow: true })
    }


    return (
        <div>


            <PageNavigation pageSections={examSections} currentSection={currentSection} onLinkClick={(section: string) => showpageSection(section)} />


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

export default examDetailsPage;



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
        const { query: { examSlug } } = router;
        console.log('examSlug', examSlug)
        if (examSlug?.length) {
            let sectionSlug = examSlug[1];
            sectionSlug && FetchData(sectionSlug);
        }
    }, [router.query?.examSlug])

    return (
        <div className={styles.container}>
            <div className={'containerHead'}>
                <Typography variant='h1' >{data.title}</Typography>
            </div>
            <MarkdownParser content={data.content} />
        </div>
    )


}
