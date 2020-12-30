import * as React from 'react';
import { Format_INS } from '../Services/App.service';


export function Counter(props: any) {

    const [value, setValue] = React.useState(props.start ? props.start : 0);
    const [start, setStart] = React.useState(props.start ? props.start : 0);
    const [steps, setSteps] = React.useState(props.steps ? props.steps : 1);
    const [end, setEnd] = React.useState(props.end ? props.end : 0);
    const [duration, setDuration] = React.useState(props.duration ? props.duration : 500);

    var isCounted = false;

    const scrollHandler = (element: any) => {
        let isInView = IsElementInViewPort(element);
        if (isInView && !isCounted) {
            isCounted = true;
            AnimateValue();
        }
    }

    const IsElementInViewPort = (element: any) => {
        var position = element?.getBoundingClientRect();

        if (position?.top < window?.innerHeight && position?.bottom >= 0) {
            // console.log('Element is partially visible in screen');
            return true;
        } else {
            // console.log('Element is not visible in screen');
            return false;
        }

    }

    function AnimateValue() {
        if (start === end) return;
        var range = end - start;
        var current = start;
        var increment = end > start ? steps : -steps;
        var stepTime = Math.abs(Math.floor(duration / range));
        var timer = setInterval(() => {
            current += increment;
            setValue(current);
            if (current >= end) {
                setValue(end);
                clearInterval(timer);
            }
        }, stepTime);
    }

    React.useEffect(() => {
        window.addEventListener('scroll', () => {
            // console.log(`scrolling - ${props.id}`)
            let counter = document.getElementById(`counter-${props?.id}`);
            scrollHandler(counter);
        })
    }, [])

    React.useEffect(() => {
        if (props.start !== start) {
            setStart(props.start)
        }
        if (props.end !== end) {
            setEnd(props.end)
        }
        if (props.duration !== duration) {
            setDuration(props.duration)
        }
        if (props.steps !== steps) {
            setSteps(props.steps)
        }
    }, [props.start, props.end, props.duration, props.steps])

    return (
        <span className='counter' id={`counter-${props?.id}`}>{Format_INS(value)}</span>
    );
}