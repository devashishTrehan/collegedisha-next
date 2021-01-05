import { Theme } from '@/Services/App.service';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import * as React from 'react';


const useStyles = makeStyles({

    title: {
        fontSize: 20,
        marginBottom: 10,
        fontFamily: 'gorditaMedium',
        textAlign: 'center',
        color: Theme.primary,
    },
    subTitle: {
        fontSize: 16,
        color: Theme.fontColor,

    },
    imageWrapper: {
        width: 70,
        height: 70,
        margin: '0 auto 10px',
        '& img': {
            width: '100%'
        }
    },

})

interface Props {
    title: string,
    subTitle?: string,
    image?: string,
    titleProps?: any
    subTitleProps?: any
}

export function FormHead(props: Props) {

    const { title, subTitle, image } = props;

    const styles = useStyles();

    return (
        <div>
            {
                image && (

                    <div className={styles.imageWrapper}>
                        <img src={image} alt='' />
                    </div>
                )
            }
            {
                props?.title && (<Typography className={styles.title} variant={'subtitle1'} {...props.titleProps}>{props.title}</Typography>)
            }
            {
                props?.subTitle && (<Typography className={styles.subTitle} variant={'subtitle1'} {...props.subTitleProps}>{props.subTitle}</Typography>)
            }
        </div>
    );
}
