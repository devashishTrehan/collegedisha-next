
import { Grid, Hidden, IconButton, Typography, useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useState, useEffect } from 'react';
import { GetCookie, GetPageInitialData, Routes, Storages, Theme } from '@/Services/App.service';
import classNames from 'classnames';
import { ViewportTracker } from '@/Components/ViewportTracker.component';
import { CalendarToday, Category, CommentOutlined, KeyboardArrowLeft, KeyboardArrowRight, VisibilityOutlined } from '@material-ui/icons';

import { useRouter } from 'next/router';
import { ContentCardStyles } from '@/styles/Home.style';
import Carousel from 'react-material-ui-carousel';
import { NewsListItemTypes, NewsListTypes } from '@/Services/DataTypes/News';
import NewsListCard from '@/Components/NewsListCard.component';
import { PageNavigation } from '@/Components/PageNavigation.component';
import { DataPageWrapper, pageStateType } from '@/Components/DataPageWrapper.component';
import PageEndIndicator from '@/Components/PageEndIndicator.component';
import { ApiResponse, PageSEOProps } from '@/Services/Interfaces.interface';
import { ApiResponseHandler, GetNewsList, GetNewsHome } from '@/Services/Api.service';


const useStyles = makeStyles({
  wrapper: {
    padding: ' 0px 5% 50px',
  },

})

const getData = async (params) => {

  return await GetNewsHome({ ...params });
}

const defaultImage = '/assets/images/defaults/news.jpg'

