import React from 'react';
import {view} from "@yoskutik/react-vvm";
import GameViewModel from "../view_models/GameViewModel";
import PlayerPanel from "../ui/orgnisms/PlayerPanel";

const GameView = view(GameViewModel)(({viewModel}) => {
    return <>
        {viewModel.gameEntity && viewModel.gameIdEntity &&
            <PlayerPanel nickname={viewModel.gameIdEntity.players[0].nickname} role={viewModel.gameEntity.players[0].role}/>
        }
    </>
})


export default GameView;