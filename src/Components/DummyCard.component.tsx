import { Grid, useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { memo, useEffect, useState } from 'react';
import classNames from 'classnames';

interface cardSizeProps {
    small: number,
    regular: number
}

const useStyles = makeStyles({
    container: (props: cardSizeProps) => ({
        width: props.regular,
        minHeight: 200,
        margin: 'auto',
        height: '100%',
        maxWidth: '100%',

    }),

    container_T: (props: cardSizeProps) => ({
        width: props.small,
        minHeight: 260,
    }),
})

interface Props {
    cardCount: number,
    withGrid?: boolean,
    spacing?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9,
    parentWidth?: number,
    cardWidth?: { small: number, regular: number },
}


const DummyCards = memo((props: Props) => {

    const isTablet = useMediaQuery('(max-width:992px)');
    const [__window, setWindow] = useState({
        innerWidth: 0,
        innerHeight: 0
    });

    useEffect(() => {
        setWindow(window);
        window.onresize = ((event) => {
            let { innerHeight, innerWidth } = event.target;
            console.log('dimensions', innerHeight, innerWidth);
            setWindow({
                innerHeight: innerHeight,
                innerWidth: innerWidth
            });
        })
    }, [])

    let cardSize = props.cardWidth ? props.cardWidth : { small: 200, regular: 240 }

    const styles = useStyles(cardSize);

    let { innerWidth } = __window;
    let availableSpace;
    if (props.parentWidth) {
        availableSpace = props.parentWidth;
    } else {
        availableSpace = (innerWidth - (innerWidth * 0.10 + 40));
    }

    let smallCard = props.cardWidth ? props.cardWidth.small : cardSize.small;
    let regularCard = props.cardWidth ? props.cardWidth.regular : cardSize.regular;
    let spacing = props.spacing ? props.spacing : 5;
    let _cardSize = (isTablet ? smallCard : regularCard) + (spacing * 4);

    let cardInRow = Math.floor(availableSpace / _cardSize);

    let cardToAdd = ((cardInRow * Math.ceil(props.cardCount / cardInRow)) - props.cardCount)
    let cards = new Array();
    for (let i = 0; i < cardToAdd; i++) {
        cards.push(i);
    }

    console.log('cards', cards);


    if (props.withGrid) {
        return (
            <>
                {

                    cards.map(_ => {
                        console.log('returning', _);
                        return (
                            <Grid item>
                                <div className={classNames(styles.container, { [styles.container_T]: isTablet })}>

                                </div>
                            </Grid>
                        )
                    })
                }
            </>
        )
    } else {

        return (
            <>
                {

                    cards.map(_ => {
                        return (
                            <div className={classNames(styles.container, { [styles.container_T]: isTablet })}>
                            </div>
                        )
                    })
                }
            </>

        );
    }
})


export default DummyCards;