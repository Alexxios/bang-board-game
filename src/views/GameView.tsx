import React, {useState} from 'react';
import {view} from "@yoskutik/react-vvm";
import GameViewModel from "../view_models/GameViewModel";
import {CurrentPlayerGameTablet} from "../ui/orgnisms/CurrentPlayerGameTablet";
import {PlayerProps} from "../ui/orgnisms/interfaces/PlayersProps";
import {EnemyPlayerGameTablet} from "../ui/orgnisms/EnemyPlayerGameTablet";
import {CenterDiv} from "./HomeView";
import {GameEvent} from "../models/GameEvent";
import styled from "styled-components";
import {DELETE} from "mobx/dist/types/observablemap";
import {NextMotionButton} from "../ui/moleculas/NextMotionButton";
import {CardSelectionPanel} from "../ui/orgnisms/CardSelectionPanel";
import {Navigate} from "react-router-dom";

const BottomDiv = styled.div`
    display: flex;
    position: absolute;
    bottom: 0;
    margin-bottom: 2%;
    vertical-align: middle;
`

const TopDiv = styled.div`
    display: flex;
    flex-direction: row;
    position: absolute;
    margin-top: 1%;
    left: 50%;
    transform: translateX(-50%);
`

const LeftDiv = styled.div`
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
`
const RightDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
`

const GameView = view(GameViewModel)(({viewModel}) => {
    const [players, setPlayers] = useState<PlayerProps[]>([])
    const [selectedCardIndex, setSelectedCard] = useState(0)

    let motionPlayerIndex = 0
    let currentPlayerIndex = 0
    let isLoaded = viewModel.gameEntity && viewModel.gameIdEntity
    if (isLoaded) {
        players.length = 0
        motionPlayerIndex = viewModel.gameEntity!.motionPlayerIndex
        for (let i = 0; i < viewModel.gameEntity!.players.length; ++i) {
            let playerNickname = viewModel.gameIdEntity!.players[i].nickname
            let playerHealth = viewModel.gameEntity!.players[i].health
            let playerRole = viewModel.gameEntity!.players[i].role
            let playerWeapon = viewModel.gameEntity!.players[i].weapon
            let playerMotion = (viewModel.gameEntity!.motionPlayerIndex == i)
            let playerCards = viewModel.gameEntity!.players[i].cards
            let playerCharacter = viewModel.gameEntity!.players[i].character
            let isDead = viewModel.gameEntity!.players[i].isDead


            if (playerNickname == viewModel.getNickname()) 
                currentPlayerIndex = players.length

            players.push({
                nickname: playerNickname,
                health: playerHealth,
                role: playerRole,
                weapon: playerWeapon,
                cards: playerCards,
                character: playerCharacter,
                isDead: isDead,
                isDoingMotion: playerMotion
            })

        }
    }
    let step = 360 / players.length

    const onCardDragStart = (cardIndex: number) => {
        setSelectedCard(cardIndex)
    }

    const onPanelDrop = (getterNickname: string) => {
        console.log(getterNickname)
        let event: GameEvent = {
            senderIndex: viewModel.getPlayerIndexByNickname(viewModel.getNickname())!,
            getterIndex: viewModel.getPlayerIndexByNickname(getterNickname)!,
            cardDescription: {card: viewModel.getCardByIndex(selectedCardIndex)!},
            cardIndex: selectedCardIndex
        }
        viewModel.sendEvent(event)
    }

    let dragProps = {onCardDragStart: onCardDragStart, onPanelDrop: onPanelDrop}
    let isDoingMotion = viewModel.gameIdEntity?.players[motionPlayerIndex].nickname === viewModel.getNickname()
    let needToSelect = isLoaded && isDoingMotion && viewModel.gameEntity!.cardsForSelection.length != 0
    
    if (viewModel.isEnded){
        return <Navigate to={'/match-end'}/>
    }
    

    return <div>
        {viewModel.isDead &&
            <CenterDiv>
                <h1>You are dead</h1>
            </CenterDiv>
        }

        {
            !needToSelect &&
            <CenterDiv>
                <TopDiv>
                    {players.map((playerProps, index) => {
                        let angle = ((index - currentPlayerIndex) * step + 360) % 360;
                        if (120 < angle && angle < 240) {
                            return <EnemyPlayerGameTablet props={playerProps} onDrop={onPanelDrop}/>;
                        }
                    })}
                </TopDiv>
            </CenterDiv>
        }

        {
            !needToSelect &&
            <LeftDiv>
                {players.map((playerProps, index) => {
                    let angle = ((index - currentPlayerIndex) * step + 360) % 360
                    if (0 < angle && angle <= 120) {
                        return <EnemyPlayerGameTablet props={playerProps} onDrop={onPanelDrop}/>
                    }
                })}
            </LeftDiv>
        }

        {
            !needToSelect &&
            <RightDiv>
                {players.map((playerProps, index) => {
                    let angle = ((index - currentPlayerIndex) * step + 360) % 360
                    if (240 <= angle && angle < 360) {
                        return <EnemyPlayerGameTablet props={playerProps} onDrop={onPanelDrop}/>
                    }

                })}
            </RightDiv>
        }


        {
            needToSelect &&
            <CardSelectionPanel cards={viewModel.gameEntity!.cardsForSelection} onSelect={viewModel.onSelectCard}/>
        }

        <BottomDiv>
            <div style={{marginLeft: 400}}>
                {isLoaded && isDoingMotion &&
                    <NextMotionButton onClick={viewModel.nextMotion}/>}
            </div>
        </BottomDiv>

        <CenterDiv>
            <BottomDiv>
                {players.map(playerProps => {
                    if (playerProps.nickname === viewModel.getNickname()) {
                        return <CurrentPlayerGameTablet props={playerProps} dragProps={dragProps}/>
                    }
                })
                }
            </BottomDiv>

        </CenterDiv>



    </div>
})


export default GameView;