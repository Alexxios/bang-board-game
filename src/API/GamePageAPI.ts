import {injectable, singleton} from "tsyringe";
import {API} from "./API";
import {NicknameCheckResult} from "../models/NicknameCheckResult";
import {EnterGameResult} from "../models/EnterGameResult";
import {GameId} from "../models/GameId";
import {GamePageRepository} from "../repositories/GamePageRepository";
import {GameEntity} from "../models/GameEntity";
import {GameEvent} from "../models/GameEvent";
import {EventHandlingResult} from "../models/EventHandlingResult";

@injectable()
class GamePageAPI extends API{

    constructor() {
        super();
    }

    getGame = (gameId: string) => {
        return GamePageAPI.api.get<GameEntity>(`/get-game?gameId=${gameId}`);
    }

    getGameId = (gameId: string) => {
        return GamePageAPI.api.get<GameId>(`/get-gameId?gameId=${gameId}`);
    }

    initGame = async (gameId: string) => {
        await GamePageAPI.api.post(`/init-game`, gameId);
    }

    nextMotion = (gameId: string) => {
        GamePageAPI.api.post(`/next-motion`, gameId);
    }

    sendEvent = (gameId: string, event: GameEvent) => {
        return GamePageAPI.api.post<EventHandlingResult>(`/handle-event?gameId=${gameId}`, event)
    }

}

export default GamePageAPI;