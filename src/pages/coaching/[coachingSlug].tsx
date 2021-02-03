import { AppSectionHeights, Routes, Theme } from '@/Services/App.service';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { Grid, makeStyles, Typography, useMediaQuery } from '@material-ui/core';
import { NavbarContext } from '@/Context/Navbar.context';
import { detailedCoaching } from '@/Services/DataTypes/Coachings';
import { AddressDetailComponent, AddressDetailProps } from '@/Components/InstituteInformation.component';
import MarkdownParser from '@/Components/MarkdownParser.component';
import { PageNavigation } from '@/Components/PageNavigation.component';
import { InnerPageHead } from '@/Components/InnerPageHead.component';




const useStyles = makeStyles({

})

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

interface Props {

}

const pageSections = {
    Information: 'Information',
    ['courses & fees']: 'courses-fees',
    admission: 'admission',
    review: 'review',
    ['address & details']: 'address'
}

const defaultImage = '/assets/images/defaults/institute.jpg';

const breadcrumbs = [{ name: 'coachings', endPoint: `${Routes.Coachings}` }];

function CoachingDetailsPage(props: Props) {

    const [coachingDetails, setCoachinDetails] = useState<detailedCoaching | null>({
        name: 'abc Coaching',
        isSaved: true,
        location: 'agra',
        id: 1,
        thumbnail: '',
        rating: 3.4,
        description: '',
        categories: [],
        tags: [],
        views: 2345,
        slug: '',
        about: ``,
        admission: ``,
        courseDetails: ``,
        addressDetails: {
            timings: '10:00A.M. - 5:00P.M.',
            address: 'uefgergbtr mgkjrhjyt',
        },
    });

    const [currentSection, setCurrentSection] = useState<string>(pageSections.Information);
    const { navHeight } = useContext(NavbarContext);

    const isMobile = useMediaQuery('(max-width:769px)');
    const isTablet = useMediaQuery('(max-width:992px)');
    const styles = useStyles();
    const router = useRouter();

    const HashChangeHandler = (event: HashChangeEvent) => {
        event.preventDefault();
        let hash = event.newURL.split('#')[1];
        setCurrentSection(hash)
        let targetElement = document.getElementById(hash);
        if (targetElement) {
            window.scrollTo(0, targetElement.offsetTop - (navHeight + AppSectionHeights.pageNavigation + 30));
        }
    }

    useEffect(() => {
        window.addEventListener('hashchange', HashChangeHandler)

        return () => {
            window.removeEventListener('hashchange', HashChangeHandler)
        };
    }, [])

    const showpageSection = (section: string) => {
        window.location.hash = pageSections[section];
    }


    const { id, name, about, courseDetails, admission, addressDetails } = coachingDetails;

    return (
        <div>

            <InnerPageHead {...coachingDetails} />

            <PageNavigation pageSections={pageSections} currentSection={currentSection} onLinkClick={(section: string) => showpageSection(section)} />

            <div className='container'>
                <div className='wrapper' style={{ padding: isMobile ? '20px 5%' : '50px 5%' }}>
                    <Grid container >
                        <Grid item xs={12} md={9} >
                            {
                                RenderPageSection({
                                    about: about,
                                    addressDetails: addressDetails,
                                    admission: admission,
                                    courseDetails: courseDetails
                                })
                            }
                        </Grid>
                    </Grid>
                </div>
            </div>

        </div>
    );
}

export default CoachingDetailsPage;


interface PageSectionProps {
    about: string,
    courseDetails: string,
    admission,
    addressDetails
}

const RenderPageSection = (props: PageSectionProps) => {

    return (
        <>
            <RenderInformation about={props.about} />
            <RenderCourseFees courseDetails={props.courseDetails} />
            <RenderAdmission admission={props.admission} />
            <RenderAddress addressDetails={props.addressDetails} />
            <RenderReview />
        </>
    )

}


//   ------ Information start------   \\

const RenderInformation = (props: { about: string }) => {

    const styles = sectionStyles();

    return (
        <div className={styles.container}>
            <div id={pageSections.Information}>
                <div className={'containerHead'}>
                    <Typography variant='h2' >About Coaching center</Typography>
                </div>
                <MarkdownParser content={props.about} />
            </div>
        </div>
    )
}

//   ------ Information end------   \\





//   ------ courses and fees start------   \\

const RenderCourseFees = (props: { courseDetails: string }) => {

    const styles = sectionStyles();

    return (
        <div className={styles.container}>
            <div id={pageSections['courses & fees']}>
                <div className={'containerHead'}>
                    <Typography variant='h2' >Coaching center Courses & fees</Typography>
                </div>
                <MarkdownParser content={props.courseDetails} />
            </div>
        </div>
    )
}

//   ------ courses and fees end------   \\





//   ------ Admission start------   \\

const RenderAdmission = (props: { admission: string }) => {

    const styles = sectionStyles();

    return (
        <div className={styles.container}>
            <div id={pageSections.admission}>
                <div className={'containerHead'}>
                    <Typography variant='h2' >Coaching center Admission procedure</Typography>
                </div>
                <MarkdownParser content={props.admission} />
            </div>
        </div>
    )
}

//   ------ Admission end------   \\





//   ------ Address start------   \\

const RenderAddress = (props: { addressDetails: AddressDetailProps }) => {

    const styles = sectionStyles();

    return (
        <div className={styles.container}>
            <div id={pageSections['address & details']}>
                <AddressDetailComponent {...props.addressDetails} />
            </div>
        </div>
    )
}

//   ------ Address end------   \\





//   ------ Review start------   \\

const RenderReview = () => {

    const styles = sectionStyles();

    return (
        <div className={styles.container}>
            <div id={pageSections.review}>
                <div className={'containerHead'}>
                    <Typography variant='h2' >Coaching center Reviews</Typography>
                </div>
                <div className='wrapper' >Review</div>
            </div>
        </div>
    )
}

//   ------ Review end------   \\