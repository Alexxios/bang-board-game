import {singleton} from "tsyringe";
import {makeObservable, observable} from "mobx";
import HomePageAPI from "../API/HomePageAPI";
import {NicknameCheckResult} from "../models/NicknameCheckResult";
import WaitingPageAPI from "../API/WaitingPageAPI";
import {CompatClient, Stomp} from "@stomp/stompjs";
import SockJS from "sockjs-client";

interface ConnectionMessage {
    gameId: string,
    nickname: string
}

@singleton()
export class WaitingPageRepository {
    private stompClient: CompatClient;

    constructor(private api: WaitingPageAPI, gameId: string, nickname: string, onMessage: Function) {
        makeObservable(this);


        this.stompClient = Stomp.over(SockJS("http://localhost:8090/bang"));

        this.stompClient.connect({},
            () => {

                this.stompClient.subscribe(
                    "/games/" + gameId + "/connected-users",
                    (message) => {
                        onMessage(message);
                    }
                );

                let message: ConnectionMessage = {gameId: gameId, nickname: nickname};

                this.stompClient.send('/app/game-connection', {},  JSON.stringify(message));
            });
    }

    getGame = async (gameId: string) => {
        const data = await this.api.getGame(gameId);

        return data.data;
    }
}