import {PlayingCards} from "../../enums/PlayingCards";
import React, {DragEventHandler} from "react";
import styled from "styled-components";
import {CardDiv} from "./CardInHands";

export const WeaponDiv = styled.div`
    border: solid 1px black;
    border-radius: 5px;
    padding: 5px;
    margin-right: 50px;
    text-align: center;
`

export const WeaponCard = ({card, canDropOn, onDrop}: {
    card: PlayingCards,
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
            <h3>{card}</h3>
        </WeaponDiv>
    } else {
        return <WeaponDiv draggable={false}>
            <h3>{card}</h3>
        </WeaponDiv>
    }


}