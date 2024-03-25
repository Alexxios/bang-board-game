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
        return HomePageAPI.api.get<NicknameCheckResult>(`/check-nickname?nickname=${nickname}`);
    }

    createGame = (nickname: string, playersCount: number) => {
        return HomePageAPI.api.post<string>(`/create-game/${nickname}/${playersCount}`);
    }

    addUser = (nickname: string) => {
        HomePageAPI.api.post(`/add-user/${nickname}`)
    }

    enterGame = (nickname: string, gameId: string) => {
        return HomePageAPI.api.get<EnterGameResult>(`/enter-the-game/${nickname}/${gameId}`)
    }
}

export default HomePageAPI;