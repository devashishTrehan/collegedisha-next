import { ListItem, Typography, useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import { Theme } from '../Services/App.service';
import { NavbarContext } from '@/Context/Navbar.context';

const useStyles = makeStyles({
    sectionListContainer: {
        background: '#f8f8f8',
        width: '100%',
        padding: '20px 15px 10px',
        position: 'sticky',
        top: 64,
        zIndex: 10,
        '& .sectionList': {
            overflow: 'auto',
            listStyle: 'none',
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


export const PageNavigation = (props: Props) => {

    const { pageSections, onLinkClick, currentSection } = props;
    const isMobile = useMediaQuery('(max-width:769px)');
    const isTablet = useMediaQuery('(max-width:992px)');
    const styles = useStyles();
    const { navHeight } = useContext(NavbarContext);
    const [_currentSection, setCurrentSection] = useState<string>(currentSection);


    useEffect(() => {
        if (props.currentSection !== _currentSection) {
            setCurrentSection(props.currentSection)
            console.log('current section ', props.currentSection);
        }
    }, [props.currentSection])

    return (
        <div className={classNames(styles.sectionListContainer, { [styles.sectionListContainer_M]: isMobile })} style={{ top: navHeight }} >
            <div className={'sectionList'}>
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
        </div>
    )
}