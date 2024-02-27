import React from 'react';
import {Role} from "../../enums/Roles";

interface PlayerProps{
    nickname: string
    role: Role
}

const PlayerPanel = ({nickname, role} : PlayerProps) => {
    return <>
        <p>{nickname}</p>
        <p>{role}</p>
    </>
}

export default PlayerPanel;