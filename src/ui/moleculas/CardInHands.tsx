import {PlayingCards} from "../../enums/PlayingCards";
import React, {DragEventHandler} from "react";
import styled from "styled-components";

export const CardDiv = styled.div`
    border: solid 1px black;
    border-radius: 5px;
    padding: 5px;
`

export const CardInHands = ({isDraggable, cardType, onDragStart, index}: {isDraggable: boolean, cardType: PlayingCards, onDragStart: Function, index: number}) => {
    return <CardDiv draggable={isDraggable}
           onDragStart={(e) => { onDragStart(index);}}>
        <h3>{cardType}</h3>
    </CardDiv>
}