import { GetCookie, Storages, Theme } from '@/Services/App.service';
import React, { useEffect, useState } from 'react';
import { Grid, makeStyles, Typography, useMediaQuery } from '@material-ui/core';
import MarkdownParser from './MarkdownParser.component';
import { InstituteInformation } from '@/Services/DataTypes/Institutes';
import { ApiResponseHandler, GetInstituteSectionDetails } from '@/Services/Api.service';
import { DataPageWrapper, pageStateType } from './DataPageWrapper.component';
import { useRouter } from 'next/router';
import { ApiResponse, PageSEOProps } from '@/Services/Interfaces.interface';
import PageSEO from './PageSEO.component';



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
                padding: 0,
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
    contactNumber?: string,
    address: string,
}

export const AddressDetailComponent = (props: AddressDetailProps) => {

    const { timings, address, contactNumber } = props;

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
                                contactNumber ?
                                    < Typography className='detailValue'>{contactNumber}</Typography>
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

interface Props {
    data: InstituteInformation
}

export function RenderInformation(props: Props) {


    // const { data, loading, fetchMore, error } = useQuery<InstituteInformation>(GetCollegeInformation);

    const isMobile = useMediaQuery('(max-width:769px)');
    const isTablet = useMediaQuery('(max-width:992px)');
    const styles = InfoStyles();
    const [data, setData] = useState<InstituteInformation>(props?.data);
    const [loading, setLoading] = useState(false);
    const [pageState, setPageState] = useState<pageStateType>('__request_success__');
    const [pageSEO, setPageSEO] = useState<PageSEOProps>(null);
    const router = useRouter();


    const requestData = async () => {
        let slug = router?.query?.instituteSlug[0];
        let userId = parseInt(GetCookie(Storages.UserId));
        let token = GetCookie(Storages.AccessToken);
        let response = await GetInstituteSectionDetails({ token: token, userId: userId, slug: slug, section: 'information' });
        console.log('response data',response);
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
                    {console.log('data', data)}
                    <div className={'pageSectionContainer'} style={isMobile ? { padding: '20px' } : null}>

                        <div>
                            <MarkdownParser content={data?.about ?? '**No Information Available**'} />
                        </div>
                    </div>

                    <div className={styles.addressDetailsContainer}>
                        <div className={'pageSectionContainer'}>
                            <AddressDetailComponent {...data?.addressDetails} />
                        </div>
                    </div>
                </>
            </DataPageWrapper>
        </>
    );
}
// ----- information section end ----- \\
