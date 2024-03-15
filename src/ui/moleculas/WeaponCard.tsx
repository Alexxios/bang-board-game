import React from "react";
import styled from "styled-components";
import {PlayingCard} from "../../models/PlayingCard";

export const WeaponDiv = styled.div`
    border: solid 1px black;
    border-radius: 5px;
    padding: 5px;
    text-align: center;
`

export const WeaponCard = ({card, canDropOn, onDrop}: {
    card: PlayingCard,
    canDropOn: boolean,
    onDrop: Function
}) => {

    if (canDropOn) {
        return <WeaponDiv draggable={false}
              onDrop={(e) => {
                  e.preventDefault()
                  onDrop()
              }}
              onDragOver={(e) => {
                  e.preventDefault()
              }}>
            <h3>{card.cardName}</h3>
        </WeaponDiv>
    } else {
        return <WeaponDiv draggable={false}>
            <h3>{card.cardName}</h3>
        </WeaponDiv>
    }


}