
import React from 'react';
import {  makeStyles, useMediaQuery } from '@material-ui/core';
import MarkdownParser from './MarkdownParser.component';


// ----- Admission section start ----- \\
const AdmissionStyles = makeStyles({

})


export function RenderAdmission() {
    const isMobile = useMediaQuery('(max-width:769px)');
    const isTablet = useMediaQuery('(max-width:992px)');
    const styles = AdmissionStyles();

    const markdown = `
 #### **Galgotias College Fees Structure(Official)**

 ---  
    
 ###### **Courses Details:**
 ** The college offers 5 courses to students:**
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
 #### ** Fees Structure **
 ** Duration ** | ** 4 years **
 ---| ---
 Annual Fees | 1, 49, 000
 Exam Fee | 10, 000
 * B.Tech in Electronics and Communication Engineering with specialization in Embedded System
 #### ** Eligibility **
 1. Minimum 60 % in PCM(10 + 2)
 2. Merit in the Qualifying exam, IIT JEE, UPSEE etc preferable
 #### ** Fee Structure **
 ** Duration ** | ** 4 years **
 ---| ---
 Annual Fees | 1, 49, 000
 Exam Fee | 10, 000
 * B.Tech in Electronics and Communication Engineering with specialization in VLSI
 #### ** Eligibility **
 1. Minimum 60 % in PCM(10 + 2)
 2. Merit in the Qualifying exam, IIT JEE, UPSEE etc preferable
 #### ** Fee Structure **
 ** Duration ** | ** 4 years **
 ---| ---
 Annual Fees | 1, 49, 000
 Exam Fee | 10, 000
 * B.Tech in Electronics & Communication Engineering
 #### ** Eligibility **
 1. Minimum 60 % in PCM(10 + 2)
 2. Merit in the Qualifying exam, IIT JEE, UPSEE etc preferable
   `


    return (

        <div className={'pageSectionContainer'} style={isMobile ? { padding: '20px' } : null}>
            <MarkdownParser content={markdown} />
        </div>
    );
}
// ----- Admission section End ----- \\
