
import { Typography, useMediaQuery, Theme as MuiTheme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import * as React from 'react';
import { Routes, Theme } from '../../Services/App.service';
import classNames from 'classnames';
import { SubscribeSection } from '@/Components/Subscribe.component';
import { G_CourseCategory, G_CourseItemType } from '@/Services/GraphQlDataTypes/Courses';
import Link from 'next/link';

const useStyles = makeStyles((theme: MuiTheme) => ({
  container: {
    marginBottom: 50,
    '&:last-child': {
      margin: 0
    }
  },
  course: {
    '& .containerHead': {
      display: 'flex',
      alignItems: 'center',
      '& .title': {

      },
      '& img': {
        width: 30,
        height: 30,
        marginRight: 5,
        [theme.breakpoints.up('sm')]: {
          width: 40,
          height: 40,
          marginRight: 10,
        }
      },
    }
  },
  courseList: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap'
  },
  courseListItem: {
    borderRadius: Theme.radius2,
    color: Theme.primary,
    textDecoration: 'none',
    margin: '10px',
    textTransform: 'capitalize',
    [theme.breakpoints.up('sm')]: {
      margin: '8px',
    },
    '& .courseListItem': {
      borderRadius: Theme.radius1,
      fontSize: 10,
      padding: '10px 15px',
      backgroundColor: '#fafafa',
      transition: '.3s',
      [theme.breakpoints.up('sm')]: {
        fontSize: 12,
      },
      '&:hover': {
        backgroundColor: '#fafafa',
        boxShadow: theme.shadows[3],
      }
    },
  }
}))

const defaultImage = '/assets/images/defaults/course.webp';

function Courses(props: any) {

  const isMobile = useMediaQuery('(max-width:600px)');
  const isTablet = useMediaQuery('(max-width:992px)');
  const isDesktop = useMediaQuery('(min-width:992px)');

  const [data, setData] = React.useState<G_CourseCategory[] | null>([
    {
      id: 1,
      title: 'courses after 12th',
      image: 'https://www.flaticon.com/svg/vstatic/svg/4039/4039233.svg?token=exp=1611731587~hmac=95c4240e8db08da80d4138c8af942de2',
      courseList: [
        { id: 1, label: 'AIR HOSTESS ', slug: 'AIR-HOSTESS ' },
        { id: 2, label: 'INTERIOR DESIGNERS ', slug: 'INTERIOR-DESIGNERS ' },
        { id: 3, label: 'ITI COURSES ', slug: 'ITI-COURSES ' },
        { id: 4, label: 'DIPLOMA COURSES ', slug: 'DIPLOMA-COURSES ' },
        { id: 5, label: 'POLYTECHNIC COURSES ', slug: 'POLYTECHNIC-COURSES ' },
        { id: 6, label: 'PROFESSIONAL COURSES ', slug: 'PROFESSIONAL-COURSES ' },
        { id: 7, label: 'PARAMEDICAL COURSES ', slug: 'PARAMEDICAL-COURSES ' },
        { id: 8, label: 'AG COURSES ', slug: 'AG-COURSES ' },
        { id: 9, label: 'JOB ORIENTED COURSES ', slug: 'JOB-ORIENTED-COURSES ' },
        { id: 10, label: 'TECHNICAL COURSES ', slug: 'TECHNICAL COURSES ' },
        { id: 11, label: 'TEACHING COURSES ', slug: 'TEACHING-COURSES ' },
        { id: 12, label: 'GRADUATION COURSES ', slug: 'GRADUATION-COURSES ' },
        { id: 13, label: 'WEB DESIGN COURSES AFTER 12TH', slug: 'WEB-DESIGN-COURSES-AFTER-12TH' },
      ]
    },
    {
      id: 1,
      title: 'courses after 12th',
      image: '',
      courseList: [
        { id: 1, label: 'AIR HOSTESS ', slug: 'AIR-HOSTESS ' },
        { id: 12, label: 'GRADUATION COURSES ', slug: 'GRADUATION-COURSES ' },
        { id: 13, label: 'WEB DESIGN COURSES AFTER 12TH', slug: 'WEB-DESIGN-COURSES-AFTER-12TH' },
      ]
    },
    {
      id: 1,
      title: 'courses after 12th',
      image: 'https://www.flaticon.com/svg/vstatic/svg/4039/4039233.svg?token=exp=1611731587~hmac=95c4240e8db08da80d4138c8af942de2',
      courseList: [
        { id: 1, label: 'AIR HOSTESS ', slug: 'AIR-HOSTESS ' },
        { id: 2, label: 'INTERIOR DESIGNERS ', slug: 'INTERIOR-DESIGNERS ' },
        { id: 3, label: 'ITI COURSES ', slug: 'ITI-COURSES ' },
        { id: 4, label: 'DIPLOMA COURSES ', slug: 'DIPLOMA-COURSES ' },
        { id: 11, label: 'TEACHING COURSES ', slug: 'TEACHING-COURSES ' },
        { id: 12, label: 'GRADUATION COURSES ', slug: 'GRADUATION-COURSES ' },
        { id: 13, label: 'WEB DESIGN COURSES AFTER 12TH', slug: 'WEB-DESIGN-COURSES-AFTER-12TH' },
      ]
    },
    {
      id: 1,
      title: 'courses after 12th',
      image: '',
      courseList: [
        { id: 1, label: 'AIR HOSTESS ', slug: 'AIR-HOSTESS ' },
        { id: 2, label: 'INTERIOR DESIGNERS ', slug: 'INTERIOR-DESIGNERS ' },
        { id: 3, label: 'ITI COURSES ', slug: 'ITI-COURSES ' },
        { id: 4, label: 'DIPLOMA COURSES ', slug: 'DIPLOMA-COURSES ' },
        { id: 5, label: 'POLYTECHNIC COURSES ', slug: 'POLYTECHNIC-COURSES ' },
        { id: 6, label: 'PROFESSIONAL COURSES ', slug: 'PROFESSIONAL-COURSES ' },
      ]
    },
  ])


  const styles = useStyles();


  React.useEffect(() => {
  }, [])


  return (

    <>
      <div style={{ margin: `30px 0` }}>


        <div className='container'>
          <div className='wrapper' style={{ padding: '30px 5%' }}>

            <div >
              {
                data?.map((course: G_CourseCategory) => {
                  return (
                    <div className={classNames('pageSectionContainer', styles.container, styles.course)} >
                      <div className='containerHead' style={{ marginBottom: 30, }}>
                        <img src={course.image ? course.image : defaultImage} />
                        <Typography variant='h2'>{course.title}</Typography>
                      </div>

                      <div className={styles.courseList}>

                        {
                          course?.courseList?.map((item: G_CourseItemType) => {
                            return (
                              <Link href={`${Routes.Courses}/${item.slug}`} key={item.id} >
                                <a className={styles.courseListItem}>
                                  <div className={'courseListItem'} >
                                    {item.label}
                                  </div>
                                </a>
                              </Link>
                            )
                          })
                        }
                      </div>
                    </div>
                  )
                })
              }
            </div>

          </div>
        </div>

      </div>

      <SubscribeSection />

    </>

  );
}

export default Courses;

