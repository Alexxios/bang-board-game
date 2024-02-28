import React from 'react';
import {PlayerProps} from "./interfaces/PlayersProps";

export const CurrentPlayerGameTablet = ({props} : {props : PlayerProps}) => {
    return <>
        <p>{props.nickname}</p>
        <p>{props.role}</p>
        <p>Weapon {props.weapon}</p>
    </>
}