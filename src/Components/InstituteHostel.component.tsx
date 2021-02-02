import { GetCookie, Storages, Theme } from '@/Services/App.service';
import React, { useEffect, useState } from 'react';
import { Grid, makeStyles, Typography, useMediaQuery } from '@material-ui/core';
import MarkdownParser from './MarkdownParser.component';
import { InstituteHostel, InstituteHostelFacility, InstituteHostelFees } from '@/Services/DataTypes/Institutes';
import { DataPageWrapper, pageStateType } from './DataPageWrapper.component';
import { useRouter } from 'next/router';
import { ApiResponse, PageSEOProps } from '@/Services/Interfaces.interface';
import PageSEO from './PageSEO.component';
import { ApiResponseHandler, GetInstituteSectionDetails } from '@/Services/Api.service';

const useStyles = makeStyles({

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
                facilities?.map((facility: InstituteHostelFacility, index: number) => {
                    let facilityName = facility.replace('_', ' ');
                    return (<Grid key={index} item xs={6} sm={3} md={2} >
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
                        fees?.map((fees: InstituteHostelFees, index: number) => {
                            return (<tr key={index}>
                                <td>{fees.room}</td>
                                <td>{fees.AC}</td>
                                <td>{fees.NonAC}</td>
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

interface Props {
    data: InstituteHostel
}

export function RenderHostel(props: Props) {

    const styles = useStyles();
    const isMobile = useMediaQuery('(max-width:769px)');
    const isTablet = useMediaQuery('(max-width:992px)');

    const [data, setData] = useState<InstituteHostel>(props?.data);
    let hostels = data ? Object.keys(data) : [];

    const [loading, setLoading] = useState(false);
    const [pageState, setPageState] = useState<pageStateType>('__request_success__');
    const [pageSEO, setPageSEO] = useState<PageSEOProps>(null);
    const router = useRouter();


    const requestData = async () => {
        let slug = router?.query?.instituteSlug[0];
        let userId = parseInt(GetCookie(Storages.UserId));
        let token = GetCookie(Storages.AccessToken);
        let response = await GetInstituteSectionDetails({ token: token, userId: userId, slug: slug, section: 'hostel' });
        console.log('response data', response);
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
        console.log('page data', data);
        if (!data) {
            requestData();
        }
    }, [])


    return (
        <>
            <PageSEO data={pageSEO} />
            <DataPageWrapper pageState={pageState}>
                <>
                    {

                        hostels?.map((hostelType: string, index: number) => {
                            return (
                                <React.Fragment key={index}>
                                    <div className={styles.hostelFeesContainer}>
                                        <div className={'pageSectionContainer'} >
                                            <div className={'containerHead'}>
                                                <Typography variant='h4'>{hostelTypeEnum[hostelType]} Hostel fees</Typography>
                                            </div>
                                            {
                                                RenderFees(data[hostelType].fees)
                                            }
                                        </div>
                                    </div>

                                    <div className={styles.hostelFacilityContainer}>
                                        <div className={'pageSectionContainer'} >
                                            <div className={'containerHead'}>
                                                <Typography variant='h4'>{hostelTypeEnum[hostelType]} Hostel facilities</Typography>
                                            </div>
                                            {
                                                RenderFacilities(data[hostelType].facilities)
                                            }
                                        </div>
                                    </div>

                                    <div className={styles.hostelFacilityContent}>
                                        <div className={'pageSectionContainer'} style={isMobile ? { padding: '20px' } : null}>
                                            <div className={'containerHead'}>
                                                <Typography variant='h4'>{hostelTypeEnum[hostelType]} Hostel details</Typography>
                                            </div>
                                            <div>
                                                <MarkdownParser content={data[hostelType].hostelContent} />
                                            </div>
                                        </div>
                                    </div>
                                </React.Fragment>
                            )
                        })
                    }
                </>
            </DataPageWrapper>
        </>
    );
}
// ----- hostel section end ----- \\
