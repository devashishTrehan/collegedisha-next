// import React from 'react';

// const classNames = (...classes: string[]) => {
//     return classes.reduce((className: string, nextClass: string) => className + ` ${nextClass}`)
// }

// interface PropsTypes {
//     onEnter?: Function,
//     onLeave?: Function,
//     id: string,
//     children?: Element | HTMLElement | JSX.Element,
//     className?: string,
//     style?: React.CSSProperties,

// }

// export const ViewportTracker = (props: PropsTypes) => {

//     const ElementViewState = {
//         Entered: false,
//         Exited: false,
//     }

//     const scrollHandler = (element: any) => {
//         let isInView = IsElementInViewPort(element);
//         if (isInView) {
//             if (!ElementViewState.Entered) {
//                 props?.onEnter && props.onEnter();
//                 ElementViewState.Entered = true;
//                 ElementViewState.Exited = false;
//             }
//         } else {
//             if (!ElementViewState.Exited) {
//                 props?.onLeave && props.onLeave();
//                 ElementViewState.Entered = false;
//                 ElementViewState.Exited = true;
//             }
//         }
//     }

//     const IsElementInViewPort = (element: any,) => {
//         var position = element?.getBoundingClientRect();

//         if (position?.top < window?.innerHeight && position?.bottom >= 0) {
//             return true;
//         } else {
//             return false;
//         }
//     }

//     function Track() {

//         let element = document.getElementById(`tracker-${props?.id}`);
//         scrollHandler(element);

//         window.addEventListener('scroll', () => {
//             scrollHandler(element);
//         }, { passive: true })
//     }

//     React.useEffect(() => {
//         Track();
//     }, [])

//     return (
//         <div id={`tracker-${props?.id}`}>
//             {
//                 props.children
//             }
//         </div>
//     )
// }










import React from 'react';

const classNames = (...classes: string[]) => {
    return classes.reduce((className: string, nextClass: string) => className + ` ${nextClass}`)
}

interface PropsTypes {
    onEnter?: Function,
    onLeave?: Function,
    id: string,
    children?: Element | HTMLElement | JSX.Element,
    className?: string,
    style?: React.CSSProperties,
    thresold?: number  // track the element before n number of pixels,

}

export const ViewportTracker = (props: PropsTypes) => {

    const ElementViewState = {
        Entered: false,
        Exited: false,
    }

    const scrollHandler = (element: any) => {
        let isInView = IsElementInViewPort(element);
        if (isInView) {
            if (!ElementViewState.Entered) {
                props?.onEnter && props.onEnter();
                ElementViewState.Entered = true;
                ElementViewState.Exited = false;
            }
        } else {
            if (!ElementViewState.Exited) {
                props?.onLeave && props.onLeave();
                ElementViewState.Entered = false;
                ElementViewState.Exited = true;
            }
        }
    }

    const IsElementInViewPort = (element: any,) => {

        let _thresold = props?.thresold ?? 0;

        var position = element?.getBoundingClientRect();

        if ((position?.top - _thresold) < window?.innerHeight && position?.bottom >= 0) {
            return true;
        } else {
            return false;
        }
    }

    function Track() {

        let element = document.getElementById(`tracker-${props?.id}`);
        scrollHandler(element);

        window.addEventListener('scroll', () => {
            scrollHandler(element);
        }, { passive: true })
    }

    React.useEffect(() => {
        Track();
    }, [])

    return (
        <div id={`tracker-${props?.id}`}>
            {
                props.children
            }
        </div>
    )
}