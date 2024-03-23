import React from "react";
import {CardDiv} from "./CardInHands";
import {PlayingCard} from "../../models/PlayingCard";
import { CenterDiv } from "../../views/HomeView";

export const CardForSelection = ({card, index, onSelect} : {card: PlayingCard, index: number, onSelect: Function}) => {
    return <CardDiv style={{width: 100, height: 150, margin: 40}} onClick={() => {onSelect(index)}}>
        <CenterDiv style={{marginTop: 50}}>
            <p>{card.cardName}</p>
        </CenterDiv>
        
    </CardDiv>
}