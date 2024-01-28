import {singleton} from "tsyringe";
import {makeObservable, observable} from "mobx";
import HomePageAPI from "../API/HomePageAPI";
import {NicknameCheckResult} from "../models/NicknameCheckResult";

@singleton()
export class HomePageRepository {
    @observable error = '';

    constructor(private api: HomePageAPI) {
        makeObservable(this);
    }

    checkNickname = async (nickname: string) => {
        const data = await this.api.checkNickname(nickname);

        return data.data.result;
    }

    createGame = async (nickname: string) => {
        const data = await this.api.createGame(nickname);
        return data;
    }

    enterGame = async (nickname: string, gameId: string) => {
        const data = await this.api.enterGame(nickname, gameId);
        return data.data.result;
    }
}