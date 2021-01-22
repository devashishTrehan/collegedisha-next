
import { Grid, IconButton, Theme as MuiTheme, Typography, useMediaQuery } from '@material-ui/core';
import {  makeStyles } from '@material-ui/styles';
import * as React from 'react';
import {  Theme } from '../../Services/App.service';
import classNames from 'classnames';
import {  detailedArticle,  } from '@/Services/GraphQlDataTypes/article';
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
    The University is one of the top engineering college of India. It is a private
    university established in 2011 by the chairman Suneel Galgotia. The college is
    affiliated by Uttar Pradesh Government.  
    Galgotia University has two Campus. It offers 100s of Undergraduate and
    postgraduate programmes. The university is located in Greater Noida and has an
    enrollment of almost 15,000 students. They have all the facilities available
    in the college keeping the students as the priority. 150+ students are taking
    advantage of this scholarship provided by the institution. The placement of
    the college is highly praised. Students are placed in Fortune 500 Companies,
    MNCs & leading corporate. The university also gives 100% scholarship to
    excellent students. The campus is spread in 52 acres of area. They have 100+
    faculty and 180+ labs to imbibe the knowledge in every better way possible.
    
    Almost 1400 students can be accomodated in the hostel. Ac to healthy
    everything is supervised to provide excellent services to the student. The
    'student-first' formula helps the university to constantly stay on the top of
    the list of best colleges.
    
    every year highly reputed MNCs and companies visit here to get the best for
    their company. Faculty of the college is very cooperative and encourage
    students to explore their limits.  
      
    <table>  
    <tr>  
    <td>
    
    #### **Galgotias College Fees Structure (Official)**
    
    </td> </tr>  
    <tr>  
    <td>
    
    </td> </tr> </table>
    
    #### **Courses Details:**
    
    **The college offers 5 courses to students:**
    
      * Undergraduate Programmes
      * Postgraduate Programmes
      * Diploma Programmes
      * Integrated Programmes
      * Doctoral Programmes
    
    ### School of Electrical, Electronics & Communication Engineering
    
      * B.Tech in Electronics and Communication Engineering with specialization in the Internet of Things (IOT)
    
    #### Eligibility
    
      1. Minimum 60% in PCM (10+2)
      2. Merit in the Qualifying exam, IIT JEE, UPSEE etc preferable
    
    #### **Fees Structure**  
      
    <table>  
      <tr>  
        <td> <b>Duration</b> </td>  
        <td>  <b> 4 years </b></td>
      </tr>
    <tr>
      <td>Annual Fees</td>  
      <td rowspan='2'>1,49,000</td> 
    </tr>  
    <tr>
      <td>Exam Fee </td>  
    </tr> 
  </table>
    `,
  })


  const styles = useStyles();


  React.useEffect(() => {
  }, [])


  return (

    <>
      <ThisPageHeader {...data} />

      <div className='container' >
        <div className={'wrapper'} style={{ padding: '30px 5%' }}>

          <Grid container>
            <Grid item xs={12} md={9} >

              <div className={'pageSectionContainer'}>
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
      fontSize: 20,
      marginRight: 3,
      [theme.breakpoints.up('sm')]: {
        fontSize: 16,
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
                <img src={image ? image : defaultImage} alt='' />
              </div>
            </Grid>
          </Grid>


        </div >

      </div>
    </div >
  )
}