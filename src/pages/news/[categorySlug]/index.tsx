
import { Grid, useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import * as React from 'react';
import {  Routes,  Theme } from '@/Services/App.service';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { NewsListItemTypes, NewsListTypes } from '@/Services/GraphQlDataTypes/News';
import NewsListCard from '@/Components/NewsListCard.component';
import { PageNavigation } from '@/Components/PageNavigation.component';
import { NewsPageHeader } from '..';


const useStyles = makeStyles({
  wrapper: {
    padding: ' 0px 5% 50px',
  },

})


const defaultImage = '/assets/images/defaults/news.jpg'

function NewsList(props: any) {

  const isMobile = useMediaQuery('(max-width:600px)');
  const isTablet = useMediaQuery('(max-width:992px)');
  const router = useRouter();
  const [data, setData] = React.useState<NewsListTypes | null>({
    featuredNews: [
      {
        id: 1,
        title: 'UP Police SI Registration form 2021 - Check Sub Inspector Vacancy Open in Uttar Pradesh',
        views: 123,
        commentCount: 12,
        slug: 'xyz',
        image: 'https://www.collegedisha.com/images/thumbnail/1578546489UP-Police-SI-Registration-Form-thumbnail.jpg',
        author: 'dev trehan',
        publishedOn: '23-12-2020',
        isSaved: false,
        category: 'news',
      },
      {
        id: 1,
        title: 'Rajasthan Scholarship Registration Form 2021 - Online Apply Rajasthan Scholarship Application Form',
        views: 123,
        commentCount: 12,
        slug: 'xyz',
        image: '',
        author: 'dev trehan',
        publishedOn: '23-12-2020',
        isSaved: false,
        category: 'lifestyle',
      },
      {
        id: 1,
        title: 'IIM-A OPPOSITION TO LAID DOWN Ph-D CRITERIA BY GOVERNMENT - CollegeDisha',
        views: 123,
        commentCount: 12,
        slug: 'xyz',
        image: 'https://www.collegedisha.com/images/thumbnail/1604662290Rajasthan-Scholarship-Registration-thumbnail.jpg',
        author: 'dev trehan',
        publishedOn: '23-12-2020',
        isSaved: false,
        category: 'education',
      },
      {
        id: 1,
        title: 'The Vice President Showed Concern On The Need Of Reservation For Poor Students In Private Institution',
        views: 123,
        commentCount: 12,
        slug: 'xyz',
        image: 'https://www.collegedisha.com/images/thumbnail/1542188532News.jpg',
        author: 'dev trehan',
        publishedOn: '23-12-2020',
        isSaved: false,
        category: 'plitics',
      },
    ],
    newsList: [
      {
        id: 1,
        title: 'UP Police SI Registration form 2021 - Check Sub Inspector Vacancy Open in Uttar Pradesh',
        views: 123,
        commentCount: 12,
        slug: 'xyz',
        image: 'https://www.collegedisha.com/images/thumbnail/1578546489UP-Police-SI-Registration-Form-thumbnail.jpg',
        author: 'dev trehan',
        publishedOn: '23-12-2020',
        isSaved: false,
        category: 'sports',
      },
      {
        id: 1,
        title: 'Rajasthan Scholarship Registration Form 2021 - Online Apply Rajasthan Scholarship Application Form',
        views: 123,
        commentCount: 12,
        slug: 'xyz',
        image: '',
        author: 'dev trehan',
        publishedOn: '23-12-2020',
        isSaved: false,
        category: 'local',
      },
      {
        id: 1,
        title: 'IIM-A OPPOSITION TO LAID DOWN Ph-D CRITERIA BY GOVERNMENT - CollegeDisha',
        views: 123,
        commentCount: 12,
        slug: 'xyz',
        image: 'https://www.collegedisha.com/images/thumbnail/1604662290Rajasthan-Scholarship-Registration-thumbnail.jpg',
        author: 'dev trehan',
        publishedOn: '23-12-2020',
        isSaved: false,
        category: 'internation',
      },
      {
        id: 1,
        title: 'The Vice President Showed Concern On The Need Of Reservation For Poor Students In Private Institution',
        views: 123,
        commentCount: 12,
        slug: 'xyz',
        image: 'https://www.collegedisha.com/images/thumbnail/1542188532News.jpg',
        author: 'dev trehan',
        publishedOn: '23-12-2020',
        isSaved: false,
        category: 'bollywood',
      },
    ],
    newsCategories: {
      'All News': '',
      'Engineering ': 'engineering',
      'Education ': 'education',
      'Management ': 'management',
      'College Placement ': 'college-placement',
      'Exam ': 'exam',
      'Exams Admit Card': 'exams-admit-card',
      'Exam Results': 'exam-results',
    }
  })
  const [currentCategory, setCurrentCategory] = React.useState<string>('');

  const styles = useStyles();


  const newsList: NewsListItemTypes[] = []


  const ShowCategory = (category: string) => {
    router.push(`${Routes.News}/${data?.newsCategories[category]}`, undefined, { shallow: true });
  }



  React.useEffect(() => {
    const { query } = router;
    let categorySlug = query.categorySlug as string;

    if (categorySlug) {
      setCurrentCategory(categorySlug);
    }
  }, [router.query?.categorySlug])


  return (

    <>

      <div>
        <NewsPageHeader featuredNews={data?.featuredNews} />
      </div>

      <PageNavigation pageSections={data?.newsCategories} currentSection={currentCategory} onLinkClick={(section: string) => ShowCategory(section)} />


      <div className='container'>
        <div className={'wrapper'}>

          <Grid container spacing={isMobile ? 3 : 5}>
            <RenderPageSection newsList={data?.newsList} />
          </Grid>

        </div>
      </div>
    </>

  );
}


export default NewsList;




//   ------ section styles start------   \\
const sectionStyles = makeStyles({
  container: {
    boxShadow: Theme.boxShadow,
    borderRadius: Theme.radius1,
    padding: '20px',
    margin: '30px 0',

  },
})
//   ------ section styles end------   \\


interface PageSectionProps {
  newsList: NewsListItemTypes[],
}

const RenderPageSection = React.memo((props: PageSectionProps) => {

  const router = useRouter();
  const [data, setData] = React.useState(props.newsList);

  const styles = sectionStyles();

  const FetchData = async (slug: string) => {
    console.log('fetching Data');
  }

  React.useEffect(() => {
    const { query } = router;
    let categorySlug = query.categorySlug as string;
    if (categorySlug) {
      FetchData(categorySlug);
    }
  }, [router.query?.categorySlug])

  return (
    <>
      {
        data?.map((item: NewsListItemTypes, index: number) => {
          return (
            <Grid item xs={12} sm={6}>
              <NewsListCard {...item} />
            </Grid>
          )
        })
      }
    </>
  )
})