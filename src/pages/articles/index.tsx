
import {  Grid,  IconButton, Typography, useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import * as React from 'react';
import {  Theme } from '../../Services/App.service';
import classNames from 'classnames';
import { SubscribeSection } from '@/Components/Subscribe.component';
import { ArticleListItemTypes, ArticleListTypes, FeaturedArticlesTypes } from '@/Services/GraphQlDataTypes/article';
import { ContentCardStyles } from '@/styles/Home.style';
import { AccessTimeOutlined,  CommentOutlined, KeyboardArrowLeft, KeyboardArrowRight, ShareOutlined, ThumbUpOutlined, VisibilityOutlined } from '@material-ui/icons';
import Carousel from 'react-material-ui-carousel';
import ArticleListCard from '@/Components/ArticleListCard.component';
import { useRouter } from 'next/router';

const useStyles = makeStyles({

})

const defaultImage = '/assets/images/defaults/article.jpg';

function Article(props: any) {

  const isMobile = useMediaQuery('(max-width:600px)');
  const isTablet = useMediaQuery('(max-width:992px)');
  const isDesktop = useMediaQuery('(min-width:992px)');

  const [data, setData] = React.useState<ArticleListTypes | null>({
    featuredArticles: {
      main: {
        id: 1,
        title: 'UP Police SI Registration form 2021 - Check Sub Inspector Vacancy Open in Uttar Pradesh',
        views: 123,
        commentCount: 12,
        voteCount: 123,
        slug: 'xyz',
        readTime: '3 min',
        image: 'https://www.collegedisha.com/images/thumbnail/1578546489UP-Police-SI-Registration-Form-thumbnail.jpg',
        author: 'dev trehan',
        publishedOn: '23-12-2020',
        isSaved: false,
      },
      side: [
        {
          id: 1,
          title: 'UP Police SI Registration form 2021 - Check Sub Inspector Vacancy Open in Uttar Pradesh',
          views: 123,
          commentCount: 12,
          voteCount: 123,
          readTime: '3 min',
          slug: 'xyz',
          image: 'https://www.collegedisha.com/images/thumbnail/1578546489UP-Police-SI-Registration-Form-thumbnail.jpg',
          author: 'dev trehan',
          publishedOn: '23-12-2020',
          isSaved: false,
        },
        {
          id: 1,
          title: 'Rajasthan Scholarship Registration Form 2021 - Online Apply Rajasthan Scholarship Application Form',
          views: 123,
          commentCount: 12,
          voteCount: 123,
          slug: 'xyz',
          image: '',
          readTime: '3 min',
          author: 'dev trehan',
          publishedOn: '23-12-2020',
          isSaved: false,
        },
        {
          id: 1,
          title: 'Rajasthan Scholarship Registration Form 2021 - Online Apply Rajasthan Scholarship Application Form',
          views: 123,
          commentCount: 12,
          voteCount: 123,
          readTime: '3 min',
          slug: 'xyz',
          image: '',
          author: 'dev trehan',
          publishedOn: '23-12-2020',
          isSaved: false,
        },
        {
          id: 1,
          title: 'IIM-A OPPOSITION TO LAID DOWN Ph-D CRITERIA BY GOVERNMENT - CollegeDisha',
          views: 123,
          readTime: '3 min',
          voteCount: 123,
          commentCount: 12,
          slug: 'xyz',
          image: 'https://www.collegedisha.com/images/thumbnail/1604662290Rajasthan-Scholarship-Registration-thumbnail.jpg',
          author: 'dev trehan',
          publishedOn: '23-12-2020',
          isSaved: false,
        },
      ],
      bottom: [
        {
          id: 1,
          title: 'UP Police SI Registration form 2021 - Check Sub Inspector Vacancy Open in Uttar Pradesh',
          views: 123,
          voteCount: 123,
          commentCount: 12,
          slug: 'xyz',
          readTime: '3 min',
          image: 'https://www.collegedisha.com/images/thumbnail/1578546489UP-Police-SI-Registration-Form-thumbnail.jpg',
          author: 'dev trehan',
          publishedOn: '23-12-2020',
          isSaved: false,
        },

        {
          id: 1,
          title: 'IIM-A OPPOSITION TO LAID DOWN Ph-D CRITERIA BY GOVERNMENT - CollegeDisha',
          views: 123,
          commentCount: 12,
          voteCount: 123,
          slug: 'xyz',
          image: 'https://www.collegedisha.com/images/thumbnail/1604662290Rajasthan-Scholarship-Registration-thumbnail.jpg',
          author: 'dev trehan',
          readTime: '3 min',
          publishedOn: '23-12-2020',
          isSaved: false,
        },
      ],
    },
    trendingArticles: [
      {
        id: 1,
        readTime: '3 min',
        title: 'UP Police SI Registration form 2021 - Check Sub Inspector Vacancy Open in Uttar Pradesh',
        views: 123,
        commentCount: 12,
        voteCount: 123,
        slug: 'xyz',
        image: 'https://www.collegedisha.com/images/thumbnail/1578546489UP-Police-SI-Registration-Form-thumbnail.jpg',
        author: 'dev trehan',
        publishedOn: '23-12-2020',
        isSaved: false,
      },
      {
        id: 1,
        readTime: '3 min',
        title: 'Rajasthan Scholarship Registration Form 2021 - Online Apply Rajasthan Scholarship Application Form',
        views: 123,
        voteCount: 123,
        commentCount: 12,
        slug: 'xyz',
        image: '',
        author: 'dev trehan',
        publishedOn: '23-12-2020',
        isSaved: false,
      },
      {
        id: 1,
        title: 'IIM-A OPPOSITION TO LAID DOWN Ph-D CRITERIA BY GOVERNMENT - CollegeDisha',
        readTime: '3 min',
        views: 123,
        voteCount: 123,
        commentCount: 12,
        slug: 'xyz',
        image: 'https://www.collegedisha.com/images/thumbnail/1604662290Rajasthan-Scholarship-Registration-thumbnail.jpg',
        author: 'dev trehan',
        publishedOn: '23-12-2020',
        isSaved: false,
      },
      {
        id: 1,
        title: 'The Vice President Showed Concern On The Need Of Reservation For Poor Students In Private Institution',
        views: 123,
        readTime: '3 min',
        voteCount: 123,
        commentCount: 12,
        slug: 'xyz',
        image: 'https://www.collegedisha.com/images/thumbnail/1542188532News.jpg',
        author: 'dev trehan',
        publishedOn: '23-12-2020',
        isSaved: false,
      },
    ],
    articleList: [
      {
        id: 1,
        title: 'UP Police SI Registration form 2021 - Check Sub Inspector Vacancy Open in Uttar Pradesh',
        readTime: '3 min',
        views: 123,
        commentCount: 12,
        voteCount: 123,
        slug: 'xyz',
        image: 'https://www.collegedisha.com/images/thumbnail/1578546489UP-Police-SI-Registration-Form-thumbnail.jpg',
        author: 'dev trehan',
        publishedOn: '23-12-2020',
        isSaved: false,
      },
      {
        id: 1,
        title: 'Rajasthan Scholarship Registration Form 2021 - Online Apply Rajasthan Scholarship Application Form',
        views: 123,
        commentCount: 12,
        readTime: '3 min',
        voteCount: 123,
        slug: 'xyz',
        image: '',
        author: 'dev trehan',
        publishedOn: '23-12-2020',
        isSaved: false,
      },
      {
        id: 1,
        title: 'IIM-A OPPOSITION TO LAID DOWN Ph-D CRITERIA BY GOVERNMENT - CollegeDisha',
        views: 123,
        commentCount: 12,
        voteCount: 123,
        slug: 'xyz',
        readTime: '3 min',
        image: 'https://www.collegedisha.com/images/thumbnail/1604662290Rajasthan-Scholarship-Registration-thumbnail.jpg',
        author: 'dev trehan',
        publishedOn: '23-12-2020',
        isSaved: false,
      },
      {
        id: 1,
        title: 'The Vice President Showed Concern On The Need Of Reservation For Poor Students In Private Institution',
        views: 123,
        voteCount: 123,
        readTime: '3 min',
        commentCount: 12,
        slug: 'xyz',
        image: 'https://www.collegedisha.com/images/thumbnail/1542188532News.jpg',
        author: 'dev trehan',
        publishedOn: '23-12-2020',
        isSaved: false,
      },
    ]
  })


  const styles = useStyles();


  React.useEffect(() => {
  }, [])


  return (

    <>
      <div style={{ margin: `30px 0` }}>

        <ArticlePageHeader featuredArticles={data.featuredArticles} />


        <div className='container'>
          <div className='wrapper' style={{ padding: '30px 5%' }}>

            <div className='containerHead' style={{ marginBottom: 30, }}>
              <Typography variant='h2'>Trending Articles on College Disha</Typography>
            </div>

            <Grid container spacing={isMobile ? 3 : 4}>
              <Grid item xs={12} sm={6} md={4}>
                <ArticleListCard {...data?.articleList[0]} type={isTablet ? 'list' : 'card'} />
              </Grid>
              {
                isDesktop ?
                  <Grid item xs={12} sm={6} md={4} >
                    <div style={{ margin: '-32px 0' }}>
                      <div style={{ margin: '32px 0' }}>
                        <ArticleListCard  {...data?.articleList[1]} />

                      </div>
                      <div style={{ margin: '32px 0' }}>
                        <ArticleListCard {...data?.articleList[2]} />

                      </div>
                    </div>
                  </Grid>
                  : <>
                    <Grid item xs={12} sm={6} md={4} >
                      <ArticleListCard  {...data?.articleList[1]} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} >
                      <ArticleListCard  {...data?.articleList[2]} />
                    </Grid>
                  </>
              }
              <Grid item xs={12} sm={6} md={4}>
                <ArticleListCard {...data?.articleList[3]} type={isTablet ? 'list' : 'card'} />
              </Grid>
            </Grid>
          </div>
        </div>

        <div className='container'>
          <div className='wrapper' style={{ padding: '30px 5%' }}>

            <div className='containerHead' style={{ marginBottom: 30, }}>
              <Typography variant='h2'>All Articles</Typography>
            </div>

            <Grid container spacing={isMobile ? 3 : 4}>

              {
                data.articleList?.map((article: ArticleListItemTypes) => {
                  return (
                    <Grid item key={article.id} xs={12} sm={6} md={4} >
                      <ArticleListCard {...article} />
                    </Grid>
                  )
                })
              }

            </Grid>
          </div>
        </div>

      </div>

      <SubscribeSection />

    </>

  );
}

