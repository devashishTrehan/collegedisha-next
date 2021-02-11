
import { Grid, Typography, useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useState, useEffect, useRef } from 'react';

import { CareerListItem } from '@/Services/DataTypes/CareerOptions';
import CareerCard from '@/Components/CareerCard.component';
import { ApiResponse, PageSEOProps } from '@/Services/Interfaces.interface';
import { ApiResponseHandler, GetCareerList } from '@/Services/Api.service';
import { GetCookie, GetPageInitialData, Storages } from '@/Services/App.service';
import { DataPageWrapper, pageStateType } from '@/Components/DataPageWrapper.component';
import PageEndIndicator from '@/Components/PageEndIndicator.component';
import PageSEO from '@/Components/PageSEO.component';


const useStyles = makeStyles({
  wrapper: {
    padding: ' 0px 5% 50px',
  },

})


interface Props {
  data: ApiResponse,
}

const getData = async (params) => {

  return await GetCareerList({ ...params });
}

const defaultImage = '/assets/images/defaults/news.jpg'

function CareersPage(props: Props) {

  const { responseType, result, pageSeo: __pageSeo } = GetPageInitialData(props.data);

  const [Careers, setCareers] = useState<CareerListItem[]>(result ?? [])
  const isMobile = useMediaQuery('(max-width:600px)');
  const isTablet = useMediaQuery('(max-width:992px)');
  const [loading, setLoading] = useState(false);
  const [infiniteLoading, setInfiniteLoading] = useState(false);
  const [pageState, setPageState] = useState<pageStateType>(responseType);
  const [pageSeo, setPageSeo] = useState<PageSEOProps>(__pageSeo);

  const styles = useStyles();
  let pageOptions = useRef({
    pageNo: 1,
    hasMore: true,
  })

  const OnPageResponseHandler = (data: ApiResponse, toAppend: boolean = false) => {
    let response = ApiResponseHandler(data, {
      onNoData: () => { setCareers(null) },
      onSuccess: () => {
        setCareers((prev => {
          if (toAppend) {
            return [...prev, ...data?.result]
          } else {
            return data?.result;
          }
        }))
      },
    });
    setPageSeo(data?.additionalData?.pageSEO);
    if (response === '__request_success__') {
      let newOptions = {
        pageNo: pageOptions.current.pageNo + 1,
        hasMore: data?.additionalData?.hasMore
      };
      pageOptions.current = newOptions;
    }
    console.log('pageOptions after change', pageOptions.current);
    if (!toAppend) {
      setPageState(response);
    }
  }

  useEffect(() => {
    // if (props?.data?.result !== Colleges) {
    //     console.log('props data chnaged')
    OnPageResponseHandler(props?.data);
    // }
  }, [props?.data])


  const requestData = async (_pageNo: number, toAppend: boolean = false) => {
    let userId = parseInt(GetCookie(Storages.UserId));
    let token = GetCookie(Storages.AccessToken);
    setInfiniteLoading(true);
    let response = await getData({ token: token, userId: userId, pageNo: _pageNo });
    setInfiniteLoading(false);
    OnPageResponseHandler(response ? response.data : null, toAppend);
  }


  function RequestDataOnIntersection() {
    console.log('page options in intraction', pageOptions.current);

    if (pageOptions.current.hasMore) {
      requestData(pageOptions?.current?.pageNo, true)
    } else {
      console.log('No data to fetch');
    }
  }

  return (

    <>
      <PageSEO data={pageSeo} />


      <div className='container'>
        <div className={'wrapper'}>

          <Typography className='pageHeading' variant='h1'>A complete List of Education and career options</Typography>

          <DataPageWrapper loading={loading} pageState={pageState}>

            <div style={{ marginTop: '50px' }}>
              <Grid container spacing={isMobile ? 3 : 5} justify='flex-start'>
                {
                  Careers?.map((career: CareerListItem) => {
                    return (
                      <Grid item xs={12} sm={6} md={4} >
                        <CareerCard {...career} />
                      </Grid>

                    )
                  })
                }
                <PageEndIndicator loading={infiniteLoading} onIntersection={() => RequestDataOnIntersection()} />

              </Grid>
            </div>
          </DataPageWrapper>

        </div>
      </div>
    </>

  );
}


export default CareersPage;

export async function getStaticProps(context) {

  let returnData = { props: { data: null }, revalidate: true }

  let response = await getData({ token: '', userId: 0 });
  if (response) {
    returnData.props.data = response.data;
  }
  return returnData;

}