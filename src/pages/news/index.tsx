
import { Grid, Hidden, IconButton, MenuItem, Select, Typography, useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import * as React from 'react';
import { Routes, Theme } from '@/Services/App.service';
import classNames from 'classnames';
import { PageHead } from '@/Components/PageHead.component';
import { ViewportTracker } from '@/Components/ViewportTracker.component';
import { Footer } from '@/Components/Footer.component';
import CustomBreadCrumb from '@/Components/CustomBreadCrumb.component';
import { CheckCircle, Filter, KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import { Filters } from '@/Components/Filter.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { boardTypes, BoardListTypes, BoardListItemTypes } from '@/Services/GraphQlDataTypes/Boards';
import { useRouter } from 'next/router';
import SelectField from '@/Components/SelectField.component/SelectField.component';
import { AnimatedSection } from '@/Components/AnimatedView.component';
import { ContentCardStyles } from '@/styles/Home.style';
import Carousel from 'react-material-ui-carousel';
import { NewsListItemTypes } from '@/Services/GraphQlDataTypes/News';


const useStyles = makeStyles({
  wrapper: {
    padding: ' 0px 5% 50px',
  },
  CardContainer: {
    width: 300,
    minHeight: 100,
    margin: 'auto',
    maxWidth: '100%',
    height: '100%',
    alignItems: 'center',
    background: Theme.backgroundColor,
    borderRadius: Theme.radius2,
    boxShadow: Theme.boxShadow,
    '& .topSecWrap': {
      cursor: 'pointer',
      width: '100%',
    }
  },
  CardContainer_M: {
    width: '100%',
    '& .topSecWrap': {
      display: 'flex',
      flexDirection: 'row',
    }
  },
  CardImageSection: {
    width: '100%',
    '& .imageWrap': {
      maxHeight: 200,
      width: '100%',
      height: '100%',
    },
  },
  CardImageSection_M: {
    width: 100,
    height: '100%',
    '& .imageWrap': {
      width: '100%',
      display: 'flex',
      maxHeight: 100,
      alignItems: 'center',
      justifyContent: 'center',
      '& img': {
        maxWidth: '100%',
      }
    },

  },
  CardInfoSetion: {
    padding: '20px 20px 0',
    textAlign: 'left',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    textTransform: 'capitalize',
    '& .nameContainer': {

      '& .productName': {
        color: Theme.fontColorSecondary,
        fontFamily: 'gorditaMedium',
        fontSize: 18,
      },
    },


  },
  CardFooterSection: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    padding: '0 20px 20px',
    '& .classes': {
      padding: 0,
      textAlign: 'left',
      '& .label': {
        color: '#888',
        fontSize: 14,
        marginRight: 5,
      },
      '& p': {
        display: 'inline-block',
        '& a': {
          color: Theme.secondaryFontColor,
          textDecoration: 'none',
          fontSize: 14,
          fontFamily: 'gorditaMedium',
          margin: '2px 10px 2px 0',
          padding: '3px 10px 3px 0',
        }
      }
    }
  },
  CardInfoSetion_M: {
    padding: '10px 10px 0',
    width: 'calc(100% - 100px)',
    '& .nameContainer': {

      '& .productName': {
        color: Theme.fontColorSecondary,
        fontFamily: 'gorditaMedium',
        fontSize: 15,
      },
    },

  },
  cardFooterSection_M: {
    padding: ' 0 10px 10px',
    '& .classes': {
      '& .label': {
        fontSize: 12,
      },
      '& p': {
        '& a': {
          fontSize: 12,
        }
      }
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
    },
    '& .pageHeading2': {
      fontSize: '2.5rem',
      marginTop: 8,
      fontFamily: 'gorditaBold',
    }
  },
  pageHead_M: {
    color: Theme.primary,
    '& .pageHeading1': {
      fontSize: '1.8rem',
    },
    '& .pageHeading2': {
      fontSize: '2rem',
      marginTop: 8,
    }
  },
})

const breadcrumbs = [{ name: 'boards', endPoint: `${Routes.Boards}` }];

const RenderBoardCard = (props: BoardListItemTypes) => {

  const { id, name, image, boards, slug } = props;
  const isMobile = useMediaQuery('(max-width:600px)');
  const isTablet = useMediaQuery('(max-width:992px)');
  const [selectedBoard, setSelectedBoard] = React.useState<string>('');
  const [classList, setClassList] = React.useState<string[]>([]);
  const router = useRouter();



  const styles = useStyles();

  const ViewDetails = (slug: string) => {
    router.push({
      pathname: `${router.pathname}/${slug}`
    })
  }

  const setSelectOptions = (value: string = '') => {
    let boardName = '';
    let boardClasses = [];
    if (value) {
      for (let i = 0; i < boards.length; i++) {
        if (value === boards[i].name) {
          boardName = boards[i].name;
          boardClasses = boards[i].classes;
          break;
        }
      }
    } else {
      boardName = boards[0].name;
      boardClasses = boards[0].classes;
    }

    setSelectedBoard(boardName);
    setClassList(boardClasses);
  }

  React.useEffect(() => {
    setSelectOptions();
  }, [])

  const selectBoard = (value: string) => {
    console.log(value);
    setSelectOptions(value);
  }

  const handleSelectClick = (event) => {
    event.stopPropagation();
    console.log('handling SelectClick')
  }


  return (
    <div className={classNames(styles.CardContainer, { [styles.CardContainer_M]: isMobile })}>

      <div onClick={() => ViewDetails(slug)} className='topSecWrap'>
        <div className={classNames(styles.CardImageSection, { [styles.CardImageSection_M]: isMobile })}>
          <div className={'imageWrap'}>
            <img src={image ? image : defaultImage} alt={name} />
          </div>
        </div>

        <div className={classNames(styles.CardInfoSetion, { [styles.CardInfoSetion_M]: isMobile })}>
          <div className={'nameContainer'}>
            <Typography className={'productName'} >{name}</Typography>
          </div>

          <div style={{ margin: '5px 0' }} >
            {
              boards?.length >= 2 ?
                <SelectField
                  onClick={handleSelectClick}
                  containerStyle={{ display: 'inline-block', height: isMobile ? 30 : 38, minWidth: isMobile ? 140 : '70%', }}
                  value={selectedBoard}
                  onValueChange={(event) => selectBoard(event.target.value)}
                >
                  {
                    boards.map((board: boardTypes) => {
                      return (<MenuItem style={{ minHeight: 40 }} value={board.name}>{board.name}</MenuItem>)
                    })
                  }
                </SelectField>
                : null
            }
          </div>
        </div >
      </div>

      <div className={classNames(styles.CardFooterSection, { [styles.cardFooterSection_M]: isMobile })}>
        <div className='classes'>
          <Typography className='label'>classes:</Typography>
          {
            classList?.map((className: string, index: number) => {
              return (
                <p>
                  <a
                    // href={ }
                    style={
                      (classList?.length - 1) !== index
                        ? { borderRight: '1px solid #ccc' }
                        : {}}>{className}</a>
                </p>
              )
            })
          }
        </div>
      </div>

    </div >
  )
}

const defaultImage = '/assets/images/defaults/institute.jpg'

function BoardList(props: any) {

  const isMobile = useMediaQuery('(max-width:600px)');
  const isTablet = useMediaQuery('(max-width:992px)');
  const [currentSection, setCurrentSection] = React.useState<number | null>(null);
  const router = useRouter();



  const styles = useStyles();


  const newsList: NewsListItemTypes[] = []

  const ViewDetails = (slug: string) => {
    router.push({
      pathname: `${router.pathname}/${slug}`
    })
  }




  React.useEffect(() => {
  }, [])


  return (

    <>

      <CustomBreadCrumb breadcrumbs={breadcrumbs} />



      <div>
        <NewsPageHeader />
      </div>

      <div className='container'>
        <div className={'wrapper'} style={{ padding: '20px 5%' }}>
          <Filters />
        </div>
      </div>


      <div className='container'>
        <div className={'wrapper'}>

          <Grid container spacing={isMobile ? 3 : 5}>

            {
              newsList?.map((board) => {
                return (
                  <Grid item xs={12} sm={6} md={4}>

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


export default BoardList;


const NewsPageHeaderStyles = makeStyles({
  carouselActionButton: {
    position: 'absolute',
    top: 'calc(50% - 15px)',
    backgroundColor: Theme.primary + '22',
    padding: 2,
    margin: '0 10px',
    '& svg': {
      color: Theme.primary,
      fontSize: 30
    },
    '&.left': {
      left: -15,
    },
    '&.right': {
      right: -15,

    },
  }
})

export const NewsPageHeader = () => {

  const [carouselIndex, setCarouselIndex] = React.useState(0);
  let StepsCarouselIntervalRef: any = null;
  const StepsCarouselInterval = 10;   // time in seconds
  const isMobile = useMediaQuery('(max-width:600px)');
  const isTablet = useMediaQuery('(max-width:992px)');

  const cutomStyles = NewsPageHeaderStyles();

  const newsItems: NewsListItemTypes[] = [
    {
      id: 1,
      title: 'title',
      views: 123,
      commentCount: 12,
      slug: 'xyz',
      image: '',
      author: 'dev trehan',
      publishedOn: '23-12-2020',
      isSaved: false,
      category: 'news',
    },
    {
      id: 1,
      title: 'title',
      views: 123,
      commentCount: 12,
      slug: 'xyz',
      image: '',
      author: 'dev trehan',
      publishedOn: '23-12-2020',
      isSaved: false,
      category: 'news',
    },
    {
      id: 1,
      title: 'title',
      views: 123,
      commentCount: 12,
      slug: 'xyz',
      image: '',
      author: 'dev trehan',
      publishedOn: '23-12-2020',
      isSaved: false,
      category: 'news',
    },
    {
      id: 1,
      title: 'title',
      views: 123,
      commentCount: 12,
      slug: 'xyz',
      image: '',
      author: 'dev trehan',
      publishedOn: '23-12-2020',
      isSaved: false,
      category: 'news',
    },
  ]


  const styles = ContentCardStyles();

  let CarouselRef = React.useRef();

  const slideCaousel = (direction: 'next' | 'prev') => {
    console.log('playing...');
    switch (direction) {
      case 'next': setCarouselIndex((prev: number) => {
        if (prev < newsItems.length - 1) {
          let next = ++prev;
          return next;
        } else {
          return 0;
        }
      })
        return;
      case 'prev': setCarouselIndex((prev: number) => {
        if (prev < 1) {
          return newsItems?.length - 1;
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


  const renderStep = (item: NewsListItemTypes, index: number) => {
    return (
      <React.Fragment key={item.id}>

      </React.Fragment>

    )
  }

  const renderCarouselItem = (item: NewsListItemTypes, index: number) => {
    const { title, image, commentCount, views, } = item;
    return (
      <div key={index} className='carouselCard'>
        <div className='imageWrap' style={{ animation: 'none' }}>
          <img src={`/assets/images/stepPoint${1}.png`} alt='' />
        </div>
        <div className='infoWrap' >
          <h5>{title}</h5>
        </div>
      </div>
    )
  }

  const PlayCarouselSlide = () => {
    console.log('entered');
    StepsCarouselIntervalRef = setInterval(() => {
      slideCaousel('next');
    }, StepsCarouselInterval * 1000)
  }

  const PauseCarouselSlide = () => {
    console.log('exited');
    clearInterval(StepsCarouselIntervalRef);
  }

  return (
    <div style={{ padding: `${isMobile ? 20 : 30}px 0px` }} >


      <ViewportTracker id='contentPage' onEnter={() => PlayCarouselSlide()} onLeave={() => PauseCarouselSlide()} >
        <div className={styles.cardContainer} style={{ backgroundImage: 'none' }} >
          <div className='container'>
            <div className={styles.pageContent}>

              <Grid container spacing={isTablet ? 3 : 9} >

                <Grid item xs={12} md={8}>

                  <div className={styles.CarouselContainer} style={{ position: 'relative' }}>
                    <Carousel
                      autoPlay={false}
                      index={carouselIndex}
                      navButtonsAlwaysInvisible
                      indicators={false}
                      animation='slide'
                      timeout={500} >
                      {
                        newsItems.map((item: NewsListItemTypes, index: number) => {
                          return renderCarouselItem(item, index);
                        })
                      }
                    </Carousel>

                    <IconButton className={classNames(cutomStyles.carouselActionButton, 'left')} onClick={() => slideCaousel('prev')}>
                      <KeyboardArrowLeft />
                    </IconButton>

                    <IconButton className={classNames(cutomStyles.carouselActionButton, 'right')} onClick={() => slideCaousel('next')}>
                      <KeyboardArrowRight />
                    </IconButton>
                  </div>
                </Grid>

                <Hidden smDown>

                  <Grid item xs={12} md={4} style={{ position: 'relative' }}>
                    not hidden
                  <div className={classNames(styles.StepsContainer, { [styles.StepsContainer_T]: isTablet, [styles.StepsContainer_M]: isMobile })}>
                      {
                        newsItems.map((item: NewsListItemTypes, index: number) => {
                          return renderStep(item, index);
                        })
                      }
                    </div>
                  </Grid>
                </Hidden>

              </Grid>

            </div>
          </div>
        </div>
      </ViewportTracker >
    </div >
  )
}