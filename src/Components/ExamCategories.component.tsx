
import * as React from 'react';
import {  Theme } from '@/Services/App.service';
import Routes from '@/Services/Routes';
import { Typography, useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import { ExamCategoryType } from '@/Services/DataTypes/Exams';
import Link from 'next/link';

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
                '& a': {
                    textDecoration: 'none'
                },
                "& .contentWrap": {
                    display: 'flex',
                    padding: 8,
                    alignItems: 'center',
                },
                // '&:hover': {
                //     '& .activeHelper': {
                //         width: '100%',
                //     }
                // },
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
                    overflow: 'hidden',
                    marginRight: 15,
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
    data: ExamCategoryType[],
    active?: string
}

const defaultImage = '/assets/images/defaults/examType.png';

export const ExamCategories = (props: Props) => {

    const styles = useStyles();
    const [ExamTypes, setExamTypes]: any = React.useState<ExamCategoryType[]>(props?.data ?? []);
    const [activeCategory, setActiveCategory]: any = React.useState(props?.active ?? '');

    const isTablet = useMediaQuery('(max-width:992px)');
    const isMobile = useMediaQuery('(max-width:769px)');

    React.useEffect(() => {
        if (activeCategory !== props.active) {
            setActiveCategory(props.active)
        }
    }, [props?.active])

    return (

        <div className={styles.container} >

            <ul >
                {
                    ExamTypes.map((exam: ExamCategoryType, index: number) => {
                        return (
                            <li key={index} style={{ margin: '0 5px', }}>
                                <div className={classNames('activeHelper', { 'active': exam.url === activeCategory })}></div>

                                <Link href={`${Routes.ExamCategory}/${exam.url}`} >
                                    <a>

                                        <div className='contentWrap'>
                                            <div className='imageWrap'>
                                                <img src={exam.image ? exam.image : defaultImage} alt='' />
                                            </div>
                                            <Typography noWrap>{exam.label}</Typography>
                                        </div>

                                    </a>
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
        </div >
    )

}

