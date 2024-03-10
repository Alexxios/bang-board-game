import React, {useState} from 'react';
import {view} from "@yoskutik/react-vvm";
import GameViewModel from "../view_models/GameViewModel";
import {CurrentPlayerGameTablet} from "../ui/moleculas/CurrentPlayerGameTablet";
import {PlayerProps} from "../ui/orgnisms/interfaces/PlayersProps";
import {EnemyPlayerGameTablet} from "../ui/moleculas/EnemyPlayerGameTablet";
import {CenterDiv} from "./HomeView";
import {GameEvent} from "../models/GameEvent";
import {PlayingCards} from "../enums/PlayingCards";
import {type} from "node:os";


const GameView = view(GameViewModel)(({viewModel}) => {
    const [players, setPlayers] = useState<PlayerProps[]>([])
    const [selectedCardIndex, setSelectedCard] = useState(0)
    if ( viewModel.gameEntity){
        console.log("rerender " + viewModel.gameEntity?.players[0].cards.length.toString())
    }

    let motionPlayerIndex = 0
    let isLoaded = viewModel.gameEntity && viewModel.gameIdEntity
    if (isLoaded){
        players.length = 0
        motionPlayerIndex = viewModel.gameEntity!.motionPlayerIndex
        for (let i = 0; i < viewModel.gameIdEntity!.players.length; ++i){
            let playerNickname = viewModel.gameIdEntity!.players[i].nickname
            let playerHealth = viewModel.gameEntity!.players[i].health
            let playerRole = viewModel.gameEntity!.players[i].role
            let playerWeapon = viewModel.gameEntity!.players[i].weapon
            let playerMotion = (viewModel.gameEntity!.motionPlayerIndex == i)
            let playerCards = viewModel.gameEntity!.players[i].cards

            players.push({
                nickname: playerNickname,
                health: playerHealth,
                role: playerRole,
                weapon: playerWeapon,
                cards: playerCards,
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

    let dragProps = {onCardDragStart: onCardDragStart, onPanelDrop: onPanelDrop }

    return <div>
        <CenterDiv>
        {players &&
            players.map(playerProps => {
                if (playerProps.nickname === viewModel.getNickname()) {
                    return <CurrentPlayerGameTablet props={playerProps} dragProps={dragProps}/>
                } else {
                    return <EnemyPlayerGameTablet props={playerProps} onDrop={onPanelDrop} />
                }
            })
        }
    </CenterDiv>
        {isLoaded && viewModel.gameIdEntity?.players[motionPlayerIndex].nickname === viewModel.getNickname() &&
            <button onClick={() => {viewModel.nextMotion()}}>Следующий ход</button>}
    </div>
})


export default GameView;