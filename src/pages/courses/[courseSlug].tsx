
import { Grid, IconButton, Theme as MuiTheme, Typography, useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import * as React from 'react';
import { Theme } from '../../Services/App.service';
import classNames from 'classnames';
import { detailedArticle, } from '@/Services/DataTypes/article';
import { AccessTimeOutlined, CalendarToday, CommentOutlined, ShareOutlined, ThumbUpOutlined, VisibilityOutlined } from '@material-ui/icons';
import MarkdownParser from '@/Components/MarkdownParser.component';


const useStyles = makeStyles({
  contentContainer: {

  }
})

const defaultImage = '/assets/images/defaults/article.jpg';

function Article(props: any) {

  const isMobile = useMediaQuery('(max-width:600px)');
  const isTablet = useMediaQuery('(max-width:992px)');

  const [data, setData] = React.useState<detailedArticle | null>({
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
    banner: '',
    content: `
    Hierank Business School is a private college. MBA program of the college is
    affiliated to Dr. Abdul Kalam Technical University. It was established in 2006
    since then it has managed to remain in the list of top engineering colleges of
    Noida. The Integrated campus Approved by AICTE. The college works under ABR
    Education Foundation which is a non-profitable foundation. It was established
    by Rajesh Sahay who is the former director of Amity.\
    College provides Total 5 UG and PG Programmes. Admission in the college is
    done on the basis of Entrance Exam.\
    With the help of experience and cooperative faculty, it becomes easier for
    students to soar higher. Highly reputed companies visit campus for placement.
    Till now their highest package is 18 lakhs while their average package is 3.2
    lakh.
    
    Hierank Business School also provides scholarship which is done on the basis
    of scores obtained by the candidate in the National Level Entrance Test called
    as Board Analysis Test (BAT), conducted by CAT 7.
    
    #### Courses and Fees
    
    - Master of Business Administration (MBA)
    - Bachelor of Business Administration (BBA)
    - Bachelor of Computer Application (BCA)
    - Bachelor of Education (B.Ed.)
    - Post Graduate Programme in Hospital Administration (PGPHA)
    
    #### Eligibility Criteria
    
    <table>  
    <tr>  
    <td>#### **Name of Courses**</td>  
    <td>#### **Eligibility**</td>  
    <td>#### **Selection Criteria**</td>
    </tr>  
    <tr>  
    <td>Bachelor of Education (B.Ed.)</td>  
    <td>10+2 with at least 50% marks in aggregate</td>  
    <td>Scored obtained in the Entrance Exam conducted by UP Govt. followed by GD & PI
    held at the Institute</td>
    </tr>  
    <tr>  
    <td>Bachelor of Computer Application (BCA)</td>  
    <td>10+2 with at least 45% marks in aggregate</td>  
    <td>On basis of candidates performance in GD & PI conducted by the Institute</td>
    </tr>  
    <tr>  
    <td>Bachelor of Business Administration (BBA)</td>
    </tr>  
    <tr>  
    <td>Master of Business Administration (MBA)</td>  
    <td>Graduation with minimum 50% marks in aggregate</td>  
    <td>UPSEE/ CMAT/ CAT/ MAT/ ATMA Entrance Exam Score followed by GD & PI held at
the Institute</td>
</tr>  
<tr>  
<td>Post Graduate Programme in Hospital Administration (PGPHA)</td>
</tr>
</table>

#### Fees Structure

#### Master of Business Administration (MBA)

<table>  
<tr>  
<td>**1st year**</td>  
<td>**2nd year**</td>  
<td>**Grand Total**</td>
</tr>  
<tr>  
<td>180,000</td>  
<td>130,000</td>  
<td>310,000</td>
</tr>
</table>

#### Bachelor of Education (B.Ed.)

<table>  
<tr>  
<td>**1st year**</td>  
<td>**2nd year**</td>  
<td>**Grand Total**</td>
</tr>  
<tr>  
<td>58,750</td>  
<td>30,000</td>  
<td>88,750</td>
</tr>
</table>

#### BACHELOR OF BUSINESS ADMINISTRATION (BBA)

<table>  
<tr>  
<td>**1st year**</td>  
<td>**2nd year**</td>  
<td>**3rd year**</td>  
<td>**Grand Total**</td>
</tr>  
<tr>  
<td>80,000</td>  
<td>75,000</td>  
<td>75,000</td>  
<td>230,000</td>
</tr>
</table>

#### BACHELOR OF COMPUTER APPLICATION (BCA)

<table>  
<tr>  
<td>**1st year**</td>  
<td>**2nd year**</td>  
<td>**3rd year**</td>  
<td>**Grand Total**</td>
</tr>  
<tr>  
<td>80,000</td>  
<td>75,000</td>  
<td>75,000</td>  
<td>230,000</td>
</tr>
</table>`,
  })


  const styles = useStyles();


  React.useEffect(() => {
  }, [])


  return (

    <>

      <div className='container' >
        <div className={'wrapper'} style={{ padding: '30px 5%' }}>

          <Grid container>
            <Grid item xs={12} md={9} >
              <div className={'pageSectionContainer'}>

                <ThisPageHeader {...data} />

                <MarkdownParser content={data.content} />
              </div>
            </Grid>
          </Grid>

        </div>
      </div>
    </>

  );
}

export default Article;



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


const defaultBanner = '/assets/images/defaults/banner.jpg';
const ThisPageHeader = (props: detailedArticle) => {

  const isMobile = useMediaQuery('(max-width:600px)');
  const isTablet = useMediaQuery('(max-width:992px)');

  const [data, setData] = React.useState<detailedArticle>(null);
  const { title, image, commentCount, views, publishedOn, readTime, voteCount, banner } = data ?? {};

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
        <img src={image ? image : defaultImage} alt='' />
      </div>


    </div >
  )
}