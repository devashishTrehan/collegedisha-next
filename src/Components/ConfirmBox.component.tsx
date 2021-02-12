
import { makeStyles } from '@material-ui/styles';
import * as React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const useStyles = makeStyles({
    heading: {
        '& h2': {
            textAlign: 'left'
        }
    }
})

interface Props {
    heading?: string,
    message?: string,
    show: boolean,
    onCancel?: Function,
    onConfirm?: Function,
    onClose?: Function
}



export function ConfirmBox(props: Props) {

    const [heading, setHeading]: any = React.useState('Confirm');
    const [show, setShow]: any = React.useState(false);
    const [onConfirm, setOnConfirm] = React.useState(Function);
    const [message, setMessage]: any = React.useState('Are You sure to continue this action?');

    const styles = useStyles();

    React.useEffect(() => {
        if (props.heading && props.heading !== heading) {
            setHeading(props.heading);
        }
        if (props.message && props?.message !== message) {
            setMessage(props.message);
        }
        if (props.show !== show) {
            setShow(props.show);
        }
        if (props.onConfirm !== onConfirm) {
            setOnConfirm(()=>props.onConfirm)
        }
    }, [props])

    return (
        <Dialog open={show}
            onClose={() => {
                setShow(false);
                props.onClose && props.onClose();
            }} >
            {
                heading && (<DialogTitle className={styles.heading}>{heading}</DialogTitle>)
            }
            <DialogContent>
                <DialogContentText>{message}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color='default' onClick={() => {
                    setShow(false);
                    props.onClose && props.onClose()
                    props.onCancel && props.onCancel();
                }} >cancel</Button>

                <Button color='primary' onClick={() => {
                    setShow(false);
                    props.onClose && props.onClose()
                    console.log(props.onConfirm);
                    props.onConfirm && props.onConfirm();
                }} >Confirm</Button>
            </DialogActions>
        </Dialog>
    );

}