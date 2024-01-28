import {injectable, singleton} from "tsyringe";
import {API} from "./API";
import {NicknameCheckResult} from "../models/NicknameCheckResult";
import {EnterGameResult} from "../models/EnterGameResult";

@injectable()
class HomePageAPI extends API{

    constructor() {
        super();
    }

    checkNickname = (nickname: string) => {
        console.log('send');
        return HomePageAPI.api.get<NicknameCheckResult>(`/check-nickname?nickname=${nickname}`);
    }

    createGame = (nickname: string) => {
        return HomePageAPI.api.post<string>('/create-game', nickname);
    }

    enterGame = (nickname: string, gameId: string) => {
        console.log(nickname, gameId);
        return HomePageAPI.api.get<EnterGameResult>(`/enter-the-game/${nickname}/${gameId}`)
    }
}

export default HomePageAPI;