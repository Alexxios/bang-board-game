import {injectable, singleton} from "tsyringe";
import {API} from "./API";
import {NicknameCheckResult} from "../models/NicknameCheckResult";
import {EnterGameResult} from "../models/EnterGameResult";

@injectable()
class GamePageAPI extends API{

    constructor() {
        super();
    }

    checkNickname = (nickname: string) => {
        console.log('send');
        return GamePageAPI.api.get<NicknameCheckResult>(`/check-nickname?nickname=${nickname}`);
    }

    createGame = (nickname: string) => {
        return GamePageAPI.api.post<string>('/create-game', nickname);
    }

    enterGame = (nickname: string, gameId: string) => {
        console.log(nickname, gameId);
        return GamePageAPI.api.get<EnterGameResult>(`/enter-the-game/${nickname}/${gameId}`)
    }
}

export default GamePageAPI;