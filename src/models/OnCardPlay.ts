import {PlayingCardName} from "../enums/PlayingCardsName";

export interface OnCardPlay{
    senderIndex: number,
    getterIndex: number,
    cardName: PlayingCardName,
    cardIndex: number
}