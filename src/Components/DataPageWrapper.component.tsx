
import { makeStyles } from '@material-ui/styles';
import * as React from 'react';
import WentWrongComponent from './WentWrong.component';


const useStyles = makeStyles({

})

export type pageStateType = '__request_failed__' | '__not_authenticated__' | '__request_failed_error__' | '__data_not_found__' | '__request_success__' | null;

interface Props {
    pageState: pageStateType,
    loading?: boolean,
    onReload?: Function,
    children?: JSX.Element
}

export function DataPageWrapper(props: Props) {

    const [pageState, setPageState] = React.useState(props.pageState);

    const styles = useStyles();

    React.useEffect(() => {
        setPageState(props.pageState);
    }, [props.pageState])


    if (props.loading) {
        return <p>Loading</p>
    }

    if (pageState === '__request_failed__') {
        console.log('page state', pageState)
        return <WentWrongComponent />
    } else if (pageState === '__not_authenticated__') {
        console.log('page state', pageState)
        return <p>NotAuthenticated</p>
    } else if (pageState === '__request_failed_error__') {
        return <p>request failed with error</p>
    } else if (pageState === '__data_not_found__') {
        console.log('page state', pageState)
        return <p>No data found</p>
    } else if (pageState === '__request_success__') {
        console.log('page state', pageState)
        return props.children;
    } else {
        console.log('page state', pageState)
        return <p>something else</p>
    }


}