function NewsList(props: any) {

  const { responseType, result, pageSeo: __pageSeo } = GetPageInitialData(props.data);
  console.log('data ---', props.data)

  const isMobile = useMediaQuery('(max-width:600px)');
  const isTablet = useMediaQuery('(max-width:992px)');
  const router = useRouter();
  const [data, setData] = React.useState<NewsListTypes>(result ?? {})
  let sectionList = Object.keys(data?.newsCategories ?? {});
  const [currentSection, setCurrentSection] = React.useState<string>(sectionList[sectionList[0]]);
  const [newsList, setNewsList] = useState<NewsListItemTypes[] | null>(result?.newsList ?? [])
  const [loading, setLoading] = useState(false);
  const [infiniteLoading, setInfiniteLoading] = useState(false);
  const [pageState, setPageState] = useState<pageStateType>(responseType);
  const [pageSeo, setPageSeo] = useState<PageSEOProps>(__pageSeo);

  let pageOptions = React.useRef({
    pageNo: 2,
    hasMore: true,
  })


  const OnPageResponseHandler = (data: ApiResponse, toAppend: boolean = false) => {
    let response = ApiResponseHandler(data, {
      onNoData: () => {
        setNewsList((prev => {
          if (toAppend) {
            return [...prev]
          } else {
            return null;
          }
        }))
      },
      onSuccess: () => {
        setNewsList((prev => {
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
    let response = await GetNewsList({ token: token, userId: userId, pageNo: _pageNo, category: '' });
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



  const styles = useStyles();


  const ShowCategory = (category: string) => {
    router.push(`${Routes.News}/${data?.newsCategories[category]}`, undefined, { shallow: true });
  }


  return (
    <DataPageWrapper loading={loading} pageState={pageState}>
      <>

        {
          data?.featuredNews?.length ?
            <div>
              <NewsPageHeader featuredNews={data?.featuredNews} />
            </div>
            : null
        }

        {
          data?.newsCategories ?
            <PageNavigation pageSections={data?.newsCategories} currentSection={currentSection} onLinkClick={(section: string) => ShowCategory(section)} />
            : null
        }

        {
          data?.newsList?.length ?
            <div className='container'>
              <div className={'wrapper'}>

                <Grid container spacing={isMobile ? 3 : 5}>

                  {
                    newsList?.map((newsItem: NewsListItemTypes) => {
                      return (
                        <Grid item xs={12} sm={6}>
                          <NewsListCard {...newsItem} />
                        </Grid>


                      )
                    })
                  }
                </Grid>

                <PageEndIndicator loading={infiniteLoading} onIntersection={RequestDataOnIntersection} />

              </div>
            </div>
            : null
        }
      </>
    </DataPageWrapper>
  );
}

export default NewsList;


export async function getStaticProps(context) {
  let returnData = { props: { data: null }, revalidate: 1 }

  let response = await getData({ token: '', userId: '' });
  if (response) {
    returnData.props.data = response.data;
  }
  return returnData;
}





const NewsPageHeaderStyles = makeStyles({
  imageWrap: {
    animation: 'none !important',
    margin: '0px 0 20px !important',
    borderRadius: Theme.radius2,
    maxHeight: 'unset !important',
    position: 'relative',
    '& .category': {
      display: 'inline',
      position: 'absolute',
      padding: '5px 15px 3px',
      background: Theme.primary,
      fontFamily: 'gorditaMedium',
      fontSize: 14,
      left: 0,
      bottom: 40,
      lineHeight: '14px',
      color: '#fff',
    },
  },
  carouselActionButton: {
    position: 'absolute',
    top: 'calc((50% - 60px) - 15px)',
    backgroundColor: Theme.primary + '22',
    padding: 4,
    '& svg': {
      color: Theme.primary,
      fontSize: 24
    },
    '&.left': {
      left: -19,
    },
    '&.right': {
      right: -19,

    },
  },
  InfoWrap: {
    '& .detailWrap': {
      display: 'flex',
      margin: '0px -10px',
      '&>div': {
        display: 'flex',
        alignItems: 'center',
        margin: '0 10px',
        color: '#797979',
        '& p': {
          fontSize: '14px !important',
          margin: '0px !important',
        },
        '& svg': {
          fontSize: 16,
          marginRight: 3,
        }
      },
      '& .date': {

      },
      '& .views': {

      },
      '& .commentCount': {


      },
    },
  },
  sideNewsWrap: {
    margin: '-20px 0',
  }
})

export const NewsPageHeader = (props: { featuredNews: NewsListItemTypes[] }) => {

  const [carouselIndex, setCarouselIndex] = React.useState(0);
  let StepsCarouselIntervalRef: any = null;
  const StepsCarouselInterval = 4;   // time in seconds
  const isMobile = useMediaQuery('(max-width:600px)');
  const isTablet = useMediaQuery('(max-width:992px)');

  const customStyles = NewsPageHeaderStyles();
  const [data, setData] = React.useState(props.featuredNews);

  React.useEffect(() => {
    setData(props.featuredNews);
  }, [props?.featuredNews])



  const styles = ContentCardStyles();

  let CarouselRef = React.useRef();

  const slideCaousel = (direction: 'next' | 'prev') => {
    if (data?.length)
      switch (direction) {
        case 'next': setCarouselIndex((prev: number) => {
          if (prev < data?.length - 1) {
            let next = ++prev;
            return next;
          } else {
            return 0;
          }
        })
          return;
        case 'prev': setCarouselIndex((prev: number) => {
          if (prev < 1) {
            return data?.length - 1;
          } else {
            return --prev;
          }
        })
          return;
      }


  }

  const SlideCarouselTo = (index: number) => {
    setCarouselIndex(index);
    return 0;
  }


  const renderCarouselItem = (item: NewsListItemTypes, index: number) => {
    const { title, image, commentCount, views, category, publishedOn } = item;
    return (
      <div key={index} className='carouselCard' style={{ marginTop: 0, }}>
        <div className={classNames('imageWrap', customStyles.imageWrap)} >
          <img src={image ? image : defaultImage} alt='' />
          <Typography className={'category'} >{category}</Typography>
        </div>
        <div className={classNames('infoWrap', customStyles.InfoWrap)}  >
          <div className='title'>
            <h5 style={{ textAlign: 'left' }}>{title}</h5>
          </div>
          <div className={'detailWrap'}>
            <div className='date'>
              <CalendarToday />
              <Typography>{publishedOn}</Typography>
            </div>
            <div className='views'>
              <VisibilityOutlined />
              <Typography>{views}</Typography>
            </div>
            <div className='commentCount'>
              <CommentOutlined />
              <Typography>{commentCount} comments</Typography>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const PlayCarouselSlide = () => {
    console.log('entered');
    StepsCarouselIntervalRef = setInterval(() => {
      console.log('started');
      slideCaousel('next');
    }, StepsCarouselInterval * 1000)
  }

  const PauseCarouselSlide = () => {
    console.log('exited');
    clearInterval(StepsCarouselIntervalRef);
  }

  return (
    <div style={{ padding: `${isMobile ? 20 : 30}px 0px` }} >


      {/* <ViewportTracker id='contentPage' onEnter={() => PlayCarouselSlide()} onLeave={() => PauseCarouselSlide()} > */}
      <div className={styles.cardContainer} style={{ backgroundImage: 'none' }} >
        <div className='container'>
          <div className={styles.pageContent}>

            <Grid container spacing={isTablet ? 3 : 5} >

              <Grid item xs={12} md={7}>

                <div className={styles.CarouselContainer} style={{ position: 'relative' }} >
                  <Carousel
                    autoPlay={false}
                    index={carouselIndex}
                    navButtonsAlwaysInvisible
                    indicators={false}
                    animation='slide'
                    timeout={500} >
                    {
                      data?.map((item: NewsListItemTypes, index: number) => {
                        return renderCarouselItem(item, index);
                      })
                    }
                  </Carousel>
                  <IconButton className={classNames(customStyles.carouselActionButton, 'left')} onClick={() => slideCaousel('prev')}>
                    <KeyboardArrowLeft />
                  </IconButton>

                  <IconButton className={classNames(customStyles.carouselActionButton, 'right')} onClick={() => slideCaousel('next')}>
                    <KeyboardArrowRight />
                  </IconButton>
                </div>
              </Grid>

              <Hidden smDown>

                <Grid item xs={12} md={5}>
                  <div className={classNames(styles.StepsContainer)} style={{ width: '100%', maxWidth: 'unset' }}>
                    <div className={classNames(customStyles.sideNewsWrap)}>
                      {
                        data?.map((item: NewsListItemTypes, index: number) => {
                          return <NewsListCard {...item} />
                        })
                      }
                    </div>
                  </div>
                </Grid>
              </Hidden>

            </Grid>

          </div>
        </div>
      </div>
      {/* </ViewportTracker > */}
    </div >
  )
}

