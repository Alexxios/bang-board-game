import React, {DragEventHandler} from "react";
import styled from "styled-components";
import {Character} from "../../enums/Character";

export const CardDiv = styled.div`
    border: solid 1px black;
    border-radius: 5px;
    padding: 5px;
`

export const CharacterCard = ({character} : {character: Character}) => {
    return <CardDiv>
        <h3>{character}</h3>
    </CardDiv>
}