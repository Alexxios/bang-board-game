import {PlayingCard} from "../../enums/PlayingCards";
import React, {DragEventHandler} from "react";
import styled from "styled-components";
import {CardDiv} from "./CardInHands";
export const ClosedCard = () => {

    return <CardDiv draggable={false}>
        <h3>BANG!</h3>
    </CardDiv>


}