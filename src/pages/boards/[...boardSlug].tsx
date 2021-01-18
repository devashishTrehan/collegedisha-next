import { Routes, Theme } from '@/Services/App.service';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import CustomBreadCrumb, { UrlObject } from '@/Components/CustomBreadCrumb.component';
import { Grid, makeStyles, Typography, useMediaQuery } from '@material-ui/core';
import { NavbarContext } from '@/Context/Navbar.context';
import { PageNavigation } from '@/Components/PageNavigation.component';
import { InnerPageHead } from '@/Components/InnerPageHead.component';
import { detailedBoard } from '@/Services/GraphQlDataTypes/Boards';




const useStyles = makeStyles({


})

interface Props {
    breadcrumbs: UrlObject[]
}

const pageSections = {
    Information: 'Information',
    ['registration form']: 'registration-form',
    syllabus: 'syllabus',
    ['time table']: 'time-table',
    ['admit card']: 'admit-card',
    result: 'result',
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
    });
    const [slugs, setSlugs] = useState<string[]>([]);
    const [currentSection, setCurrentSection] = useState<string>(pageSections.Information);
    let currentPageUrl = `${LastBreadcrumbs[LastBreadcrumbs?.length - 1].endPoint}/${slugs[0]}`;
    const [breadCrumbs, setBreadCrumbs] = useState<UrlObject[]>([]);
    const { navHeight } = useContext(NavbarContext);

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
            console.log('breadCrumbs', [...prev, { endPoint: `${route}/${pageSections[section]}`, name: section }])
            return [...prev, { endPoint: `${route}/${pageSections[section]}`, name: section }];
        })
        router.push({
            pathname: currentPageUrl + `/${pageSections[section]}`,
        }, undefined, { shallow: true })
    }

    const { id, name } = boardDetails;

    return (
        <div>
            <CustomBreadCrumb breadcrumbs={breadCrumbs} />

            <InnerPageHead {...boardDetails} />

            <PageNavigation pageSections={pageSections} currentSection={currentSection} onLinkClick={(section: string) => showpageSection(section)} />


            <div className='container'>
                <div className='wrapper' style={{ padding: isMobile ? '20px 5%' : '50px 5%' }}>
                    <Grid container >
                        <Grid item xs={12} md={9} >
                            {
                                <RenderPageSection institute={{ id: id, name: name }} section={currentSection} />
                            }
                        </Grid>
                    </Grid>
                </div>
            </div>

        </div>
    );
}

export default BoardDetailsPage;


interface PageSectionProps {
    section: string,
    institute: {
        name: string,
        id: number
    }
}

const RenderPageSection = (props: PageSectionProps) => {

    switch (props.section) {
        case pageSections.Information:
            return <Information />;
        case pageSections['registration form']:
            return <RegistrationForm />;
        case pageSections.syllabus:
            return <Syllabus />;
        case pageSections['time table']:
            return <TimeTable />;
        case pageSections.result:
            return <Result />;
        case pageSections['admit card']:
            return <AdmitCard />;
        default:
            return <Information />;

    }

}


//   ------ section styles start------   \\
const sectionStyles = makeStyles({
    container: {
        boxShadow: Theme.boxShadow,
        borderRadius: Theme.radius1,
        padding: '20px',
        marginBottom: 50,
        '&:last-child': {
            margin: 0
        }
    },
})
//   ------ section styles end------   \\


//   ------ Information start------   \\

const Information = () => {

    const styles = sectionStyles();

    return (
        <div className={styles.container}>
            <div id={pageSections.Information}>
                <div className={'containerHead'}>
                    <Typography variant='h2' >About Coaching center</Typography>
                </div>
                {/* <MarkdownParser content={props.about} /> */}
            </div>
        </div>
    )
}

//   ------ Information end------   \\





//   ------ ResitrationForm start------   \\

const RegistrationForm = () => {

    const styles = sectionStyles();

    return (
        <div className={styles.container}>
            <div id={pageSections['registration form']}>
                <div className={'containerHead'}>
                    <Typography variant='h2' >Coaching center Courses & fees</Typography>
                </div>
                {/* <MarkdownParser content={props.course_details} /> */}
            </div>
        </div>
    )
}

//   ------ ResitrationForm end------   \\





//   ------ Syllabus start------   \\

const Syllabus = () => {

    const styles = sectionStyles();

    return (
        <div className={styles.container}>
            <div id={pageSections.syllabus}>
                <div className={'containerHead'}>
                    <Typography variant='h2' >Coaching center Admission procedure</Typography>
                </div>
                {/* <MarkdownParser content={props.admission} /> */}
            </div>
        </div>
    )
}

//   ------ Syllabus end------   \\





//   ------ TimeTable start------   \\

const TimeTable = () => {

    const styles = sectionStyles();

    return (
        <div className={styles.container}>
            <div id={pageSections['time table']}>
                {/* <AddressDetailComponent {...props.address_details} /> */}
                <div className='wrapper' >time table</div>
            </div>
        </div>
    )
}

//   ------ TimeTable end------   \\





//   ------ admit card start------   \\

const AdmitCard = () => {

    const styles = sectionStyles();

    return (
        <div className={styles.container}>
            <div id={pageSections['admit card']}>
                <div className={'containerHead'}>
                    <Typography variant='h2' >Coaching center Reviews</Typography>
                </div>
                <div className='wrapper' >admit card</div>
            </div>
        </div>
    )
}

//   ------ admit card end------   \\





//   ------ Result start------   \\

const Result = () => {

    const styles = sectionStyles();

    return (
        <div className={styles.container}>
            <div id={pageSections.result}>
                <div className={'containerHead'}>
                    <Typography variant='h2' >Coaching center Reviews</Typography>
                </div>
                <div className='wrapper' >result</div>
            </div>
        </div>
    )
}

//   ------ Result end------   \\