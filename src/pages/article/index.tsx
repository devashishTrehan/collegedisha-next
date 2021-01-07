
import { useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import * as React from 'react';
import { Theme } from '../../Services/App.service';
import classNames from 'classnames';
import { SubscribeSection } from '@/Components/Subscribe.component';

const useStyles = makeStyles({
  card: {
    boxShadow: Theme.boxShadow,
    borderRadius: Theme.radius2,
    width: 250,
    minHeight: 250,
    display: 'flex',
    transition: '.5s',
    overflow: 'visible',
    position: 'relative',
    background: Theme.backgroundColor,
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

function Article(props: any) {

  const isMobile = useMediaQuery('(max-width:600px)');
  const isTablet = useMediaQuery('(max-width:992px)');
  const [__window, setWindow] = React.useState<null | Window>(null);

  React.useEffect(() => {
    setWindow(window);
  }, [])

  const styles = useStyles();

  const ServiceList1 = [
    { title: 'Top Colleges', info: ['Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa ducimus corporis'], image: 'section1Image1.svg' },
    { title: 'Top Courses', info: ['Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa ducimus corporis'], image: 'section1Image2.svg' },
    { title: 'Counselling', info: ['Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa ducimus corporis quas'], image: 'section1Image3.svg' },
    { title: 'Career', info: ['Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa ducimus corporis quas'], image: 'section1Image4.svg' },
  ]

  const ServiceList2 = [
    { title: '200 courses', info: ['Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa ducimus corporis'], image: 'section1Image2.svg' },
    { title: 'expert guidance', info: ['Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa ducimus corporis'], image: 'section1Image3.svg' },
    { title: 'bright future', info: ['Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa ducimus corporis quas'], image: 'section1Image4.svg' },
  ]

  interface Card {
    title: string,
    info: string[],
    image?: string,
  }

  interface CardProps {
    card: Card
  }

  const InfoCard = (props: CardProps) => {

    const { title, info, image } = props.card;

    return (
      <div className={classNames(styles.card, 'card')}>
        <div className='infoCard' >
          {
            image &&
            <div className='imageWrap' >
              <img alt='' src={`/assets/images/${image}`} />
            </div>
          }
          <h5 className='title'>{title}</h5>

          <div className='infoText'>
            {
              info?.map((info: string, index: number) => <p key={index} >{info}</p>)
            }
          </div>
        </div >
      </div>
    )
  }

  React.useEffect(() => {
  }, [])


  return (

    <>

      <div className='container'>

        <div className='wrapper' style={{ margin: `50px 0` }}>


        </div>
      </div>

      <SubscribeSection />

    </>

  );
}

export default Article;