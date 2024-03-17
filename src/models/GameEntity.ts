import {Player} from "./Player";
import {Callback} from "./Callback";
import {PlayingCard} from "./PlayingCard";

export interface GameEntity{
    motionPlayerIndex: number,
    players: Player[],
    cards: PlayingCard[],
    callbacks: Callback[],
    cardsForSelection: PlayingCard[],
    gameId: string
}