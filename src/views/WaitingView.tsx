import React, {ChangeEvent, useState} from 'react';
import {view} from "@yoskutik/react-vvm";
import WaitingViewModel from "../view_models/WaitingViewModel";

import styled from "styled-components";
import {PlayerWaitingPanel} from "../ui/orgnisms/PlayerWaitingPanel";

const CenterDiv = styled.div`
    display: flex;
    justify-content: center;
`


const WaitingView = view(WaitingViewModel)(({viewModel}) => {

    return <>
        <div>
            <CenterDiv>
                <h1>{viewModel.gameId}</h1>
            </CenterDiv>
            <CenterDiv>
            {viewModel.players.map(player => {
                    return <PlayerWaitingPanel nickName={player.nickname}></PlayerWaitingPanel>
                })}
            </CenterDiv>
        </div>

    </>;
})
export default WaitingView;