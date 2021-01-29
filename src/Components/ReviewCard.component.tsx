import { Theme, NFormatter } from '@/Services/App.service';
import { Button, Typography, IconButton, useMediaQuery, Divider, Grid } from '@material-ui/core';
import { ArrowRightAlt, Label, Link as LinkIcon, Schedule } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import React, { memo } from 'react';
import classNames from 'classnames';
import { ExamListItem, ExamListItemLink } from '@/Services/DataTypes/Exams';
import { CourseFees, CourseListItem } from '@/Services/DataTypes/Courses';



const useStyles = makeStyles({
    container: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        borderRadius: Theme.radius2,
        overflow: 'hidden',
        textAlign: 'left',
        border: '1px solid #ddd',
    },
    LeftSection: {

    },
    RightSection: {

    },
    container_M: {
    },
    LeftSection_M: {
        width: '100%',
    },
    RightSection_M: {
    }

})

const FormatAmount = (amount: number, currency: string) => {
    return amount.toLocaleString('en', { style: 'currency', currency: currency }).replace('.00', '');
}

interface Props extends CourseListItem {

}

const defaultImage = '/assets/images/defaults/user.png'

const ReviewCard = memo(function (props: Props) {

    const { id, name, totalFees, duration, feesBreakdown, type, streams } = props;

    const isMobile = useMediaQuery('(max-width:769px)');
    const isTablet = useMediaQuery('(max-width:992px)');


    const styles = useStyles();


    return (
        <div className={classNames(styles.container, { [styles.container_M]: isMobile })}>
            <div className={classNames(styles.LeftSection, { [styles.LeftSection_M]: isMobile })}>

            </div>
            <div className={classNames(styles.RightSection, { [styles.RightSection_M]: isMobile })}>

            </div>

        </div>
    );
})


export default ReviewCard;