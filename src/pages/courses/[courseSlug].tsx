
import { Grid, IconButton, Theme as MuiTheme, Typography, useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import * as React from 'react';
import { GetPageInitialData, Theme } from '../../Services/App.service';
import classNames from 'classnames';
import { AccessTimeOutlined, CalendarToday, CommentOutlined, ShareOutlined, ThumbUpOutlined, VisibilityOutlined } from '@material-ui/icons';
import MarkdownParser from '@/Components/MarkdownParser.component';
import { detailedCourse, G_CourseDetailType } from '@/Services/DataTypes/Courses';
import { ApiResponseHandler, GetAllCourses, GetCourseDetails } from '@/Services/Api.service';
import { ApiResponse, PageSEOProps } from '@/Services/Interfaces.interface';
import { DataPageWrapper, pageStateType } from '@/Components/DataPageWrapper.component';
import PageSEO from '@/Components/PageSEO.component';


const useStyles = makeStyles({
  contentContainer: {

  }
})

const getData = async (params) => {

  return await GetCourseDetails(params);
}


const defaultImage = '/assets/images/defaults/course.webp';

interface Props {
  data: ApiResponse
}

function CourseDetails(props: Props) {

  const { responseType, result, pageSeo: __pageSeo } = GetPageInitialData(props.data);
  const [data, setData] = React.useState<G_CourseDetailType | null>(result ?? {});
  const [loading, setLoading] = React.useState(false);
  const [pageState, setPageState] = React.useState<pageStateType>(responseType);
  const [pageSEO, setPageSEO] = React.useState<PageSEOProps>(__pageSeo);
  const isMobile = useMediaQuery('(max-width:769px)');
  const isTablet = useMediaQuery('(max-width:992px)');
  const styles = useStyles();


  React.useEffect(() => {
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


  return (
    <>
      <PageSEO data={pageSEO} />
      <DataPageWrapper loading={loading} pageState={pageState} >

        <div className='container' >
          <div className={'wrapper'} style={{ padding: '30px 5%' }}>

            <Grid container>
              <Grid item xs={12} md={9} >
                <div className={'pageSectionContainer'}>

                  <ThisPageHeader {...data} />

                  <MarkdownParser content={data?.content} />
                </div>
              </Grid>
            </Grid>

          </div>
        </div>
      </DataPageWrapper>
    </>

  );
}

export default CourseDetails;

export async function getStaticPaths() {
  const res = await GetAllCourses()
  let courses = [];
  if (res) {
    courses = res?.data?.result;
  }

  let paths = courses?.map((course) => ({
    params: { courseSlug: course.slug }
  }))

  return { paths, fallback: true }
}

export async function getStaticProps({ params }) {

  let returnData = { props: { data: null }, revalidate: 1 }
  let response = await getData({ slug: params?.courseSlug });
  if (response) {
    returnData.props.data = response.data;
  }
  return returnData;

}


const ThisPageHeaderStyles = makeStyles((theme: MuiTheme) => ({
  container: {
  },
  imageWrap: {
    minHeight: '140px !important',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
    overflow: 'hidden',
    margin: '10px 0 30px 0',
    [theme.breakpoints.up('sm')]: {
      margin: '30px 0 50px 0',
    },
    '& img': {
      width: '100%',
      borderRadius: Theme.radius2,
    }
  },
  carouselActionButton: {
    backgroundColor: Theme.primary + '22',
    padding: 4,
    '& svg': {
      color: Theme.fontLight,
      fontSize: 24
    },
    '&.left': {
      marginRight: 10,
    },
    '&.right': {
      marginLeft: 10,
    },
  },
  infoContainer: {
    padding: '20px 10px 0px',
    color: Theme.fontLight,
    [theme.breakpoints.up('sm')]: {
      margin: '0px -10px',
    },
    '&>div': {
      display: 'flex',
      alignItems: 'center',
    },
    '& p': {
      fontSize: '10px !important',
      margin: '0px !important',
      [theme.breakpoints.up('sm')]: {
        fontSize: '14px !important',
      },
    },
    '& svg': {
      fontSize: 14,
      marginRight: 3,
      [theme.breakpoints.up('sm')]: {
        fontSize: 20,
        marginRight: 5,
      },
    }
  },
  InfoWrap: {
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    '& .title': {
      marginBottom: 10,
      '& h5': {
        color: Theme.primary,
        fontSize: 16,
        [theme.breakpoints.up('sm')]: {
          fontSize: 24
        },
        [theme.breakpoints.up('md')]: {
          fontSize: 26
        }
      }
    },
    '& .detailWrap': {
      display: 'flex',
      margin: '0 -10px',
      '&>div': {
        display: 'flex',
        alignItems: 'center',
        margin: '0 10px',

      },
      '& .shareButton': {
        padding: '8px',
        '& svg': {
          fontSize: 20,
          color: Theme.fontColor

        }
      },
    },
  },
}))


const defaultBanner = '/assets/images/defaults/banner.webp';

const ThisPageHeader = (props: G_CourseDetailType) => {

  const isMobile = useMediaQuery('(max-width:600px)');
  const isTablet = useMediaQuery('(max-width:992px)');

  const [data, setData] = React.useState<G_CourseDetailType>(null);
  const { title, banner, commentCount, views, publishedOn, readTime, voteCount } = data ?? {};

  React.useEffect(() => {
    setData(props);
  }, [props])

  const customStyles = ThisPageHeaderStyles(banner);


  return (
    <div className={customStyles.container}>

      <div className={classNames(customStyles.InfoWrap)}  >
        <div className='title'>
          <h5 style={{ textAlign: 'left' }}>{title}</h5>
        </div>



        <div className={customStyles.infoContainer}>

          <div className='publishedDate'>
            <CalendarToday />
            <Typography >{publishedOn}</Typography>
          </div>

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

        </div>
      </div>

      <div className={classNames(customStyles.imageWrap)} >
        <img src={banner ? banner : defaultImage} alt='' />
      </div>

    </div >
  )
}