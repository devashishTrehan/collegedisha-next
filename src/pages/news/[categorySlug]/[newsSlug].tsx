import {  Routes, Theme } from '@/Services/App.service';
import { useRouter } from 'next/router';
import React, { useContext,  useState } from 'react';
import { Grid, makeStyles, Typography, useMediaQuery } from '@material-ui/core';
import { NavbarContext } from '@/Context/Navbar.context';
import { detailedNews,  } from '@/Services/DataTypes/News';
import MarkdownParser from '@/Components/MarkdownParser.component';
import classNames from 'classnames';
import { CalendarToday, CommentOutlined, VisibilityOutlined } from '@material-ui/icons';




const useStyles = makeStyles({
    container: {
        boxShadow: Theme.boxShadow,
        borderRadius: Theme.radius1,
        padding: 20,
        margin: '0px 0 30px',

    },
    Intro: {
        textAlign: 'left',
        borderLeft: `3px solid ${Theme.secondary}`,
        margin: '30px 0',
        padding: '10px 0 10px 20px',
        '& p': {
            fontStyle: 'italic',
        }
    },
    content: {

    }

})

interface Props {
}


const LastBreadcrumbs = [{ name: 'news', endPoint: `${Routes.News}` }];

const defaultImage = '/assets/images/defaults/institute.jpg';


function newsDetailsPage(props: Props) {

    const [newsDetails, setnewsDetails] = useState<detailedNews | null>({
        title: 'Top 10 colleges in greater noida',
        isSaved: true,
        id: 1,
        image: '',
        views: 2345,
        slug: 'xyz',
        intro: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam architecto molestias maiores voluptatibus harum asperiores dolorum blanditiis a deleniti sit reprehenderit provident, inventore molestiae id, modi eaque laborum eius hic?',
        commentCount: 123,
        content: 'jfvpui',
        category: 'news',
        publishedOn: '23-12-2020',
        author: 'dev trehan',
    });
    const [slugs, setSlugs] = useState<string[]>([]);
    // let currentPageUrl = `${LastBreadcrumbs[LastBreadcrumbs?.length - 1].endPoint}/${slugs[0]}`;
    const { navHeight } = useContext(NavbarContext);
    const { id, title } = newsDetails;


    const isMobile = useMediaQuery('(max-width:769px)');
    const isTablet = useMediaQuery('(max-width:992px)');
    const styles = useStyles();
    const router = useRouter();


    // React.useEffect(() => {
    //     const { query } = router;
    //     let newsSlug = query.newsSlug as string;

    //     if (newsSlug) {
    //         let category = newsSlug.toString().replace(/-/g, ' ');
    //         let lastNavigation = getLastNavigation();
    //         if (lastNavigation?.length) {
    //             let newCrumbs = [lastNavigation[0], lastNavigation[1], { name: category, endPoint: `${lastNavigation[1].endPoint}/${category}` }];
    //             setLastNavigation(newCrumbs);
    //             setBreadcrumbs(newCrumbs)
    //         }
    //         // sectionSlug && FetchData(sectionSlug);
    //     }
    // }, [router.query?.newsSlug])



    return (
        <div>

            <div className='container'>
                <div className='wrapper' style={{ padding: isMobile ? '20px 5%' : '30px 5%' }}>
                    <Grid container >
                        <Grid item xs={12} md={9} >
                            <div className={styles.container}>

                                <ThisPageHeader {...newsDetails} />

                                <div className={styles.Intro}>
                                    <MarkdownParser content={newsDetails?.intro} />
                                </div>

                                <div className={styles.content}>
                                    <MarkdownParser content={newsDetails?.content} />
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>

        </div>
    );
}

export default newsDetailsPage;




const ThisPageHeaderStyles = makeStyles({
    imageWrap: {
        animation: 'none !important',
        margin: '20px 0 0px !important',
        borderRadius: Theme.radius2,
        maxHeight: 'unset'
    },
    InfoWrap: {
        '& .title': {
            fontSize: 30,
            marginBottom: 8,
            color: Theme.TFontHeadColor,
            textAlign: 'left',
        },
        '& .detailWrap': {
            display: 'flex',
            margin: '0px -10px',
            '&>div': {
                display: 'flex',
                alignItems: 'center',
                margin: '0 10px',
                color: '#797979',
                '& p': {
                    fontSize: '14px !important',
                    margin: '0px !important',
                },
                '& svg': {
                    fontSize: 16,
                    marginRight: 3,
                }
            },
        },
    },
    InfoWrap_M: {
        '& .title': {
            fontSize: 20,
        },

    },
    sideNewsWrap: {
        position: 'absolute',
        margin: '-20px 0',
        width: '100%',
    }
})

export const ThisPageHeader = (props: detailedNews) => {

    const customStyles = ThisPageHeaderStyles();
    const [data, setData] = React.useState([]);

    const isMobile = useMediaQuery('(max-width:769px)');
    const isTablet = useMediaQuery('(max-width:992px)');
    const { title, image, commentCount, views, publishedOn } = props;
    return (
        <div style={{ marginTop: 0, }} >
            <div className={classNames('infoWrap', customStyles.InfoWrap, { [customStyles.InfoWrap_M]: isMobile })}  >
                <div >
                    <h1 className='title'>{title}</h1>
                </div>
                <div className={'detailWrap'}>
                    <div className='date'>
                        <CalendarToday />
                        <Typography>{publishedOn}</Typography>
                    </div>
                    <div className='views'>
                        <VisibilityOutlined />
                        <Typography>{views}</Typography>
                    </div>
                    <div className='commentCount'>
                        <CommentOutlined />
                        <Typography>{commentCount}</Typography>
                    </div>
                </div>
            </div>
            <div className={classNames('imageWrap', customStyles.imageWrap)} >
                <img src={image ? image : defaultImage} alt='' />
            </div>
        </div >
    )
}
