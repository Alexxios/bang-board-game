import {singleton} from "tsyringe";
import {makeObservable, observable} from "mobx";
import HomePageAPI from "../API/HomePageAPI";
import {NicknameCheckResult} from "../models/NicknameCheckResult";
import GamePageAPI from "../API/GamePageAPI";

@singleton()
export class GamePageRepository {

    constructor(private api: GamePageAPI) {
        makeObservable(this);
    }

    getGame = (gameId: string) => {
        return this.api.getGame(gameId);
    }

}