import React from 'react'
import { PlayingCard } from '../../models/PlayingCard'
import styled from 'styled-components'
import { CenterDiv } from '../../views/HomeView'
import { CardDescriptionMapper } from '../../descriptions/CardDescriptionMapper'
import { Panel } from '../orgnisms/styles/PanelDiv'
import {Character} from "../../enums/Character";
import {CharacterDescriptionMapper} from "../../descriptions/CharacterDescriptionMapper";
import { CharacterNaming } from '../../naming/CharacterNaming'

const Overlay = styled.div`
    overlay: auto;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 20%;
    z-index: 2;
`

export const CharacterDescription = ({character, onClick} : {character: Character, onClick: Function}) => {
    let descriptionMapper = new CharacterDescriptionMapper()
    let description = descriptionMapper.getDescription(character)
    let characterNaming = new CharacterNaming()

    return <Overlay> 
        <CenterDiv>
            <Panel style={{background: 'white', maxWidth: 250, minHeight: 400}}>
                <CenterDiv>
                    <h1>{characterNaming.getName(character)}</h1>
                </CenterDiv>

                <div style={{textAlign: 'justify', marginTop: 200}}>
                    {description!.split('\n').map(part => <p>{part}</p>)}
                </div>
                <button onClick={() => {
                    onClick()
                }}>Закрыть
                </button>
            </Panel>
        </CenterDiv>
    </Overlay>
}