import {ViewModel} from "@yoskutik/react-vvm";
import {makeObservable, observable, runInAction} from "mobx";
import {GamePageRepository} from "../repositories/GamePageRepository";
import {GameId} from "../models/GameId";
import GamePageAPI from "../API/GamePageAPI";
import {GameEventsHolder} from "../models/GameEventsHolder";
import {IMessage} from "@stomp/stompjs";
import {GameEntity} from "../models/GameEntity";
import {MotionResponse} from "../models/MotionResponse";
import {PlayingCards} from "../enums/PlayingCards";
import {CardReceive} from "../models/CardReceive";

class GameViewModel extends ViewModel {
    private gameId = '';
    private nickname = '';
    @observable gameEntity: undefined|GameEntity;
    @observable gameIdEntity: undefined|GameId;
    @observable cards: PlayingCards[] = [];

    constructor(private app: GamePageRepository) {
        super();
        makeObservable(this);
        this.gameId = localStorage.getItem('gameId')!;
        this.nickname = localStorage.getItem('nickname')!;
        this.app = new GamePageRepository(new GamePageAPI(), this.gameId, this.nickname, this.gameEvents);

        this.app.initGame(this.gameId);

        this.app.getGame(this.gameId).then(
            result => {
                this.gameEntity = result.data;
            }
        );

        this.app.getGameId(this.gameId).then(
            result => {
                this.gameIdEntity = result.data;
            }
        );
    }

    public getNickname = () => {
        return this.nickname;
    }

    public nextMotion = () => {
        this.app.nextMotion(this.gameId);
    }

    private onMotion = (message: IMessage) =>  {
        let motionPlayer: MotionResponse = JSON.parse(message.body);
        if (this.gameEntity){
            this.gameEntity.motionPlayerIndex = motionPlayer.player;
        }

    }

    private onKeepCard = (message: IMessage) =>  {
        console.log(message.body);
        let card: CardReceive = JSON.parse(message.body);
        runInAction(() => {
            this.cards.push(card.card);
        })

    }

    private onMatchEnd = (message: IMessage) =>  {

    }

    private onCardPlay = (message: IMessage) =>  {

    }

    private onPlayerDeath = (message: IMessage) =>  {

    }

    private gameEvents: GameEventsHolder = {
        onNextMotion: this.onMotion,
        onKeepCard: this.onKeepCard,
        onMatchEnd: this.onMatchEnd,
        onCardPlay: this.onCardPlay,
        onPlayerDeath: this.onPlayerDeath,
    }
}

export default GameViewModel