export default Article;




const ArticlePageHeaderStyles = makeStyles({
  CarouselCard: {
    marginTop: '0px !important',
    position: 'relative',
    overflow: 'hidden',
  },
  imageWrap: {
    animation: 'none !important',
    margin: '0px !important',
    borderRadius: Theme.radius2,
    maxHeight: 'unset !important',
    minHeight: 260,
    position: 'relative',
  },
  imageWrap_M: {
    minHeight: '200px !important',
  },
  carouselActionButton: {
    backgroundColor: Theme.primary + '22',
    padding: 4,
    '& svg': {
      color: '#fff',
      fontSize: 24
    },
    '&.left': {
      marginRight: 10,
    },
    '&.right': {
      marginLeft: 10,
    },
  },
  InfoWrap: {
    position: 'absolute',
    bottom: 0,
    padding: '40px 20px 25px',
    background: 'linear-gradient(transparent ,#000c )',
    color: '#fff',
    '& .title': {
      marginBottom: 10,
      cursor:'pointer',
      '& h5': {
        color: '#fff',
        fontSize: 24,
      }
    },
    '& .detailWrap': {
      display: 'flex',
      margin: '0px -10px',
      '&>div': {
        display: 'flex',
        alignItems: 'center',
        margin: '0 10px',
        '& p': {
          fontSize: '14px !important',
          margin: '0px !important',
        },
        '& svg': {
          fontSize: 16,
          marginRight: 3,
        }
      },
      '& .shareButton': {
        padding: '8px',
        '& svg': {
          fontSize: 20,
          color: '#fff',
        }
      },
      '& .views': {

      },
      '& .commentCount': {


      },
    },
  },
  InfoWrap_M: {
    padding: '25px 10px 15px',
    '& .title': {
      marginBottom: 6,
      '& h5': {
        fontSize: 14,
      }
    },
    '& .detailWrap': {
      '&>div': {
        '& p': {
          fontSize: '12px !important',
        },
        '& svg': {
          fontSize: 14,
        }
      },
      '& .shareButton': {
        '& svg': {
          fontSize: 26,
        }
      },
    },
  },
  sideNewsWrap: {
  }
})

