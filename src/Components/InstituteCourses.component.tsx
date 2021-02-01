
import React, { useEffect, useState } from 'react';
import { Grid, makeStyles, useMediaQuery } from '@material-ui/core';
import MarkdownParser from './MarkdownParser.component';
import { CourseListItem } from '@/Services/DataTypes/Courses';
import CourseCard from './CourseCard.component';
import { InstituteCourses } from '@/Services/DataTypes/Institutes';


// ----- courses section start ----- \\
const CourseStyles = makeStyles({

    courseInfoContainer: {
        marginTop: 50,
    }
})

interface Props {
    data: InstituteCourses
}

export function RenderCoursesFees(props: Props) {


    const isMobile = useMediaQuery('(max-width:769px)');
    const isTablet = useMediaQuery('(max-width:992px)');
    const [data, setData] = useState<InstituteCourses>(props?.data);

    useEffect(() => {
        setData(props.data);
    }, [props?.data])

    const fetchData = async () => {
        console.log('fetching data');
    }

    useEffect(() => {
        if (data) {
            fetchData();
        }
    }, [])

    const styles = CourseStyles();

    return (
        <>
            <div className={'pageSectionContainer'} style={isMobile ? { padding: '20px' } : null}>

                <Grid container spacing={5}>
                    {
                        data?.courseList?.map((course: CourseListItem) => {
                            return (
                                <Grid item xs={12} key={course.id} >
                                    <CourseCard {...course} />
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </div>

            <div className={styles.courseInfoContainer}>
                <div className={'pageSectionContainer'} style={isMobile ? { padding: '20px' } : null}>

                    <MarkdownParser content={data?.courseContent} />
                </div>
            </div>
        </>
    );
}
// ----- Courses section end ----- \\
