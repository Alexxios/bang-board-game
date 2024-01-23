import React from 'react';
import {view} from "@yoskutik/react-vvm";
import GameViewModel from "../view_models/GameViewModel";

const GameView = view(GameViewModel)(({viewModel: GameViewModel}) => {

    return <p>Game page</p>
})


export default GameView;