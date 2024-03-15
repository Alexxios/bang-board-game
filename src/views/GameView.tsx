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

const BottomDiv = styled.div`
    display: flex;
    position: absolute;
    bottom: 0;
    margin-bottom: 50px;
    vertical-align: middle;
`

const TopDiv = styled.div`
    display: flex;
    position: absolute;
    top: 0;
    margin-top: 50px;
`

const GameView = view(GameViewModel)(({viewModel}) => {
    const [players, setPlayers] = useState<PlayerProps[]>([])
    const [selectedCardIndex, setSelectedCard] = useState(0)

    let motionPlayerIndex = 0
    let isLoaded = viewModel.gameEntity && viewModel.gameIdEntity
    if (isLoaded) {
        players.length = 0
        motionPlayerIndex = viewModel.gameEntity!.motionPlayerIndex
        for (let i = 0; i < viewModel.gameIdEntity!.players.length; ++i) {
            let playerNickname = viewModel.gameIdEntity!.players[i].nickname
            let playerHealth = viewModel.gameEntity!.players[i].health
            let playerRole = viewModel.gameEntity!.players[i].role
            let playerWeapon = viewModel.gameEntity!.players[i].weapon
            let playerMotion = (viewModel.gameEntity!.motionPlayerIndex == i)
            let playerCards = viewModel.gameEntity!.players[i].cards
            let playerCharacter = viewModel.gameEntity!.players[i].character

            players.push({
                nickname: playerNickname,
                health: playerHealth,
                role: playerRole,
                weapon: playerWeapon,
                cards: playerCards,
                character: playerCharacter,
                isDoingMotion: playerMotion
            })
        }
    }

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

    console.log(needToSelect)

    if (viewModel.isDead){
        return <h1>You are dead</h1>
    }

    return <div>
        {
            !needToSelect &&
            <CenterDiv>
                <TopDiv>
                    {players.map(playerProps => {
                        if (playerProps.nickname !== viewModel.getNickname()) {
                            return <EnemyPlayerGameTablet props={playerProps} onDrop={onPanelDrop}/>
                        }
                    })}
                </TopDiv>
            </CenterDiv>
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