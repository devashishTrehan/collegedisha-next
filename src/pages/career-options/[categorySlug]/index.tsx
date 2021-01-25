
import { Grid, Typography, useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import * as React from 'react';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { detailedCareer } from '@/Services/GraphQlDataTypes/CareerOptions';
import { NavbarContext } from '@/Context/Navbar.context';
import { AppSectionHeights } from '@/Services/App.service';
import { PageNavigation } from '@/Components/PageNavigation.component';
import MarkdownParser from '@/Components/MarkdownParser.component';


const useStyles = makeStyles({
  wrapper: {
    padding: ' 0px 5% 50px',
  },
  container: {
    marginBottom: 50,
    '&:last-child': {
      margin: 0
    }
  },
})


const defaultImage = '/assets/images/defaults/career.jpg';

function CareerDetails(props: any) {

  const isMobile = useMediaQuery('(max-width:600px)');
  const isTablet = useMediaQuery('(max-width:992px)');
  const router = useRouter();
  const styles = useStyles();
  const [data, setData] = React.useState<detailedCareer | null>({
    id: 1,
    name: 'UP Police SI Registration form 2021 - Check Sub Inspector Vacancy Open in Uttar Pradesh',
    slug: 'xyz',
    image: 'https://www.collegedisha.com/images/thumbnail/1578546489UP-Police-SI-Registration-Form-thumbnail.jpg',
    courses: [{ name: 'xyz', slug: 'xyz' },
    { name: 'xyz', slug: 'xyuyz' },
    { name: 'xyzq', slug: 'yuyz' },
    { name: 'xyzq', slug: 'yuyz' },
    { name: 'xyzq', slug: 'yuyz' },],
    careerSections: {
      'about': 'about',
      'eligibility': 'eligibility',
      'process': 'process',
      'prospect': 'prospect',
      'salary': 'salary',
    },
    sectionContent: {
      'about': { title: 'about', content: 'about content' },
      'eligibility': { title: 'eligibility', content: 'eligibility content' },
      'process': { title: 'process', content: 'process content' },
      'prospect': { title: 'prospect', content: 'prospect content' },
      'salary': { title: 'salary', content: 'salary content' },
    }
  })
  const { id, name, careerSections, sectionContent, courses } = data;
  const [currentSection, setCurrentSection] = React.useState<string>(careerSections['about']);
  const { navHeight } = React.useContext(NavbarContext);

  const HashChangeHandler = (event: HashChangeEvent) => {
    event.preventDefault();
    let hash = event.newURL.split('#')[1];
    setCurrentSection(hash)
    let targetElement = document.getElementById(hash);
    if (targetElement) {
      window.scrollTo(0, targetElement.offsetTop - (navHeight + AppSectionHeights.pageNavigation + 30));
    }
  }

  React.useEffect(() => {
    window.addEventListener('hashchange', HashChangeHandler)

    return () => {
      window.removeEventListener('hashchange', HashChangeHandler)
    };
  }, [])

  const showpageSection = (section: string) => {
    window.location.hash = data?.careerSections[section];
  }

  let sections = Object.keys(sectionContent);

  return (
    <div>


      <PageNavigation pageSections={careerSections} currentSection={currentSection} onLinkClick={(section: string) => showpageSection(section)} />

      <div className='container'>
        <div className='wrapper' style={{ padding: isMobile ? '20px 5%' : '50px 5%' }}>
          <Grid container >
            <Grid item xs={12} md={9} >
              {
                sections?.map((section: string) => {
                  let { title, content } = sectionContent[section];
                  return (<div className={classNames('pageSectionContainer', styles.container)} id={careerSections[section]}>
                    <div className='containerHead'>
                      <Typography variant='h2'>{title}</Typography>
                    </div>
                    <MarkdownParser content={content} />
                  </div>)
                })
              }

            </Grid>
          </Grid>
        </div>
      </div>

    </div>
  );

}

export default CareerDetails;