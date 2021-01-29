
import React, { useState } from 'react';
import { Grid, makeStyles, useMediaQuery } from '@material-ui/core';
import MarkdownParser from './MarkdownParser.component';
import { CourseListItem } from '@/Services/DataTypes/Courses';
import CourseCard from './CourseCard.component';


// ----- courses section start ----- \\
const CourseStyles = makeStyles({

    courseInfoContainer: {
        marginTop: 50,
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

    const markdown = `
    #### **Galgotias College Fees Structure(Official)**
   
    ---  
       
             ###### **Courses Details:**
            **The college offers 5 courses to students:**
                         * Undergraduate Programmes
                  * Postgraduate Programmes
                          * Diploma Programmes
               * Integrated Programmes
                 * Doctoral Programmes
    ### School of Electrical, Electronics & Communication Engineering
    * B.Tech in Electronics and Communication Engineering with specialization in the Internet of Things(IOT)
    #### Eligibility
    1. Minimum 60 % in PCM(10 + 2)
    2. Merit in the Qualifying exam, IIT JEE, UPSEE etc preferable
    #### **Fees Structure**
   **Duration**|**4 years**
    ---| ---
    Annual Fees | 1, 49, 000
    Exam Fee | 10, 000
    * B.Tech in Electronics and Communication Engineering with specialization in Embedded System
    #### **Eligibility**
    1. Minimum 60 % in PCM(10 + 2)
    2. Merit in the Qualifying exam, IIT JEE, UPSEE etc preferable
    #### **Fee Structure**
   **Duration**|**4 years**
    ---| ---
    Annual Fees | 1, 49, 000
    Exam Fee | 10, 000
    * B.Tech in Electronics and Communication Engineering with specialization in VLSI
    #### **Eligibility**
    1. Minimum 60 % in PCM(10 + 2)
    2. Merit in the Qualifying exam, IIT JEE, UPSEE etc preferable
    #### **Fee Structure**
   **Duration**|**4 years**
    ---| ---
    Annual Fees | 1, 49, 000
    Exam Fee | 10, 000
    * B.Tech in Electronics & Communication Engineering
    #### **Eligibility**
    1. Minimum 60 % in PCM(10 + 2)
    2. Merit in the Qualifying exam, IIT JEE, UPSEE etc preferable
    #### **Fee Structure**
   **Duration**|**4 years**
    ---| ---
    Annual Fees | 1, 49, 000
    Exam Fee | 10, 000
    * B.Tech in Electrical Engineering
    #### **Eligibility**
    * Minimum 60 % in PCM(10 + 2)
    * Merit in the Qualifying exam, IIT JEE, UPSEE etc preferable

`

    const styles = CourseStyles();

    return (
        <>
            <div className={'pageSectionContainer'} style={isMobile ? { padding: '20px' } : null}>

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
            </div>

            <div className={styles.courseInfoContainer}>
                <div className={'pageSectionContainer'} style={isMobile ? { padding: '20px' } : null}>

                    <MarkdownParser content={markdown} />
                </div>
            </div>
        </>
    );
}
// ----- Courses section end ----- \\
