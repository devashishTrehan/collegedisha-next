
import { makeStyles } from '@material-ui/styles';
import * as React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { RequestStatusList, Theme } from '../Services/App.service';
import faCheck from '@fortawesome/free-solid-svg-icons/faCheck';
import faExclamationTriangle from '@fortawesome/free-solid-svg-icons/faExclamationTriangle';
import faInfo from '@fortawesome/free-solid-svg-icons/faInfo';
import faTimes from '@fortawesome/free-solid-svg-icons/faTimes';


const useStyles = makeStyles({
    heading: {
        padding: 0,
        '& h2': {
            textTransform: 'capitalize',
            padding: '10px 24px 0'
        }
    },
    icon: {
        width: 60,
        height: 60,
        margin: '20px auto 0px',
        borderRadius: 60,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        '& svg': {
            fontSize: 35,
        },
    },
    closeButton: {
        position: 'absolute',
        width: 35,
        height: 35,
        textAlign: 'center',
        lineHeight: '35px',
        right: 0,
        color: Theme.fontColor

    }
})

interface Props {
    type?: string,
    message?: string,
    show: boolean,
    onClose?: Function,
    actionButton?: HTMLButtonElement
}



export function AlertBox(props: Props) {

    const [type, setType]: any = React.useState('info');
    const [show, setShow]: any = React.useState(false);
    const [message, setMessage]: any = React.useState('Are You sure to continue this action?');

    const styles = useStyles();

    React.useEffect(() => {
        if (props.type && props.type !== type) {
            setType(props.type);
        }
        if (props.message && props?.message !== message) {
            setMessage(props.message);
        }
        if (props.show !== show) {
            setShow(props.show);
        }
    }, [props])

    return (
        <Dialog open={show}
            onClose={() => {
                setShow(false);
                props.onClose && props.onClose();
            }} >
            <div className={styles.icon} style={{
                backgroundColor: type === RequestStatusList.Error ?
                    Theme.error + '44'
                    : type === RequestStatusList.Success ?
                        Theme.success + '44'
                        : type === RequestStatusList.Warning ?
                            Theme.warning + '44' : Theme.info + '44'
            }}>
                <FontAwesomeIcon

                    icon={
                        type === RequestStatusList.Error ?
                            faTimes
                            : type === RequestStatusList.Success ?
                                faCheck
                                : type === RequestStatusList.Warning ?
                                    faExclamationTriangle : faInfo
                    }
                    style={{
                        color: type === RequestStatusList.Error ?
                            Theme.error
                            : type === RequestStatusList.Success ?
                                Theme.success
                                : type === RequestStatusList.Warning ?
                                    Theme.warning : Theme.info,
                    }}
                />
            </div>

            <div className={styles.closeButton} onClick={() => {
                setShow(false);
                props.onClose && props.onClose()
            }}>

                <FontAwesomeIcon icon={faTimes} />
            </div>

            <DialogTitle className={styles.heading}>{type}</DialogTitle>
            <DialogContent>
                <DialogContentText>{message}</DialogContentText>
            </DialogContent>
            <DialogActions>
                {
                    props.actionButton ?
                        props.actionButton
                        :
                        <Button color='primary' onClick={() => {
                            setShow(false);
                            props.onClose && props.onClose()
                        }} >Ok</Button>
                }
            </DialogActions>
        </Dialog>
    );

}