import {CardDescription} from "./CardDescription";

export interface GameEvent{
    senderIndex: number,
    getterIndex: number,
    cardDescription: CardDescription
    cardIndex: number
}