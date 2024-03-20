import React from 'react';
import {PlayerProps} from "./interfaces/PlayersProps";
import {Role} from "../../enums/Roles";
import {Panel} from "./styles/PanelDiv";
import {WeaponCard} from "../moleculas/WeaponCard";
import {CharacterCard} from "../moleculas/CharacterCard";
import BulletImage from "../../assets/bullet.png"

export const EnemyPlayerGameTablet = ({props, onDrop, onCharacterClick}: { props: PlayerProps, onDrop: Function, onCharacterClick: Function }) => {

    let healthImages = []
    for (let i = 0; i < props.health; ++i){
        healthImages.push(<img src={BulletImage} width={25} style={{marginRight:-7, marginLeft:-7}} />)
    }

    let role = 'Unknown';
    if (props.role == Role.Sheriff) {
        role = 'Sheriff';
    }
    return <Panel style={{marginTop:10, marginBottom:10}} onDrop={() => {
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
        <WeaponCard card={props.weapon} canDropOn={false} onDrop={() => {}}/>
        <CharacterCard character={props.character} onClick={onCharacterClick}/>
    </Panel>
}