
import { detailedInstitute } from '@/Services/DataTypes/Institutes';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
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
import { ApiResponse, PageSEOProps } from '@/Services/Interfaces.interface';
import { ApiResponseHandler } from '@/Services/Api.service';
import { DataPageWrapper, pageStateType } from './DataPageWrapper.component';
import { GetPageInitialData } from '@/Services/App.service';
import PageSEO from './PageSEO.component';




const useStyles = makeStyles({

})

interface Props {
    data: ApiResponse
}

const pageSections = {
    Information: 'information',
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

    const { responseType, result, pageSeo: __pageSeo } = GetPageInitialData(props.data);

    const [instituteDetails, setInstituteDetails] = useState<detailedInstitute | null>(result ?? null);
    const [slugs, setSlugs] = useState<string[]>([]);
    const [currentSection, setCurrentSection] = useState<string>(pageSections.Information);
    const [currentPageUrl, setCurrentPageUrl] = useState<string>('');
    const { navHeight } = useContext(NavbarContext);
    const [loading, setLoading] = useState(false);
    const [pageState, setPageState] = useState<pageStateType>(responseType);
    const [pageSEO, setPageSEO] = useState<PageSEOProps>(__pageSeo);
    const isMobile = useMediaQuery('(max-width:769px)');
    const isTablet = useMediaQuery('(max-width:992px)');
    const styles = useStyles();
    const router = useRouter();

    useEffect(() => {
        console.log('page data', props)
        OnPageResponseHandler(props?.data);
    }, [props.data])

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


    const OnPageResponseHandler = (data) => {
        let response = ApiResponseHandler(data, {
            onError: () => { },
            onFailed: () => { },
            onUnAuthenticated: () => { },
            onNoData: () => { setInstituteDetails(null) },
            onSuccess: () => {
                setInstituteDetails(data?.result)
            },
        });
        console.log('detail page data', data);
        setPageState(response);
    }


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

    return (
        <>
            <PageSEO data={pageSEO} />
            <DataPageWrapper loading={loading} pageState={pageState}>
                <div>
                    <InnerPageHead {...instituteDetails} />

                    <PageNavigation pageSections={pageSections} currentSection={currentSection} onLinkClick={(section: string) => showpageSection(section)} />

                    <div className='container'>
                        <div className='wrapper' style={{ padding: isMobile ? '20px 5%' : '50px 5%' }}>
                            <Grid container >
                                <Grid item xs={12} md={9} >
                                    {
                                        <RenderPageSection institute={instituteDetails} section={currentSection} />
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

export default InstituteDetailComponent;


interface PageSectionProps {
    section: string,
    institute: detailedInstitute
}

const RenderPageSection = (props: PageSectionProps) => {

    const { information, id, name, courses, admission, review, gallery, hostel, faculty } = props?.institute;

    switch (props.section) {
        case pageSections.Information:
            return <RenderInformation data={information} />;
        case pageSections['courses & fees']:
            return <RenderCoursesFees data={courses} />;
        case pageSections.admission:
            return <RenderAdmission data={admission} />;
        case pageSections['review & rating']:
            return <RenderReview institute={{ name: name, id: id }} />;
        case pageSections.gallery:
            return <RenderGallery data={gallery} />;
        case pageSections.faculty:
            return <RenderFaculty data={faculty} />;
        case pageSections.hostel:
            return <RenderHostel data={hostel} />;
        case pageSections.placement:
            return <RenderPlacement />;
        default:
            return <RenderInformation data={information} />;

    }

}
