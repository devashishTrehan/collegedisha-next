import { Grid, useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { createRef, memo, useEffect, useState } from 'react';
import classNames from 'classnames';

interface cardSizeProps {
    small: number,
    regular: number,
    minHeight?: number
}

const useStyles = makeStyles({
    container: (props: cardSizeProps) => ({
        width: props.regular,
        minHeight: props.minHeight ? props.minHeight : 200,
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
    cardWidth?: { small: number, regular: number },
}


const DummyCards = memo((props: Props) => {

    const isTablet = useMediaQuery('(max-width:992px)');
    const [parentWidth, setParentWidth] = useState(1250 - (1250 * .05 + 30));

    let _ref: HTMLDivElement;


    useEffect(() => {
        console.log('____ref', _ref);
        if (_ref) {
            let width = _ref.closest('.MuiGrid-container').getBoundingClientRect().width;
            setParentWidth(width);
            console.log('parentWidth by ref', width);
        }
    }, [_ref]);

    let cardSize = props.cardWidth ? props.cardWidth : { small: 200, regular: 240 }

    const styles = useStyles(cardSize);


    let smallCard = props.cardWidth ? props.cardWidth.small : cardSize.small;
    let regularCard = props.cardWidth ? props.cardWidth.regular : cardSize.regular;
    let spacing = props.spacing ? props.spacing : 5;
    let _cardSize = (isTablet ? smallCard : regularCard) + (spacing * 4);
    console.log('parentWidth', parentWidth);

    let cardInRow = Math.floor(parentWidth / _cardSize);
    console.log('cards in row', cardInRow);

    let cardToAdd = ((cardInRow * Math.ceil(props.cardCount / cardInRow)) - props.cardCount)
    console.log('cards to add', cardToAdd);
    let cards = new Array();
    for (let i = 0; i < cardToAdd; i++) {
        cards.push(i);
    }

    console.log('cards', cards);


    if (props.withGrid) {
        return (
            <  >
                <div ref={ref => _ref = ref}></div>
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
                <div ref={ref => _ref = ref}></div>
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