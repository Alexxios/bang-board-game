import React from "react";
import styled from "styled-components";
import {PlayingCard} from "../../models/PlayingCard";

export const CardDiv = styled.div`
    border: solid 1px black;
    border-radius: 5px;
    padding: 5px;
    text-align: center;
    vertical-align: middle;
`

export const CardInHands = ({isDraggable, card, onDragStart, index}: {
    isDraggable: boolean,
    card: PlayingCard,
    onDragStart: Function,
    index: number
}) => {
    return <CardDiv draggable={isDraggable}
                    onDragStart={(e) => {
                        onDragStart(index);
                    }}>
        <h3>{card.cardName}</h3>
    </CardDiv>
}