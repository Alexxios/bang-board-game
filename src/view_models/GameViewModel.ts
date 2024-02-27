import {ViewModel} from "@yoskutik/react-vvm";
import {makeObservable, observable} from "mobx";
import {WaitingPageRepository} from "../repositories/WaitingPageRepository";
import {GamePageRepository} from "../repositories/GamePageRepository";
import {PlayerId} from "../models/PlayerId";
import {GameId} from "../models/GameId";
import GamePageAPI from "../API/GamePageAPI";
import {GameEventsHolder} from "../models/GameEventsHolder";
import {IMessage} from "@stomp/stompjs";
import {GameEntity} from "../models/GameEntity";

class GameViewModel extends ViewModel {
    private gameId = '';
    @observable gameEntity: undefined|GameEntity;
    @observable gameIdEntity: undefined|GameId;

    constructor(private app: GamePageRepository) {
        super();
        makeObservable(this);
        this.gameId = localStorage.getItem('gameId')!;
        this.app = new GamePageRepository(new GamePageAPI(), this.gameId, this.gameEvents);

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

    private onMotion = (message: IMessage) =>  {

    }

    private onKeepCard = (message: IMessage) =>  {

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