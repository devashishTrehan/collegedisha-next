import { Theme } from '@/Services/App.service';
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
        <div style={{ width: '100%' }}>
            {
                loading ?
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 30, marginBottom: -20 }}>
                        <Loader />
                        <Loader />
                        {/* <p style={{ color: Theme.primary, padding: 0 }}>Loading...</p> */}
                    </div>
                    : null
            }
            <ViewportTracker id='_pageEndIndicator_' thresold={100} onEnter={() => props.onIntersection()} />
        </div>
    );
}

export default PageEndIndicator;


const Loader = () => {
    return (
        <div className="loader" >
            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                width="24px" height="30px" viewBox="0 0 24 30" xmlSpace="preserve">
                <rect x="0" y="10" width="4" height="10" fill={Theme.primary} opacity="0.2">
                    <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0s" dur="0.6s" repeatCount="indefinite" />
                    <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0s" dur="0.6s" repeatCount="indefinite" />
                    <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0s" dur="0.6s" repeatCount="indefinite" />
                </rect>
                <rect x="8" y="10" width="4" height="10" fill={Theme.secondary} opacity="0.2">
                    <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.15s" dur="0.6s" repeatCount="indefinite" />
                    <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" />
                    <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" />
                </rect>
                <rect x="16" y="10" width="4" height="10" fill={Theme.tertiary} opacity="0.2">
                    <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.3s" dur="0.6s" repeatCount="indefinite" />
                    <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" />
                    <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" />
                </rect>
            </svg>
        </div >
    )
}