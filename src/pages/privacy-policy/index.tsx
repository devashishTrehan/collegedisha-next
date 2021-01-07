
import { Grid, Hidden, Typography, useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import * as React from 'react';
import { Theme } from '@/Services/App.service';
import classNames from 'classnames';
import { PageHead } from '@/Components/PageHead.component';
import { ViewportTracker } from '@/Components/ViewportTracker.component';
import { Footer } from '@/Components/Footer.component';


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
          lineHeight: '20px',
          marginBottom: 15,
        },
      }
    }
  },
})

interface InViewSection {
  index: number,
  slug: string,
}

interface PolicyPoint {
  title: string,
  description: string[],
  list?: string[]
}

interface PolicyListProps {
  policy: PolicyPoint,
  index: number,
}


function PrivacyPolicy(props: any) {

  const isMobile = useMediaQuery('(max-width:600px)');
  const isTablet = useMediaQuery('(max-width:992px)');
  const [currentSection, setCurrentSection] = React.useState<number | null>(null);
  let InViewSections = new Set<number>();



  const styles = useStyles();

  const createTempSlug = (name: string, identifier: number) => {
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

  const PolicyList = [
    {
      title: 'Overview', description: ['The privacy policy page of collegedisha.com is specially created to tell users how we collect their information and used in different places.']
    },
    {
      title: 'Privacy of users that are below 13 years of age', description: ['This website is not designed to attract those users who are below 13 years. In fact, we do not knowingly collect personally identifiable information online from children who are below 13 years of age.In case, if we find such information we immediately remove it.In this way, the company do not intend to keep the data of the users below the specified age.']
    },
    {
      title: 'Cookies and IP Tracking Policy', description: ['This website utilizes cookies and other tracking technologies. A cookie can be in various forms like a web cookie, browser cookie, and HTTP cookie. The moment when you log in to collegedisha.com, we store small cookies in your system so that we can provide you with a better browsing experience. When a cookie is stored, users can use their browsers to get notifications. We use cookies and IP Tracking Policy only to improve the website as well as user data experience. We can also use such information for analyzing trends and statistics.']
    },
    {
      title: 'What kind of information is collected by collegedisha.com?', description: [
        'We collect information about you or your usage so that we can provide better services to all users. Generally, we collect information in the following ways:',
        'Once you register on collegedisha.com we will ask for personal information, such as your name, email address, and telephone number. If you want to enjoy additionalservices then you have to provide information about educational background, work experience, date of birth etc. We are not just limited to log information that you provide, in fact, we also require location information. Besides this, we also focus on the services that you use.'
      ]
    },
    {
      title: 'Opt-in Mails & other ways to use data by the company', description: [
        'We can collect your personal data in various ways such as opt-in emails. If you have opted for newsletters or notifications then the company will send you customized emails as well as notifications about the admission process and entrance tests. If you are not satisfied with our services then you can unsubscribe us anytime. If we add new services to our website then we may contact visitors or users for feedback.',
        'If you are not interested in all this then send an email on privacy@collegedisha.com. We also use geographical data to provide location wise customized data. We use cookies to provide the most relevant results.'
      ]
    },
    {
      title: 'Contact Details', description: ['If you have any query related to the privacy policy then please contact us on the following address -'],
      list: [
        '<span>B-48, First Floor Sector-63, Noida U.P., 201301</span>',
        '<span>Mobile No: +91 9717828595</span>',
        '<span>Landline No: 0120-4309202</span>',
        '<span>Mail: <a href="mailto:info@collegedisha.com">info@collegedisha.com</a></span>',
      ]
    },
  ]



  const RenderPolicyCard = (props: PolicyListProps) => {

    const { index, policy: { title, description, list } } = props;
    let slug = createTempSlug(title, index);
    console.log('rendered card', currentSection);
    return (
      <React.Fragment key={index}>

        <ViewportTracker id={'policy-section' + index} onEnter={() => { InViewEnter(index) }} onLeave={() => { InViewExit(index) }} >

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
                    list.map((item: string, index: number) => (<li key={index} dangerouslySetInnerHTML={{ __html: item }} />))
                  }
                </ul>
                : null
            }
          </div>
        </ViewportTracker>
      </React.Fragment>
    )
  }

  const PolicyCard = React.useMemo(() => RenderPolicyCard, []);

  const PolicyListItem = (props: PolicyListProps) => {

    const { index, policy: { title, description } } = props;
    let slug = createTempSlug(title, index);
    return (
      <li onClick={() => setCurrentSection(index)} key={index} className={classNames('')}>
        <a href={`#${slug}`} >
          <Typography variant='h4' style={{ fontFamily: currentSection === index ? 'gorditaMedium' : 'gordita' }} >{index + 1}. {title}</Typography>
        </a>
      </li>
    )
  }

  React.useEffect(() => {
  }, [])


  return (

    <>
      <PageHead PageName='Privacy Policy' />

      <div className='container'>

        <div className={styles.wrapper}>

          <Grid container spacing={8}>

            <Hidden smDown>
              <Grid item xs={12} md={4}>
                <div className={styles.sideListWrap}>
                  <ul className={styles.policyList}>
                    {
                      PolicyList.map((policy: PolicyPoint, index: number) => (<PolicyListItem policy={policy} index={index} />))
                    }
                  </ul>
                </div>
              </Grid>
            </Hidden>

            <Grid item xs={12} md={8}>
              <div >
                {
                  PolicyList.map((policy: PolicyPoint, index: number) => (<PolicyCard policy={policy} index={index} />))
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

export default PrivacyPolicy;