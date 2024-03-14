import React from "react";
import {CardDiv} from "./CardInHands";
import {PlayingCard} from "../../enums/PlayingCards";


export const CardForSelection = ({card, index, onSelect} : {card: PlayingCard, index: number, onSelect: Function}) => {
    return <CardDiv onClick={() => {onSelect(index)}}>
        <h2>{card}</h2>
    </CardDiv>
}