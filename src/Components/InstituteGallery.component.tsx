import { GetCookie, Storages, Theme } from '@/Services/App.service';
import React, { useEffect, useState } from 'react';
import { Grid, makeStyles, Typography, useMediaQuery } from '@material-ui/core';
import DummyCards from './DummyCard.component';
import classNames from 'classnames';
import { InstituteGallery, InstituteGalleryImage } from '@/Services/DataTypes/Institutes';
import { useRouter } from 'next/router';
import { ApiResponseHandler, GetInstituteSectionDetails } from '@/Services/Api.service';
import { ApiResponse, PageSEOProps } from '@/Services/Interfaces.interface';
import { DataPageWrapper, pageStateType } from './DataPageWrapper.component';
import PageSEO from './PageSEO.component';


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

interface Props {
    data: InstituteGallery
}

export function RenderGallery(props: Props) {

    const isMobile = useMediaQuery('(max-width:769px)');
    const isTablet = useMediaQuery('(max-width:992px)');
    const styles = GalleryStyles();
    const [data, setData] = useState<InstituteGallery>(props?.data)
    const [loading, setLoading] = useState(false);
    const [pageState, setPageState] = useState<pageStateType>('__request_success__');
    const [pageSEO, setPageSEO] = useState<PageSEOProps>(null);
    const router = useRouter();



    const RenderImage = ({ image: { image, imageName } }) => {
        const defaultImage = '/assets/images/defaults/default.webp';
        return (
            <div className={classNames(styles.imageWrap, { [styles.imageWrap_T]: isTablet, [styles.imageWrap_M]: isMobile })}>
                <img src={image ? image : defaultImage} alt={imageName} />
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


    const requestData = async () => {
        let slug = router?.query?.instituteSlug[0];
        let userId = parseInt(GetCookie(Storages.UserId));
        let token = GetCookie(Storages.AccessToken);
        let response = await GetInstituteSectionDetails({ token: token, userId: userId, slug: slug, section: 'gallery' });
        OnPageResponseHandler(response ? response.data : null);
    }

    const OnPageResponseHandler = (data: ApiResponse) => {
        let response = ApiResponseHandler(data, {
            onNoData: () => { setData(null) },
            onSuccess: () => {
                setData(data.result)
            },
        });
        setPageSEO(data?.additionalData?.pageSEO);
        setPageState(response);
    }


    useEffect(() => {
        if (!data) {
            requestData();
        }
    }, [])


    return (
        <>
            <PageSEO data={pageSEO} />
            <DataPageWrapper pageState={pageState}>
                <>
                    <div className={'pageSectionContainer'} style={isMobile ? { padding: '20px' } : null}>
                        <div className={'containerHead'}>
                            <Typography variant='h4'>Our gallery</Typography>
                        </div>
                        <Grid container spacing={5} justify={isMobile ? 'center' : 'space-around'}>
                            {
                                data?.images?.map((image: InstituteGalleryImage, index: number) => {
                                    return <Grid item key={image.id}>
                                        <RenderImage image={image} />
                                    </Grid>
                                })
                            }
                            {
                                !isMobile &&
                                <DummyCards cardCount={data?.images?.length} spacing={5} withGrid={true} cardSize={{ width: { small: 180, regular: 240 } }} />
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
                                    data?.videos?.map((video: string, index: number) => {
                                        return <Grid item key={index}>
                                            <RenderVideo videoId={video} />
                                        </Grid>
                                    })
                                }
                                {
                                    !isMobile &&
                                    <DummyCards cardCount={data?.videos?.length} spacing={5} withGrid={true} cardSize={{ width: { small: 180, regular: 240 } }} />
                                }
                            </Grid>
                        </div>
                    </div>
                </>
            </DataPageWrapper>
        </>
    );
}
// ----- gallery section end ----- \\
