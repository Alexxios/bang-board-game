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
import {CardDescription} from '../ui/moleculas/CardDescription';
import {CharacterDescription} from "../ui/moleculas/CharacterDescription";
import {EventsBar} from "../ui/orgnisms/EventsBar";
import {BottomDiv, LeftDiv, RightBottomDiv, RightDiv, TopDiv} from "../ui/styles/PositionDivs";



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

    if (viewModel.isEnded) {
        return <Navigate to={'/match-end'}/>
    }


    return <div>
        {
            viewModel.cardDescriptionShowing?.needToShow &&
            <CardDescription card={viewModel.cardDescriptionShowing.card} onClick={viewModel.closeCardDescription}/>
        }

        {
            viewModel.characterDescriptionShowing?.needToShow &&
            <CharacterDescription character={viewModel.characterDescriptionShowing.character}
                                  onClick={viewModel.closeCharacterDescription}/>
        }

        {viewModel.isDead &&
            <CenterDiv>
                <h1>Вы умерли</h1>
            </CenterDiv>
        }

        {
            !needToSelect &&
            <CenterDiv>
                <TopDiv>
                    {players.map((playerProps, index) => {
                        let angle = ((index - currentPlayerIndex) * step + 360) % 360;
                        if (120 < angle && angle < 240) {
                            return <EnemyPlayerGameTablet props={playerProps} onDrop={onPanelDrop}
                                                          onCharacterClick={viewModel.showCharacterDescription}/>;
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
                        return <EnemyPlayerGameTablet props={playerProps} onDrop={onPanelDrop}
                                                      onCharacterClick={viewModel.showCharacterDescription}/>
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
                        return <EnemyPlayerGameTablet props={playerProps} onDrop={onPanelDrop}
                                                      onCharacterClick={viewModel.showCharacterDescription}/>
                    }

                })}
            </RightDiv>
        }


        {
            needToSelect &&
            <CardSelectionPanel cards={viewModel.gameEntity!.cardsForSelection} onSelect={viewModel.onSelectCard}/>
        }

        <BottomDiv>
            <div style={{marginLeft: 80}}>
                {isLoaded && isDoingMotion &&
                    <NextMotionButton onClick={viewModel.nextMotion}/>}
            </div>
        </BottomDiv>

        <CenterDiv>

            <BottomDiv>
                <div style={{display: 'block'}}>
                    <CenterDiv>
                        {viewModel.failedEventHandling && <p>Невозможно применить эту карту</p>}
                    </CenterDiv>

                    <div style={{display: 'flex'}}>
                        {players.map(playerProps => {
                            if (playerProps.nickname === viewModel.getNickname()) {
                                return <CurrentPlayerGameTablet props={playerProps} dragProps={dragProps}
                                                                onCardClick={viewModel.showCardDescription}
                                                                onCharacterClick={viewModel.showCharacterDescription}/>
                            }
                        })
                        }
                    </div>
                </div>
            </BottomDiv>


        </CenterDiv>

        <RightBottomDiv>
            <EventsBar events={viewModel.events}/>
        </RightBottomDiv>
    </div>
})


export default GameView;