import React, {useState} from 'react'
import {CenterDiv} from "./HomeView";
import {view} from "@yoskutik/react-vvm";
import MatchEndViewModel from "../view_models/MatchEndViewModel";
import {Navigate} from "react-router-dom";
import { RoleNaming } from '../naming/RoleNaming';
import {Role} from "../enums/Roles";

const MathEndView = view(MatchEndViewModel)(({viewModel}) => {

    const [goToMainPage, setGoToMainPage] = useState(false)

    if (goToMainPage){
        return <Navigate to={'/'}/>
    }

    return <CenterDiv>
        <div style={{display: 'block'}}>
            <h1>Игра окончена</h1>
            <h1>Победитель: {viewModel.getNickname()}</h1>
            <h1>Роль: {viewModel.getRole()}</h1>
            <button onClick={() => {
                setGoToMainPage(true)
            }}>На главную
            </button>
        </div>
    </CenterDiv>
})


export default MathEndView