import CustomBreadCrumb from '@/Components/CustomBreadCrumb.component';
import CustomCard from '@/Components/InstituteCard.component';
import DummyCards from '@/Components/DummyCard.component';
import ExamCard from '@/Components/ExamCard.component';
import { ExamCategories } from '@/Components/ExamCategories.component';
import { Filters } from '@/Components/Filter.component';
import { Footer } from '@/Components/Footer.component';
import { SubscribeSection } from '@/Components/Subscribe.component';
import { Routes, Theme } from '@/Services/App.service';
import { ExamListItem } from '@/Services/GraphQlDataTypes/Exams';
import { Grid, Hidden, makeStyles, Typography, useMediaQuery } from '@material-ui/core';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';

interface Props {

}

const SectionSpacing = 50;

const useStyles = makeStyles({
    pageHeading: {
        textAlign: 'left',
        fontSize: '28px',
        color: Theme.primary,
        fontFamily: 'gorditaBold',
        textTransform: 'capitalize',
    },
    pageHeading_M: {
        fontSize: '20px',
    },
    listContentWrap: {
        display: 'inline-flex',
        '& .examListWrap': {
            '&>div': {
                marginRight: SectionSpacing,
                borderRadius: Theme.radius2,
                // boxShadow: Theme.boxShadow,
                padding: `${Theme.spacingMore}px ${Theme.spacingMid}px`,
                backgroundColor: Theme.backgroundColor,
            }
        },
        '& .examCardsWrap': {
            borderRadius: Theme.radius2,
            // boxShadow: Theme.boxShadow,
            backgroundColor: Theme.backgroundColor,
            padding: `${Theme.spacingMore}px ${Theme.spacingMid}px`,
        },
    }
})

function Universities(props: Props) {

    const [exams, setExams] = useState<ExamListItem[]>([
        {
            id: 1, title: 'Indian Army', image: '', subTitle: 'Indian Army', links: [
                { label: 'Syllabus', url: '' },
                { label: 'Answer Key', url: '' },
                { label: 'Dates', url: '' },
                { label: 'Admit card', url: '' },
                { label: 'Application form', url: '' },
            ]
        },
        {
            id: 2, title: 'UP Police', image: '', subTitle: 'UP Police', links: [
                { label: 'Syllabus', url: '' },
                { label: 'Answer Key', url: '' },
                { label: 'Dates', url: '' },
                { label: 'Admit card', url: '' },
                { label: 'Application form', url: '' },
            ]
        },
        {
            id: 3, title: 'JTET', image: '', subTitle: 'JTET', links: [
                { label: 'Syllabus', url: '' },
                { label: 'Answer Key', url: '' },
                { label: 'Dates', url: '' },
                { label: 'Admit card', url: '' },
                { label: 'Application form', url: '' },
            ]
        },
        {
            id: 4, title: 'Maharashtra TET', image: '', subTitle: 'Maharashtra TET', links: [
                { label: 'Syllabus', url: '' },
                { label: 'Answer Key', url: '' },
                { label: 'Dates', url: '' },
                { label: 'Admit card', url: '' },
                { label: 'Application form', url: '' },
            ]
        },
        {
            id: 5, title: 'UPPCL JE', image: '', subTitle: 'UPPCL JE', links: [
                { label: 'Syllabus', url: '' },
                { label: 'Answer Key', url: '' },
                { label: 'Dates', url: '' },
                { label: 'Admit card', url: '' },
                { label: 'Application form', url: '' },
            ]
        },
        {
            id: 6, title: 'UP Lekhpal', image: '', subTitle: 'UP Lekhpal', links: [
                { label: 'Syllabus', url: '' },
                { label: 'Answer Key', url: '' },
                { label: 'Dates', url: '' },
                { label: 'Admit card', url: '' },
                { label: 'Application form', url: '' },
            ]
        },
        {
            id: 7, title: 'UP Vidhan Parishad', image: '', subTitle: 'UP Vidhan Parishad', links: [
                { label: 'Syllabus', url: '' },
                { label: 'Answer Key', url: '' },
                { label: 'Dates', url: '' },
                { label: 'Admit card', url: '' },
                { label: 'Application form', url: '' },
            ]
        },
        {
            id: 8, title: 'UP GNM Exam', image: '', subTitle: 'UP GNM Exam', links: [
                { label: 'Syllabus', url: '' },
                { label: 'Answer Key', url: '' },
                { label: 'Dates', url: '' },
                { label: 'Admit card', url: '' },
                { label: 'Application form', url: '' },
            ]
        },
        {
            id: 9, title: 'Manipur TET', image: '', subTitle: 'Manipur TET', links: [
                { label: 'Syllabus', url: '' },
                { label: 'Answer Key', url: '' },
                { label: 'Dates', url: '' },
                { label: 'Admit card', url: '' },
                { label: 'Application form', url: '' },
            ]
        },

    ])

    const isMobile = useMediaQuery('(max-width:600px)');
    const isTablet = useMediaQuery('(max-width:992px)');
    const [ExamContentWidth, setExamContentWidth] = React.useState<number>(0);

    React.useEffect(() => {
        let windowWidth = window.innerWidth;
        let contentWidth;
        if (isTablet) {
            contentWidth = windowWidth - (windowWidth * 0.10 + 70)
        } else {
            contentWidth = windowWidth - (windowWidth * 0.10 + 70 + 200 + SectionSpacing)
        }
        setExamContentWidth(contentWidth);
    }, [])

    useEffect(() => {
        document.body.style.backgroundColor = Theme.secondary + '08';
        return (() => {
            document.body.style.backgroundColor = Theme.backgroundColor;
        })
    }, [])

    const styles = useStyles();



    return (
        <>

            <CustomBreadCrumb breadcrumbs={[{ name: 'exams', endPoint: `${Routes.Exams}` }]} />


            <div className='container'>
                <div style={{ padding: '20px 5% 0' }}>
                    <Typography variant='h2' className={classNames(styles.pageHeading, { [styles.pageHeading_M]: isMobile })}>List of all popular entrance exams and government exams in India</Typography>
                </div>
            </div>

            <div className='container'>
                <div className='wrapper'>

                    <div className={styles.listContentWrap}>

                        <Hidden smDown>
                            <div className='examListWrap'>
                                <div>
                                    <ExamCategories />
                                </div>
                            </div>
                        </Hidden>

                        <div className='examCardsWrap'>

                            <Grid container spacing={6} justify='space-evenly'>
                                {
                                    exams?.map((university: ExamListItem, index: number) => {
                                        return (<Grid item key={index}
                                        >
                                            {/* <CustomListItem {...university} /> */}
                                            <ExamCard {...university} />
                                        </Grid>)
                                    })
                                }

                                <DummyCards parentWidth={ExamContentWidth} spacing={6} cardWidth={{ small: 180, regular: 240 }} cardCount={exams.length} withGrid={true} />

                            </Grid>
                        </div>
                    </div>
                </div>
            </div>
            <SubscribeSection />
            <Footer />
        </>
    );
}

export default Universities;



