import * as React from 'react';
import { Collapse, Divider, List, ListItem, ListItemIcon, ListItemText, makeStyles, } from '@material-ui/core';
import { KeyboardArrowDown, KeyboardArrowRight } from '@material-ui/icons';
import { MenuListInterface } from '../Services/Interfaces.interface';
import { Theme } from '../Services/App.service';


const useStyles = makeStyles({
    listItem: {
        padding: '5px 10px',
    },
    listItemText: {
        '& span': {
            fontSize: 12
        }
    },
    listItemIcon: {
        minWidth: 20,
    }
})

export const C_MenuList = ({ list, parentIndex }: any) => {

    const [CollapsedItem, setCollapsedItem] = React.useState('');


    const styles = useStyles();

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
        return (
            <div>
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
                                    <ListItem className={styles.listItem} button onClick={() => ToggleCollapse(id, isLast)}
                                        style={{ cursor: 'pointer', }} id={id} >
                                        <ListItemText className={styles.listItemText} >{item.label}</ListItemText>
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
                                        <C_MenuList list={item?.list} parentIndex={id} />
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