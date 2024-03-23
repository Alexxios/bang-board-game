import React from "react";
import styled from "styled-components";
import {PlayingCard} from "../../models/PlayingCard";
import { CardNaming } from "../../naming/CardNaming";

export const CardDiv = styled.div`
    border: solid 1px black;
    border-radius: 5px;
    padding: 5px;
    text-align: center;
    vertical-align: middle;
`

export const CardInHands = ({isDraggable, card, onDragStart, index, onClick}: {
    isDraggable: boolean,
    card: PlayingCard,
    onDragStart: Function,
    index: number,
    onClick: Function
}) => {
    let cardNaming = new CardNaming()

    return <CardDiv draggable={isDraggable}
                    onDragStart={(e) => {
                        onDragStart(index);
                    }}
                    onClick={() => {onClick(card)}}>
        <h3>{cardNaming.getName(card.cardName)}</h3>
    </CardDiv>
}