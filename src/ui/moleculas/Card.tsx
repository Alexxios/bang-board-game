import {PlayingCards} from "../../enums/PlayingCards";
import React, {DragEventHandler} from "react";

export const Card = ({isDraggable, cardType, onDragStart, index}: {isDraggable: boolean, cardType: PlayingCards, onDragStart: Function, index: number}) => {
    return <div draggable={isDraggable}
           onDragStart={(e) => { onDragStart(index);}}>
        <h3>{cardType}</h3>
    </div>
}