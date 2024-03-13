import {Role} from "../../../enums/Roles";
import {PlayingCard} from "../../../enums/PlayingCards";
import {Character} from "../../../enums/Character";

export interface PlayerProps{
    nickname: string,
    health: number
    role: Role,
    weapon: PlayingCard,
    cards: PlayingCard[],
    character: Character,
    isDoingMotion: boolean,
}