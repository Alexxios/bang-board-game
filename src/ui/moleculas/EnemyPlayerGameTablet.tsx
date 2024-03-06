import React from 'react';
import {PlayerProps} from "../orgnisms/interfaces/PlayersProps";
import {Role} from "../../enums/Roles";
import {Panel} from "../orgnisms/styles/PanelDiv";

export const EnemyPlayerGameTablet = ({props, onDrop}: { props: PlayerProps, onDrop: Function }) => {
    let role = 'Hidden';
    if (props.role == Role.Sheriff) {
        role = 'Sheriff';
    }
    return <Panel onDrop={() => {
        onDrop(props.nickname)
    }}
                  onDragOver={(e) => {
                      e.preventDefault();
                  }}>
        <p>{props.nickname}</p>
        <p>{role}</p>
        <p>Health {props.health}</p>
        <p>Weapon {props.weapon}</p>
    </Panel>
}