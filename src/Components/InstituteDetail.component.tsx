import { Theme } from '@/Services/App.service';
import { detailedInstitute } from '@/Services/GraphQlDataTypes/Institutes';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import CustomBreadCrumb, { UrlObject } from '@/Components/CustomBreadCrumb.component';
import { Grid, makeStyles, useMediaQuery } from '@material-ui/core';
import { RenderInformation } from './InstituteInformation.component';
import { RenderAdmission } from './InstituteAdmission.component';
import { RenderReview } from './InstituteReview.component';
import { RenderGallery } from './InstituteGallery.component';
import { RenderFaculty } from './InstituteFaculty.component';
import { RenderHostel } from './InstituteHostel.component';
import { RenderPlacement } from './InstitutePlacement.component';
import { RenderCoursesFees } from './InstituteCourses.component';
import { NavbarContext } from '@/Context/Navbar.context';
import { PageNavigation } from './PageNavigation.component';
import { InnerPageHead } from './InnerPageHead.component';




const useStyles = makeStyles({

})

interface Props {
}

const pageSections = {
    Information: 'Information',
    ['courses & fees']: 'courses-fees',
    admission: 'admission',
    ['review & rating']: 'review',
    gallery: 'gallery',
    faculty: 'college-faculty',
    hostel: 'hostel',
    placement: 'placement',
}

const defaultImage = '/assets/images/defaults/institute.jpg';


function InstituteDetailComponent(props: Props) {

    const [instituteDetails, setInstituteDetails] = useState<detailedInstitute | null>({
        name: 'abc institute',
        isApplied: true,
        isSaved: true,
        location: 'agra',
        id: 1,
        image: '',
        rating: 3.4,
        views: 2345,
        slug: '',
    });
    const [slugs, setSlugs] = useState<string[]>([]);
    const [currentSection, setCurrentSection] = useState<string>(pageSections.Information);
    const [currentPageUrl, setCurrentPageUrl] = useState<string>('');
    const { navHeight } = useContext(NavbarContext);

    const isMobile = useMediaQuery('(max-width:769px)');
    const isTablet = useMediaQuery('(max-width:992px)');
    const styles = useStyles();
    const router = useRouter();



    useEffect(() => {
        if (router.query.instituteSlug?.length) {
            let slugList = router.query.instituteSlug as string[];
            setSlugs(slugList);
        }
    }, [router.query?.instituteSlug])

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
        console.log('slugs', slugs);
        console.log('slugs', slugs[1]);
        if (slugs && (slugs[1] !== currentSection)) {
            setCurrentSection(slugs[1]);
        }
    }, [slugs])

    const showpageSection = (section: string) => {
        router.push({
            pathname: currentPageUrl + `/${pageSections[section]}`,
        }, undefined, { shallow: true })
    }

    const { id, name } = instituteDetails;

    return (
        <div>

            <InnerPageHead {...instituteDetails} />

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

export default InstituteDetailComponent;


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
            return <RenderInformation />;
        case pageSections['courses & fees']:
            return <RenderCoursesFees />;
        case pageSections.admission:
            return <RenderAdmission />;
        case pageSections['review & rating']:
            return <RenderReview institute={props.institute} />;
        case pageSections.gallery:
            return <RenderGallery />;
        case pageSections.faculty:
            return <RenderFaculty />;
        case pageSections.hostel:
            return <RenderHostel />;
        case pageSections.placement:
            return <RenderPlacement />;
        default:
            return <RenderInformation />;

    }

}
