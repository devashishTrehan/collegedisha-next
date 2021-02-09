
import { Grid, useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useState, useEffect, useRef } from 'react';
import { GetCookie, GetPageInitialData, Routes, Storages, Theme } from '@/Services/App.service';
import { ApiResponseHandler, GetNewsList, GetNewsHome } from '@/Services/Api.service';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { NewsListItemTypes, NewsListTypes } from '@/Services/DataTypes/News';
import NewsListCard from '@/Components/NewsListCard.component';
import { PageNavigation } from '@/Components/PageNavigation.component';
import { NewsPageHeader } from '..';
import { DataPageWrapper, pageStateType } from '@/Components/DataPageWrapper.component';
import PageEndIndicator from '@/Components/PageEndIndicator.component';
import { ApiResponse, PageSEOProps } from '@/Services/Interfaces.interface';


const useStyles = makeStyles({
  wrapper: {
    padding: ' 0px 5% 50px',
  },

})

const getData = async (params) => {

  return await GetNewsHome({ ...params });
}

const defaultImage = '/assets/images/defaults/news.jpg'

function NewsList(props: any) {

  const { responseType, result, pageSeo: __pageSeo } = GetPageInitialData(props.data);

  const isMobile = useMediaQuery('(max-width:600px)');
  const isTablet = useMediaQuery('(max-width:992px)');
  const router = useRouter();
  const [data, setData] = React.useState<NewsListTypes | null>(result ?? {})
  const [currentCategory, setCurrentCategory] = React.useState<string>(router?.query?.categorySlug as string);

  const styles = useStyles();
  const [newsList, setNewsList] = useState<NewsListItemTypes[] | null>(result?.newsList ?? [])
  const [loading, setLoading] = useState(false);
  const [infiniteLoading, setInfiniteLoading] = useState(false);
  const [pageState, setPageState] = useState<pageStateType>(responseType);
  const [pageSeo, setPageSeo] = useState<PageSEOProps>(__pageSeo);

  const currentCategoryRef = useRef(router?.query?.categorySlug as string);
  let pageOptions = React.useRef({
    pageNo: 2,
    hasMore: true,
  })


  const OnPageResponseHandler = (data: ApiResponse, toAppend: boolean = false) => {
    let response = ApiResponseHandler(data, {
      onNoData: () => {
        setNewsList((prev => {
          if (toAppend) {
            return [...prev]
          } else {
            return null;
          }
        }))
      },
      onSuccess: () => {
        setNewsList((prev => {
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
        pageNo: toAppend ? pageOptions.current.pageNo + 1 : 2,
        hasMore: data?.additionalData?.hasMore
      };
      pageOptions.current = newOptions;
    }
    console.log('pageOptions after change', pageOptions.current);
    if (!toAppend) {
      setPageState(response);
    }
  }


  const requestData = async (_pageNo: number, toAppend: boolean = false, category = currentCategoryRef.current) => {
    let userId = parseInt(GetCookie(Storages.UserId));
    let token = GetCookie(Storages.AccessToken);
    setInfiniteLoading(true);
    let response = await GetNewsList({ token: token, userId: userId, pageNo: _pageNo, category: category });
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


  const ShowCategory = (category: string) => {
    router.push(`${Routes.News}/${data?.newsCategories[category]}`, undefined, { shallow: true });
  }



  React.useEffect(() => {
    const { query } = router;
    let categorySlug = query.categorySlug as string;
    console.log('currentCategory', categorySlug)
    if (categorySlug !== currentCategoryRef.current) {
      currentCategoryRef.current = categorySlug;
      setCurrentCategory(categorySlug);
      requestData(1, false, categorySlug);
    }
  }, [router.query?.categorySlug])


  return (

    <DataPageWrapper loading={loading} pageState={pageState}>
      <>

        {
          data?.featuredNews?.length ?
            <div>
              <NewsPageHeader featuredNews={data?.featuredNews} />
            </div>
            : null
        }

        {
          data?.newsCategories ?
            <PageNavigation pageSections={data?.newsCategories} currentSection={currentCategory} onLinkClick={(section: string) => ShowCategory(section)} />
            : null
        }

        {
          newsList?.length ?
            <div className='container'>
              <div className={'wrapper'}>

                <Grid container spacing={isMobile ? 3 : 5}>

                  {
                    newsList?.map((newsItem: NewsListItemTypes) => {
                      return (
                        <Grid item xs={12} sm={6}>
                          <NewsListCard {...newsItem} />
                        </Grid>


                      )
                    })
                  }
                </Grid>

                <PageEndIndicator loading={infiniteLoading} onIntersection={RequestDataOnIntersection} />

              </div>
            </div>
            : null
        }
      </>
    </DataPageWrapper>
  );
}

export default NewsList;

export async function getServerSideProps(context) {
  let category = context?.params?.categorySlug;
  let returnData = { props: { data: null } }

  let response = await getData({ token: '', userId: '', category: category });
  if (response) {
    returnData.props.data = response.data;
  }
  return returnData;
}


//   ------ section styles start------   \\
const sectionStyles = makeStyles({
  container: {
    boxShadow: Theme.boxShadow,
    borderRadius: Theme.radius1,
    padding: '20px',
    margin: '30px 0',

  },
})
//   ------ section styles end------   \\


interface PageSectionProps {
  newsList: NewsListItemTypes[],
}

const RenderPageSection = React.memo((props: PageSectionProps) => {

  const router = useRouter();
  const [data, setData] = React.useState(props.newsList);

  const styles = sectionStyles();

  const FetchData = async (slug: string) => {
    console.log('fetching Data');
  }

  React.useEffect(() => {
    const { query } = router;
    let categorySlug = query.categorySlug as string;
    if (categorySlug) {
      FetchData(categorySlug);
    }
  }, [router.query?.categorySlug])

  return (
    <>
      {
        data?.map((item: NewsListItemTypes, index: number) => {
          return (
            <Grid key={item.id} item xs={12} sm={6}>
              <NewsListCard {...item} />
            </Grid>
          )
        })
      }
    </>
  )
})