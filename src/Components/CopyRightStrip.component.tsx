import { KeyboardArrowUp } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { Theme } from '../Services/App.service';


const sectionStyles = makeStyles({
    copyRight: {
        borderTop: '1px solid #777',
        padding: '10px 0',
        textAlign: 'center',
        fontSize: 13,
        color: '#fff',
        '& p': {
            marginBottom: 0,
            fontSize: 12
        }
    },
    scrollTopButton: {
        zIndex: 999,
        backgroundColor: Theme.primary,
        padding: '5px 6px',
        borderRadius: Theme.radius1,
        right: 20,
        position: 'fixed',
        bottom: 20,
        transition: '.3s',
        opacity: .8,
        color: '#fff',
        boxShadow: Theme.boxShadow,
        '& svg': {
            width: '22px !important',
            height: 22,
            transition: '.3s',
        },
        '&:hover': {
            opacity: .8,
            transform: 'translate(0,-5px)',

        }
    },
});

export const CopyRightStrip = (props: any) => {

    const [isOnTop, setIsOnTop] = React.useState(true);
    const [CurrentYear, setCurrentYear] = React.useState(2021);

    const styles = sectionStyles();

    const setYear = () => {
        let date = new Date();
        let year = date.getFullYear();
        setCurrentYear(year);
    }

    React.useEffect(() => {

        setYear();

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 200) {
                setIsOnTop(false);
            } else {
                setIsOnTop(true);
            }
        }, { passive: true })
    }, [])

    const scrollToTop = () => {
        window.scrollTo(0, 0)
    }

    return (
        <div className={styles.copyRight} {...props}>
            <div>
                <p>Copyright @{CurrentYear}. CollegeDisha.com . All rights reserved</p>
            </div>
            <span onClick={() => scrollToTop()} className={styles.scrollTopButton} style={{ display: isOnTop ? 'none' : 'flex' }} >
                <KeyboardArrowUp />
            </span>
        </div>
    )

}