import React from 'react'
import { PlayingCard } from '../../models/PlayingCard'
import styled from 'styled-components'
import { CenterDiv } from '../../views/HomeView'
import { CardDescriptionMapper } from '../../descriptions/CardDescriptionMapper'
import { Panel } from '../orgnisms/styles/PanelDiv'
import { CardNaming } from '../../naming/CardNaming'
import { SuitNaming } from '../../naming/SuitNaming copy'

const Overlay = styled.div`
    overlay: auto;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 20%;
    z-index: 2;
`

export const CardDescription = ({card, onClick} : {card: PlayingCard, onClick: Function}) => {
    let descriptionMapper = new CardDescriptionMapper()
    let description = descriptionMapper.getDescription(card.cardName)
    let cardNaming = new CardNaming()
    let suitNaming = new SuitNaming()

    return <Overlay> 
        <CenterDiv>
            <Panel style={{background: 'white', maxWidth: 250, minHeight: 450}}>
                <div>
                    <CenterDiv>
                        <h1>{cardNaming.getName(card.cardName)}</h1>
                    </CenterDiv>
                    <CenterDiv>
                        <h1>{suitNaming.getName(card.suit)}</h1>
                        <h1 style={{marginLeft: 10}}>{card.number}</h1>
                    </CenterDiv>
                    <div style={{textAlign: 'justify', marginTop: 150}}>
                        {description!.split('\n').map(part => <p>{part}</p>)}
                    </div>

                </div>
                <button onClick={() => {onClick()}}>Закрыть</button>
            </Panel>
        </CenterDiv>
    </Overlay>
}