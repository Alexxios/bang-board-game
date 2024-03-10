import React from 'react';
import {PlayerProps} from "../orgnisms/interfaces/PlayersProps";
import {PlayingCards} from "../../enums/PlayingCards";
import {Panel} from "../orgnisms/styles/PanelDiv";
import {CardInHands} from "./CardInHands";
import {DragProps} from "../orgnisms/interfaces/DragProps";
import {CenterDiv} from "../../views/HomeView";
import {WeaponCard} from "./WeaponCard";

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
            <WeaponCard card={props.weapon} canDropOn={true} onDrop={() => { dragProps.onPanelDrop(props.nickname)}}/>
            <CenterDiv>
                {props.cards.map((card, index) => {
                    return <CardInHands isDraggable={props.isDoingMotion} cardType={card} onDragStart={dragProps.onCardDragStart}
                                        index={index}/>
                })}
            </CenterDiv>

        </CenterDiv>


    </Panel>
}