import { Theme } from '@/Services/App.service';
import React from 'react';
import { Grid, makeStyles, Typography, useMediaQuery } from '@material-ui/core';
import DummyCards from './DummyCard.component';
import classNames from 'classnames';


// ----- gallery section start ----- \\
const GalleryStyles = makeStyles({

    imageWrap: {
        width: 240,
        borderRadius: Theme.radius1,
        imageOrientation: '',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        '& img': {
            width: '100%'
        }
    },
    imageWrap_T: {
        width: 180,
    },
    imageWrap_M: {
        width: '100%',
    },
    videosContainer: {
        marginTop: 50,
    },
    videoWrap: {
        width: 240,
        borderRadius: Theme.radius1,
        imageOrientation: '',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        '& iframe': {
            width: '100%'
        }
    },
    videoWrap_T: {
        width: 180,
    },
    videoWrap_M: {
        width: '100%',
    }

})


export function RenderGallery() {

    const isMobile = useMediaQuery('(max-width:769px)');
    const isTablet = useMediaQuery('(max-width:992px)');
    const styles = GalleryStyles();

    const Images = ['https://www.collegedisha.com/collegedisha/gallery/153614318114.jpg',
        'https://www.collegedisha.com/collegedisha/gallery/153614318113.jpg',
        'https://www.collegedisha.com/collegedisha/gallery/153614318112.jpg',
        'https://www.collegedisha.com/collegedisha/gallery/153614318111.jpg',
        'https://www.collegedisha.com/collegedisha/gallery/153614318110.jpg',
        '',
        'https://www.collegedisha.com/collegedisha/gallery/15361431819.jpg',
        '',];
    const videos = ['_dOnnIQc9Qw', 'ildAb70UguI', '0XmUaHf-11A',];


    const RenderImage = ({ image }) => {
        const defaultImage = '/assets/images/defaults/default.jpg';
        return (
            <div className={classNames(styles.imageWrap, { [styles.imageWrap_T]: isTablet, [styles.imageWrap_M]: isMobile })}>
                <img src={image ? image : defaultImage} alt='' />
            </div>
        )
    }

    const RenderVideo = ({ videoId }) => {
        return (
            <div className={classNames(styles.videoWrap, { [styles.videoWrap_T]: isTablet, [styles.videoWrap_M]: isMobile })}>
                <iframe src={`https://www.youtube.com/embed/${videoId}`} allowFullScreen frameBorder={'none'} />
            </div>
        )
    }

    return (
        <>
            <div className={'pageSectionContainer'} style={isMobile ? { padding: '20px' } : null}>
                <div className={'containerHead'}>
                    <Typography variant='h4'>Our gallery</Typography>
                </div>
                <Grid container spacing={5} justify={isMobile ? 'center' : 'space-around'}>
                    {
                        Images?.map((image: string,index:number) => {
                            return <Grid item key={index}>
                                <RenderImage image={image} />
                            </Grid>
                        })
                    }
                    {
                        !isMobile &&
                        <DummyCards cardCount={Images?.length} spacing={5} withGrid={true} cardSize={{ width: { small: 180, regular: 240 } }} />
                    }
                </Grid>
            </div>

            <div className={styles.videosContainer} >
                <div className={'pageSectionContainer'} style={isMobile ? { padding: '20px' } : null}>
                    <div className={'containerHead'}>
                        <Typography variant='h4'>Our Videos</Typography>
                    </div>
                    <Grid container spacing={5} justify={isMobile ? 'center' : 'space-around'}>
                        {
                            videos?.map((video: string,index:number) => {
                                return <Grid item key={index}>
                                    <RenderVideo videoId={video} />
                                </Grid>
                            })
                        }
                        {
                            !isMobile &&
                            <DummyCards cardCount={Images?.length} spacing={5} withGrid={true} cardSize={{ width: { small: 180, regular: 240 } }} />
                        }
                    </Grid>
                </div>
            </div>
        </>
    );
}
// ----- gallery section end ----- \\
