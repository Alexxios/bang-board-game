import {PlayingCards} from "../enums/PlayingCards";
import {Player} from "./Player";
import {Callback} from "./Callback";

export interface GameEntity{
    motionPlayerIndex: number,
    players: Player[],
    cards: PlayingCards[],
    callbacks: Callback[],
    gameId: string
}