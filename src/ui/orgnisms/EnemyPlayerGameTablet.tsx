import React from 'react';
import {PlayerProps} from "./interfaces/PlayersProps";
import {Role} from "../../enums/Roles";
import {Panel} from "./styles/PanelDiv";
import {WeaponCard} from "../moleculas/WeaponCard";
import {CharacterCard} from "../moleculas/CharacterCard";
import {ClosedCard} from "../moleculas/ClosedCard";

export const EnemyPlayerGameTablet = ({props, onDrop}: { props: PlayerProps, onDrop: Function }) => {

    let healthImages = []
    for (let i = 0; i < props.health; ++i) {
        healthImages.push(<p>*</p>)
    }

    let role = 'Unknown';
    if (props.role == Role.Sheriff) {
        role = 'Sheriff';
    }
    return <Panel onDrop={() => {
        onDrop(props.nickname)
    }}
                  onDragOver={(e) => {
                      e.preventDefault();

                  }}>
        <h1>{props.nickname}</h1>
        <h2>{role}</h2>
        <div style={{display: "flex", justifyContent: "left"}}>
            {healthImages}
        </div>

        <div style={{display: "flex", justifyContent: "left"}}>
            <div>
                <WeaponCard card={props.weapon} canDropOn={false} onDrop={() => {
                }}/>
                <CharacterCard character={props.character}/>
            </div>

            {props.cards.map(card => {
                return <ClosedCard/>
            })}
        </div>
    </Panel>
}