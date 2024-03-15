import {PlayingCardName} from "../enums/PlayingCardsName";
import {Suit} from "../enums/Suit";

export interface PlayingCard{
    cardName: PlayingCardName,
    suit: Suit,
    number: number
}