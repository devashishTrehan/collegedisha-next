
import { Grid, Typography, useMediaQuery, Theme as MuiTheme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import * as React from 'react';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { CareerListItem, detailedCareer } from '@/Services/DataTypes/CareerOptions';
import { NavbarContext } from '@/Context/Navbar.context';
import { AppSectionHeights, GetPageInitialData, Theme } from '@/Services/App.service';
import { PageNavigation } from '@/Components/PageNavigation.component';
import MarkdownParser from '@/Components/MarkdownParser.component';
import CareerCard from '@/Components/CareerCard.component';
import { ApiResponseHandler, GetAllCareers, GetCareerDetails } from '@/Services/Api.service';
import { PageSEOProps } from '@/Services/Interfaces.interface';
import { DataPageWrapper, pageStateType } from '@/Components/DataPageWrapper.component';
import PageSEO from '@/Components/PageSEO.component';
import { pageSections } from '@/Components/InstituteDetail.component';
import { PageHead } from '@/Components/PageHead.component';
import Link from 'next/link';
import Routes from '@/Services/Routes';


const useStyles = makeStyles((theme: MuiTheme) => ({
  wrapper: {
    padding: ' 0px 5% 50px',
  },
  container: {
    marginBottom: 50,
    '&:last-child': {
      margin: 0
    }
  },
  pageHead: {
    color: Theme.primary,
    textTransform: 'capitalize',
    '& span': {
      display: 'block',
    },
    '& .pageHeading1': {
      fontSize: '2.3rem',
      fontFamily: 'gorditaMedium',
      [theme.breakpoints.down('xs')]: {
        fontSize: '1.8rem',
      },
    },
    '& .pageHeading2': {
      fontSize: '2.5rem',
      marginTop: 8,
      fontFamily: 'gorditaBold',
      [theme.breakpoints.down('xs')]: {
        fontSize: '2rem',
        marginTop: 8,
      },
    }
  },
  courseList: {
    width: '100%',
    margin: 'auto',
    listStyle: 'none',
    background: Theme.primary + '44',
    padding: '5px 10px',
    borderRadius: Theme.radius1,
    marginTop: 20,
    '& li': {
      display: 'inline-block',
      padding: '0 10px',
      fontSize: 12,
      borderRight: `1px solid ${Theme.primary}`,
      [theme.breakpoints.down('xs')]: {
        fontSize: 10,
      },
      '&:last-child': {
        borderRight: `none`,
      },
      '& a': {
        color: Theme.secondary,
        fontFamily: 'gorditaMedium'
      }
    }
  }
}))


const defaultImage = '/assets/images/defaults/career.webp';

const getData = async (params) => {

  return await GetCareerDetails({ ...params });
}

function CareerDetails(props: any) {

  const { responseType, result, pageSeo: __pageSeo, relatedResults } = GetPageInitialData(props.data);


  const [data, setData] = React.useState<detailedCareer | null>(result ?? {});
  const [relatedCourses, setRelatedCourses] = React.useState<CareerListItem[]>(relatedResults)
  const [currentSection, setCurrentSection] = React.useState<string>('');
  const { id, name, careerSections, sectionContent, courses, slug } = data;
  const { navHeight } = React.useContext(NavbarContext);
  const [loading, setLoading] = React.useState(false);
  const [pageState, setPageState] = React.useState<pageStateType>(responseType);
  const [pageSEO, setPageSEO] = React.useState<PageSEOProps>(__pageSeo);
  const isMobile = useMediaQuery('(max-width:769px)');
  const isTablet = useMediaQuery('(max-width:992px)');
  const styles = useStyles();


  React.useEffect(() => {
    console.log('page data', props)
    OnPageResponseHandler(props?.data);
  }, [props.data])


  const OnPageResponseHandler = (data) => {
    let response = ApiResponseHandler(data, {
      onNoData: () => { setData(null) },
      onSuccess: () => {
        setData(data?.result)
      },
    });
    console.log('detail page data', data);
    setPageState(response);
  }

  const showpageSection = (section: string) => {
    section = careerSections[section];
    let targetElement = document.getElementById(section);
    setCurrentSection(section);
    if (targetElement) {
      window.scrollTo(0, targetElement.offsetTop - (navHeight + AppSectionHeights.pageNavigation + 30));
    }
  }

  let sections = careerSections ? Object.keys(careerSections) : [];

  return (
    <div>

      <PageSEO data={pageSEO} />

      <DataPageWrapper loading={loading} pageState={pageState} >
        <>
          <PageHead backgroundImageName={'/assets/images/topCoursesBanner.webp'} >
            <>
              <div className={classNames(styles.pageHead)}>
                <Typography className='pageHeading1' variant='h1'>{name}</Typography>
              </div>
              {
                courses?.length ?
                  <div>
                    <ul className={styles.courseList}>
                      {
                        courses.map((_course: { name: string, slug: string }) => {
                          return (
                            <li>
                              <Link href={`${Routes.CareerOptions}/${slug}/${_course.slug}`} >
                                <a>
                                  {_course.name}
                                </a>
                              </Link>
                            </li>
                          )
                        })
                      }
                    </ul>
                  </div>
                  : null
              }
            </>
          </PageHead>

          <PageNavigation pageSections={careerSections} currentSection={currentSection} onLinkClick={(section: string) => showpageSection(section)} />



          <div className='container'>
            <div className='wrapper' style={{ padding: isMobile ? '20px 5%' : '50px 5%' }}>
              <Grid container >
                <Grid item xs={12} md={9} >
                  {
                    sections?.map((section: string) => {
                      let { title, content } = sectionContent[section];
                      return (<div className={classNames('pageSectionContainer', styles.container)} id={careerSections[section]}>
                        <div className='containerHead'>
                          <Typography variant='h2'>{title}</Typography>
                        </div>
                        <MarkdownParser content={content} />
                      </div>)
                    })
                  }

                  {
                    relatedCourses?.length ?
                      <div className={classNames('pageSectionContainer', styles.container)}>

                        <div className='containerHead'>
                          <Typography variant='h2'>Related Courses</Typography>
                        </div>

                        <Grid container spacing={isMobile ? 3 : 5} justify='flex-start'>
                          {
                            relatedCourses?.map((career: CareerListItem) => {
                              return (

                                <Grid item xs={12} sm={6} md={4} >
                                  <CareerCard {...career} />
                                </Grid>

                              )
                            })
                          }
                        </Grid>
                      </div>
                      : null
                  }

                </Grid>

              </Grid>
            </div>
          </div>
        </>
      </DataPageWrapper>

    </div>
  );

}

export default CareerDetails;



export async function getStaticPaths() {
  const res = await GetAllCareers();
  let careers = [];
  if (res) {
    careers = res?.data?.result;
  }

  let paths = careers.map((career) => ({
    params: { careerSlug: career.slug }
  }))

  return { paths, fallback: true }
}


export async function getStaticProps({ params }) {

  let returnData = { props: { data: null }, revalidate: 1 }
  let response = await getData({ slug: params?.careerSlug });
  if (response) {
    returnData.props.data = response.data;
  }
  return returnData;

}