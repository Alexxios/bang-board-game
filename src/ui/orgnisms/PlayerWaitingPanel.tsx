import React from 'react';
import styled from "styled-components";

const PanelDiv = styled.div`
    margin: 10px;
    padding: 10px;
`

export const PlayerWaitingPanel = ({nickName} : {nickName: string}) => {
    return <PanelDiv>
        <p>{nickName}</p>
    </PanelDiv>
}