import {EventType} from "./EventType";
import {PlayingCardName} from "./PlayingCardsName";

export interface Event{
    senderNickname: string,
    getterNickname: string,
    eventType: EventType,
    cardName: PlayingCardName | undefined
}