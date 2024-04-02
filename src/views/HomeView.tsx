import CreateGamePanel from "../ui/orgnisms/CreateGamePanel";
import EnterGamePanel from "../ui/orgnisms/EnterGamePanel";
import React, {ChangeEvent, ChangeEventHandler, MouseEventHandler, useState} from "react";
import styled from "styled-components";
import {view} from "@yoskutik/react-vvm";
import HomePageViewModel from "../view_models/HomePageViewModel";
import {Navigate, useNavigate} from "react-router-dom";

import styles from "../styles.module.css";

export const CenterDiv = styled.div`
    display: flex;
    justify-content: center
`

const HomeView = view(HomePageViewModel)(({viewModel}) => {
    const [isNeedNavigation, setIsNeedNavigation] = useState(false)
    const [nickname, setNickName] = useState('')
    const [gameId, setGameId] = useState('')

    const changeNickname = (event: ChangeEvent<HTMLInputElement>) => {
        setNickName(event.target.value)
    }

    const changeGameId = (event: ChangeEvent<HTMLInputElement>) => {
        setGameId(event.target.value)
    }

    const redirect = (gameId: string) => {
        setIsNeedNavigation(true)
        setGameId(gameId)
    }

    if (isNeedNavigation){
        return <Navigate to={`waiting-room/${gameId}`}/>
    }

    return <>
        <CenterDiv style={{marginTop:90}}>
            <h1 className={styles.h1}>БЭНГ!</h1>
        </CenterDiv>
        <CenterDiv>
            <input className={styles.entry}
                style={{marginBottom: 40, height:40}}
                placeholder={"Введите свой ник"}
                onChange={changeNickname}></input>
        </CenterDiv>

        <CenterDiv>
            {!viewModel.connectionError && <p>Неверный код игры или никнейм не уникален</p>}
        </CenterDiv>

        <CenterDiv>
            <CreateGamePanel
                playersCount={viewModel.currentPlayersCount}
                incrementOnClick={viewModel.incrementPlayersCount}
                decrementOnClick={viewModel.decrementPlayersCount}
                onClick={() => {
                    let gameId = viewModel.createGame(nickname)
                    gameId.then(
                        gameId => {
                            if (gameId !== undefined){
                                redirect(gameId!)
                            }
                        }
                    )
                }}
            />
                <EnterGamePanel
                    onChange={changeGameId}
                    onClick={() => {
                        let isValid = viewModel.enterGame(nickname, gameId)
                        isValid.then(
                            result => {
                                if (!result){
                                    redirect(gameId)
                                }
                            }
                        )
                    }}/>

        </CenterDiv>

    </>
})

export default HomeView