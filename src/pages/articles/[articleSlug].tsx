
import { Grid, IconButton, Theme as MuiTheme, Typography, useMediaQuery } from '@material-ui/core';
import { DefaultTheme, makeStyles } from '@material-ui/styles';
import * as React from 'react';
import { Routes, Theme } from '../../Services/App.service';
import classNames from 'classnames';
import { ArticleListItemTypes, detailedArticle, FeaturedArticlesTypes } from '@/Services/GraphQlDataTypes/article';
import { AccessTimeOutlined, CalendarToday, CommentOutlined, KeyboardArrowLeft, KeyboardArrowRight, ShareOutlined, ThumbUpOutlined, VisibilityOutlined } from '@material-ui/icons';
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
    # One morning, when Gregor Samsa woke from troubled dreams.
    One morning, when Gregor Samsa woke from troubled dreams, he found himself *transformed* in his bed into a horrible  [vermin](http://en.wikipedia.org/wiki/Vermin "Wikipedia Vermin"). He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover **strong** it and seemed ready to slide off any moment. His many legs, pitifully thin compared with the size of the rest of him, link waved abouthelplessly as he looked. <cite>“What's happened to me?”</cite> he thought. It wasn't a dream. His room, a proper human room although a little too small, lay peacefully between its four familiar walls.</p>
    
    ## The bedding was hardly able to cover it.
    
    It showed a lady fitted out with a fur hat and fur boa who sat upright, raising a heavy fur muff that covered the whole of her lower arm towards the viewer a solid fur muff into which her entire forearm disappeared..
    
    ### Things we know about Gregor's sleeping habits.
    
    - He always slept on his right side.
    - He has to get up early (to start another dreadful day).
    - He has a drawer and a alarm clock next to his bed.
    - His mother calls him when he gets up to late.
    
    
    <table class="data">
      <tr>
        <th>Writer</th>
        <th>Nationality</th>
        <th>Genre</th>
        <th>Most famous book</th>
      </tr>
      <tr>
        <td>Franz Kafka</td>
        <td>Leo Tolstoy</td>
        <td>F. Scott Fitzgerald</td>
        <td>H.G. Wells</td>
      </tr>
      <tr>
        <td>Austrian</td>
        <td>Russia</td>
        <td>American</td>
        <td>British</td>
      </tr>
      <tr>
        <td>Literature & Fiction, Philosophy, Short Stories</td>
        <td>Literature & Fiction, Philosophy</td>
        <td>Literature & Fiction, Short Stories</td>
        <td>Science Fiction</td>
      </tr>
        <tr>
        <td>The Metamorphosis</td>
        <td>War & Piece</td>
        <td>The Great Gatsby</td>
        <td>War of the Worlds</td>
      </tr>
      </table>
    
    First he wanted to stand up quietly and undisturbed, get dressed, above all have breakfast, and only then consider further action, for (he noticed this clearly) by thinking things over in bed he would not reach a reasonable conclusion. He remembered that he had already often felt a light pain or other in bed, perhaps the result of an awkward lying position, which later turned out to be purely imaginary when he stood up, and he was eager to see how his present fantasies would gradually dissipate. That the change in his voice was nothing other than the onset of a real chill, an occupational illness of commercial travelers, of that he had not the slightest doubt.
    
    
    ~~~
        function metamorphose(protagonist,author){
            if( protagonist.name.first === 'Gregor' && author.name.last === 'Kafka' ){
                protagonist.species = 'insect';
            }
        }
    ~~~
    
    It was very easy to throw aside the blanket. He needed only to push himself up a little, and it fell by itself. But to continue was difficult, particularly because he was so unusually wide. He needed arms and hands to push himself upright. Instead of these, however, he had only many small limbs which were incessantly moving with very different motions and which, in addition, he was unable to control. If he wanted to bend one of them, then it was the first to extend itself, and if he finally succeeded doing with this limb what he wanted, in the meantime all the others, as if left free, moved around in an excessively painful agitation. "But I must not stay in bed uselessly," said Gregor to himself.
    
    > At first he wanted to get off the bed with the lower part of his body, but this lower part (which he incidentally had not yet looked at and which he also couldn't picture clearly) proved itself too difficult to move. The attempt went so slowly. When, having become almost frantic, he finally hurled himself forward with all his force and without thinking, he chose his direction incorrectly, and he hit the lower bedpost hard. The violent pain he felt revealed to him that the lower part of his body was at the moment probably the most sensitive.
    
    Thus, he tried to get his upper body out of the bed first and turned his head carefully toward the edge of the bed. He managed to do this easily, and in spite of its width and weight his body mass at last slowly followed the turning of his head. But as he finally raised his head outside the bed in the open air, he became anxious about moving forward any further in this manner, for if he allowed himself eventually to fall by this process, it would take a miracle to prevent his head from getting injured. And at all costs he must not lose consciousness right now. He preferred to remain in bed.
    
    #### First five selected publications in English
    1. The Castle
    2. The Great Wall of China
    3. The Trial
    4. America	
    5. The Diaries Of Franz Kafka
    
    ***`,
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
    justifyContent: 'flex-end',
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