import React from "react";
import styled from "styled-components";
import {PlayingCard} from "../../models/PlayingCard";
import { CardNaming } from "../../naming/CardNaming";

import { Suit } from "../../enums/Suit";
import Clubs from "../../assets/cards/suits/clubs.png";
import Spades from "../../assets/cards/suits/spades.png";
import Diamonds from "../../assets/cards/suits/diamonds.png";
import Hearts from "../../assets/cards/suits/hearts.png";

import { PlayingCardName } from "../../enums/PlayingCardsName";
import Bang from "../../assets/cards/bang.png";
import Barrel from "../../assets/cards/barrel.png";
import Beer from "../../assets/cards/beer.png";
import CatBalou from "../../assets/cards/catBalou.png";
import Duel from "../../assets/cards/duel.png";
import Dynamite from "../../assets/cards/dynamite.png";
import Gatling from "../../assets/cards/gatling.png";
import GeneralStore from "../../assets/cards/generalStore.png";
import Indians from "../../assets/cards/indians.png";
import Jail from "../../assets/cards/jail.png";
import Missed from "../../assets/cards/missed.png";
import Mustang from "../../assets/cards/mustang.png";
import Panic from "../../assets/cards/panic.png";
import Saloon from "../../assets/cards/saloon.png";
import Scope from "../../assets/cards/scope.png";
import Stagecoach from "../../assets/cards/stagecoach.png";
import WellsFargo from "../../assets/cards/wellsFargo.png";
import Remington from "../../assets/cards/remington.png";
import RevCarabine from "../../assets/cards/revCarabine.png";
import Schofield from "../../assets/cards/schofield.png";
import Volcanic from "../../assets/cards/volcanic.png";
import Winchester from "../../assets/cards/winchester.png";

import styles from "../../styles.module.css";

export const CardDiv = styled.div`
    border: solid 1px black;
    border-radius: 5px;
    padding: 5px;
    text-align: center;
    vertical-align: middle;
`

const suitsMap = new Map<Suit, string>([
    [Suit.Clubs, Clubs],
    [Suit.Spades, Spades],
    [Suit.Diamonds, Diamonds],
    [Suit.Hearts, Hearts]
])

const numberMap = new Map<number, string>([
    [11, "J"],
    [12, "Q"],
    [13, "K"],
    [14, "A"]
])
for (let i = 2; i < 11; ++i) {
    numberMap.set(i, i.toString())
}

const cardMap = new Map<PlayingCardName, string>([
    [PlayingCardName.Bang, Bang],
    [PlayingCardName.Barile, Barrel], 
    [PlayingCardName.Beer, Beer], 
    [PlayingCardName.Lovely, CatBalou], 
    [PlayingCardName.Duel, Duel], 
    [PlayingCardName.Dinamite, Dynamite], 
    [PlayingCardName.Gatling, Gatling], 
    [PlayingCardName.Shop, GeneralStore], 
    [PlayingCardName.Indians, Indians], 
    [PlayingCardName.Prison, Jail],
    [PlayingCardName.Miss, Missed],
    [PlayingCardName.Mustang, Mustang],
    [PlayingCardName.Panic, Panic],
    [PlayingCardName.Saloon, Saloon],
    [PlayingCardName.Diligenza, Stagecoach],
    [PlayingCardName.WellsFargo, WellsFargo], 
    [PlayingCardName.Remington, Remington],
    [PlayingCardName.Carabine, RevCarabine],
    [PlayingCardName.Schofield, Schofield],
    [PlayingCardName.Volcanic, Volcanic],
    [PlayingCardName.Winchester, Winchester]
])

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
                    onClick={() => {onClick(card)}}
                    style={{backgroundColor:"white", color:"#DF7453"}}>
        <h3 style={{margin:5}}>{cardNaming.getName(card.cardName)}</h3>
        <img src={cardMap.get(card.cardName)} width={80} style={{margin:0}}/>
        <p style={{fontSize: 24, margin:0}}><b>{numberMap.get(card.number)}</b><img src={suitsMap.get(card.suit)} width={18}/></p>
    </CardDiv>
}