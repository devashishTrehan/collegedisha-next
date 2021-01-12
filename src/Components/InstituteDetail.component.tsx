import { Theme } from '@/Services/App.service';
import { detailedInstitute } from '@/Services/GraphQlDataTypes/Institutes';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import CustomBreadCrumb, { UrlObject } from '@/Components/CustomBreadCrumb.component';
import { ListItem, makeStyles, Typography, useMediaQuery } from '@material-ui/core';
import { LocationOnOutlined, Visibility } from '@material-ui/icons';
import { Rating } from '@material-ui/lab';
import classNames from 'classnames';
import { RenderInformation } from './InstituteInformation.component';
import { RenderAdmission } from './InstituteAdmission.component';
import { RenderReview } from './InstituteReview.component';
import { RenderGallery } from './InstituteGallery.component';
import { RenderFaculty } from './InstituteFaculty.component';
import { RenderHostel } from './InstituteHostel.component';
import { RenderPlacement } from './InstitutePlacement.component';
import { RenderCoursesFees } from './InstituteCourses.component';




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
        background: '#00000005',
        width: '100%',
        padding: '20px 15px 10px',
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
                color: Theme.primary,
                textDecoration: 'none',
                margin: '0 10px 10px',
                textTransform: 'capitalize',
                '& .sectionListItem': {
                    padding: '5px 15px',
                },
                '&.active': {
                    background: Theme.backgroundColor,
                    boxShadow: Theme.boxShadow,
                }

            }
        }
    },
    sectionListContainer_M: {
        '& .sectionList': {
            '& .sectionListItemAnchor': {
                fontSize: 14,
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
        views: 2345
    });
    const [slugs, setSlugs] = useState<string[]>([]);
    const [currentSection, setCurrentSection] = useState<string>(pageSections.Information);
    let currentPageUrl = `${props.breadcrumbs[props.breadcrumbs?.length - 1].endPoint}/${slugs[0]}`;
    const [breadCrumbs, setBreadCrumbs] = useState<UrlObject[]>([]);

    const isMobile = useMediaQuery('(max-width:769px)');
    const isTablet = useMediaQuery('(max-width:992px)');
    const styles = useStyles();
    const router = useRouter();

    useEffect(() => {
        if (router.query.instituteSlug?.length) {
            let slugList = router.query.instituteSlug as string[];
            console.log('slug list', slugList);

            setSlugs(slugList);

            if (!breadCrumbs?.length) {

                setBreadCrumbs((prev: UrlObject[]) => {
                    return [...props.breadcrumbs, { name: instituteDetails ? instituteDetails.name : slugList[0], endPoint: `${currentPageUrl}` }];
                });
            }

            currentPageUrl = `${props.breadcrumbs[props.breadcrumbs?.length - 1].endPoint}/${slugList[0]}`
        }
    }, [router.query?.instituteSlug])

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
            let route = prev[prev.length - 1].endPoint;
            console.log('breadCrumbs', [...prev, { endPoint: `${route}/${section}`, name: section }])
            return [...prev, { endPoint: `${route}/${section}`, name: section }];
        })
        router.push({
            pathname: currentPageUrl + `/${pageSections[section]}`,
        }, undefined, { shallow: true })
    }

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

            <div className={classNames(styles.sectionListContainer, { [styles.sectionListContainer_M]: isMobile })} >
                <div className={'sectionList'}>
                    {
                        Object.keys(pageSections).map((section: string, index: number) => {
                            console.log(section, currentPageUrl);
                            return (<a key={index} className={classNames('sectionListItemAnchor', { 'active': currentSection === pageSections[section] })}>
                                <ListItem button onClick={() => showpageSection(section)} className={'sectionListItem'} >
                                    {section}
                                </ListItem>
                            </a>
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
