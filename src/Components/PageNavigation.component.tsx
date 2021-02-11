import { ListItem, useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { createRef, useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import { Theme } from '../Services/App.service';
import { NavbarContext } from '@/Context/Navbar.context';
import { ChevronLeft, ChevronRight, Visibility } from '@material-ui/icons';

const useStyles = makeStyles({
    sectionListContainer: {
        background: '#f8f8f8',
        width: '100%',
        padding: '20px 15px 10px',
        position: 'sticky',
        top: 64,
        display: 'flex',
        zIndex: 10,
        '& .scrollButton': {
            display: 'flex',
            alignItems: 'center',
            '& svg': {
                width: 25,
                height: 35,
                color: Theme.fontColorSecondary
            }
        },
        '& .sectionList': {
            overflow: 'auto',
            listStyle: 'none',
            flexGrow: 1,
            transition: '.3s',
            whiteSpace: 'nowrap',
            '&::-webkit-scrollbar': {
                height: 3
            },
            '& .sectionListItemAnchor': {
                display: 'inline-block',
                borderRadius: Theme.radius2,
                color: Theme.primary,
                fontSize: 14,
                textDecoration: 'none',
                margin: '0 5px 8px',
                textTransform: 'capitalize',
                '& .sectionListItem': {
                    borderRadius: Theme.radius2,
                    padding: '13px 20px',
                    fontFamily: 'gorditaMedium',
                },
                '&.active': {
                    background: Theme.backgroundColor,
                    boxShadow: Theme.boxShadow,
                }

            }
        }
    },
    sectionListContainer_M: {
        '& .sectionList': {
            '& .sectionListItemAnchor': {
                fontSize: 12,
            }
        }
    }
})

interface Props {
    pageSections: { [key: string]: string },
    onLinkClick: Function,
    currentSection: string
}

interface ScrollerOptionsType {
    visibleWidth: number,
    totalWidth: number,
    leftVisible: boolean,
    rightVisible: boolean,
}

export const PageNavigation = (props: Props) => {

    const { pageSections, onLinkClick, currentSection } = props;
    const isMobile = useMediaQuery('(max-width:769px)');
    const isTablet = useMediaQuery('(max-width:992px)');
    const styles = useStyles();
    const [scrollerOptions, setScrollerOptions] = useState<ScrollerOptionsType>({ visibleWidth: 0, totalWidth: 0, leftVisible: false, rightVisible: false });
    const { navHeight } = useContext(NavbarContext);
    const [_currentSection, setCurrentSection] = useState<string>(currentSection);
    let ListRef = createRef<HTMLDivElement>();


    const handleScroll = (direction: 'left' | 'right') => {
        let left = ListRef?.current.scrollLeft;
        if (ListRef && direction === 'left') {
            ListRef.current.scrollTo({ left: left - 100, behavior: 'smooth' });
        } else if (ListRef && direction === 'right') {
            ListRef.current.scrollTo({ left: left + 100, behavior: 'smooth' });
        }
        setTimeout(getScrollOptions, 500);
    }

    const updateScrollOptions = (options: { [key: string]: string | number | boolean }) => {
        setScrollerOptions((prev: ScrollerOptionsType) => {
            return { ...prev, ...options };
        })
    }

    const getButtonVisibility = (leftScroll, visibleWidth, totalWidth): { left: boolean, right: boolean } => {
        let visibility = { left: false, right: false };
        if (leftScroll <= 0) {
            if (visibleWidth < totalWidth) {
                visibility.right = true;
            }
        } else {
            visibility.left = true;
            if (leftScroll + visibleWidth < totalWidth) {
                visibility.right = true;
            }
        }
        console.log('visibility', visibility)
        return visibility;
    }

    const getScrollOptions = () => {
        console.log(ListRef.current);
        if (ListRef?.current) {
            let { scrollLeft, clientWidth, scrollWidth } = ListRef.current;
            let { left, right } = getButtonVisibility(scrollLeft, clientWidth, scrollWidth);
            updateScrollOptions({ 'totalWidth': scrollWidth, 'leftVisible': left, 'visibleWidth': clientWidth, 'rightVisible': right });
            console.log(scrollLeft + clientWidth, scrollWidth);
        }
    }

    useEffect(() => {
        getScrollOptions();

        // window.addEventListener('resize', getScrollOptions);
        // return () => {
        //     window.removeEventListener('resize', () => console.log('listener removed from page navigation'));
        // }
    }, [])

    useEffect(() => {
        if (props.currentSection !== _currentSection) {
            setCurrentSection(props.currentSection)
            console.log('current section ', props.currentSection);
        }
    }, [props.currentSection])

    return (
        <div className={classNames(styles.sectionListContainer, { [styles.sectionListContainer_M]: isMobile })} style={{ top: navHeight }} >


            <div className='scrollButton' onClick={() => handleScroll('left')} style={!scrollerOptions?.leftVisible ? { visibility: 'hidden' } : null} >
                <ChevronLeft />
            </div>

            <div className={'sectionList'} ref={ListRef}>
                {
                    pageSections ?
                        Object.keys(pageSections).map((section: string, index: number) => {
                            return (<a key={index} className={classNames('sectionListItemAnchor', { 'active': (_currentSection === pageSections[section]) || (!index && !_currentSection) })}>
                                <ListItem button onClick={() => onLinkClick && onLinkClick(section)} className={'sectionListItem'} >
                                    {section}
                                </ListItem>
                            </a>
                            )
                        })
                        : null
                }
            </div>


            <div className='scrollButton' onClick={() => handleScroll('right')} style={!scrollerOptions?.rightVisible ? { visibility: 'hidden' } : null} >
                <ChevronRight />
            </div>

        </div>
    )
}
