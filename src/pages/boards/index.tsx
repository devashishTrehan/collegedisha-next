
import { Grid, MenuItem, Typography, useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import * as React from 'react';
import { Routes, Theme } from '@/Services/App.service';
import classNames from 'classnames';
import { PageHead } from '@/Components/PageHead.component';
import { Filters } from '@/Components/Filter.component';
import { boardTypes, BoardListItemTypes } from '@/Services/DataTypes/Boards';
import { useRouter } from 'next/router';
import SelectField from '@/Components/SelectField.component/SelectField.component';


const useStyles = makeStyles({
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
    borderRadius: Theme.radius2,
    boxShadow: Theme.boxShadow,
    '& .topSecWrap': {
      cursor: 'pointer',
      width: '100%',
    }
  },
  CardContainer_M: {
    width: '100%',
    '& .topSecWrap': {
      display: 'flex',
      flexDirection: 'row',
    }
  },
  CardImageSection: {
    width: '100%',
    '& .imageWrap': {
      maxHeight: 200,
      width: '100%',
      height: '100%',
    },
  },
  CardImageSection_M: {
    width: 100,
    height: '100%',
    '& .imageWrap': {
      width: '100%',
      display: 'flex',
      maxHeight: 100,
      alignItems: 'center',
      justifyContent: 'center',
      '& img': {
        maxWidth: '100%',
      }
    },

  },
  CardInfoSetion: {
    padding: '20px 20px 0',
    textAlign: 'left',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    textTransform: 'capitalize',
    '& .nameContainer': {

      '& .productName': {
        color: Theme.fontColorSecondary,
        fontFamily: 'gorditaMedium',
        fontSize: 18,
      },
    },


  },
  CardFooterSection: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    padding: '0 20px 20px',
    '& .classes': {
      padding: 0,
      textAlign: 'left',
      '& .label': {
        color: Theme.fontLight,
        fontSize: 14,
        marginRight: 5,
      },
      '& p': {
        display: 'inline-block',
        '& a': {
          color: Theme.secondaryFontColor,
          textDecoration: 'none',
          fontSize: 14,
          fontFamily: 'gorditaMedium',
          margin: '2px 10px 2px 0',
          padding: '3px 10px 3px 0',
        }
      }
    }
  },
  CardInfoSetion_M: {
    padding: '10px 10px 0',
    width: 'calc(100% - 100px)',
    '& .nameContainer': {

      '& .productName': {
        color: Theme.fontColorSecondary,
        fontFamily: 'gorditaMedium',
        fontSize: 15,
      },
    },

  },
  cardFooterSection_M: {
    padding: ' 0 10px 10px',
    '& .classes': {
      '& .label': {
        fontSize: 12,
      },
      '& p': {
        '& a': {
          fontSize: 12,
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
    },
    '& .pageHeading2': {
      fontSize: '2.5rem',
      marginTop: 8,
      fontFamily: 'gorditaBold',
    }
  },
  pageHead_M: {
    color: Theme.primary,
    '& .pageHeading1': {
      fontSize: '1.8rem',
    },
    '& .pageHeading2': {
      fontSize: '2rem',
      marginTop: 8,
    }
  },
})

const breadcrumbs = [{ name: 'boards', endPoint: `${Routes.Boards}` }];

const RenderBoardCard = (props: BoardListItemTypes) => {

  const { id, name, image, boards, slug } = props;
  const isMobile = useMediaQuery('(max-width:600px)');
  const isTablet = useMediaQuery('(max-width:992px)');
  const [selectedBoard, setSelectedBoard] = React.useState<string>('');
  const [classList, setClassList] = React.useState<string[]>([]);
  const router = useRouter();



  const styles = useStyles();

  const ViewDetails = (slug: string) => {
    router.push({
      pathname: `${router.asPath}/${slug}`
    })
  }

  const setSelectOptions = (value: string = '') => {
    let boardName = '';
    let boardClasses = [];
    if (value) {
      for (let i = 0; i < boards.length; i++) {
        if (value === boards[i].name) {
          boardName = boards[i].name;
          boardClasses = boards[i].classes;
          break;
        }
      }
    } else {
      boardName = boards[0].name;
      boardClasses = boards[0].classes;
    }

    setSelectedBoard(boardName);
    setClassList(boardClasses);
  }

  React.useEffect(() => {
    setSelectOptions();
  }, [])

  const selectBoard = (value: string) => {
    console.log(value);
    setSelectOptions(value);
  }

  const handleSelectClick = (event) => {
    event.stopPropagation();
    console.log('handling SelectClick')
  }


  return (
    <div className={classNames(styles.CardContainer, { [styles.CardContainer_M]: isMobile })}>

      <div onClick={() => ViewDetails(slug)} className='topSecWrap'>
        <div className={classNames(styles.CardImageSection, { [styles.CardImageSection_M]: isMobile })}>
          <div className={'imageWrap'}>
            <img src={image ? image : defaultImage} alt={name} />
          </div>
        </div>

        <div className={classNames(styles.CardInfoSetion, { [styles.CardInfoSetion_M]: isMobile })}>
          <div className={'nameContainer'}>
            <Typography className={'productName'} >{name}</Typography>
          </div>

          <div style={{ margin: '5px 0' }} >
            {
              boards?.length >= 2 ?
                <SelectField
                  onClick={handleSelectClick}
                  containerStyle={{ display: 'inline-block', height: isMobile ? 30 : 38, minWidth: isMobile ? 140 : '70%', }}
                  value={selectedBoard}
                  onValueChange={(event) => selectBoard(event.target.value)}
                >
                  {
                    boards.map((board: boardTypes) => {
                      return (<MenuItem style={{ minHeight: 40 }} value={board.name}>{board.name}</MenuItem>)
                    })
                  }
                </SelectField>
                : null
            }
          </div>
        </div >
      </div>

      <div className={classNames(styles.CardFooterSection, { [styles.cardFooterSection_M]: isMobile })}>
        <div className='classes'>
          <Typography className='label'>classes:</Typography>
          {
            classList?.map((className: string, index: number) => {
              return (
                <p>
                  <a
                    // href={ }
                    style={
                      (classList?.length - 1) !== index
                        ? { borderRight: '1px solid #ccc' }
                        : {}}>{className}</a>
                </p>
              )
            })
          }
        </div>
      </div>

    </div >
  )
}

const defaultImage = '/assets/images/defaults/institute.jpg'

function BoardList(props: any) {

  const isMobile = useMediaQuery('(max-width:600px)');
  const isTablet = useMediaQuery('(max-width:992px)');
  const [currentSection, setCurrentSection] = React.useState<number | null>(null);
  const router = useRouter();



  const styles = useStyles();


  const boards: BoardListItemTypes[] = [{
    id: 1, name: 'board', image: '', slug: 'xyz', boards: [{ name: 'abc', classes: ['a', 'b',] },{ name: 'abc', classes: ['a', 'b',] }]
  }]

  const ViewDetails = (slug: string) => {
    router.push({
      pathname: `${router.asPath}/${slug}`
    })
  }




  React.useEffect(() => {
  }, [])


  return (

    <>

      <PageHead  >
        <div className={classNames(styles.pageHead, { [styles.pageHead_M]: isMobile })}>
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

          </Grid>

        </div>
      </div>
    </>

  );
}


export default BoardList;