import React from 'react';
import {view} from "@yoskutik/react-vvm";
import WaitingViewModel from "../view_models/WaitingViewModel";
import useHistory, {Navigate} from 'react-router-dom';

import styled from "styled-components";
import {PlayerWaitingPanel} from "../ui/orgnisms/PlayerWaitingPanel";

import BulletImage from "../assets/bullet.png";
import styles from "../styles.module.css";

const CenterDiv = styled.div`
    display: flex;
    justify-content: center;
`


const WaitingView = view(WaitingViewModel)(({viewModel}) => {
    if (viewModel.isRaady){
        viewModel.closeConnection()
        return <Navigate to={`/game/${viewModel.gameId}`}/>
    }

    let bullets = []
    for (let i = 0; i < viewModel.players.length; ++i){
        bullets.push(<img src={BulletImage} width={100} />)
    }

    return <>
        <div>
            <CenterDiv>
                <h1 className={styles.h1}>Код игры: {viewModel.gameId}</h1>
            </CenterDiv>
            <CenterDiv>
                <h1 className={styles.h1}>Игроков: {viewModel.players.length} / {viewModel.maxPlayers}</h1>
            </CenterDiv>
            <CenterDiv>
                {bullets}
            </CenterDiv>
            
        </div>

    </>
})
export default WaitingView;