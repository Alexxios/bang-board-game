import React from 'react';
import {PlayerProps} from "./interfaces/PlayersProps";
import {Role} from "../../enums/Roles";

export const EnemyPlayerGameTablet = ({props} : {props : PlayerProps}) => {
    let role = 'Hidden';
    if (props.role == Role.Sheriff){
        role = 'Sheriff';
    }
    return <div style={{display: "inline-block"}}>
        <p>{props.nickname}</p>
        <p>{role}</p>
        <p>Weapon {props.weapon}</p>
    </div>
}