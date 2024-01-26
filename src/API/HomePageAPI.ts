import {injectable, singleton} from "tsyringe";
import {API} from "./API";
import {NicknameCheckResult} from "../models/NicknameCheckResult";

@injectable()
class HomePageAPI extends API{

    constructor() {
        super();
    }

    checkNickname = (nickname: string) => {
        return HomePageAPI.api.get<NicknameCheckResult>(`/check-nickname?nickname=${nickname}`);
    }
}

export default HomePageAPI;