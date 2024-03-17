import {Role} from "../enums/Roles";
import {Character} from "../enums/Character";
import {PlayingCard} from "./PlayingCard";
import {PlayerBuffs} from "./PlayerBuffs";

export interface Player{
    role: Role,
    health: number,
    maxHealth: number,
    weapon: PlayingCard,
    buffs: PlayerBuffs,
    shootingDistance: number,
    cards: PlayingCard[],
    isDead: boolean,
    character: Character
}