import React from "react";
import {CardDiv} from "./CardInHands";
import {PlayingCard} from "../../models/PlayingCard";

export const CardForSelection = ({card, index, onSelect} : {card: PlayingCard, index: number, onSelect: Function}) => {
    return <CardDiv onClick={() => {onSelect(index)}}>
        <h2>{card.cardName}</h2>
    </CardDiv>
}