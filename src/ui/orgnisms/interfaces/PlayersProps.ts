import {Role} from "../../../enums/Roles";
import {PlayingCards} from "../../../enums/PlayingCards";

export interface PlayerProps{
    nickname: string,
    health: number
    role: Role,
    weapon: PlayingCards,
    cards: PlayingCards[],
    isDoingMotion: boolean,
}