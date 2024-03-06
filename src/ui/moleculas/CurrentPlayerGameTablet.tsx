import React from 'react';
import {PlayerProps} from "../orgnisms/interfaces/PlayersProps";
import {PlayingCards} from "../../enums/PlayingCards";
import {Panel} from "../orgnisms/styles/PanelDiv";
import {Card} from "./Card";
import {DragProps} from "../orgnisms/interfaces/DragProps";

export const CurrentPlayerGameTablet = ({props, dragProps}: { props: PlayerProps, dragProps: DragProps }) => {
    return <Panel>
        <h1 onDrop={(e) => {
            e.preventDefault();
            dragProps.onPanelDrop(props.nickname);
        }}
        onDragOver={(e) => {
            e.preventDefault();
        }}>{props.nickname}</h1>

        <h2>{props.role}</h2>

        <h2>Health {props.health}</h2>

        <h2 onDrop={(e) => {
            e.preventDefault();
            dragProps.onPanelDrop(props.nickname);
        }}
        onDragOver={(e) => {
            e.preventDefault();
        }}>Weapon {props.weapon}</h2>

        <div>
            <h2>Cards:</h2>
            {props.cards.map((card, index) => {
                return <Card isDraggable={props.isDoingMotion} cardType={card} onDragStart={dragProps.onCardDragStart}
                             index={index}/>
            })}
        </div>
    </Panel>
}