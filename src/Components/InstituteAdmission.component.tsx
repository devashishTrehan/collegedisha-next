
import React, { useEffect, useState } from 'react';
import { makeStyles, useMediaQuery } from '@material-ui/core';
import MarkdownParser from './MarkdownParser.component';
import { InstituteAdmission } from '@/Services/DataTypes/Institutes';
import PageSEO from './PageSEO.component';
import { DataPageWrapper, pageStateType } from './DataPageWrapper.component';
import { useRouter } from 'next/router';
import { ApiResponse, PageSEOProps } from '@/Services/Interfaces.interface';
import { GetCookie, Storages } from '@/Services/App.service';
import { ApiResponseHandler, GetInstituteSectionDetails } from '@/Services/Api.service';


// ----- Admission section start ----- \\
const AdmissionStyles = makeStyles({

})

interface Props {
    data: InstituteAdmission
}

export function RenderAdmission(props: Props) {
    const isMobile = useMediaQuery('(max-width:769px)');
    const isTablet = useMediaQuery('(max-width:992px)');
    const styles = AdmissionStyles();

    const [data, setData] = useState<InstituteAdmission>(props?.data);
    const [loading, setLoading] = useState(false);
    const [pageState, setPageState] = useState<pageStateType>('__request_success__');
    const [pageSEO, setPageSEO] = useState<PageSEOProps>(null);
    const router = useRouter();


    const requestData = async () => {
        let slug = router?.query?.instituteSlug[0];
        let userId = parseInt(GetCookie(Storages.UserId));
        let token = GetCookie(Storages.AccessToken);
        let response = await GetInstituteSectionDetails({ token: token, userId: userId, slug: slug, section: 'admission' });
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
        if (!data) {
            requestData();
        }
    }, [])


    return (
        <>
            <PageSEO data={pageSEO} />
            <DataPageWrapper pageState={pageState}>
                <div className={'pageSectionContainer'} style={isMobile ? { padding: '20px' } : null}>
                    <MarkdownParser content={data?.content} />
                </div>
            </DataPageWrapper>
        </>
    );
}
// ----- Admission section End ----- \\
