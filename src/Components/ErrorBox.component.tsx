
import { makeStyles } from '@material-ui/styles';
import * as React from 'react';
import classNames from 'classnames';
import { Theme } from '../Services/App.service';
import { ErrorOutline } from '@material-ui/icons';


const useStyles = makeStyles({
    container: {
        marginTop: 10,
        maxHeight: 150,
        overflowY: 'scroll',
        transition: 'ease-in-out .3s',
        '& h6': {
            fontWeight: 400,
        }
    },
    containerFill: {
        height: 'auto'
    },
    containerBlank: {
        height: 0
    },
    icon: {
        color: Theme.error,
        marginRight: 5
    }
})


export function ErrorBox(props: any) {

    const [errors, setErrors] = React.useState(props?.errors ? props?.errors : []);

    const styles = useStyles();

    React.useEffect(() => {
        setErrors(props?.errors);
    }, [props?.errors])

    return (
        <div className={classNames(styles.container, errors?.length ? styles.containerFill : styles.containerBlank)}>
            {
                errors?.map((message: string, index: number) => {
                    return (
                        <p key={index} className='error' style={{ lineHeight: '16px' }}>
                            <span><ErrorOutline className={styles.icon} /></span>
                            <span>{message}</span>
                        </p>
                    )
                })

            }
        </div>
    );

}