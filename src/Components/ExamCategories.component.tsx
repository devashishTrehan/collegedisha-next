import { faCaretDown, faChevronDown, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Checkbox from '@material-ui/core/Checkbox';
import * as React from 'react';
import { Theme } from '@/Services/App.service';
import { Divider, List, ListItem, Popover, Typography, useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { FilterList } from '@material-ui/icons';
import classNames from 'classnames';

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


interface ExamCategoryType {
    label: string,
    value: string,
    image?: string
}

interface Props {
    exams?: ExamCategoryType[]
}

const defaultImage = 'assets/images/defaults/examType.png';

export const ExamCategories = (props: Props) => {

    const styles = useStyles();
    const [ExamTypes, setExamTypes]: any = React.useState<ExamCategoryType[]>([
        { label: 'government', value: '' },
        { label: 'education', value: '' },
        { label: 'civil', value: '' },
        { label: 'engineering', value: '' },
        { label: 'law', value: '' },
        { label: 'banking', value: '' },
        { label: 'university', value: '' },
        { label: 'teaching', value: '' },
        { label: 'management', value: '' },
        { label: 'medical', value: '' },
        { label: 'architecture', value: '' },
        { label: 'railway', value: '' },
        { label: 'hotel', value: '' },
    ]);


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

