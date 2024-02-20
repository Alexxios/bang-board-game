import {injectable, singleton} from "tsyringe";
import {API} from "./API";
import {NicknameCheckResult} from "../models/NicknameCheckResult";
import {EnterGameResult} from "../models/EnterGameResult";
import {GameId} from "../models/GameId";

@injectable()
class GamePageAPI extends API{

    constructor() {
        super();
    }

    getGame = (gameId: string) => {
        return GamePageAPI.api.get<GameId>(`/get-game?gameId=${gameId}`);
    }

}

export default GamePageAPI;