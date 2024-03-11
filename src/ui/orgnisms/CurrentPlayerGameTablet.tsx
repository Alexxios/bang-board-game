import React from 'react';
import {PlayerProps} from "./interfaces/PlayersProps";
import {Panel} from "./styles/PanelDiv";
import {CardInHands} from "../moleculas/CardInHands";
import {DragProps} from "./interfaces/DragProps";
import {CenterDiv} from "../../views/HomeView";
import {WeaponCard} from "../moleculas/WeaponCard";
import {CharacterCard} from "../moleculas/CharacterCard";

export const CurrentPlayerGameTablet = ({props, dragProps}: { props: PlayerProps, dragProps: DragProps }) => {

    let healthImages = []
    for (let i = 0; i < props.health; ++i){
        healthImages.push(<p>*</p>)
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
                <CharacterCard character={props.character}/>
            </div>


            <CenterDiv>
                {props.cards.map((card, index) => {
                    return <CardInHands isDraggable={props.isDoingMotion} cardType={card} onDragStart={dragProps.onCardDragStart}
                                        index={index}/>
                })}
            </CenterDiv>

        </CenterDiv>


    </Panel>
}