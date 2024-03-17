import React, {useState} from 'react'
import {CenterDiv} from "./HomeView";
import {view} from "@yoskutik/react-vvm";
import MatchEndViewModel from "../view_models/MatchEndViewModel";
import {Navigate} from "react-router-dom";

const MathEndView = view(MatchEndViewModel)(({viewModel}) => {

    const [goToMainPage, setGoToMainPage] = useState(false)

    if (goToMainPage){
        return <Navigate to={'/'}/>
    }

    return <>
        <h1>Game ended</h1>
        <h1>Winner role: {viewModel.getNickname()}</h1>
        <h1>Winner role: {viewModel.getRole()}</h1>
        <button onClick={() => {setGoToMainPage(true)}}>Main page</button>
    </>
})


export default MathEndView