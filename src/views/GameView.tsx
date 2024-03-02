import React, {useState} from 'react';
import {view} from "@yoskutik/react-vvm";
import GameViewModel from "../view_models/GameViewModel";
import {CurrentPlayerGameTablet} from "../ui/moleculas/CurrentPlayerGameTablet";
import {PlayerProps} from "../ui/orgnisms/interfaces/PlayersProps";
import {EnemyPlayerGameTablet} from "../ui/moleculas/EnemyPlayerGameTablet";
import {CenterDiv} from "./HomeView";


const onCardDragStart = () => {
   console.log('start');
}

const onPanelDrop = () => {
    console.log('end');
}

const GameView = view(GameViewModel)(({viewModel}) => {
    const [players, setPlayers] = useState<PlayerProps[]>([]);

    let motionPlayerIndex = 0;
    let isLoaded = viewModel.gameEntity && viewModel.gameIdEntity;
    if (isLoaded){
        players.length = 0;
        motionPlayerIndex = viewModel.gameEntity!.motionPlayerIndex;
        for (let i = 0; i < viewModel.gameIdEntity!.players.length; ++i){
            let playerNickname = viewModel.gameIdEntity!.players[i].nickname;
            let playerRole = viewModel.gameEntity!.players[i].role;
            let playerWeapon = viewModel.gameEntity!.players[i].weapon;
            let playerMotion = (viewModel.gameEntity!.motionPlayerIndex == i);
            let playerCards = viewModel.gameEntity!.players[i].cards;

            players.push({
                nickname: playerNickname,
                role: playerRole,
                weapon: playerWeapon,
                cards: playerCards,
                isDoingMotion: playerMotion
            });
        }
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