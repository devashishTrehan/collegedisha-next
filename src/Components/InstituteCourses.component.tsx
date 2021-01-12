import { Theme } from '@/Services/App.service';
import React, { useState } from 'react';
import { Grid, makeStyles, useMediaQuery } from '@material-ui/core';
import MarkdownParser from './MarkdownParser.component';
import { CourseListItem } from '@/Services/GraphQlDataTypes/Courses';
import CourseCard from './CourseCard.component';


// ----- courses section start ----- \\
const CourseStyles = makeStyles({
    container: {

    },
    courseList: {
        boxShadow: Theme.boxShadow,
        borderRadius: Theme.radius1,
        padding: '50px 20px'
    }
})

export function RenderCoursesFees() {

    const [courses, setCourses] = useState<CourseListItem[]>([
        { id: 1, name: 'B.Tech', type: 'full-time', totalFees: { currency: 'INR', amount: 480000, frequency: 'year' }, duration: '4 year', feesBreakdown: [{ currency: 'INR', amount: 120000, frequency: 'year' }, { currency: 'INR', amount: 120000, frequency: 'year' }, { currency: 'INR', amount: 120000, frequency: 'year' }, { currency: 'INR', amount: 120000, frequency: 'year' },], streams: ['computer science', 'mechanical', 'civil', 'electronics'] },
        { id: 2, name: 'M.Tech', type: 'full-time', totalFees: { currency: 'INR', amount: 480000, frequency: 'year' }, duration: '4 year', feesBreakdown: [{ currency: 'INR', amount: 120000, frequency: 'year' }, { currency: 'INR', amount: 120000, frequency: 'year' }, { currency: 'INR', amount: 120000, frequency: 'year' }, { currency: 'INR', amount: 120000, frequency: 'year' },], streams: ['computer science', 'mechanical', 'mechanical', 'mechanical', 'mechanical', 'mechanical', 'civil', 'electronics'] },
        { id: 3, name: 'BCA', type: 'full-time', totalFees: { currency: 'INR', amount: 480000, frequency: 'year' }, duration: '4 year', feesBreakdown: [{ currency: 'INR', amount: 120000, frequency: 'year' }, { currency: 'INR', amount: 120000, frequency: 'year' }, { currency: 'INR', amount: 120000, frequency: 'year' }, { currency: 'INR', amount: 120000, frequency: 'year' },], streams: ['computer science', 'mechanical', 'mechanical', 'mechanical', 'mechanical', 'mechanical', 'civil', 'electronics'] },
        { id: 4, name: 'MCA', type: 'full-time', totalFees: { currency: 'INR', amount: 480000, frequency: 'year' }, duration: '4 year', feesBreakdown: [{ currency: 'INR', amount: 120000, frequency: 'year' }, { currency: 'INR', amount: 120000, frequency: 'year' }, { currency: 'INR', amount: 120000, frequency: 'year' }, { currency: 'INR', amount: 120000, frequency: 'year' },], streams: ['computer science', 'mechanical', 'mechanical', 'mechanical', 'mechanical', 'mechanical', 'civil', 'electronics'] },
    ])

    const isMobile = useMediaQuery('(max-width:769px)');
    const isTablet = useMediaQuery('(max-width:992px)');

    const styles = CourseStyles();

    return (

        <Grid container >
            <Grid item xs={12} md={8} className={styles.courseList} style={isMobile ? { padding: '20px' } : null}>

                <Grid container spacing={5}>
                    {
                        courses?.map((course: CourseListItem) => {
                            return (
                                <Grid item xs={12} key={course.id} >
                                    <CourseCard {...course} />
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Grid>
        </Grid>
    );
}
// ----- Courses section end ----- \\
