import React, {useState} from 'react';
import {view} from "@yoskutik/react-vvm";
import GameViewModel from "../view_models/GameViewModel";
import {CurrentPlayerGameTablet} from "../ui/orgnisms/CurrentPlayerGameTablet";
import {PlayerProps} from "../ui/orgnisms/interfaces/PlayersProps";
import {EnemyPlayerGameTablet} from "../ui/orgnisms/EnemyPlayerGameTablet";

const GameView = view(GameViewModel)(({viewModel}) => {
    const [players, setPlayers] = useState<PlayerProps[]>([]);

    if (viewModel.gameEntity && viewModel.gameIdEntity){
        for (let i = 0; i < viewModel.gameIdEntity.players.length; ++i){
            let player_nickname = viewModel.gameIdEntity.players[i].nickname;
            let player_role = viewModel.gameEntity.players[i].role;
            let player_weapon = viewModel.gameEntity.players[i].weapon;

            players.push({
                nickname: player_nickname,
                role: player_role,
                weapon: player_weapon,
                cards: []
            });
        }
    }

    return <>
        {players &&
            players.map(playerProps => {
                if (playerProps.nickname === viewModel.getNickname()){
                    return <CurrentPlayerGameTablet props={playerProps}/>
                } else {
                    return <EnemyPlayerGameTablet props={playerProps}/>
                }
            })
        }
    </>
})


export default GameView;