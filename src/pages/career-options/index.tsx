
import { Grid, Typography, useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import * as React from 'react';

import { useRouter } from 'next/router';

import { CareerListItem } from '@/Services/DataTypes/CareerOptions';
import CareerCard from '@/Components/CareerCard.component';


const useStyles = makeStyles({
  wrapper: {
    padding: ' 0px 5% 50px',
  },

})



const defaultImage = '/assets/images/defaults/news.jpg'

function CareerList(props: any) {

  const isMobile = useMediaQuery('(max-width:600px)');
  const isTablet = useMediaQuery('(max-width:992px)');
  const router = useRouter();
  const [data, setData] = React.useState<CareerListItem[]>([
    {
      id: 1,
      name: 'UP Police SI Registration form 2021 - Check Sub Inspector Vacancy Open in Uttar Pradesh',
      slug: 'xyz',
      image: 'https://www.collegedisha.com/images/thumbnail/1578546489UP-Police-SI-Registration-Form-thumbnail.jpg',
      courses: [
        { name: 'xyz', slug: 'xyz' },
        { name: 'xyz', slug: 'xyuyz' },
        { name: 'xyzq', slug: 'yuyz' },
        { name: 'xyzq', slug: 'yuyz' },
        { name: 'xyzq', slug: 'yuyz' },
        { name: 'xyzq', slug: 'yuyz' },
        { name: 'xyzq', slug: 'yuyz' },
        { name: 'xyzq', slug: 'yuyz' },
        { name: 'xyzq', slug: 'yuyz' },
        { name: 'xyzq', slug: 'yuyz' },
        { name: 'xyzq', slug: 'yuyz' },
        { name: 'xyzq', slug: 'yuyz' },
      ]
    }, {
      id: 1,
      name: 'UP Police SI Registration form 2021 - Check Sub Inspector Vacancy Open in Uttar Pradesh',
      slug: 'xyz',
      image: 'https://www.collegedisha.com/images/thumbnail/1578546489UP-Police-SI-Registration-Form-thumbnail.jpg',
      courses: []
    }, {
      id: 1,
      name: 'UP Police SI Registration form 2021 - Check Sub Inspector Vacancy Open in Uttar Pradesh',
      slug: 'xyz',
      image: 'https://www.collegedisha.com/images/thumbnail/1578546489UP-Police-SI-Registration-Form-thumbnail.jpg',
      courses: [
        { name: 'xyz', slug: 'xyz' },
      ]
    }, {
      id: 1,
      name: 'UP Police SI Registration form 2021 - Check Sub Inspector Vacancy Open in Uttar Pradesh',
      slug: 'xyz',
      image: 'https://www.collegedisha.com/images/thumbnail/1578546489UP-Police-SI-Registration-Form-thumbnail.jpg',
      courses: [
        { name: 'xyz', slug: 'xyz' },
      ]
    }])


  const styles = useStyles();


  return (

    <>


      <div className='container'>
        <div className={'wrapper'}>

          <Typography className='pageHeading' variant='h1'>A complete List of Education and career options</Typography>


          <div style={{ marginTop: '50px' }}>
            <Grid container spacing={isMobile ? 3 : 5} justify='flex-start'>
              {
                data?.map((career: CareerListItem) => {
                  return (
                    <Grid item xs={12} sm={6} md={4} >
                      <CareerCard {...career} />
                    </Grid>

                  )
                })
              }
            </Grid>
          </div>

        </div>
      </div>
    </>

  );
}


export default CareerList;

