import {Role} from "../enums/Roles";
import {PlayingCard} from "../enums/PlayingCards";
import {Character} from "../enums/Character";

export interface Player{
    role: Role,
    health: number,
    maxHealth: number,
    weapon: PlayingCard,
    distance: number,
    shootDamage: number,
    cards: PlayingCard[],
    character: Character
}