
import { Grid, Hidden, Typography, useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import * as React from 'react';
import Link from 'next/link';
import { Routes, Theme } from '@/Services/App.service';
import classNames from 'classnames';
import { PageHead } from '@/Components/PageHead.component';
import { ViewportTracker } from '@/Components/ViewportTracker.component';
import { Footer } from '@/Components/Footer.component';
import { useRouter } from 'next/router';
import CustomBreadCrumb from '@/Components/CustomBreadCrumb.component';

const useStyles = makeStyles({
  wrapper: {
    padding: ' 0px 5% 50px',
  },
  policyCard: {
    background: Theme.backgroundColor,
    textAlign: 'left',
    paddingTop: 40,
    '& h2': {
      fontSize: 20,
      color: Theme.primary,
      padding: '10px 0',
      fontFamily: 'gorditaMedium',
      position: 'sticky',
      top: 0,
      backgroundColor: Theme.backgroundColor,
    },
    '& p': {
      color: Theme.fontColorSecondary,
      fontSize: 14,
      lineHeight: '28px',
      marginBottom: 10
    },
    '& .list': {
      paddingLeft: 20,
      '& .listTitle': {
        marginBottom: 0,
      },
      '& li': {
        color: Theme.fontColorSecondary,
        listStyle: 'square',
        fontSize: 14,
        lineHeight: '25px',

      }
    }
  },
  sideListWrap: {
    position: 'sticky',
    top: 70
  },
  policyList: {
    background: Theme.backgroundColor,
    textAlign: 'left',
    margin: '50px 0',
    '& li': {
      margin: '10px 0',
      listStyle: 'none',
      '& a': {
        textDecoration: 'none',
        '& h4': {
          fontSize: 15,
          color: Theme.primary,
          lineHeight: '25px',
          marginBottom: 15,
        },
      }
    }
  },
})

function TermsConditions(props: any) {

  const isMobile = useMediaQuery('(max-width:600px)');
  const isTablet = useMediaQuery('(max-width:992px)');
  const [currentSection, setCurrentSection] = React.useState<number | null>(null);
  let InViewSections = new Set<number>();

  const styles = useStyles();
  const router = useRouter();

  const createTempSlug = (name: string, identifier: number) => {
    console.log('name for slug', typeof (name), name);
    return name.replace(/ /g, '-') + identifier;

  }

  const InViewEnter = (index: number) => {

    console.log('entered', index)
    InViewSections.add(index);
    let newList = Array.from(InViewSections);
    console.log('new added list', newList)
    let min = Math.min(...newList);
    if (min >= 0) {
      setCurrentSection(min);
    }

  }

  const InViewExit = (index: number) => {

    console.log('exited ', index)
    InViewSections.delete(index);
    let newList = Array.from(InViewSections);
    console.log('new deleted list', newList)
    let min = Math.min(...newList);
    if (min >= 0) {
      setCurrentSection(min);
    }

  }

  const TermsList: TermPoint[] = [
    {
      title: 'Terms & Condition', description: [
        'Welcome to the collegedisha.com Terms & Condition page. The page will enlighten you on different sets of policies and terms set by the company to make full use of our services and prizes. The page will broadly talk about how as a user you can make use of college Disha as your stepping stone towards a brighter future. I will also discuss our Lucky Draw, where all the registered users can participate and win up to 100% scholarship, for the college of their choice.',
        'The website has been created to guide the hoards of students who are confused after the completion of their high-school. They are confused as which college will be suitable for them both academically and financially. Our learned team of councillors will completely analyze your position, your study of interest and then help you get the best choice of college.'
      ]
    },
    {
      title: 'How to make the best use of the website? ', description: ['College Disha has been created after surveying a lot of students who have passed their high school and also their parents. Our website is absolutely free to use for one and all. A user needs to register with their name and email address and then simply browse through the website to find the kind of service or help you need from us. We provide admission help for various Technical and Management top courses available all around the country. The list of streams we cover has been mentioned below. '],
      list: [
        {
          title: 'Engineering colour ', points: [
            'B.Tech',
            'M.Tech',
            'BCA',
            'MCA',
          ]
        },
        {
          title: 'Management ', points: [
            'MBA',
            'BBA',
            'PGDM',
          ]
        }
      ]
    },
    {
      title: 'T & C of the Scholarship', description: ['Our platform understands that many of you bright students with potential cannot get admission in an esteemed institute, due to the increasing cost of private education. We at College Disha believes that Education is everyone’s birthright, and if you have potential you must meet the right opportunity. This is the reason we have created a scholarship draw, where anyone of you can participate free of cost.'],
      list: [
        {
          points: [
            'Every student should shortlist at least four colleges of UP.',
            'Candidates should only apply to the colleges where their eligibility criteria meet.',
            'Colleges should be private and located in UP.',
            'One can avail the benefits of College Disha by mentioning the College Disha reference on the application form during the admission time.',
            'All Participant get College Disha Kit(Bag+T-Shirt+Cap+Diary+Pen+Bottle)',
            'There is no registration fee.',
          ]
        }
      ]
    },
    {
      title: 'Terms Of participation in Scholarship draw', description: [
        'College Disha believes in equal opportunity for all and thus the Scholarship draw is for every registered College Disha user. There are no direct or hidden charges for participation in the contest. The winner will be selected at random and you will receive a College Disha kit, which will include a Bag, a T-Shirt, a cap, a Diary and a pen.',
      ],
      list: [{ points: ['<span><b>Note:</b> The Scholarships are valid only if you take admission through College Disha. </span>'] }]
    },
  ]

  interface TermListItem {
    title?: string,
    points: string[]
  }

  interface TermPoint {
    title: string,
    description: string[],
    list?: TermListItem[]
  }

  interface TermsListProps {
    term: TermPoint,
    index: number,
  }


  const RenderTermCard = (props: TermsListProps) => {

    const { index, term: { title, description, list } } = props;

    let slug = createTempSlug(title, index);

    return (
      <React.Fragment key={index}>

        <ViewportTracker id={'term-section' + index}
          onEnter={() => { InViewEnter(index) }}
          onLeave={() => { InViewExit(index) }} >

          <div id={slug} className={classNames(styles.policyCard)}>
            <Typography variant='h2'>{index + 1}. {title}</Typography>

            {
              description?.length ?
                <ul>
                  {
                    description.map((item: string, index: number) => (<Typography key={index} variant='body1'>{item}</Typography>))
                  }
                </ul>
                : null
            }
            {
              list?.length ?
                <ul className='list'>
                  {
                    list.map((item: TermListItem, index: number) => (<li key={index} >
                      {
                        item.title ?
                          <Typography className='listTitle'>{item?.title}</Typography>
                          : null
                      }
                      {
                        item?.points?.length ?
                          <ul className='list' style={!item?.title ? { listStyle: 'none', paddingLeft: 0 } : {}}>
                            {

                              item.points?.map((listItem: string, index: number) => {
                                return (
                                  <li key={index} dangerouslySetInnerHTML={{ __html: listItem }} />
                                )
                              })
                            }
                          </ul>
                          : null
                      }
                    </li>))
                  }
                </ul>
                : null
            }
          </div>
        </ViewportTracker>
      </React.Fragment>
    )
  }

  const TermCard = React.useMemo(() => RenderTermCard, []);

  const TermListItemComponent = (props: TermsListProps) => {

    const { index, term: { title, description } } = props;
    let slug = createTempSlug(title, index);
    return (
      <li onClick={() => setCurrentSection(index)} key={index} className={classNames('')}>
        <a href={`#${slug}`} >
          <Typography variant='h4' style={{ fontFamily: currentSection === index ? 'gorditaMedium' : 'gordita' }} >{index + 1}. {title}</Typography>
        </a>
      </li>
    )
  }


  return (

    <>

      <PageHead PageName='Terms & conditions' />

      <div className='container'>

        <div className={styles.wrapper}>

          <Grid container spacing={8}>

            <Hidden smDown>
              <Grid item xs={12} md={4}>
                <div className={styles.sideListWrap}>
                  <ul className={styles.policyList}>
                    {
                      TermsList.map((term: TermPoint, index: number) => (<TermListItemComponent term={term} index={index} />))
                    }
                  </ul>
                </div>
              </Grid>
            </Hidden>

            <Grid item xs={12} md={8}>
              <div >
                {
                  TermsList.map((term: TermPoint, index: number) => (<TermCard term={term} index={index} />))
                }
              </div>
            </Grid>
          </Grid>

        </div>

      </div>

      <Footer />
    </>

  );
}

export default TermsConditions;