import React from 'react';

const classNames = (...classes: string[]) => {
    return classes.reduce((className: string, nextClass: string) => className + ` ${nextClass}`)
}

interface PropsTypes {
    animationClass: string,
    id: string | number
    children?: Element | HTMLElement | JSX.Element,
    className?: string,
    style?: React.CSSProperties,
}

export const AnimatedSection = (props: PropsTypes) => {

    const [toAnimate, setToAnimate] = React.useState(false);

    const scrollHandler = (element: any) => {
        let isInView = IsElementInViewPort(element);
        if (isInView && !toAnimate) {
            setToAnimate(true);
        }
    }

    const IsElementInViewPort = (element: any) => {
        var position = element?.getBoundingClientRect();

        if (position?.top < window?.innerHeight && position?.bottom >= 0) {
            return true;
        } else {
            return false;
        }
    }



    React.useEffect(() => {

        let element = document.getElementById(`animated-${props?.id}`);
        if (window.IntersectionObserver) {

            let observer = new IntersectionObserver((enteries, observer) => {
                enteries.forEach(entry => {
                    if (entry.intersectionRatio > 0) {
                        setToAnimate(true);
                        observer.unobserve(element);
                    }
                });
            })


            observer.observe(element)


        } else {

            scrollHandler(element);

            window.addEventListener('scroll', () => {
                scrollHandler(element);
            }, { passive: true })

            return () => {
                window.removeEventListener('scroll', () => {
                    console.log('scroll event removed')
                })
            }
        }
    }, [])

    return (
        <div id={`animated-${props?.id}`} style={{ ...props.style }} className={classNames(props?.className ? props.className : '', toAnimate ? props.animationClass : '')}>
            {
                props.children
            }
        </div>
    )
}