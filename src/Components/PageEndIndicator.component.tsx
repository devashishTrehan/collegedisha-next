import React, { useEffect, useState } from 'react';
import { ViewportTracker } from './ViewportTracker.component';


interface Props {
    loading: boolean,
    onIntersection: Function,
}

function PageEndIndicator(props: Props) {

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (props.loading !== loading) {
            console.log('infinite loading', props.loading)
            setLoading(props.loading);
        }
    }, [props.loading])


    return (
        <div style={{ width: '100%',background:'red' }}>
            {
                loading ?
                    <div>
                        <p>loading...</p>
                    </div>
                    : null
            }
            <ViewportTracker id='_pageEndIndicator_' thresold={100} onEnter={() => props.onIntersection()} />
        </div>
    );
}

export default PageEndIndicator;