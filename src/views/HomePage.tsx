import CreateGamePanel from "../ui/orgnisms/CreateGamePanel";
import EnterGamePanel from "../ui/orgnisms/EnterGamePanel";
import React, {useState} from "react";
import styled from "styled-components";
import {view} from "@yoskutik/react-vvm";
import HomePageViewModel from "../view_models/HomePageViewModel";

const CenterDiv = styled.div`
    display: flex;
    justify-content: center;
`

const HomePage = view(HomePageViewModel)(({viewModel}) => {

    const [gameId, setGameId] = useState('');
    const [playersCount, setPlayersCount] = useState(4)

    return <>
        <CenterDiv>
            <h1>БЭНГ!</h1>
        </CenterDiv>
        <CenterDiv>
            <CreateGamePanel/>
            <EnterGamePanel/>
        </CenterDiv>

    </>;
})

export default HomePage;