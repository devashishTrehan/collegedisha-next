import { Theme } from '@/Services/App.service';
import { detailedInstitute } from '@/Services/GraphQlDataTypes/Institutes';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import CustomBreadCrumb, { UrlObject } from '@/Components/CustomBreadCrumb.component';
import CourseCard from '@/Components/CourseCard.component';
import { Grid, ListItem, makeStyles, Typography, useMediaQuery } from '@material-ui/core';
import Link from 'next/link';
import { LocationOnOutlined, Visibility } from '@material-ui/icons';
import { Rating } from '@material-ui/lab';
import classNames from 'classnames';
import { CourseListItem } from '@/Services/GraphQlDataTypes/Courses';




const useStyles = makeStyles({
    headContainer: {
        '& .wrap': {
            display: 'flex',
            textAlign: 'left',
            verticalAlign: 'middle',
            alignItems: 'center',
        },
        '& .imageWrap': {
            width: 180,
            height: 180,
            borderRadius: Theme.radius2,
            boxShadow: Theme.boxShadow,
            overflow: 'hidden',
        },
        '& .detailWrap': {
            padding: '20px 0',
            margin: '-10px 0 -10px 20px',
            textTransform: 'capitalize',
            color: Theme.primary,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',

            '& .name': {
                fontFamily: 'gorditaMedium',
                textTransform: 'uppercase',
                fontSize: 24,
            },
            '& .location': {
                color: 'gray',
                fontSize: 18,
                '& svg': {
                    fontSize: 20,
                    verticalAlign: 'middle',
                    marginRight: 5,
                    marginLeft: -3,
                }

            },
            '& .views': {
                fontFamily: 'gorditaMedium',
                marginRight: 5,
                fontSize: 14,
                '& svg': {
                    fontSize: 16,
                    marginRight: 5,
                    verticalAlign: 'middle',
                }

            },
            '& .ratingWrap': {
                display: 'flex',
                alignItems: 'center',
                marginTop: 5,
                '& .subWrap': {
                    display: 'flex',
                    '& .rating': {
                        fontSize: 18,
                    },
                    '& .total': {
                        fontFamily: 'gorditaMedium',
                        margin: '0 6px',
                        fontSize: 8,
                        '& p': {
                            verticalAlign: 'middle'
                        }
                    }
                }
            },
            '& .group': {
                margin: '10px 0',
            }
        }
    },
    headContainer_M: {

        '& .imageWrap': {
            width: 100,
            height: 100,
            borderRadius: Theme.radius1,
        },
        '& .detailWrap': {
            padding: '10px 0',
            margin: '-5px 0 -5px 10px',

            '& .name': {
                fontSize: 18,
            },
            '& .location': {
                fontSize: 14,
                marginRight: 3,
                '& svg': {
                    fontSize: 16,
                }
            },
            '& .views': {
                fontSize: 10,
                marginRight: 3,
                '& svg': {
                    fontSize: 12,
                }

            },
            '& .ratingWrap': {
                '& .subWrap': {
                    '& .rating': {
                        fontSize: 14,
                    },
                    '& .total': {
                        margin: '0 3px',
                        fontSize: 6,
                    }
                }
            },
            '& .group': {
                margin: '8px 0',
            }
        }
    },
    sectionListContainer: {
        background: Theme.primary,
        width: '100%',
        padding: '15px 15px 5px',
        '& .sectionList': {
            overflow: 'auto',
            listStyle: 'none',
            whiteSpace: 'nowrap',
            '&::-webkit-scrollbar': {
                height: 3
            },
            '&::-webkit-scrollbar-thumb': {
                background: '#fff8'
            },
            '& .sectionListItemAnchor': {
                display: 'inline-block',
                borderRadius: Theme.radius1,
                // boxShadow: Theme.boxShadow,
                background: Theme.backgroundColor,
                color: Theme.primary,
                textDecoration: 'none',
                margin: '0 5px 10px',
                textTransform: 'capitalize',
                '& .sectionListItem': {
                    padding: '5px 15px',
                }

            }
        }
    }
})

interface Props {
    breadcrumbs: UrlObject[]
}

const pageSections = {
    Information: 'Information',
    ['courses & fees']: 'courses-fees',
    admission: 'admission',
    ['review & rating']: 'review',
    gallery: 'gallery',
    faculty: 'faculty',
    hostel: 'hostel',
    placement: 'placement',
}

const defaultImage = '/assets/images/defaults/institute.png';


