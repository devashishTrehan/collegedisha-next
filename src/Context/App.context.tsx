
import { Dialog, GridSize, Modal, Snackbar } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import * as React from 'react';
import { AlertBox } from '@/Components/AlertBox.component';
import { MailSent } from '@/Components/MailSent.component';
import { Theme } from '@/Services/App.service';



interface AppState {

    showAlert: Function,
    hideAlert: Function,
    showModal: Function,
    hideModal: Function,
    openSnackbar: Function,
    NavigationQueue: string[],
    PushNavigationRoute: Function,
    PopNavigationRoute: Function,
    ClearNavigationQueue: Function
}


export const AppContext = React.createContext<any>({});


export function AppContextProvider(props: any) {

    const [alertVisible, setAlertVisible] = React.useState(false);
    const [alertType, setAlertType] = React.useState('info');
    const [alertMessage, setAlertMessage] = React.useState('');
    const [ModalVisible, setModalVisible] = React.useState(false);
    const [ModalContent, setModalContent]: any = React.useState(null);
    const [ModalMaxWidth, setModalMaxWidth]: any = React.useState('sm');
    const [alertActionButton, setAlertActionButton]: any = React.useState(null);
    const [snackOpen, setSnackOpen] = React.useState(false);
    const [errorMessages, setErrorMessages]: any = React.useState({ errors: [], type: 'error' });
    const [NavigationQueue, setNavigationQueue]: any = React.useState([]);


    const PushNavigationRoute = (route: string) => {
        setNavigationQueue((prev: any) => {
            return [...prev, route];
        })
    }

    const PopNavigationRoute = () => {
        let route = null;
        setNavigationQueue((prev: any) => {
            route = prev.pop();
            return [...prev];
        })
        return route;
    }

    const ClearNavigationQueue = () => {
        setNavigationQueue([]);
    }

    const showAlert = (message: string, type: string, actionButton: HTMLButtonElement | null) => {
        setAlertMessage(message);
        setAlertActionButton(actionButton);
        setAlertType(type);
        setAlertVisible(true);
    }

    const hideAlert = () => {
        setAlertVisible(false);
        setAlertMessage('');
    }

    const showModal = (content: HTMLElement | JSX.Element, maxWidth: string = 'sm') => {
        setModalContent(content);
        setModalMaxWidth(maxWidth);
        setModalVisible(true);
    }

    const hideModal = () => {
        setModalVisible(false);
        setModalContent(null);
    }


    const closeSnakbar = () => {
        setSnackOpen(false);
    }

    const openSnackbar = (errors: any, type: string = 'error') => {

        setSnackOpen(true);
        setErrorMessages({
            errors: errors,
            type: type
        })
        setTimeout(() => {
            closeSnakbar();
        }, 5 * 1000)
    }

    return (
        <AppContext.Provider value={{
            showAlert: showAlert,
            hideAlert: hideAlert,
            showModal: showModal,
            hideModal: hideModal,
            openSnackbar: openSnackbar,
            NavigationQueue: NavigationQueue,
            PushNavigationRoute: PushNavigationRoute,
            PopNavigationRoute: PopNavigationRoute,
            ClearNavigationQueue: ClearNavigationQueue
        }}>
            {
                props.children
            }
            <AlertBox show={alertVisible} type={alertType} message={alertMessage} actionButton={alertActionButton} />
            <Snackbar style={{ position: 'fixed' }} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={snackOpen} autoHideDuration={10000} >
                <Alert onClose={closeSnakbar} severity={errorMessages.type} >
                    <AlertTitle>{errorMessages.type === 'success' ? 'Success' : 'Failed'}</AlertTitle>
                    {
                        errorMessages?.errors.map((message: string, index: number) => {
                            return (
                                <p key={index} style={{ lineHeight: '16px' }}>{message}</p>
                            )
                        })

                    }
                </Alert>
            </Snackbar>
            <Dialog scroll='body' open={ModalVisible} onClose={hideModal} PaperProps={{ style: { borderRadius: Theme.radius3 } }} fullWidth maxWidth={ModalMaxWidth} >
                {
                    ModalContent
                }
            </Dialog>
        </AppContext.Provider>
    );
}