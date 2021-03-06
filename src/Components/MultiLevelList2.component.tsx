import * as React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, makeStyles, } from '@material-ui/core';
import { KeyboardArrowDown, KeyboardArrowRight } from '@material-ui/icons';
import { MenuListInterface } from '../Services/Interfaces.interface';
import classNames from 'classnames';
import { Theme } from '../Services/App.service';
import { useRouter } from 'next/router';
import Link from 'next/link';

const useStyles = makeStyles({
    list: {
        position: 'absolute',
        left: 0,
        top: 0,
        margin: 0,
        minWidth: 200,
        backgroundColor: 'transparent',
        padding: 10,
        display: 'none',
        transition: '.5s',
        '& .listView': {
            padding: ' 10px 5px',
            background: Theme.backgroundColor,
            borderRadius: Theme.radius1,
            boxShadow: Theme.boxShadow,
            position: 'relative',
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            maxWidth: 650,
            '&>li>a': {
                width: '100%',
            },
        }
    },
    ArrowTip: {
        position: 'absolute',
        background: Theme.backgroundColor,
    },
    listItem: {
        padding: '5px 10px',
        margin: 0,
        width: '100%',
        fontSize: 14,
        color: '#666',
        transition: '.3s',
        '&:hover': {
            '&>a span': {
                color: Theme.TFontHeadColor,
                fontWeight: 600,
            },
            '& svg': {
                color: Theme.TFontHeadColor,
                fontWeight: 600,
            },
        }
        // animation: 'SwipeRight .5s'
    },
    listItemText: {
        '& span': {
            fontSize: 12,
            letterSpacing: '1px',
            color: Theme.fontColor,
        }

    },
    listItemIcon: {
        minWidth: 20
    }
})

interface Props {
    list: MenuListInterface[],
    parentIndex: string,
    level?: number,
}

export const MultiLevelList = ({ list, parentIndex, level }: Props) => {
    const [CollapsedItem, setCollapsedItem] = React.useState('');
    const styles = useStyles();
    const router = useRouter();

    const ListItemClickHandler = (event: MouseEvent) => {
        event.stopPropagation();
    }

    const ToggleCollapse = (itemId: string = '', isLast: boolean = false) => {
        console.log(itemId);
        if (!isLast) {
            if (CollapsedItem && CollapsedItem === itemId) {
                setCollapsedItem('');
            } else {
                setCollapsedItem(itemId);
            }
        }
    }

    if (list?.length) {
        let isFirst = !Boolean(level);
        return (
            // <div className={styles.listContainer}>
            <List
                className={
                    classNames(styles.list, 'menu')}
                style={{
                    left: `${isFirst ? 0 : 100}%`,
                    top: `${isFirst ? '64px' : '-20px'}`,
                }
                }>
                <div className='listView'>
                    {/* <div className={styles.ArrowTip} style={{
                        top: isFirst ? -20 : 10,
                        left: isFirst ? 10 : -20,
                        height: isFirst ? 10 : 20,
                        width: isFirst ? 20 : 10,
                        clipPath: isFirst ? 'polygon(0 100%,50% 0,100% 100%,0 100%)' : 'polygon(50% 0,100% 0,100% 100%,50% 0)'
                    }}></div> */}
                    {
                        list.map((item: MenuListInterface, index: number) => {
                            let id = `${parentIndex}-${index}`;
                            let isLast = !Boolean(item?.list?.length);
                            return (
                                <React.Fragment key={index} >

                                    <ListItem
                                        onClick={(event: any) => ListItemClickHandler(event)}
                                        onMouseEnter={() => ToggleCollapse(id, isLast)}
                                        onMouseLeave={() => ToggleCollapse('', isLast)}
                                        className={classNames(styles.listItem, 'menuItem')}
                                        style={{
                                            cursor: 'pointer',
                                            // animationDelay: `${(index * 50) / 1000}s` 
                                        }} id={id}
                                    >
                                        <Link href={item.link || ''}>
                                            <a>
                                                <ListItemText className={classNames(styles.listItemText, 'listItemText')}>{item.label}</ListItemText>
                                            </a>
                                        </Link>
                                        {
                                            !isLast && (

                                                <ListItemIcon className={styles.listItemIcon}>
                                                    {
                                                        CollapsedItem !== id ?
                                                            <KeyboardArrowDown />
                                                            : <KeyboardArrowRight />
                                                    }
                                                </ListItemIcon>
                                            )
                                        }
                                        <div style={{ display: CollapsedItem === id ? 'block' : 'none' }}>
                                            <MultiLevelList list={item?.list} parentIndex={id} level={index + 1} />
                                        </div>
                                    </ListItem>
                                    {/* <div style={{ position: 'absolute'}}>
                                    <div style={{ position: 'relative' }}> */}
                                    {/* </div> */}
                                    {/* </div> */}
                                </React.Fragment>
                            )
                        })
                    }

                </div>
            </List >
            // </div>
        )
    } else {
        return null;
    }
}