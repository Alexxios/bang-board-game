import React from 'react';
import {PlayerProps} from "../orgnisms/interfaces/PlayersProps";
import {PlayingCards} from "../../enums/PlayingCards";
import {Panel} from "../orgnisms/styles/PanelDiv";
import {Card} from "./Card";
import {DragProps} from "../orgnisms/interfaces/DragProps";

export const CurrentPlayerGameTablet = ({props, dragProps}: { props: PlayerProps, dragProps: DragProps }) => {
    return <Panel onDrop={(e) => {e.preventDefault(); dragProps.onPanelDrop();}}>
        <h1>{props.nickname}</h1>
        <h2>{props.role}</h2>
        <h2>Weapon {props.weapon}</h2>
        <div>
            <h2>Cards:</h2>
            {props.cards.map(card => {
                return <Card cardType={card} onDragStart={dragProps.onCardDragStart}/>
            })}
        </div>
    </Panel>
}