import * as React from 'react';
import { Collapse, Divider, List, ListItem, ListItemIcon, ListItemText, makeStyles, } from '@material-ui/core';
import { KeyboardArrowDown, KeyboardArrowRight } from '@material-ui/icons';
import { MenuListInterface } from '../Services/Interfaces.interface';
import { Theme } from '../Services/App.service';
import { useRouter } from 'next/router';
import Link from 'next/link';


const useStyles = makeStyles({
    container: {
        '& ul': {
            padding: 0,
        }
    },
    listItem: {
        padding: '6px 10px',
        '& a': {
            width: '100%',
            textDecoration: 'none'
        }
    },
    listItemText: {
        '& span': {
            fontSize: 12,
            color: Theme.fontColor
        }
    },
    listItemIcon: {
        minWidth: 20,

    }
})


// ----- Collapsible MenuList ----- \\

interface Props {
    list: MenuListInterface[],
    parentIndex: string,
    onLinkClick: Function
}

export const C_MenuList = ({ list, parentIndex, onLinkClick }: Props) => {

    const [CollapsedItem, setCollapsedItem] = React.useState('');
    const router = useRouter();

    const styles = useStyles();

    const ToggleCollapse = (itemId: string = '', link: string, isLast: boolean = false) => {
        if (link && isLast) {
            onLinkClick();
        }
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
        return (
            <div className={styles.container}>
                <List className={parentIndex}>
                    {
                        list.map((item: MenuListInterface, index: number) => {
                            let id = `${parentIndex}-${index}`;
                            let isFirst = !Boolean(parentIndex.split('-')?.length > 1);
                            let isLast = !Boolean(item?.list?.length);
                            return (
                                <div style={{ background: `${Theme.primary}${isFirst ? '00' : '11'}` }} key={index}>

                                    {
                                        isFirst && (<Divider light={true} />)
                                    }
                                    <ListItem className={styles.listItem} button onClick={() => ToggleCollapse(id, item?.link, isLast)}
                                        style={{ cursor: 'pointer', }} id={id} >
                                        {
                                            isLast ?
                                                <Link href={item.link || ''}>
                                                    <a>
                                                        <ListItemText className={styles.listItemText} >{item.label}</ListItemText>
                                                    </a>
                                                </Link>
                                                : <ListItemText className={styles.listItemText} >{item.label}</ListItemText>
                                        }
                                        {
                                            !isLast && (

                                                <ListItemIcon className={styles.listItemIcon}>
                                                    {
                                                        CollapsedItem === id ?
                                                            <KeyboardArrowDown />
                                                            : <KeyboardArrowRight />
                                                    }
                                                </ListItemIcon>
                                            )
                                        }
                                    </ListItem>
                                    <Collapse in={CollapsedItem === id}>

                                        <C_MenuList list={item?.list} parentIndex={id} onLinkClick={onLinkClick} />
                                    </Collapse>
                                </div>
                            )
                        })
                    }

                </List>
            </div>
        )
    } else {
        return null;
    }
}