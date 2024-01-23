import CreateGamePanel from "../ui/orgnisms/CreateGamePanel";
import EnterGamePanel from "../ui/orgnisms/EnterGamePanel";
import React, {ChangeEvent, ChangeEventHandler, useState} from "react";
import styled from "styled-components";
import {view} from "@yoskutik/react-vvm";
import HomePageViewModel from "../view_models/HomePageViewModel";

const CenterDiv = styled.div`
    display: flex;
    justify-content: center;
`

const HomeView = view(HomePageViewModel)(({viewModel}) => {

    const [nickName, setNickName] = useState('');
    const [gameId, setGameId] = useState('');
    const [playersCount, setPlayersCount] = useState(4)

    const changeNickname = (event: ChangeEvent<HTMLInputElement>) => {
        setNickName(event.target.value);
    }

    return <>
        <CenterDiv>
            <h1>БЭНГ!</h1>
        </CenterDiv>
        <CenterDiv>
            <input
                style={{margin: 40}}
                placeholder={"Введите свой ник"}
                onChange={changeNickname}></input>
        </CenterDiv>
        <CenterDiv>
            <CreateGamePanel
                playersCount={viewModel.currentPlayersCount}
                incrementOnClick={viewModel.incrementPlayersCount}
                decrementOnClick={viewModel.decrementPlayersCount}
            />
            <EnterGamePanel/>
        </CenterDiv>
    </>;
})

export default HomeView;