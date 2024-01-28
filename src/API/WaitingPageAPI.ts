import {injectable} from "tsyringe";
import {API} from "./API";
import {GameId} from "../models/GameId";

@injectable()
class WaitingPageAPI extends API{

    constructor() {
        super();
    }

    getGame = (gameId: string) => {
        return WaitingPageAPI.api.get<GameId>(`/get-game?gameId=${gameId}`);
    }
}

export default WaitingPageAPI;