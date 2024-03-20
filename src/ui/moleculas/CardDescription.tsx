import React from 'react'
import { PlayingCard } from '../../models/PlayingCard'
import styled from 'styled-components'
import { CenterDiv } from '../../views/HomeView'
import { CardDescriptionMapper } from '../../descriptions/CardDescriptionMapper'
import { Panel } from '../orgnisms/styles/PanelDiv'

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


    return <Overlay> 
        <CenterDiv>
            <Panel style={{background: 'white', maxWidth: 250, minHeight: 450}}>
                <div>
                    <CenterDiv>
                        <h1>{card.cardName}</h1>
                    </CenterDiv>
                    <CenterDiv>
                        <h1>{card.suit}</h1>
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