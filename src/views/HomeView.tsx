import CreateGamePanel from "../ui/orgnisms/CreateGamePanel";
import EnterGamePanel from "../ui/orgnisms/EnterGamePanel";
import React, {ChangeEvent, ChangeEventHandler, MouseEventHandler, useState} from "react";
import styled from "styled-components";
import {view} from "@yoskutik/react-vvm";
import HomePageViewModel from "../view_models/HomePageViewModel";
import {useNavigate} from "react-router-dom";

const CenterDiv = styled.div`
    display: flex;
    justify-content: center;
`

const HomeView = view(HomePageViewModel)(({viewModel}) => {

    const [nickname, setNickName] = useState('');
    const [gameId, setGameId] = useState('');
    const [playersCount, setPlayersCount] = useState(4)

    const changeNickname = (event: ChangeEvent<HTMLInputElement>) => {
        setNickName(event.target.value);
    }

    const changeGameId = (event: ChangeEvent<HTMLInputElement>) => {
        setGameId(event.target.value);
    }

    let navigate = useNavigate();

    const redirect = (gameId: string) => {
        navigate(`waiting-room/${gameId}`);
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
                onClick={() => {
                    let gameId = viewModel.createGame(nickname);
                    gameId.then(
                        gameId => {
                            redirect(gameId);
                        }
                    )
                }}
            />
            <EnterGamePanel
                onChange={changeGameId}
                onClick={() => {
                    let isValid = viewModel.enterGame(nickname, gameId);
                    isValid.then(
                        result => {
                            if (result){
                                redirect(gameId);
                            }
                        }
                    )
                }}/>
        </CenterDiv>
    </>;
})

export default HomeView;