function InstituteDetailComponent(props: Props) {

    const [instituteDetails, setInstituteDetails] = useState<detailedInstitute | null>({
        name: 'abc institute',
        isApplied: true,
        isSaved: true,
        location: 'agra',
        id: 1,
        image: '',
        rating: 3.4,
        views: 2345
    });
    const [slugs, setSlugs] = useState<string[]>([]);
    const [currentSection, setCurrentSection] = useState<string>(pageSections.Information);
    const currentPageUrl = `${props.breadcrumbs[props.breadcrumbs?.length - 1].endPoint}/${slugs[0]}`;
    const [breadCrumbs, setBreadCrumbs] = useState<UrlObject[]>([...props.breadcrumbs, { name: instituteDetails ? instituteDetails.name : slugs[0], endPoint: `${currentPageUrl}` }])

    const isMobile = useMediaQuery('(max-width:769px)');
    const isTablet = useMediaQuery('(max-width:992px)');
    const styles = useStyles();
    const router = useRouter();

    useEffect(() => {
        if (router.query.instituteSlug?.length) {
            setSlugs(router.query.instituteSlug as string[]);
        }
    }, [router.query?.instituteSlug])

    useEffect(() => {
        console.log('slugs', slugs);
        console.log('slugs', slugs[1]);
        if (slugs && (slugs[1] !== currentSection)) {
            setCurrentSection(slugs[1]);
        }
    }, [slugs])

    const { name, location, image, rating, isApplied, isSaved, views } = instituteDetails;

    return (
        <div>
            <CustomBreadCrumb breadcrumbs={breadCrumbs} />

            <div className='container'>
                <div className='wrapper' style={{ padding: isMobile ? '20px 5%' : '50px 5%' }}>


                    <div className={classNames(styles.headContainer, { [styles.headContainer_M]: isMobile })}>
                        <div className='wrap'>
                            <div className='imageWrap'>
                                <img src={image ? image : defaultImage} alt='' />
                            </div>
                            <div className='detailWrap'>
                                <div className='group'>
                                    <Typography variant='h4' className='name'>{name}</Typography>
                                    <Typography variant='h6' className='location'><LocationOnOutlined />{location}</Typography>
                                </div>
                                <div className='group'>
                                    <Typography className='views'><Visibility />{views}</Typography>
                                    <div className='ratingWrap' >
                                        <span className='subWrap'>
                                            <span className='rating'>{rating}</span>
                                            <span className='total'>
                                                <p>out</p>
                                                <p>of 5</p>
                                            </span>
                                        </span>
                                        <Rating precision={0.5} value={rating} readOnly size='small' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.sectionListContainer} >
                <div className={'sectionList'}>
                    {
                        Object.keys(pageSections).map((section: string, index: number) => {
                            return (
                                <Link key={index} href={{
                                    pathname: currentPageUrl + `/${pageSections[section]}`,
                                }} shallow={true} >
                                    <a className={'sectionListItemAnchor'}>
                                        <ListItem button className={'sectionListItem'} >
                                            {section}
                                        </ListItem>
                                    </a>
                                </Link>
                            )
                        })
                    }
                </div>
            </div>

            <div className='container'>
                <div className='wrapper' style={{ padding: isMobile ? '20px 5%' : '50px 5%' }}>

                    {
                        <RenderPageSection section={currentSection} />
                    }
                </div>
            </div>
        </div>
    );
}

export default InstituteDetailComponent;


const RenderPageSection = (props: { section: string }) => {

    switch (props.section) {
        case pageSections.Information:
            return <RenderInformation />;
        case pageSections['courses & fees']:
            return <RenderCoursesFees />;
        case pageSections.admission:
            return <RenderAdmission />;
        case pageSections['review & rating']:
            return <RenderReview />;
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


function RenderInformation() {
    return (
        <div>

        </div>
    );
}

const CourseStyles = makeStyles({
    container: {

    },
    courseList: {
        boxShadow: Theme.boxShadow,
        borderRadius: Theme.radius1,
        padding: '50px 20px'
    }
})

function RenderCoursesFees() {

    const [courses, setCourses] = useState<CourseListItem[]>([
        { id: 1, name: 'B.Tech', type: 'full-time', totalFees: { currency: 'INR', amount: 480000, frequency: 'year' }, duration: '4 year', feesBreakdown: [{ currency: 'INR', amount: 120000, frequency: 'year' }, { currency: 'INR', amount: 120000, frequency: 'year' }, { currency: 'INR', amount: 120000, frequency: 'year' }, { currency: 'INR', amount: 120000, frequency: 'year' },], streams: ['computer science', 'mechanical', 'civil', 'electronics'] },
        { id: 2, name: 'M.Tech', type: 'full-time', totalFees: { currency: 'INR', amount: 480000, frequency: 'year' }, duration: '4 year', feesBreakdown: [{ currency: 'INR', amount: 120000, frequency: 'year' }, { currency: 'INR', amount: 120000, frequency: 'year' }, { currency: 'INR', amount: 120000, frequency: 'year' }, { currency: 'INR', amount: 120000, frequency: 'year' },], streams: ['computer science', 'mechanical', 'civil', 'electronics'] },
        { id: 3, name: 'BCA', type: 'full-time', totalFees: { currency: 'INR', amount: 480000, frequency: 'year' }, duration: '4 year', feesBreakdown: [{ currency: 'INR', amount: 120000, frequency: 'year' }, { currency: 'INR', amount: 120000, frequency: 'year' }, { currency: 'INR', amount: 120000, frequency: 'year' }, { currency: 'INR', amount: 120000, frequency: 'year' },], streams: ['computer science', 'mechanical', 'civil', 'electronics'] },
        { id: 4, name: 'MCA', type: 'full-time', totalFees: { currency: 'INR', amount: 480000, frequency: 'year' }, duration: '4 year', feesBreakdown: [{ currency: 'INR', amount: 120000, frequency: 'year' }, { currency: 'INR', amount: 120000, frequency: 'year' }, { currency: 'INR', amount: 120000, frequency: 'year' }, { currency: 'INR', amount: 120000, frequency: 'year' },], streams: ['computer science', 'mechanical', 'civil', 'electronics'] },
    ])

    const styles = CourseStyles();

    return (

        <Grid container >
            <Grid item xs={12} md={8} className={styles.courseList}>

                <Grid container spacing={5}>
                    {
                        courses?.map((course: CourseListItem) => {
                            return (
                                <Grid item>
                                    <CourseCard {...course} />
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Grid>
        </Grid>
    );
}

function RenderAdmission() {
    return (
        <div>
            Admission
        </div>
    );
}

function RenderReview() {
    return (
        <div>
            RenderReview
        </div>
    );
}

function RenderFaculty() {
    return (
        <div>
            faculty
        </div>
    );
}

function RenderHostel() {
    return (
        <div>
            hostel
        </div>
    );
}

function RenderPlacement() {
    return (
        <div>
            Placement
        </div>
    );
}

function RenderGallery() {
    return (
        <div>
            gallery
        </div>
    );
}

