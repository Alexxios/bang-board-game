import {Role} from "../../../enums/Roles";
import {Character} from "../../../enums/Character";
import {PlayingCard} from "../../../models/PlayingCard";

export interface PlayerProps{
    nickname: string,
    health: number
    role: Role,
    weapon: PlayingCard,
    cards: PlayingCard[],
    character: Character,
    isDoingMotion: boolean,
}