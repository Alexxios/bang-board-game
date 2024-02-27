import {PlayingCards} from "../enums/PlayingCards";
import {Player} from "./Player";

export interface GameEntity{
    motionPlayerIndex: number,
    players: Player[],
    cards: PlayingCards[],
}