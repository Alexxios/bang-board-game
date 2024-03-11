import {PlayingCard} from "../enums/PlayingCards";
import {Player} from "./Player";
import {Callback} from "./Callback";

export interface GameEntity{
    motionPlayerIndex: number,
    players: Player[],
    cards: PlayingCard[],
    callbacks: Callback[],
    gameId: string
}