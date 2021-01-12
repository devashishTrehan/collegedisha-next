import { Theme } from '@/Services/App.service';
import React, { useState } from 'react';
import { Grid, makeStyles, useMediaQuery } from '@material-ui/core';
import MarkdownParser from './MarkdownParser.component';
import { CourseListItem } from '@/Services/GraphQlDataTypes/Courses';
import CourseCard from './CourseCard.component';
import DummyCards from './DummyCard.component';
import classNames from 'classnames';


// ----- gallery section start ----- \\
const GalleryStyles = makeStyles({
    container: {
        boxShadow: Theme.boxShadow,
        borderRadius: Theme.radius1,
        padding: '20px 20px'
    },
    imageWrap: {
        width: 200,
        height: 200,
        borderRadius: Theme.radius1,
        boxShadow: Theme.boxShadow,
        imageOrientation: '',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '& img': {
            width: '100%'
        }
    },
    imageWrap_M: {
        width: 140,
        height: 140,
    }
})

const defaultImage = '/assets/images/defaults/default.jpg';

export function RenderGallery() {

    const isMobile = useMediaQuery('(max-width:769px)');
    const isTablet = useMediaQuery('(max-width:992px)');
    const styles = GalleryStyles();

    const Images = [
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
    ]


    const RenderImage = ({ image }) => {
        return (
            <div className={classNames(styles.imageWrap, { [styles.imageWrap_M]: isMobile })}>
                <img src={image ? image : defaultImage} alt='' />
            </div>
        )
    }

    return (
        <Grid container >
            <Grid item xs={12} md={8} className={styles.container} style={isMobile ? { padding: '20px' } : null}>

                <Grid container spacing={5} justify={'space-between'}>
                    {
                        Images?.map((image: string) => {
                            return <Grid item>
                                <RenderImage image={image} />
                            </Grid>;
                        })
                    }
                    <DummyCards cardCount={Images?.length} spacing={5} withGrid={true} cardWidth={{ small: 140, regular: 200, }} />
                </Grid>
            </Grid>
        </Grid>
    );
}
// ----- gallery section end ----- \\
