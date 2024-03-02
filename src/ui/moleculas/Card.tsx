import {PlayingCards} from "../../enums/PlayingCards";
import React, {DragEventHandler} from "react";

export const Card = ({cardType, onDragStart}: { cardType: PlayingCards, onDragStart: Function}) => {
    return <div draggable={true}
           onDragStart={(e) => { onDragStart();}}>
        <h3>{cardType}</h3>
    </div>
}