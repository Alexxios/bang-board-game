import {singleton} from "tsyringe";
import {makeObservable, observable} from "mobx";
import HomePageAPI from "../API/HomePageAPI";
import {NicknameCheckResult} from "../models/NicknameCheckResult";
import GamePageAPI from "../API/GamePageAPI";
import {CompatClient, Stomp} from "@stomp/stompjs";
import SockJS from "sockjs-client";
import {GameEventsHolder} from "../models/GameEventsHolder";

@singleton()
export class GamePageRepository {
    private stompClient: CompatClient;

    constructor(private api: GamePageAPI, gameId: string, gameEvents: GameEventsHolder) {
        makeObservable(this);


        this.stompClient = Stomp.over(SockJS("http://localhost:8090/bang"));

        this.stompClient.connect({},
            () => {

                this.stompClient.subscribe(
                    "/games/" + gameId + "/next-motion",
                    (message) => {
                        gameEvents.onNextMotion(message);
                    }
                );

                this.stompClient.subscribe(
                    "/games/" + gameId + "/keep-card",
                    (message) => {
                        gameEvents.onKeepCard(message);
                    }
                );

                this.stompClient.subscribe(
                    "/games/" + gameId + "/card-play",
                    (message) => {
                        gameEvents.onCardPlay(message);
                    }
                );

                this.stompClient.subscribe(
                    "/games/" + gameId + "/player-death",
                    (message) => {
                        gameEvents.onPlayerDeath(message);
                    }
                );

                this.stompClient.subscribe(
                    "/games/" + gameId + "/match-end",
                    (message) => {
                        gameEvents.onMatchEnd(message);
                    }
                );
            });
    }

    getGame = (gameId: string) => {
        return this.api.getGame(gameId);
    }

    getGameId = (gameId: string) => {
        return this.api.getGameId(gameId);
    }

    initGame = (gameId: string) => {
        this.api.initGame(gameId);
    }

}