import React from 'react'
import { PlayingCard } from '../../models/PlayingCard'
import styled from 'styled-components'
import { CenterDiv } from '../../views/HomeView'
import { CardDescriptionMapper } from '../../cardsDescription/CardDescriptionMapper'
import { Panel } from '../orgnisms/styles/PanelDiv'

const Overlay = styled.div`
    overlay: auto;
    position: absolute;
    z-index: 2
`

export const CardDescription = ({card, onClick} : {card: PlayingCard, onClick: Function}) => {
    let descriptionMapper = new CardDescriptionMapper()
    let description = descriptionMapper.getDescription(card.cardName)


    return <Overlay> 
        <CenterDiv>
            <Panel style={{background: 'white'}}>
                <div>
                    <h1>{card.cardName}</h1>
                    <h1>{card.suit}</h1>
                    <h1>{card.number}</h1>
                    <h1>{description}</h1>
                </div>
                <button onClick={() => {onClick()}}>Закрыть</button>
            </Panel>
        </CenterDiv>
    </Overlay>
}