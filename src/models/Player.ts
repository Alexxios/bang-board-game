import {Role} from "../enums/Roles";
import {Character} from "../enums/Character";
import {PlayingCard} from "./PlayingCard";

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