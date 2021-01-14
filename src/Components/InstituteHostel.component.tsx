import { Theme } from '@/Services/App.service';
import React, { useState } from 'react';
import { Grid, makeStyles, Typography, useMediaQuery } from '@material-ui/core';
import MarkdownParser from './MarkdownParser.component';
import { CourseListItem } from '@/Services/GraphQlDataTypes/Courses';
import CourseCard from './CourseCard.component';
import { InstituteHostel, InstituteHostelFacility, InstituteHostelFees } from '@/Services/GraphQlDataTypes/Institutes';
import { render } from 'react-dom';


const useStyles = makeStyles({
    container: {
        boxShadow: Theme.boxShadow,
        borderRadius: Theme.radius1,
        padding: '20px 20px'
    },

    hostelFacilityContent: {
        marginBottom: 50,
        '&:last-child': {
            margin: 0
        }
    },
    hostelFacilityContainer: {
        marginBottom: 50,
    },
    hostelFeesContainer: {
        marginBottom: 50,
        '& .tableContainer': {
            borderRadius: Theme.radius2,
            border: '1px solid #ccc',
            overflow: 'hidden'
        },
        '& table': {
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: 14,
            '& thead>tr': {
                borderBottom: '1px solid #ccc',
            },
            '& tbody>tr': {
                borderBottom: '1px solid #ccc',
                '&:last-child': {
                    border: 'none',
                },
            },
            '& th': {
                borderRight: '1px solid #ccc',
                color: Theme.primary,
                padding: 10,
                '&:last-child': {
                    border: 'none',
                },
            },
            '& td': {
                borderRight: '1px solid #ccc',
                color: '#666',
                padding: '15px 10px',
                '&:last-child': {
                    border: 'none',
                },
            }
        }
    }
})

const RenderFacilities = (facilities: InstituteHostelFacility[]) => {
    return (

        <Grid container justify={'flex-start'} spacing={5}>
            {
                facilities?.map((facility: InstituteHostelFacility) => {
                    let facilityName = facility.replace('_', ' ');
                    return (<Grid item xs={6} sm={3} md={2} >
                        <div>
                            <div style={{ width: 40, height: 40, margin: 'auto', marginBottom: 5, }} >
                                <img style={{ width: '100%' }} src={`/assets/images/hostelFacilities/${facility}.png`} alt='' />
                            </div>
                            <Typography style={{ textTransform: 'capitalize', color: Theme.fontColorSecondary, fontSize: 14 }}>{facilityName}</Typography>
                        </div>
                    </Grid>)
                })
            }
        </Grid>
    )
}

const RenderFees = (fees: InstituteHostelFees[]) => {
    return (

        <div className='tableContainer'>
            <table >
                <thead>
                    <tr>
                        <th>Room</th>
                        <th>A.C.</th>
                        <th>Non A.C.</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        fees?.map((fees: InstituteHostelFees) => {
                            return (<tr>
                                <td>{fees.room}</td>
                                <td>{fees.AC}</td>
                                <td>{fees.Non_AC}</td>
                            </tr>)
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

const hostelTypeEnum = {
    male: 'boys',
    female: 'girls'
}

// ----- hostel section start ----- \\
export function RenderHostel() {

    const data: InstituteHostel = {
        female: {
            fees: [
                { room: '1 seater', AC: 'Rs.140000', Non_AC: 'Rs.100000' },
                { room: '2 seater', AC: 'Rs.140000', Non_AC: 'Rs.100000' },
                { room: '3 seater', AC: 'Rs.140000', Non_AC: 'Rs.100000' },
            ],
            facilities: ['gym', 'auditorium', 'laboratory', 'canteen', 'sports', 'wifi', 'computer_lab'],
            hostel_content: `    ### School of Electrical, Electronics & Communication Engineering
            * B.Tech in Electronics and Communication Engineering with specialization in the Internet of Things(IOT)
            #### Eligibility
            1. Minimum 60 % in PCM(10 + 2)
            2. Merit in the Qualifying exam, IIT JEE, UPSEE etc preferable
            #### **Fees Structure**
           **Duration**|**4 years**
            ---| ---
            Annual Fees | 1, 49, 000
            Exam Fee | 10, 000`
        },
        male: {
            fees: [
                { room: '1 seater', AC: 'Rs.140000', Non_AC: 'Rs.100000' },
                { room: '2 seater', AC: 'Rs.140000', Non_AC: 'Rs.100000' },
            ],
            facilities: ['gym', 'medical', 'laboratory', 'canteen', 'sports', 'wifi', 'computer_lab'],
            hostel_content: `    ### School of Electrical, Electronics & Communication Engineering
            * B.Tech in Electronics and Communication Engineering with specialization in the Internet of Things(IOT)
            #### Eligibility
            1. Minimum 60 % in PCM(10 + 2)
            2. Merit in the Qualifying exam, IIT JEE, UPSEE etc preferable
            #### **Fees Structure**
           **Duration**|**4 years**
            ---| ---
            Annual Fees | 1, 49, 000
            Exam Fee | 10, 000`
        },
    }

    const styles = useStyles();
    const isMobile = useMediaQuery('(max-width:769px)');
    const isTablet = useMediaQuery('(max-width:992px)');

    let hostels = Object.keys(data);

    return (
        <>
            {

                hostels?.map((hostelType: string) => {
                    return (
                        <>
                            <div className={styles.hostelFeesContainer}>
                                <div className={styles.container} >
                                    <div className={'containerHead'}>
                                        <Typography variant='h4'>{hostelTypeEnum[hostelType]} Hostel fees</Typography>
                                    </div>
                                    {
                                        RenderFees(data[hostelType].fees)
                                    }
                                </div>
                            </div>

                            <div className={styles.hostelFacilityContainer}>
                                <div className={styles.container} >
                                    <div className={'containerHead'}>
                                        <Typography variant='h4'>{hostelTypeEnum[hostelType]} Hostel facilities</Typography>
                                    </div>
                                    {
                                        RenderFacilities(data[hostelType].facilities)
                                    }
                                </div>
                            </div>

                            <div className={styles.hostelFacilityContent}>
                                <div className={styles.container} style={isMobile ? { padding: '20px' } : null}>
                                    <div className={'containerHead'}>
                                        <Typography variant='h4'>{hostelTypeEnum[hostelType]} Hostel details</Typography>
                                    </div>
                                    <div>
                                        <MarkdownParser children={data[hostelType].hostel_content} />
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                })
            }
        </>
    );
}
// ----- hostel section end ----- \\
