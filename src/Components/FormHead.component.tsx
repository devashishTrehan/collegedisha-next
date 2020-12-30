import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import * as React from 'react';


const useStyles = makeStyles({

    title: {
        fontSize: 20,
        marginBottom: 15,
        fontFamily: 'gorditaMedium',
        textAlign: 'center'
    },
    subTitle: {

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

export function FormHead(props: any) {

    const [loading, setLoading] = React.useState(false);

    const { loadingText, title } = props;

    React.useEffect(() => {
        setLoading(props?.loading)
    }, [props?.loading])

    const styles = useStyles();

    return (
        <div>
            {
                props?.headImage && (

                    <div className={styles.imageWrapper}>
                        <img src={'/assets/images/FormHeadImage.png'} alt='' />
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
