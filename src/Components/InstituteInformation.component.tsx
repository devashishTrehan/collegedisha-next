import { Theme } from '@/Services/App.service';
import React, { } from 'react';
import { Grid, makeStyles, useMediaQuery } from '@material-ui/core';
import MarkdownParser from './MarkdownParser.component';



// ----- information section start ----- \\
const InfoStyles = makeStyles({
    container: {
        boxShadow: Theme.boxShadow,
        borderRadius: Theme.radius1,
        padding: '20px 20px'
    },
})


export function RenderInformation() {


    // const { data, loading, fetchMore, error } = useQuery<InstituteInformation>(GetCollegeInformation);

    const isMobile = useMediaQuery('(max-width:769px)');
    const isTablet = useMediaQuery('(max-width:992px)');
    const styles = InfoStyles();

    const markdown = `
 #### **Galgotias College Fees Structure(Official)**

 ---  
 <table>
 <thead>
 <th>elem 1</th>
 <th>elem 2<th</th>
 <th>elem 3<th</th>
 <th>elem 4<th</th>
 <th>elem 5<th</th>
 <th>elem 6<th</th>
 <th>elem 7<th</th>
 <th>elem 8<th</th>
 </thead>
 <tbdoy>
 <tr>
 <td>elem 1</td>
 <td>elem 2<th</td>
 <td>elem 3<th</td>
 <td>elem 4<th</td>
 <td>elem 5<th</td>
 <td>elem 6<th</td>
 <td>elem 7<th</td>
 <td>elem 8<th</td>
 </tr>
 <tr>
 <td>elem 1</td>
 <td>elem 2<th</td>
 <td>elem 3<th</td>
 <td>elem 4<th</td>
 <td>elem 5<th</td>
 <td>elem 6<th</td>
 <td>elem 7<th</td>
 <td>elem 8<th</td>
 </tr>
 <tr>
 <td>elem 1</td>
 <td>elem 2<th</td>
 <td>elem 3<th</td>
 <td>elem 4<th</td>
 <td>elem 5<th</td>
 <td>elem 6<th</td>
 <td>elem 7<th</td>
 <td>elem 8<th</td>
 </tr>
 <tr>
 <td>elem 1</td>
 <td>elem 2<th</td>
 <td>elem 3<th</td>
 <td>elem 4<th</td>
 <td>elem 5<th</td>
 <td>elem 6<th</td>
 <td>elem 7<th</td>
 <td>elem 8<th</td>
 </tr>
 <tr>
 <td>elem 1</td>
 <td>elem 2<th</td>
 <td>elem 3<th</td>
 <td>elem 4<th</td>
 <td>elem 5<th</td>
 <td>elem 6<th</td>
 <td>elem 7<th</td>
 <td>elem 8<th</td>
 </tr>
 <tr>
 <td>elem 1</td>
 <td>elem 2<th</td>
 <td>elem 3<th</td>
 <td>elem 4<th</td>
 <td>elem 5<th</td>
 <td>elem 6<th</td>
 <td>elem 7<th</td>
 <td>elem 8<th</td>
 </tr>
 </tbody>
 </table>

    
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
 #### **Fee Structure**
**Code No**|**1, 49, 000**
 ---| ---
 Duration | 4 years
 X % age | Y
 XII % age | Y
 Annual Fees | 1, 49, 000
 Note: | Exam Fee is Rs. 10, 000 / - p.a
 * B.Tech in Electrical & Electronics Engineering
 #### **Eligibility**
 1. Minimum 60 % in PCM(10 + 2)
 2. Merit in the Qualifying exam, IIT JEE, UPSEE etc preferable
 #### **Fee Structure**
**Duration**|**4 years**
 ---| ---
 Annual Fees | 1, 49, 000
 Exam Fee | 10, 000  
   
 ### **School of Computing Science & Engineering**
 ***B.Tech in Computer Science & Engineering**
 ### **Eligibility**
 1) Minimum 60 % in PCM(10 + 2)
 2) Merit in the Qualifying exam, IIT JEE, UPSEE etc preferable
 ### **Fee Structure**
**Duration**|**4 years**
 ---| ---
 Annual Fees | 1, 49, 000
 Exam Fee | 10, 000

   `


    return (
        <Grid container >
            <Grid item xs={12} md={9} className={styles.container} style={isMobile ? { padding: '20px' } : null}>

                <div>
                    <MarkdownParser children={markdown} />
                </div>
            </Grid>
        </Grid>
    );
}
// ----- information section end ----- \\
