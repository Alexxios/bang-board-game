import React, {DragEventHandler} from "react";
import styled from "styled-components";
import {Character} from "../../enums/Character";
import { CharacterNaming } from "../../naming/CharacterNaming";

export const CardDiv = styled.div`
    border: solid 1px black;
    border-radius: 5px;
    padding: 5px;
`

export const CharacterCard = ({character, onClick} : {character: Character, onClick: Function}) => {
    let characterNaming = new CharacterNaming()
    console.log(character)
    return <CardDiv onClick={() => {onClick(character)}}>
        <h3>{characterNaming.getName(character)}</h3>
    </CardDiv>
}