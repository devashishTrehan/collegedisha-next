import { Grid, useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { createRef, memo, useEffect, useState } from 'react';
import classNames from 'classnames';


const useStyles = makeStyles({
    container: (props: cardSizeType) => ({
        width: props.width.regular,
        minHeight: props.minHeight ? props.minHeight : 10,
        margin: 'auto',
        height: '100%',
        maxWidth: '100%',
    }),

    container_T: (props: cardSizeType) => ({
        width: props.width.small,
    }),

})

interface cardSizeType {
    width: {
        small: number,
        regular: number,
    },
    minHeight?: number
}

interface Props {
    cardCount: number,
    withGrid?: boolean,
    spacing?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9,
    cardSize?: cardSizeType,
}


const DummyCards = (props: Props) => {

    const isTablet = useMediaQuery('(max-width:992px)');
    const isMobile = useMediaQuery('(max-width:769px)');
    const [parentWidth, setParentWidth] = useState(1250 - (1250 * .05 + 30));
    const [WidthHelperVisibility, setWidthHelperVisibility] = useState(true);

    let _ref: HTMLSpanElement;

    const UpdateParentWidth = () => {
        if (_ref) {
            let width = _ref.closest('.MuiGrid-container').getBoundingClientRect().width;
            setWidthHelperVisibility(false);
            setParentWidth(width);
            // console.log('parentWidth by ref', width);
        }
    }


    useEffect(() => {
        let timeout;
        window.addEventListener('resize', () => {

            clearTimeout(timeout);
            setTimeout(() => {
                UpdateParentWidth();
            }, 500)

        }, { passive: true })
        UpdateParentWidth();

        return window.removeEventListener('resize', () => {
        })

    }, []);

    let cardSize: cardSizeType = props.cardSize ? props.cardSize : { width: { small: 200, regular: 240 }, minHeight: 200 }

    const styles = useStyles(cardSize);


    let smallCard = props.cardSize?.width ? props.cardSize?.width.small : cardSize.width.small;
    let regularCard = props.cardSize?.width ? props.cardSize?.width.regular : cardSize.width.regular;
    let spacing = props.spacing ? props.spacing : 5;
    let _cardSize = (isTablet ? smallCard : regularCard) + (spacing * (4 * 2));
    // console.log('cardWidth', _cardSize);
    // console.log('parentWidth', parentWidth);

    let cardInRow = Math.floor(parentWidth / _cardSize);
    // console.log('cards in row', cardInRow);

    let cardToAdd = ((cardInRow * Math.ceil(props.cardCount / cardInRow)) - props.cardCount)
    // console.log('cards to add', cardToAdd);
    let cards = new Array();
    for (let i = 0; i < cardToAdd; i++) {
        cards.push(i);
    }


    if (props.withGrid) {
        return (
            <  >
                {
                    WidthHelperVisibility ?
                        <span ref={ref => _ref = ref}></span>
                        : null
                }
                {

                    cards.map(_ => {
                        return (
                            <Grid item key={_}>
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
                    WidthHelperVisibility ?
                        <span ref={ref => _ref = ref}></span>
                        : null
                }
                {

                    cards.map(_ => {
                        return (
                            <div key={_} className={classNames(styles.container, { [styles.container_T]: isTablet })}>

                            </div>
                        )
                    })
                }
            </>

        );
    }
}


export default DummyCards;