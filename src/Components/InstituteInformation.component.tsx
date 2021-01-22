import { Theme } from '@/Services/App.service';
import React from 'react';
import { Grid, makeStyles, Typography, useMediaQuery } from '@material-ui/core';
import MarkdownParser from './MarkdownParser.component';
import { InstituteInformation } from '@/Services/GraphQlDataTypes/Institutes';



// ----- information section start ----- \\
const InfoStyles = makeStyles({

    addressDetailsContainer: {
        marginTop: 50,
    },
})

const useAddressStyles = makeStyles({

    addressDetailItem: {
        display: 'flex',
        margin: 'auto',
        '& .imageWrap': {
            width: 40,
            height: 40,
            marginRight: 8,
        },
        '& .detailWrap': {
            '& p': {
                textAlign: 'left',
                textTransform: 'capitalize',
                '&.detailValue': {
                    fontSize: 14,
                    color: Theme.primary,
                    fontWeight: 600,
                },
                '&.detailName': {
                    fontSize: 12,
                    color: '#666',
                },
                '&.action': {
                    fontSize: 14,
                    color: Theme.info,
                    fontWeight: 600,
                }
            }
        }
    },
})

export interface AddressDetailProps {
    timings: string,
    contact_no?: string,
    address: string,
}

export const AddressDetailComponent = (props: AddressDetailProps) => {

    const { timings, address, contact_no } = props;

    const styles = useAddressStyles();

    return (
        <>
            <div className={'containerHead'}>
                <Typography variant='h4' >Address details</Typography>
            </div>
            <Grid container spacing={4}>

                <Grid item xs={12} sm={6} >
                    <div className={styles.addressDetailItem}>
                        <div className='imageWrap'>
                            <img src={0 ? `/assets/images/instituteAddressDetails/contact.png` : `/assets/images/defaults/user.png`} alt='' />
                        </div>
                        <div className='detailWrap'>
                            <Typography noWrap className='detailName'>contact Timings</Typography>
                            <Typography className='detailValue'>{timings}</Typography>
                        </div>
                    </div>
                </Grid>

                <Grid item xs={12} sm={6} >
                    <div className={styles.addressDetailItem}>
                        <div className='imageWrap'>
                            <img src={0 ? `/assets/images/instituteAddressDetails/contact.png` : `/assets/images/defaults/user.png`} alt='' />
                        </div>
                        <div className='detailWrap'>
                            <Typography noWrap className='detailName'>Phone No.</Typography>
                            {
                                contact_no ?
                                    < Typography className='detailValue'>{contact_no}</Typography>
                                    : <Typography className='action'>Get Details</Typography>
                            }
                        </div>
                    </div>
                </Grid>

                <Grid item xs={12} >
                    <div className={styles.addressDetailItem}>
                        <div className='imageWrap'>
                            <img src={0 ? `/assets/images/instituteAddressDetails/address.png` : `/assets/images/defaults/user.png`} alt='' />
                        </div>
                        <div className='detailWrap'>
                            <Typography noWrap className='detailName'>address</Typography>
                            <Typography className='detailValue'>{address}</Typography>
                        </div>
                    </div>
                </Grid>

            </Grid>
        </>
    )
}


export function RenderInformation() {


    // const { data, loading, fetchMore, error } = useQuery<InstituteInformation>(GetCollegeInformation);

    const isMobile = useMediaQuery('(max-width:769px)');
    const isTablet = useMediaQuery('(max-width:992px)');
    const styles = InfoStyles();

    const data: InstituteInformation = {

        address_detail: {
            timings: '10:00A.M. - 5:00P.M.',
            address: 'uefgergbtr mgkjrhjyt',
        },
        about: `
        #### **Galgotias College Fees Structure(Official)**
       
        ---  
        <table>
        <thead>
        <th>elem 1</th>
        <th>elem 2<th</th>
        <th>elem 3<th</th>
        <th>elem 4<th</th>]
        </thead>
        <tbdoy>
        <tr>
        <td>elem 1</td>
        <td>elem 2<th</td>
        <td>elem 3<th</td>
        <td>elem 4<th</td>
        </tr>
        <tr>
       
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
          `
    }


    return (
        <div>

            <div className={'pageSectionContainer'} style={isMobile ? { padding: '20px' } : null}>

                <div>
                    <MarkdownParser content={data.about} />
                </div>
            </div>

            <div className={styles.addressDetailsContainer}>
                <div className={'pageSectionContainer'}>
                    <AddressDetailComponent {...data.address_detail} />
                </div>
            </div>

        </div >
    );
}
// ----- information section end ----- \\
