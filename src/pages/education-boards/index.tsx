
import { Grid, MenuItem, Typography, useMediaQuery, Theme as MuiTheme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useEffect, useRef, useState } from 'react';
import { GetCookie, GetPageInitialData, Storages, Theme } from '@/Services/App.service';
import Routes from '@/Services/Routes';
import classNames from 'classnames';
import { PageHead } from '@/Components/PageHead.component';
import { Filters } from '@/Components/Filter.component';
import { classTypes, BoardListItemTypes } from '@/Services/DataTypes/Boards';
import { useRouter } from 'next/router';
import SelectField from '@/Components/SelectField.component/SelectField.component';
import { DataPageWrapper, pageStateType } from '@/Components/DataPageWrapper.component';
import PageSEO from '@/Components/PageSEO.component';
import PageEndIndicator from '@/Components/PageEndIndicator.component';
import { ApiResponse, PageSEOProps } from '@/Services/Interfaces.interface';
import { ApiResponseHandler, GetArticleList, GetBoardList } from '@/Services/Api.service';
import Link from 'next/link';


const useStyles = makeStyles((theme: MuiTheme) => ({
  wrapper: {
    padding: ' 0px 5% 50px',
  },
  CardContainer: {
    width: 300,
    minHeight: 100,
    margin: 'auto',
    maxWidth: '100%',
    height: '100%',
    alignItems: 'center',
    background: Theme.backgroundColor,
    boxShadow: Theme.boxShadow,
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
    '& .topSecWrap': {
      cursor: 'pointer',
      width: '100%',
      [theme.breakpoints.down('xs')]: {
        display: 'flex',
        flexDirection: 'row',
      },
    }
  },
  CardImageSection: {
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      width: 100,
    },
    '& .imageWrap': {
      overflow: 'hidden',
      borderRadius: `${Theme.radius2}px ${Theme.radius2}px 0 0`,
      maxHeight: 200,
      width: '100%',
      height: '100%',
      '& img': {
        maxWidth: '100%',
      },
      [theme.breakpoints.down('xs')]: {
        width: '100%',
        display: 'flex',
        borderRadius: `${Theme.radius2}px 0  0 ${Theme.radius2}px`,
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
  },

  CardInfoSetion: {
    padding: '15px 15px 0',
    textAlign: 'left',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    textTransform: 'capitalize',
    [theme.breakpoints.down('xs')]: {
      padding: '10px 10px 0',
      width: 'calc(100% - 100px)',
    },
    '& .nameContainer': {

      '& .productName': {
        color: Theme.fontColorSecondary,
        fontFamily: 'gorditaMedium',
        fontSize: 18,
        [theme.breakpoints.down('xs')]: {
          color: Theme.fontColorSecondary,
          fontFamily: 'gorditaMedium',
          fontSize: 15,
        },
      },
    },


  },
  classesContainer: {
    overflowX: 'auto',
    margin: '5px 0',
    minHeight: 70,
    [theme.breakpoints.down('xs')]: {
      minHeight: 'unset',
    },
    '&>div': {
      display: 'inline-block',
      whiteSpace: 'nowrap',
      margin: '0px -5px',
      '& .link': {
        display: 'inline-block',
        padding: '1px 6px',
        margin: 5,
        borderRadius: 20,
        background: Theme.fontColorSecondary,
        transition: '.3s',
        '&:hover': {
          background: Theme.primary,
        },
        '& a': {
          display: 'block',
          '& span': {
            fontSize: 10,
            color: '#fff',
          }
        }
      }
    }
  },

  pageHead: {
    color: Theme.primary,
    textTransform: 'capitalize',
    '& span': {
      display: 'block',
    },
    '& .pageHeading1': {
      fontSize: '2.3rem',
      fontFamily: 'gorditaMedium',
      [theme.breakpoints.down('xs')]: {
        fontSize: '1.8rem',
      },
    },
    '& .pageHeading2': {
      fontSize: '2.5rem',
      marginTop: 8,
      fontFamily: 'gorditaBold',
      [theme.breakpoints.down('xs')]: {
        fontSize: '2rem',
        marginTop: 8,
      },
    }
  },
}))

const getData = async (params) => {

  return await GetBoardList({ ...params });
}

const breadcrumbs = [{ name: 'boards', endPoint: `${Routes.Boards}` }];

const RenderBoardCard = (props: BoardListItemTypes) => {

  const { id, name, image, classes } = props;
  const [classList, setClassList] = useState<{ list1: classTypes[], list2: classTypes[] }>({ list1: [], list2: [] })
  const router = useRouter();
  const isMobile = useMediaQuery('(max-width:600px)');



  const styles = useStyles();


  const classLink = (_class: classTypes) => {
    return (
      <div className={'link'}>
        <Link href={`${Routes.Boards}/${_class.slug}`} >
          <a>
            <span>{_class.name}</span>
          </a>
        </Link>
      </div>
    )
  }

  const SplitListInHalf = (list) => {
    let fullLength = list?.length;
    let halfLength = Math.ceil(fullLength / 2);

    let classList = { list1: [], list2: [] };

    if (fullLength > 2) {
      classList = { list1: list.slice(0, halfLength), list2: list.slice(halfLength) };
    } else {
      classList = { list1: list, list2: [] };
    }
    return classList;
  }

  useEffect(() => {
    let lists = SplitListInHalf(props.classes);
    setClassList(lists);
  }, [])

  return (
    <div className={classNames(styles.CardContainer)}>

      <div className='topSecWrap'>
        <div className={classNames(styles.CardImageSection)}>
          <div className={'imageWrap'}>
            <img src={image ? image + `${isMobile ? '?tr=w-100,dpr-1' : ''}` : defaultImage} alt={name} />
          </div>
        </div>

        <div className={classNames(styles.CardInfoSetion)}>
          <div className={'nameContainer'}>
            <Typography className={'productName'} >{name}</Typography>
          </div>

          <div className={styles.classesContainer} >
            <div>
              {
                classList.list1?.map((_class: classTypes) => (classLink(_class)))
              }
            </div>

            <div>
              {
                classList.list2?.map((_class: classTypes) => (classLink(_class)))
              }
            </div>
          </div>
        </div >
      </div>

    </div >
  )
}


const defaultImage = '/assets/images/defaults/institute.webp'

function BoardList(props: any) {

  const { responseType, result, pageSeo: __pageSeo } = GetPageInitialData(props.data);

  const isMobile = useMediaQuery('(max-width:600px)');
  const isTablet = useMediaQuery('(max-width:992px)');
  const [currentSection, setCurrentSection] = React.useState<number | null>(null);
  const router = useRouter();
  const [boards, setBoards] = React.useState<BoardListItemTypes[] | null>(result ?? null);
  const [loading, setLoading] = useState(false);
  const [infiniteLoading, setInfiniteLoading] = useState(false);
  const [pageState, setPageState] = useState<pageStateType>(responseType);
  const [pageSeo, setPageSeo] = useState<PageSEOProps>(__pageSeo);

  const styles = useStyles();
  let pageOptions = useRef({
    pageNo: 2,
    hasMore: true,
  })


  const OnPageResponseHandler = (data: ApiResponse, toAppend: boolean = false) => {
    let response = ApiResponseHandler(data, {
      onNoData: () => {
        setBoards((prev => {
          if (toAppend) {
            return [...prev]
          } else {
            return null;
          }
        }))
      },
      onSuccess: () => {
        setBoards((prev => {
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


  const requestData = async (_pageNo: number, toAppend: boolean = false) => {
    let userId = parseInt(GetCookie(Storages.UserId));
    let token = GetCookie(Storages.AccessToken);
    setInfiniteLoading(true);
    let response = await GetBoardList({ token: token, userId: userId, pageNo: _pageNo });
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

      <PageHead  >
        <div className={classNames(styles.pageHead)}>
          <Typography className='pageHeading1' variant='h1'>
            <span >Explore the national</span>
            <span className='pageHeading2'>And state boards in India</span>
          </Typography>
        </div>
      </PageHead>

      <div className='container'>
        <div className={'wrapper'} style={{ padding: '20px 5%' }}>
          <Filters />
        </div>
      </div>

      <PageSEO data={pageSeo} />
      <DataPageWrapper loading={loading} pageState={pageState}>

        <div className='container'>
          <div className={'wrapper'}>

            <Grid container spacing={isMobile ? 3 : 5}>

              {
                boards?.map((board) => {
                  return (
                    <Grid item xs={12} sm={6} md={4}>
                      <RenderBoardCard {...board} />
                    </Grid>

                  )
                })
              }
              <PageEndIndicator loading={infiniteLoading} onIntersection={RequestDataOnIntersection} />
            </Grid>

          </div>
        </div>
      </DataPageWrapper>
    </>

  );
}


export default BoardList;

export async function getStaticProps(context) {

  let returnData = { props: { data: null }, revalidate: 1 }

  let response = await getData({ token: '', userId: '' });
  if (response) {
    returnData.props.data = response.data;
  }
  return returnData;

}