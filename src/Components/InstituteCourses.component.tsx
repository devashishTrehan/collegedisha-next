
import React, { useEffect, useState } from 'react';
import { Grid, makeStyles, useMediaQuery } from '@material-ui/core';
import MarkdownParser from './MarkdownParser.component';
import { CourseListItem } from '@/Services/DataTypes/Courses';
import CourseCard from './CourseCard.component';
import { InstituteCourses } from '@/Services/DataTypes/Institutes';
import PageSEO from './PageSEO.component';
import { DataPageWrapper, pageStateType } from './DataPageWrapper.component';
import { useRouter } from 'next/router';
import { ApiResponse, PageSEOProps } from '@/Services/Interfaces.interface';
import { GetCookie, Storages } from '@/Services/App.service';
import { ApiResponseHandler, GetInstituteSectionDetails } from '@/Services/Api.service';


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
    const [loading, setLoading] = useState(false);
    const [pageState, setPageState] = useState<pageStateType>('__request_success__');
    const [pageSEO, setPageSEO] = useState<PageSEOProps>(null);
    const router = useRouter();
    const styles = CourseStyles();

    const requestData = async () => {
        let slug = router?.query?.instituteSlug[0];
        let userId = parseInt(GetCookie(Storages.UserId));
        let token = GetCookie(Storages.AccessToken);
        let response = await GetInstituteSectionDetails({ token: token, userId: userId, slug: slug, section: 'courses-fees' });
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
            </DataPageWrapper>
        </>
    );
}
// ----- Courses section end ----- \\
