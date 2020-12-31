
import { Grid, Hidden, Table, Typography, useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import * as React from 'react';
import { Footer } from '@/Components/Footer.component';
import { Theme } from '@/Services/App.service';
import classNames from 'classnames';
import { AnimatedSection } from '@/Components/AnimatedView.component';

const useStyles = makeStyles({
  headBG: {
    backgroundImage: 'url("/assets/images/advertiseImages/headBG.png")',
    backgroundSize: '50%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '0px',
    position: 'relative',
    '& .backImage': {
      position: 'absolute',
      width: '50%',
      maxWidth: '450px',
      right: 0,
      bottom: 0,
    }
  },
  wrapper: {
    padding: '30px 5%',
  },
  pageHead: {
    '& .content': {
      textAlign: 'left',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      height: '100%',
      '&>p': {
        fontWeight: 600,
        color: Theme.primary
      },
      '& .sectionHead': {
        width: '100%',
        margin: '20px 0',
        '& .heading1': {
          fontSize: '20px !important',
          '& a': {
            textDecoration: 'none',
            color: Theme.secondary
          }
        }
      }
    },
    '& .imageWrap': {
      width: '100%',
      maxWidth: 550,
      position: 'relative',
      marginBottom: '5%',
      '&.imageWrap_M': {
        maxWidth: 250,
      },
      '& img': {
        width: '100%',
      },
      '& .womenImage': {
        position: 'absolute',
        transition: '.3s',
        width: '20%',
        bottom: '-20%',
        left: '15%',
        '& img': {
          width: '100%',
        },
      }
    }
  },
  sectionHead: {
    width: 'unset',
    '& .heading1': {
      fontSize: '26px',
      width: '100%',
      textAlign: 'left',
      fontFamily: 'gorditaBold',
    },
  },
  contentCenter: {
    alignItems: 'center !important',
  },
  contentLeft: {
    alignItems: 'flex-start',
  },
  contentRight: {
    alignItems: 'flex-end',
  },
  imageCenter: {
    alignItems: 'center !important',
  },
  imageLeft: {
    alignItems: 'flex-start',
  },
  imageRight: {
    alignItems: 'flex-end',
  },
  pageSection: {

    '& .contentWrap': {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      height: '100%',
      textAlign: 'left',
      '& .bodyText': {
        margin: '10px 0',
        lineHeight: '24px',
        fontSize: 15,
        marginBottom: 10,
        color: Theme.fontColorSecondary
      },
      '& ul': {
        paddingLeft: 16,
        marginTop: 10,
        fontSize: 15,
        '& .listHeading': {
          fontSize: 18,
          fontWeight: 600,
          color: Theme.primary,
          marginLeft: -16,
          marginBottom: 8,
          marginTop: 15,
        },
        '& li': {
          '&::marker': {
            fontSize: 25,
            color: Theme.primary,
          },
          marginBottom: 5,
          lineHeight: '24px',
          color: Theme.fontColorSecondary
        }
      }
    },
    '& .imageContainer': {
      display: 'flex',
      flexDirection: 'column',
      '& .imageWrap': {
        width: '100%',
        maxWidth: 450,
        '&.imageWrap_M': {
          maxWidth: 250,
        },
        '& img': {
          width: '100%',
        }
      }
    },
  },
  InfoCard: {
    margin: 'auto',
    width: 250,
    maxWidth: '100%',
    minHeight: 200,
    borderRadius: Theme.radius2,
    padding: Theme.spacingMore,
    backgroundColor: '#fff',
    scrollbarWidth: 'thin',
    scrollbarColor: `${Theme.primary} #fff0`,
    display: 'flex',
    flexDirection: 'column',
    transition: '.3s',
    justifyContent: 'center',
    boxShadow: Theme.boxShadow,
    '&:hover': {
      boxShadow: 'none',
    },

    '& .icon': {
      width: 50,
      margin: '0 auto 10px',
      '& img': {
        width: '100%',
      }
    },

    '& .title': {
      fontSize: 18,
      margin: '10px 0',
      fontFamily: 'gorditaMedium',
      color: Theme.primary,
    },

    '& .infoText': {
      color: Theme.primary,
      fontSize: 14,
      fontWeight: 600,
    }
  },

  midSecWrap: {
    backgroundImage: `url('/assets/images/advertiseImages/patternBg.png')`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    position: 'relative',
    padding: '40px 0',

  },
  PlanTableWrap: {
    backgroundColor: '#f8f9fb',
    padding: '40px 0',
    '& table': {
      width: '100%',
      borderRadius: Theme.radius2,
      backgroundColor: '#fff',
      padding: Theme.spacingMid,
      boxShadow: Theme.boxShadow,
      '& thead': {
        color: Theme.primary
      },
      '& tbody': {
        '& tr': {
          '& td': {
            fontSize: 14
          }
        }
      }
    }

  }
})

interface Card {
  count: string,
  image?: string,
  info: string,
}

interface CardProps {
  card: Card,
  index: number
}

interface PlanItem {
  content: string,
  price: string,
  duration: string
}

interface PlanItemProps {
  Plan: PlanItem,
  index: number
}

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

function Advertisement(props: any) {

  const isTablet = useMediaQuery('(max-width:960px)');
  const isMobile = useMediaQuery('(max-width:600px)');
  const [__window, setWindow] = React.useState<null | Window>(null);

  React.useEffect(() => {
    setWindow(window);
  }, [])

  React.useEffect(() => {
    setWindow(window);
  }, [__window?.innerWidth])

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
      }, image: 'section1.png'
    },
    {
      title: 'Education Guest Posting Site for Blog & Article',
      description: ['College disha content is the most authentic Educational Guest Posting site that provides you the platform to reach a large community of teachers and parents. This site is helping them to increase the educational achievement of children (students) and young people(teachers/parents). Education Guest Post is a website is for education blogs and education articles where students grab more information related to education and studies.'],
      image: 'section2.png'
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
      }, image: 'section3.png'
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
      }, image: 'section4.png'
    },
    {
      title: 'Education Guest Posting Site for Blogs:',
      description: [
        'For Blogs Education Guest Post Site is a website where word limit is around 800 words. And here writing for blogs, the content should be pure and fresh. Content should not be copied from other blog / website. Writing for blogs is not so tricky because the topics are relevant to the education purpose. Main users are our students, we are welcome them with fresh ideas, and interesting comments.',
        'We are writing for the blogs on the website ‘Education Guest Post’. The limited changes that we can edit or changing the heading tags, formatting the text, resizing the image etc.',
      ],
      image: 'section5.png'
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
      }, image: 'section6.png'
    },
  ]

  const StatCards: Card[] = [
    { image: 'impressionIcon.png', count: '10.03M+', info: 'Impression' },
    { image: 'userIcon.png', count: '470M+', info: 'Users' },
    { image: 'sessionIcon.png', count: '490M+', info: 'Sessions' },
    { image: 'viewIcon.png', count: '781k+', info: 'Page Views' },
  ]

  const PlansList: PlanItem[] = [
    { content: '2 Dofollow & 1 Nofollow Link', price: '$100', duration: '6 Months' },
    { content: '1 Dofollow & 1 Nofollow Link', price: '$70', duration: '6 Months' },
    { content: '1 Dofollow Link', price: '$50', duration: '6 Months' },
    { content: '1 Nofollow Link', price: '$25', duration: '6 Months' },
  ]




  const InfoCard = (props: CardProps) => {

    const { index, card: { count, info, image } } = props;
    console.log('is mobile', isMobile);
    return (
      <div key={index} className={classNames(styles.InfoCard)} >
        {
          image &&
          <div className='icon' >
            <img src={`/assets/images/advertiseImages/${image}`} alt={image} />
          </div>
        }
        <h5 className='title'>{count}</h5>

        <div className='infoText'>
          <p >{info}</p>
        </div>
      </div >
    )
  }



  const PageSection = (props: SectionProps) => {

    const { index, section: { title, description, image, list } } = props;


    return (
      <div key={index} className='container'>

        <div className={styles.wrapper}>

          <Hidden mdUp>
            <div className={classNames('sectionHead', styles.sectionHead)} style={{ margin: '0 0 0 -3px' }}>
              <h2 className='heading1' >{title}</h2>
            </div>
          </Hidden>

          <Grid container
            className={styles.pageSection}
            spacing={isTablet ? 3 : 8}
            direction={index % 2 == 0 ? 'row' : 'row-reverse'}>

            <Grid item xs={12} md={6}

              className={classNames('imageContainer', index % 2 == 0 ? styles.imageLeft : styles.imageRight,
                {
                  [styles.imageCenter]: isTablet
                })}>
              <div className={classNames('imageWrap', { 'imageWrap_M': isMobile })}>
                <img src={`/assets/images/advertiseImages/${image}`} alt={image} />
              </div>
            </Grid>

            <Grid item xs={12} md={6}>


              <div className={classNames('contentWrap')}>

                <Hidden smDown>
                  <div className={classNames('sectionHead', styles.sectionHead)} style={{ margin: '0 0 0 -3px' }}>
                    <h2 className='heading1' >{title}</h2>
                  </div>
                </Hidden>

                <div className={'info'}>
                  {
                    description?.length ?
                      <div>
                        {

                          description.map((descriptionText: string, index: number) => {
                            return <p key={index} className='bodyText'>{descriptionText}</p>
                          })
                        }
                      </div>
                      : null
                  }

                  <ul>

                    {
                      list?.listTitle ?
                        <h5 className='listHeading'>{list?.listTitle}</h5>
                        : null
                    }
                    {
                      list?.listItems?.length ?
                        list?.listItems.map((item: string, index: number) => {
                          return <li key={index}>{item}</li>
                        })
                        : null
                    }
                  </ul>
                </div>
              </div>

            </Grid>


          </Grid>

        </div>

      </div>
    )
  }



  return (

    <>

      <div className={classNames('container', styles.headBG)}>

        <Hidden smDown>
          <div>
            <img className='backImage' src='/assets/images/advertiseImages/headBGShape.png' alt='' />
          </div>
        </Hidden>

        <div className={classNames(styles.wrapper)}>

          <Grid container className={styles.pageHead} spacing={isMobile ? 3 : 8} direction={isTablet ? 'row' : 'row-reverse'} >

            <Grid item xs={12} md={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>

              <div className={classNames('imageWrap', { 'imageWrap_M': isMobile })}>
                <AnimatedSection animationClass='shiftLeft' id='layer1' style={{ margin: isTablet ? 'auto' : 'unset' }} >
                  <img src='/assets/images/advertiseImages/headImage1.png' alt='' />
                </AnimatedSection>

                <AnimatedSection className='womenImage' animationClass='shiftRight' id='layer2'  >
                  <img src='/assets/images/advertiseImages/womenImage.png' alt='' />
                </AnimatedSection>

              </div>
            </Grid>


            <Grid item className={''} xs={12} md={6}>

              <div className='content'>
                <Typography >Write for us</Typography>
                <div className={classNames('sectionHead')} >
                  <h5 className='heading1' >Contact Us to publish article</h5>
                  <h5 className='heading1' >Drop an E-mail at <a href={'mailTo:editor@collegedisha.com'}>editor@collegedisha.com</a> to publish your article</h5>
                </div>
              </div>

            </Grid>

          </Grid>


        </div>
      </div>

      <div style={{ paddingTop: '5%' }}>
        {
          SectionList?.map((section: Section, index: number) => {
            return <PageSection index={index} section={section} />
          })
        }
      </div>

      <div className={classNames('container', styles.midSecWrap)}>
        <div className={styles.wrapper} style={{ margin: `10px 0` }}>

          <div style={{ marginBottom: 40 }}>
            <Typography variant='h5' style={{ fontFamily: 'gorditaMedium', marginBottom: 10 }}>Site Performance - May 220 to Oct 2020</Typography>
          </div>

          <Grid container spacing={isMobile ? 4 : 8} justify='center' >
            {
              StatCards.map((card: Card, index) => {
                return (
                  <Grid item
                    xs={6}
                    sm={__window?.innerWidth / 4 >= 260 ? 3 : 4} >
                    <InfoCard index={index} card={card} />
                  </Grid>
                )
              })
            }
          </Grid>

        </div>
      </div>

      <div className={classNames('container', styles.PlanTableWrap)}>
        <div className={styles.wrapper} style={{ margin: `10px 0` }}>

          <div style={{ marginBottom: 40 }}>
            <Typography variant='h5' style={{ fontFamily: 'gorditaMedium', marginBottom: 10 }}>Site Performance - May 220 to Oct 2020</Typography>
          </div>

          <table>
            <thead>
              <th>Do-follow & No-follow links</th>
              <th>Price</th>
              <th>Duration</th>
            </thead>
            <tbody>
              {
                PlansList.map((plan: PlanItem) => {
                  return (
                    <tr>
                      <td>{plan.content}</td>
                      <td>{plan.price}</td>
                      <td>{plan.duration}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>

        </div>
      </div>

      <Footer />
    </>

  );
}

export default Advertisement;
