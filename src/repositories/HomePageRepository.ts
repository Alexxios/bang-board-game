import {singleton} from "tsyringe";
import {makeObservable} from "mobx";
import HomePageAPI from "../API/HomePageAPI";
import {NicknameCheckResult} from "../models/NicknameCheckResult";

@singleton()
export class HomePageRepository {

    constructor(private api: HomePageAPI) {
        makeObservable(this);
    }

    checkNickname = async (nickname: string) => {
        const data: NicknameCheckResult = await this.api.checkNickname(nickname);
        return data.result;
    }
}