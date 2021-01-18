import { ListItem, Typography, useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import { Theme } from '../Services/App.service';
import { NavbarContext } from '@/Context/Navbar.context';

const useStyles = makeStyles({
    sectionListContainer: {
        background: '#fafafa',
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
                borderRadius: Theme.radius1,
                color: Theme.primary,
                textDecoration: 'none',
                margin: '0 10px 10px',
                textTransform: 'capitalize',
                '& .sectionListItem': {
                    padding: '5px 15px',
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
                fontSize: 14,
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
        }
    }, [props.currentSection])

    return (
        <div className={classNames(styles.sectionListContainer, { [styles.sectionListContainer_M]: isMobile })} style={{ top: navHeight }} >
            <div className={'sectionList'}>
                {
                    Object.keys(pageSections).map((section: string, index: number) => {
                        return (<a key={index} className={classNames('sectionListItemAnchor', { 'active': _currentSection === pageSections[section] })}>
                            <ListItem button onClick={() => onLinkClick && onLinkClick(section)} className={'sectionListItem'} >
                                {section}
                            </ListItem>
                        </a>
                        )
                    })
                }
            </div>
        </div>
    )
}