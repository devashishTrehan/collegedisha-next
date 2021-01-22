
import { Grid, Hidden, IconButton, Typography, useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import * as React from 'react';
import { Routes, Theme } from '@/Services/App.service';
import classNames from 'classnames';
import { ViewportTracker } from '@/Components/ViewportTracker.component';
import { CalendarToday, Category, CommentOutlined, KeyboardArrowLeft, KeyboardArrowRight, VisibilityOutlined } from '@material-ui/icons';

import { useRouter } from 'next/router';
import { ContentCardStyles } from '@/styles/Home.style';
import Carousel from 'react-material-ui-carousel';
import { NewsListItemTypes, NewsListTypes } from '@/Services/GraphQlDataTypes/News';
import NewsListCard from '@/Components/NewsListCard.component';
import { PageNavigation } from '@/Components/PageNavigation.component';


const useStyles = makeStyles({
  wrapper: {
    padding: ' 0px 5% 50px',
  },

})


const defaultImage = '/assets/images/defaults/news.jpg'

function NewsList(props: any) {

  const isMobile = useMediaQuery('(max-width:600px)');
  const isTablet = useMediaQuery('(max-width:992px)');
  const router = useRouter();
  const [data, setData] = React.useState<NewsListTypes>({
    featuredNews: [
      {
        id: 1,
        title: 'UP Police SI Registration form 2021 - Check Sub Inspector Vacancy Open in Uttar Pradesh',
        views: 123,
        commentCount: 12,
        slug: 'xyz',
        image: 'https://www.collegedisha.com/images/thumbnail/1578546489UP-Police-SI-Registration-Form-thumbnail.jpg',
        author: 'dev trehan',
        publishedOn: '23-12-2020',
        isSaved: false,
        category: 'news',
      },
      {
        id: 1,
        title: 'Rajasthan Scholarship Registration Form 2021 - Online Apply Rajasthan Scholarship Application Form',
        views: 123,
        commentCount: 12,
        slug: 'xyz',
        image: '',
        author: 'dev trehan',
        publishedOn: '23-12-2020',
        isSaved: false,
        category: 'lifestyle',
      },
      {
        id: 1,
        title: 'The Vice President Showed Concern On The Need Of Reservation For Poor Students In Private Institution',
        views: 123,
        commentCount: 12,
        slug: 'xyz',
        image: 'https://www.collegedisha.com/images/thumbnail/1542188532News.jpg',
        author: 'dev trehan',
        publishedOn: '23-12-2020',
        isSaved: false,
        category: 'politics',
      },
    ],
    newsList: [
      {
        id: 1,
        title: 'UP Police SI Registration form 2021 - Check Sub Inspector Vacancy Open in Uttar Pradesh',
        views: 123,
        commentCount: 12,
        slug: 'xyz',
        image: 'https://www.collegedisha.com/images/thumbnail/1578546489UP-Police-SI-Registration-Form-thumbnail.jpg',
        author: 'dev trehan',
        publishedOn: '23-12-2020',
        isSaved: false,
        category: 'sports',
      },
      {
        id: 1,
        title: 'Rajasthan Scholarship Registration Form 2021 - Online Apply Rajasthan Scholarship Application Form',
        views: 123,
        commentCount: 12,
        slug: 'xyz',
        image: '',
        author: 'dev trehan',
        publishedOn: '23-12-2020',
        isSaved: false,
        category: 'local',
      },
      {
        id: 1,
        title: 'IIM-A OPPOSITION TO LAID DOWN Ph-D CRITERIA BY GOVERNMENT - CollegeDisha',
        views: 123,
        commentCount: 12,
        slug: 'xyz',
        image: 'https://www.collegedisha.com/images/thumbnail/1604662290Rajasthan-Scholarship-Registration-thumbnail.jpg',
        author: 'dev trehan',
        publishedOn: '23-12-2020',
        isSaved: false,
        category: 'internation',
      },
      {
        id: 1,
        title: 'The Vice President Showed Concern On The Need Of Reservation For Poor Students In Private Institution',
        views: 123,
        commentCount: 12,
        slug: 'xyz',
        image: 'https://www.collegedisha.com/images/thumbnail/1542188532News.jpg',
        author: 'dev trehan',
        publishedOn: '23-12-2020',
        isSaved: false,
        category: 'bollywood',
      },
    ],
    newsCategories: {
      'All News': '',
      'Engineering ': 'engineering',
      'Education ': 'education',
      'Management ': 'management',
      'College Placement ': 'college-placement',
      'Exam ': 'exam',
      'Exams Admit Card': 'exams-admit-card',
      'Exam Results': 'exam-results',
    }
  })
  let sectionList = Object.keys(data?.newsCategories);
  const [currentSection, setCurrentSection] = React.useState<string>(sectionList[sectionList[0]]);

  const styles = useStyles();


  const ShowCategory = (category: string) => {
    router.push(`${Routes.News}/${data?.newsCategories[category]}`, undefined, { shallow: true });
  }



  return (

    <>

      <div>
        <NewsPageHeader featuredNews={data?.featuredNews} />
      </div>

      <PageNavigation pageSections={data?.newsCategories} currentSection={currentSection} onLinkClick={(section: string) => ShowCategory(section)} />


      <div className='container'>
        <div className={'wrapper'}>

          <Grid container spacing={isMobile ? 3 : 5}>

            {
              data?.newsList?.map((newsItem: NewsListItemTypes) => {
                return (
                  <Grid item xs={12} sm={6}>
                    <NewsListCard {...newsItem} />
                  </Grid>

                )
              })
            }

          </Grid>

        </div>
      </div>
    </>

  );
}


export default NewsList;


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

