import React from 'react';
import {PlayerProps} from "./interfaces/PlayersProps";
import {Panel} from "./styles/PanelDiv";
import {CardInHands} from "../moleculas/CardInHands";
import {DragProps} from "./interfaces/DragProps";
import {CenterDiv} from "../../views/HomeView";
import {WeaponCard} from "../moleculas/WeaponCard";
import {CharacterCard} from "../moleculas/CharacterCard";
import BulletImage from "../../assets/bullet.png";

export const CurrentPlayerGameTablet = ({props, dragProps, onCardClick, onCharacterClick}: {
    props: PlayerProps, dragProps: DragProps, onCardClick: Function, onCharacterClick: Function}) => {

    let healthImages = []
    for (let i = 0; i < props.health; ++i){
        healthImages.push(<img src={BulletImage} width={25} style={{marginLeft:-7, marginRight:-7}}/>)
    }

    return <Panel>
        <h1 onDrop={(e) => {
            e.preventDefault();
            dragProps.onPanelDrop(props.nickname);
        }}
        onDragOver={(e) => {
            e.preventDefault();
        }}>{props.nickname}</h1>

        <h2>{props.role}</h2>

        <div style={{display: "flex", justifyContent: "left"}}>
            {healthImages}
        </div>


        <CenterDiv>
            <div style={{marginRight: 50}}>
                <WeaponCard card={props.weapon} canDropOn={true} onDrop={() => { dragProps.onPanelDrop(props.nickname)}}/>
                <CharacterCard character={props.character} onClick={onCharacterClick}/>
            </div>


            <CenterDiv>
                {props.cards.map((card, index) => {
                    return <CardInHands isDraggable={props.isDoingMotion} card={card} onDragStart={dragProps.onCardDragStart}
                                        index={index} onClick={onCardClick}/>
                })}
            </CenterDiv>

        </CenterDiv>


    </Panel>
}