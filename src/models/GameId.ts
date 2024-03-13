import {PlayerId} from "./PlayerId";

export enum GameStatus {
    WaitingPlayers,
    Playing,
    Ended
}

export interface GameId{
    owner: string,
    gameId: string,
    maxPlayersCount: number,
    gameStatus: GameStatus,
    players: PlayerId[]
}