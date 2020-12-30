
import { Grid, Hidden, Typography, useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import * as React from 'react';
import { Footer } from '@/Components/Footer.component';
import { Theme } from '@/Services/App.service';
import classNames from 'classnames';

const useStyles = makeStyles({
  wrapper: {
    padding: '30px 5%',
  },
  sectionHead: {
    '& .heading1': {
      fontSize: '30px',
    },
    '& .bodyText': {
      fontSize: '14px',
    }
  },
  card: {
    boxShadow: Theme.boxShadow,
    borderRadius: Theme.radius2,
    width: 250,
    minHeight: 250,
    display: 'flex',
    transition: '.5s',
    overflow: 'visible',
    position: 'relative',
    background: '#fff',
    margin: 'auto',
    '&:hover': {
      transform: 'scale(1.06)',
      '&::before': {
        transform: 'scale(1.20)',
      },
    },
    '&::before': {
      transition: '.5s',
      zIndex: -1,
      content: '""',
      backgroundImage: `url(/assets/images/DotsShape1.png),url(/assets/images/counsellingShape2.png)`,
      backgroundPosition: 'left top,right bottom',
      backgroundSize: '50px auto,50px auto',
      backgroundRepeat: 'no-repeat',
      transform: 'scale(0.9)',
      width: '100%',
      height: '100%',
      position: 'absolute',
      // filter: 'blur(3px)'
    },
    '& .infoCard ': {
      margin: 'auto',
      width: '300px',
      minHeight: '250px',
      padding: '30px',
      maxWidth: '100%',
      borderRadius: '10px',
      backgroundColor: '#fff',
      scrollbarWidth: 'thin',
      scrollbarColor: `${Theme.primary} #fff0`,
      display: 'flex',
      flexDirection: 'column',
      '& .imageWrap': {
        width: '45px',
        height: '45px',
        margin: 'auto',
        marginBottom: '10px',

        '& img ': {
          width: '100%',
          height: '100%',
        }
      },

      '& .title': {
        fontSize: '16px',
        fontWeight: 600,
        margin: '10px 0',
        color: Theme.primary,
        textTransform: 'uppercase',
      },

      '& .infoText': {
        color: Theme.fontColor,
        flexGrow: 1,
        fontSize: '12px',
        fontWeight: 600,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }
    }
  },
  midSecWrap: {
    backgroundImage: `url('/assets/images/AboutQuoteBg.png')`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    position: 'relative',
    '& .decoItem': {
      position: 'absolute',
    },
    '& .decoItem:nth-child(odd)': {
      animation: 'translateX 3s linear infinite',
    },
    '& .decoItem:nth-child(even)': {
      animation: 'translateY 3s linear infinite',
    }

  },
  AboutInfo: {
    textAlign: 'left',
    fontSize: 14,
    '& p': {
      margin: '10px 0',
      lineHeight: '24px',

    },
    '& ul': {
      paddingLeft: 16,
      fontSize: 14,
      '& li': {
        marginBottom: 5
      }
    }

  }
})

function About(props: any) {

  const isMobile = useMediaQuery('(max-width:600px)');
  const isTablet = useMediaQuery('(max-width:992px)');
  const [__window, setWindow] = React.useState<null | Window>(null);

  React.useEffect(() => {
    setWindow(window);
  }, [])

  const styles = useStyles();

  const SectionList: Section[] = [
    {
      title: 'Education Guest Post', list: {
        listItems:
          [
            'Writing for College Disha is simply an exciting opportunity for those who are passionate about writing, imparting knowledge, acumen, and analysis',
            'College Disha is the best education guest posting site for individuals who aspire to connect with Global community that would further support learners, educators, and leaders in the education community. This will also embellish your portfolio, upgrade your recognition and assist you to develop professionally.',
            'We are hereby looking for professors, principals, teachers, school executives, psychologists, researchers, educational consultants, and PhD students. We also welcome professionals with fresh ideas, interesting comments, and practical advice.',
            'College Disha is a guest posting site for education blogs/guest posting site for education article that helps students to grab more information relevant to education.'
          ]
      }, image: 'section1Image1.svg'
    },
    {
      title: 'Education Guest Posting Site for Blog & Article',
      description: ['College disha content is the most authentic Educational Guest Posting site that provides you the platform to reach a large community of teachers and parents. This site is helping them to increase the educational achievement of children (students) and young people(teachers/parents). Education Guest Post is a website is for education blogs and education articles where students grab more information related to education and studies.'],
      image: 'section1Image1.svg'
    },
    {
      title: 'Education Guest Posting Site for Blog & Article',
      description: ['Education Guest Posting Site for articles should not be written in more than 800 words. Articles should be written with proper research and knowledge. And there will not be copied any article or translated from other site. Wide range of articles accepted in Educational Guest Post Site.'],
      list: {
        listTitle: 'The following Guidelines for writing articles on Education Guest Post site and that are as follows:',
        listItems: [
          'Articles for Education Guest Post Site is written with word limit of around 800 words.',
          'Articles are always original with descriptive title for the post.',
          'Not a single cliche word or sentence written or use in your article.',
          'Articles must be written with correct punctuation.',
          'And it should not be any spelling errors in your articles while post it on site.'

        ]
      }, image: 'section1Image1.svg'
    },
    {
      title: 'Articles topics:',
      list: {
        listTitle: 'Articles on any topic relevant students and teachers:',
        listItems: [
          'Articles based on Internet Safety and using Internet.',
          'Articles written on special education.',
          'Article on making learning fun/ easy for students.',
          'Some of the articles written with the relevant topics of courses and subjects for students.',

        ]
      }, image: 'section1Image1.svg'
    },
    {
      title: 'Education Guest Posting Site for Blogs:',
      description: [
        'For Blogs Education Guest Post Site is a website where word limit is around 800 words. And here writing for blogs, the content should be pure and fresh. Content should not be copied from other blog / website. Writing for blogs is not so tricky because the topics are relevant to the education purpose. Main users are our students, we are welcome them with fresh ideas, and interesting comments.',
        'We are writing for the blogs on the website ‘Education Guest Post’. The limited changes that we can edit or changing the heading tags, formatting the text, resizing the image etc.',
      ],
      image: 'section1Image1.svg'
    },
    {
      title: 'Benefits for Blogs:',
      list: {
        listTitle: 'Everyone knows that benefits of Education Guest Post site for blogs are important. So, here are some benefits given below:',
        listItems: [
          'One of the benefits for blogs is to get high quality, targeted and niche specific backlinks.',
          'Blogs targeting more traffic on the website Education Guest Post.',
          'Blogs are written for branding purposes.',
          'It is written for describing the specific topic relevant to education in details.',
          'Blogs can build relationships between bloggers, other bloggers and it users or readers through comment section with practical advice.'
        ]
      }, image: 'section1Image1.svg'
    },
  ]


  interface Section {
    title: string,
    description?: string[],
    list?: { listTitle?: string, listItems: string[] },
    image: string,
  }

  interface SectionProps {
    section: Section,
    index: number
  }

  const RenderPageSection = (props: SectionProps) => {

    const { index, section: { title, description, image, list } } = props;


    return (
      <div key={index} className='container'>

        <div className={styles.wrapper}>

          <Grid container spacing={8} direction={index % 2 == 0 ? 'row-reverse' : 'row'}>

            <Grid item xs={12} md={6}>


              <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
                <div style={{ textAlign: 'left' }}>
                  <div className={classNames('sectionHead', styles.sectionHead)} style={{ margin: '0 0 0 -3px' }}>
                    <h2 className='heading1' >{title}</h2>
                  </div>
                </div>
                <div className={styles.AboutInfo}>
                  {
                    description?.length ?
                      <div>
                        {

                          description.map((descriptionText: string, index: number) => {
                            <p key={index}>{descriptionText}</p>
                          })
                        }
                      </div>
                      : null
                  }

                  <ul>

                    {
                      list?.listTitle ?
                        <h5>{list?.listTitle}</h5>
                        : null
                    }
                    {
                      list?.listItems?.length ?
                        list?.listItems.map((item: string, index: number) => {
                          <li key={index}>{item}</li>
                        })
                        : null
                    }
                  </ul>
                </div>
              </div>

            </Grid>

            <Hidden smDown>
              <Grid item xs={12} md={6}>
                <div>
                  <div className='RightImageWrap'>
                    <img src={`/assets/images/${image}`} alt={image} />
                  </div>

                </div>
              </Grid>
            </Hidden>
          </Grid>

        </div>

      </div>
    )
  }

  const PageSection = React.useMemo(() => RenderPageSection, []);

  React.useEffect(() => {
  }, [])


  return (

    <>


      {
        SectionList?.map((section: Section, index: number) => {
          return <PageSection index={index} section={section} />
        })
      }

      <div className={classNames('container', styles.midSecWrap)}>
        {
          !isTablet && (
            <>
              <div className='decoItem' style={{ top: 60, left: 250 }}><img src='/assets/images/innerShape4.png' alt='' /></div>
              <div className='decoItem' style={{ bottom: 10, left: 10 }}><img src='/assets/images/innerShape1.png' alt='' /></div>
              <div className='decoItem' style={{ top: 0, right: 30 }}><img src='/assets/images/innerShape3.png' alt='' /></div>
              <div className='decoItem' style={{ bottom: 50, right: 80 }}><img src='/assets/images/innerShape1.png' alt='' /></div>
              <div className='decoItem' style={{ top: 45, left: 75 }}><img src='/assets/images/innerShape2.png' alt='' /></div>
            </>
          )
        }
        <div className='wrapper' style={{ margin: `40px 0` }}>
          <div style={{ color: '#fff', padding: '30px 0', }}>
            <Typography variant='h5' style={{ fontFamily: 'gorditaMedium', marginBottom: 10 }}>"We are here to help you building your career"</Typography>
            <Typography variant='h6'>Find the best career guidance and get admitted to top eminent institutes </Typography>
          </div>
        </div>
      </div>

      <Footer />
    </>

  );
}

export default About;
