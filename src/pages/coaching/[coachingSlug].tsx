import { Routes, Theme } from '@/Services/App.service';
import { detailedInstitute } from '@/Services/GraphQlDataTypes/Institutes';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import CustomBreadCrumb, { UrlObject } from '@/Components/CustomBreadCrumb.component';
import { Grid, ListItem, makeStyles, Typography, useMediaQuery } from '@material-ui/core';
import { LocationOnOutlined, Visibility } from '@material-ui/icons';
import { Rating } from '@material-ui/lab';
import classNames from 'classnames';
import { NavbarContext } from '@/Context/Navbar.context';
import { detailedCoaching } from '@/Services/GraphQlDataTypes/Coachings';
import { AddressDetailComponent, AddressDetailProps } from '@/Components/InstituteInformation.component';
import MarkdownParser from '@/Components/MarkdownParser.component';
import { abort } from 'process';




const useStyles = makeStyles({
    backgroundContainer: {
        backgroundImage: "url('/assets/images/innerPages/instituteBanner.jpg')",
        backgroundSize: '100%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right',
    },
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
        background: '#fafafa',
        width: '100%',
        padding: '20px 15px 10px',
        position: 'sticky',
        top: 64,
        zIndex: 10,
        '& .sectionList': {
            overflow: 'auto',
            listStyle: 'none',
            whiteSpace: 'nowrap',
            '&::-webkit-scrollbar': {
                height: 3
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

    const [coachinDetails, setCoachinDetails] = useState<detailedCoaching | null>({
        name: 'abc institute',
        isSaved: true,
        location: 'agra',
        id: 1,
        image: '',
        rating: 3.4,
        description: '',
        categories: [],
        tags: [],
        views: 2345,
        slug: '',
        about: ` #### **Galgotias College Fees Structure(Official)**
       
        ---  
        <table>
        <thead>
        <th>elem 1</th>
        <th>elem 2<th</th>
        <th>elem 3<th</th>
        <th>elem 4<th</th>]
        </thead>
        <tbdoy>
        <tr>
        <td>elem 1</td>
        <td>elem 2<th</td>
        <td>elem 3<th</td>
        <td>elem 4<th</td>
        </tr>
        <tr>
       
        </tbody>
        </table>
       
           
                 ###### **Courses Details:**
                **The college offers 5 courses to students:**
                             * Undergraduate Programmes
                      * Postgraduate Programmes
                              * Diploma Programmes
                   * Integrated Programmes
                     * Doctoral Programmes
        ### School of Electrical, Electronics & Communication Engineering
        * B.Tech in Electronics and Communication Engineering with specialization in the Internet of Things(IOT)
        #### Eligibility
        1. Minimum 60 % in PCM(10 + 2)
        2. Merit in the Qualifying exam, IIT JEE, UPSEE etc preferable
        #### **Fees Structure**
       **Duration**|**4 years**
        ---| ---
        Annual Fees | 1, 49, 000
        Exam Fee | 10, 000
        * B.Tech in Electronics and Communication Engineering with specialization in Embedded System
        #### **Eligibility**
        1. Minimum 60 % in PCM(10 + 2)
        2. Merit in the Qualifying exam, IIT JEE, UPSEE etc preferable
        #### **Fee Structure**
       **Duration**|**4 years**
        ---| ---
        Annual Fees | 1, 49, 000
        Exam Fee | 10, 000
        * B.Tech in Electronics and Communication Engineering with specialization in VLSI
        #### **Eligibility**
        1. Minimum 60 % in PCM(10 + 2)
        2. Merit in the Qualifying exam, IIT JEE, UPSEE etc preferable
        #### **Fee Structure**`,
        admission: ` #### **Galgotias College Fees Structure(Official)**
       
        ---  
        <table>
        <thead>
        <th>elem 1</th>
        <th>elem 2<th</th>
        <th>elem 3<th</th>
        <th>elem 4<th</th>]
        </thead>
        <tbdoy>
        <tr>
        <td>elem 1</td>
        <td>elem 2<th</td>
        <td>elem 3<th</td>
        <td>elem 4<th</td>
        </tr>
        <tr>
       
        </tbody>
        </table>
       
           
                 ###### **Courses Details:**
                **The college offers 5 courses to students:**
                             * Undergraduate Programmes
                      * Postgraduate Programmes
                              * Diploma Programmes
                   * Integrated Programmes
                     * Doctoral Programmes
        ### School of Electrical, Electronics & Communication Engineering
        * B.Tech in Electronics and Communication Engineering with specialization in the Internet of Things(IOT)
        #### Eligibility
        1. Minimum 60 % in PCM(10 + 2)
        2. Merit in the Qualifying exam, IIT JEE, UPSEE etc preferable
        #### **Fees Structure**
       **Duration**|**4 years**
        ---| ---
        Annual Fees | 1, 49, 000
        Exam Fee | 10, 000
        * B.Tech in Electronics and Communication Engineering with specialization in Embedded System
        #### **Eligibility**
        1. Minimum 60 % in PCM(10 + 2)
        2. Merit in the Qualifying exam, IIT JEE, UPSEE etc preferable
        #### **Fee Structure**
       **Duration**|**4 years**
        ---| ---
        Annual Fees | 1, 49, 000
        Exam Fee | 10, 000
        * B.Tech in Electronics and Communication Engineering with specialization in VLSI
        #### **Eligibility**
        1. Minimum 60 % in PCM(10 + 2)
        2. Merit in the Qualifying exam, IIT JEE, UPSEE etc preferable
        #### **Fee Structure**`,
        course_details: ` #### **Galgotias College Fees Structure(Official)**
       
        ---  
        <table>
        <thead>
        <th>elem 1</th>
        <th>elem 2<th</th>
        <th>elem 3<th</th>
        <th>elem 4<th</th>]
        </thead>
        <tbdoy>
        <tr>
        <td>elem 1</td>
        <td>elem 2<th</td>
        <td>elem 3<th</td>
        <td>elem 4<th</td>
        </tr>
        <tr>
       
        </tbody>
        </table>
       
           
                 ###### **Courses Details:**
                **The college offers 5 courses to students:**
                             * Undergraduate Programmes
                      * Postgraduate Programmes
                              * Diploma Programmes
                   * Integrated Programmes
                     * Doctoral Programmes
        ### School of Electrical, Electronics & Communication Engineering
        * B.Tech in Electronics and Communication Engineering with specialization in the Internet of Things(IOT)
        #### Eligibility
        1. Minimum 60 % in PCM(10 + 2)
        2. Merit in the Qualifying exam, IIT JEE, UPSEE etc preferable
        #### **Fees Structure**
       **Duration**|**4 years**
        ---| ---
        Annual Fees | 1, 49, 000
        Exam Fee | 10, 000
        * B.Tech in Electronics and Communication Engineering with specialization in Embedded System
        #### **Eligibility**
        1. Minimum 60 % in PCM(10 + 2)
        2. Merit in the Qualifying exam, IIT JEE, UPSEE etc preferable
        #### **Fee Structure**
       **Duration**|**4 years**
        ---| ---
        Annual Fees | 1, 49, 000
        Exam Fee | 10, 000
        * B.Tech in Electronics and Communication Engineering with specialization in VLSI
        #### **Eligibility**
        1. Minimum 60 % in PCM(10 + 2)
        2. Merit in the Qualifying exam, IIT JEE, UPSEE etc preferable
        #### **Fee Structure**`,
        address_details: {
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

    const showpageSection = (section: string) => {
        let targetElement = document.getElementById(section);
        if (targetElement) {
            targetElement.scrollIntoView({
                block: 'start',
            });
            window.location.hash = section;
        }
    }


    const { id, name, location, image, rating, isSaved, views, about, course_details, admission, address_details } = coachinDetails;

    return (
        <div>
            <CustomBreadCrumb breadcrumbs={breadcrumbs} />

            <div className={classNames('container', styles.backgroundContainer)} >
                <div className='wrapper' style={{ padding: isMobile ? '30px 5%' : '80px 5%' }}>


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

            <div className={classNames(styles.sectionListContainer, { [styles.sectionListContainer_M]: isMobile })} style={{ top: navHeight }} >
                <div className={'sectionList'}>
                    {
                        Object.keys(pageSections).map((section: string, index: number) => {

                            return (<a key={index} className={classNames('sectionListItemAnchor', { 'active': currentSection === pageSections[section] })}>
                                <ListItem button onClick={() => showpageSection(pageSections[section])} className={'sectionListItem'} >
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
                    <Grid container >
                        <Grid item xs={12} md={9} >
                            {
                                RenderPageSection({
                                    about: about,
                                    address_details: address_details,
                                    admission: admission,
                                    course_details: course_details
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
    course_details: string,
    admission,
    address_details
}

const RenderPageSection = (props: PageSectionProps) => {

    return (
        <>
            <RenderInformation about={props.about} />
            <RenderCourseFees course_details={props.course_details} />
            <RenderAdmission admission={props.admission} />
            <RenderAddress address_details={props.address_details} />
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

const RenderCourseFees = (props: { course_details: string }) => {

    const styles = sectionStyles();

    return (
        <div className={styles.container}>
            <div id={pageSections['courses & fees']}>
                <div className={'containerHead'}>
                    <Typography variant='h2' >Coaching center Courses & fees</Typography>
                </div>
                <MarkdownParser content={props.course_details} />
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

const RenderAddress = (props: { address_details: AddressDetailProps }) => {

    const styles = sectionStyles();

    return (
        <div className={styles.container}>
            <div id={pageSections['address & details']}>
                <AddressDetailComponent {...props.address_details} />
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