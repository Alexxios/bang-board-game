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
    // create a web socket connection
    return <>

        <CenterDiv>
            {viewModel.players.map(player => {
                return <PlayerWaitingPanel nickName={player.nickname}></PlayerWaitingPanel>
            })}
        </CenterDiv>

    </>;
})
export default WaitingView;