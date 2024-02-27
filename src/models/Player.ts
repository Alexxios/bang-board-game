import {Role} from "../enums/Roles";
import {PlayingCards} from "../enums/PlayingCards";

export interface Player{
    role: Role,
    health: number,
    naxHealth: number,
    distance: number,
    shootDamage: number,
    cards: PlayingCards[]
}