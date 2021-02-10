
import { Typography, useMediaQuery, Theme as MuiTheme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useState, useEffect, useRef } from 'react';
import { GetCookie, GetPageInitialData, Routes, Storages, Theme } from '../../Services/App.service';
import classNames from 'classnames';
import { SubscribeSection } from '@/Components/Subscribe.component';
import { G_CourseCategory, G_CourseItemType } from '@/Services/DataTypes/Courses';
import Link from 'next/link';
import PageSEO from '@/Components/PageSEO.component';
import PageEndIndicator from '@/Components/PageEndIndicator.component';
import { DataPageWrapper, pageStateType } from '@/Components/DataPageWrapper.component';
import { ApiResponse, PageSEOProps } from '@/Services/Interfaces.interface';
import { ApiResponseHandler, GetCourseList } from '@/Services/Api.service';
import { PageHead } from '@/Components/PageHead.component';



const useStyles = makeStyles((theme: MuiTheme) => ({
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
  course: {
    '& .containerHead': {
      display: 'flex',
      alignItems: 'center',
      '& .title': {

      },
      '& img': {
        width: 30,
        height: 30,
        marginRight: 5,
        [theme.breakpoints.up('sm')]: {
          width: 40,
          height: 40,
          marginRight: 10,
        }
      },
    }
  },
  courseList: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    border: '1px solid #37495722',
  },
  courseListItem: {
    color: Theme.primary,
    textDecoration: 'none',
    textTransform: 'capitalize',
    flexGrow: 1,
    margin: '1px',
    border: '1px solid #37495722',
    '& .courseListItem': {
      fontSize: 10,
      padding: '10px 15px',
      backgroundColor: '#fafafa',
      transition: '.3s',
      [theme.breakpoints.up('sm')]: {
        fontSize: 12,
      },
      '&:hover': {
        backgroundColor: Theme.primary + '22',
        boxShadow: Theme.boxShadow,
      }
    },
  }
}))

const defaultImage = '/assets/images/defaults/course.webp';

const getData = async (params) => {

  return await GetCourseList({ ...params });
}

function Courses(props: any) {

  const { responseType, result, pageSeo: __pageSeo, hasMore } = GetPageInitialData(props.data);

  const isMobile = useMediaQuery('(max-width:600px)');
  const isTablet = useMediaQuery('(max-width:992px)');
  const [data, setData] = React.useState<G_CourseCategory[] | null>(result ?? [])
  const [loading, setLoading] = useState(false);
  const [infiniteLoading, setInfiniteLoading] = useState(false);
  const [pageState, setPageState] = useState<pageStateType>(responseType);
  const [pageSeo, setPageSeo] = useState<PageSEOProps>(__pageSeo);

  const styles = useStyles();
  let pageOptions = useRef({
    pageNo: 2,
    hasMore: hasMore,
  })


  const OnPageResponseHandler = (data: ApiResponse, toAppend: boolean = false) => {
    let response = ApiResponseHandler(data, {
      onNoData: () => {
        setData((prev => {
          if (toAppend) {
            return [...prev]
          } else {
            return null;
          }
        }))
      },
      onSuccess: () => {
        setData((prev => {
          if (toAppend) {
            return [...prev, ...data?.result]
          } else {
            return data?.result;
          }
        }))
      },
    });
    setPageSeo(data?.additionalData?.pageSEO);
    if (response === '__request_success__') {
      let newOptions = {
        pageNo: pageOptions.current.pageNo + 1,
        hasMore: data?.additionalData?.hasMore
      };
      pageOptions.current = newOptions;
    }
    console.log('pageOptions after change', pageOptions.current);
    if (!toAppend) {
      setPageState(response);
    }
  }


  const requestData = async (_pageNo: number, toAppend: boolean = false) => {
    let userId = parseInt(GetCookie(Storages.UserId));
    let token = GetCookie(Storages.AccessToken);
    setInfiniteLoading(true);
    let response = await GetCourseList({ token: token, userId: userId, pageNo: _pageNo });
    setInfiniteLoading(false);
    OnPageResponseHandler(response ? response.data : null, toAppend);
  }


  function RequestDataOnIntersection() {
    console.log('page options in intraction', pageOptions.current);

    if (pageOptions.current.hasMore) {
      requestData(pageOptions?.current?.pageNo, true)
    } else {
      console.log('No data to fetch');
    }
  }


  return (

    <>
      <PageSEO data={pageSeo} />

      <PageHead backgroundImageName={'/assets/images/topCoursesBanner.webp'} >
        <div className={classNames(styles.pageHead)}>
          <Typography className='pageHeading1' variant='h1'>
            <span >A complete course guide</span>
            <span className='pageHeading2'>college disha</span>
          </Typography>
        </div>
      </PageHead>

      <div style={{ margin: `30px 0` }}>

        <DataPageWrapper pageState={pageState} loading={loading} >

          <div className='container'>
            <div className='wrapper' style={{ padding: '30px 5%' }}>

              <div >
                {
                  data?.map((course: G_CourseCategory) => {
                    return (
                      <div className={classNames('pageSectionContainer', styles.container, styles.course)} >
                        <div className='containerHead' style={{ marginBottom: 30, }}>
                          <img src={course.logo ? course.logo : defaultImage} />

                          <Link href={`${Routes.Courses}/${course.slug}`} >
                            <a>
                              <Typography variant='h2'>{course.title}</Typography>
                            </a>
                          </Link>

                        </div>

                        <div className={styles.courseList}>

                          {
                            course?.courseList?.map((item: G_CourseItemType) => {

                              if (item?.label) {
                                return (
                                  <Link href={`${Routes.Courses}/${item.slug}`} key={item.id} >
                                    <a className={styles.courseListItem}>
                                      <div className={'courseListItem'} >
                                        {item.label}
                                      </div>
                                    </a>
                                  </Link>
                                )
                              } else {
                                return null;
                              }

                            })
                          }
                        </div>
                      </div>
                    )
                  })
                }
                <PageEndIndicator loading={infiniteLoading} onIntersection={RequestDataOnIntersection} />
              </div>

            </div>
          </div>
        </DataPageWrapper>

      </div>

      <SubscribeSection />

    </>

  );
}

export default Courses;


export async function getStaticProps(context) {

  let returnData = { props: { data: null }, revalidate: 1 }

  let response = await getData({ token: '', userId: '' });
  if (response) {
    returnData.props.data = response.data;
  }
  return returnData;

}