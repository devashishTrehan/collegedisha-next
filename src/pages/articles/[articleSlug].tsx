import { Grid, IconButton, Theme as MuiTheme, Typography, useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import * as React from 'react';
import { GetPageInitialData, Theme } from '../../Services/App.service';
import classNames from 'classnames';
import { detailedArticle, } from '@/Services/DataTypes/article';
import { AccessTimeOutlined, CalendarToday, CommentOutlined, ShareOutlined, ThumbUpOutlined, VisibilityOutlined } from '@material-ui/icons';
import MarkdownParser from '@/Components/MarkdownParser.component';
import { ApiResponseHandler, GetAllArticles, GetArticleDetails } from '@/Services/Api.service';
import { DataPageWrapper, pageStateType } from '@/Components/DataPageWrapper.component';
import { PageSEOProps } from '@/Services/Interfaces.interface';
import PageSEO from '@/Components/PageSEO.component';


const useStyles = makeStyles({
  contentContainer: {

  }
})

const getData = async (params) => {

  return await GetArticleDetails(params);
}

const defaultImage = '/assets/images/defaults/article.webp';

function Article(props: any) {

  const { responseType, result, pageSeo: __pageSeo } = GetPageInitialData(props.data);

  const [data, setData] = React.useState<detailedArticle | null>(result ?? {})
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



  return (
    <>
      <PageSEO data={pageSEO} />
      <DataPageWrapper loading={loading} pageState={pageState} >
        <>
          <ThisPageHeader {...data} />

          <div className='container' >
            <div className={'wrapper'} style={{ padding: '30px 5%' }}>

              <Grid container>
                <Grid item xs={12} md={9} >

                  <div className={'pageSectionContainer'}>
                    <MarkdownParser content={data?.content} />
                  </div>
                </Grid>
              </Grid>

            </div>
          </div>
        </>
      </DataPageWrapper>
    </>
  );
}

export default Article;


export async function getStaticPaths() {
  const res = await GetAllArticles({ userId: 1, token: '' })
  let articles = [];
  if (res) {
    articles = res?.data?.result;
  }

  let paths = articles.map((article) => ({
    params: { articleSlug: article.slug }
  }))

  return { paths, fallback: true }
}


export async function getStaticProps({ params }) {

  let returnData = { props: { data: null }, revalidate: 1 }
  let response = await getData({ slug: params?.articleSlug });
  if (response) {
    returnData.props.data = response.data;
  }
  return returnData;

}


const ThisPageHeaderStyles = makeStyles((theme: MuiTheme) => ({
  container: {
  },
  imageWrap: {
    margin: '0px !important',
    minHeight: '200px !important',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
    overflow: 'hidden',
    '& img': {
      width: '100%',
      borderRadius: Theme.radius2,
    }
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
  infoContainer: {
    padding: '20px 10px 0px',
    [theme.breakpoints.up('sm')]: {
      margin: '0px -10px',
    },
    '&>div': {
      display: 'flex',
      alignItems: 'center',
    },
    '& p': {
      fontSize: '12px !important',
      margin: '0px !important',
      [theme.breakpoints.up('sm')]: {
        fontSize: '14px !important',
      },
    },
    '& svg': {
      fontSize: 16,
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
    width: '100%',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    // background: 'radial-gradient(#0006,transparent )',
    color: '#fff',
    '& .title': {
      marginBottom: 10,
      '& h5': {
        color: '#fff',
        fontSize: 14,
        [theme.breakpoints.up('sm')]: {
          fontSize: 24
        },
        [theme.breakpoints.up('md')]: {
          fontSize: 28
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
          color: '#fff',

        }
      },
    },
  },
}))


const defaultBanner = '/assets/images/defaults/banner.webp';
const ThisPageHeader = (props: detailedArticle) => {

  const isMobile = useMediaQuery('(max-width:600px)');
  const isTablet = useMediaQuery('(max-width:992px)');

  const [data, setData] = React.useState<detailedArticle>(null);
  const { title, banner, commentCount, views, publishedOn, readTime, voteCount, thumbnail } = data ?? {};

  React.useEffect(() => {
    setData(props);
  }, [props])

  const customStyles = ThisPageHeaderStyles(banner);


  return (

    <div className='container' style={{
      backgroundImage: `url(${banner ? banner : defaultBanner})`,

    }}>
      <div className={'wrapper'} style={{ padding: '30px 5%' }}>

        <div className={customStyles.container}>

          <Grid container spacing={isTablet ? 3 : 5} >
            <Grid item xs={12} md={6} >
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
            </Grid>

            <Grid item xs={12} md={6}>
              <div className={classNames(customStyles.imageWrap)} >
                <img src={thumbnail ? thumbnail : defaultImage} alt='' />
              </div>
            </Grid>
          </Grid>


        </div >

      </div>
    </div >
  )
}

