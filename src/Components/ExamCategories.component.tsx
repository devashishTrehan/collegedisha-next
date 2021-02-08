
import * as React from 'react';
import { Theme } from '@/Services/App.service';
import { Typography, useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import { ExamCategoryType } from '@/Services/DataTypes/Exams';

const listItemHeight = 34;
const listHeight = 34 * 12;

const useStyles = makeStyles({
    container: {
        width: 200,
        '& ul': {
            listStyle: 'none',
            '& li': {
                transition: '.5s',
                borderRadius: Theme.radius1,
                position: 'relative',
                overflow: 'hidden',
                "&>.contentWrap": {
                    display: 'flex',
                    padding: 8,
                    alignItems: 'center',
                },
                '&:hover': {
                    '& .activeHelper': {
                        width: '100%',
                    }
                },
                '& .activeHelper': {
                    position: 'absolute',
                    width: '0%',
                    height: '100%',
                    transition: '.3s',
                    backgroundColor: Theme.secondary + '11',

                    '&.active': {
                        width: '100%',
                    }
                },
                '&:nth-child(even) .activeHelper': {
                    right: 0,
                },
                '& .imageWrap': {
                    width: 25,
                    height: 25,
                    borderRadius: '50%',
                    overflow: 'hidden',
                    marginRight: 8,
                    '& img': {
                        width: '100%'
                    }
                }
            },
            '& p': {
                color: Theme.primary,
                fontSize: 13,
                fontFamily: 'gorditaMedium',
                textTransform: 'capitalize',
            }
        }
    },
})



interface Props {
    data: ExamCategoryType[]
}

const defaultImage = 'assets/images/defaults/examType.png';

export const ExamCategories = (props: Props) => {

    const styles = useStyles();
    const [ExamTypes, setExamTypes]: any = React.useState<ExamCategoryType[]>(props?.data ?? []);

    const isTablet = useMediaQuery('(max-width:992px)');
    const isMobile = useMediaQuery('(max-width:769px)');



    return (

        <div className={styles.container} >

            <ul >
                {
                    ExamTypes.map((exam: ExamCategoryType, index: number) => {
                        return (
                            <li key={index} style={{ margin: '0 5px', }}>
                                <div className={classNames('activeHelper')}></div>
                                <div className='contentWrap'>
                                    <div className='imageWrap'>
                                        <img src={exam.image ? exam.image : defaultImage} alt='' />
                                    </div>
                                    <Typography noWrap>{exam.label}</Typography>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        </div >
    )

}