const makeCarouselList = (featuredArticles: FeaturedArticlesTypes) => {
  let list = [];
  const { main, side, bottom } = featuredArticles;
  list = [main, ...side, ...bottom];
  return list;

}

export const ArticlePageHeader = (props: { featuredArticles: FeaturedArticlesTypes }) => {

  const [carouselIndex, setCarouselIndex] = React.useState(0);
  let StepsCarouselIntervalRef: any = null;
  const StepsCarouselInterval = 4;   // time in seconds
  const isMobile = useMediaQuery('(max-width:600px)');
  const isTablet = useMediaQuery('(max-width:992px)');
  const router = useRouter();

  const customStyles = ArticlePageHeaderStyles();
  const [data, setData] = React.useState<ArticleListItemTypes[]>(null);
  const [featuredArticles, setFeaturedArticles] = React.useState<FeaturedArticlesTypes>(null);

  React.useEffect(() => {
    setData(makeCarouselList(props.featuredArticles));
    setFeaturedArticles(props.featuredArticles);
  }, [props?.featuredArticles])



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

  const ViewDetails = (slug: string) => {
    router.push({
      pathname: `${router.asPath}/${slug}`
    })
  }


  const renderCarouselItem = (item: ArticleListItemTypes, index: number) => {
    const { title, image, commentCount, views, publishedOn, readTime, voteCount, slug } = item;
    return (
      <div key={index} className={classNames('carouselCard', customStyles.CarouselCard)}>
        <div className={classNames('imageWrap', customStyles.imageWrap, { [customStyles.imageWrap_M]: isMobile })} >
          <img src={image ? image : defaultImage} alt='' />
        </div>
        <div className={classNames(customStyles.InfoWrap, { [customStyles.InfoWrap_M]: isMobile })}  >
          <div className='title' onClick={() => ViewDetails(slug)}>
            <h5 style={{ textAlign: 'left' }}>{title}</h5>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>

            <div className={'detailWrap'}>
              <div className='views'>
                <VisibilityOutlined />
                <Typography>{views}</Typography>
              </div>
              <div className='readTime'>
                <AccessTimeOutlined />
                <Typography>{readTime} read</Typography>
              </div>
              <div className='upVote'>
                <ThumbUpOutlined />
                <Typography>{voteCount}</Typography>
              </div>
              <div className='commentCount'>
                <CommentOutlined />
                <Typography>{commentCount} {!isMobile && 'comments'}</Typography>
              </div>
              <IconButton className='shareButton'>
                <ShareOutlined />
              </IconButton>
            </div>

            {
              !isMobile &&
              <div>
                <IconButton className={classNames(customStyles.carouselActionButton, 'left')} onClick={() => slideCaousel('prev')}>
                  <KeyboardArrowLeft />
                </IconButton>

                <IconButton className={classNames(customStyles.carouselActionButton, 'right')} onClick={() => slideCaousel('next')}>
                  <KeyboardArrowRight />
                </IconButton>
              </div>
            }

          </div>
        </div>
      </div >
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


      <div className={styles.cardContainer} style={{ backgroundImage: 'none' }} >
        <div className='container'>
          <div className={styles.pageContent}>

            <div>


              <Grid container spacing={isTablet ? 3 : 5}>
                <Grid item xs={12} md={8}>
                  <Grid container spacing={isMobile ? 3 : 4}>
                    <Grid item xs={12}>
                      <div className={styles.CarouselContainer} style={{ position: 'relative' }} >
                        <Carousel
                          autoPlay={false}
                          index={carouselIndex}
                          navButtonsAlwaysInvisible
                          indicators={false}
                          animation='slide'
                          timeout={500} >
                          {
                            data?.map((item: ArticleListItemTypes, index: number) => {
                              return renderCarouselItem(item, index);
                            })
                          }
                        </Carousel>
                      </div>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={isMobile ? 3 : 4}>
                        {
                          featuredArticles?.bottom?.map((article: ArticleListItemTypes) => {
                            return (
                              <Grid item key={article.id} xs={12} sm={6} >
                                <ArticleListCard {...article} />
                              </Grid>
                            )
                          })
                        }
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Grid container spacing={isMobile ? 3 : 4}>
                    {
                      featuredArticles?.side?.map((article: ArticleListItemTypes, index: number) => {
                        return (

                          <Grid item key={article.id} xs={12} sm={6} md={12} >
                            <ArticleListCard {...article} />
                          </Grid>
                        )
                      })
                    }
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}