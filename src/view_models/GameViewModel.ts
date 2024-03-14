import {ViewModel} from "@yoskutik/react-vvm";
import {makeObservable, observable, runInAction} from "mobx";
import {GamePageRepository} from "../repositories/GamePageRepository";
import {GameId} from "../models/GameId";
import GamePageAPI from "../API/GamePageAPI";
import {GameEventsHolder} from "../models/GameEventsHolder";
import {IMessage} from "@stomp/stompjs";
import {GameEntity} from "../models/GameEntity";
import {MotionResponse} from "../models/MotionResponse";
import {PlayingCard} from "../enums/PlayingCards";
import {CardReceive} from "../models/CardReceive";
import {GameEvent} from "../models/GameEvent";
import {OnCardPlay} from "../models/OnCardPlay";

class GameViewModel extends ViewModel {
    private gameId = ''
    private nickname = ''
    @observable gameEntity: undefined | GameEntity
    @observable gameIdEntity: undefined | GameId
    @observable cards: PlayingCard[] = []

    constructor(private app: GamePageRepository) {
        super()
        makeObservable(this)
        this.gameId = localStorage.getItem('gameId')!
        this.nickname = localStorage.getItem('nickname')!
        this.app = new GamePageRepository(new GamePageAPI(), this.gameId, this.nickname, this.gameEvents)

        this.app.initGame(this.gameId).then(
            () => {this.updateGameInfo()}
        )

    }

    public getNickname = () => {
        return this.nickname
    }

    public nextMotion = () => {
        this.app.nextMotion(this.gameId)
    }

    public sendEvent = async (event: GameEvent) => {
        await this.app.sendEvent(this.gameId, event)
    }

    public getPlayerIndexByNickname = (nickname: string) => {
        for (let i = 0; i < this.gameIdEntity!.players.length; ++i) {
            if (this.gameIdEntity!.players[i].nickname === nickname) {
                return i
            }
        }
    }

    public getCardByIndex = (cardIndex: number) => {
        let playerIndex = this.getPlayerIndexByNickname(this.nickname)!;
        return this.gameEntity!.players[playerIndex].cards[cardIndex];
    }

    public onSelectCard = (index: number) => {
        let event: GameEvent = {
            senderIndex: this.getPlayerIndexByNickname(this.nickname)!,
            getterIndex: this.getPlayerIndexByNickname(this.nickname)!,
            cardDescription: {
                card: this.gameEntity!.cardsForSelection[index]
            },
            cardIndex: index
        }
        this.sendEvent(event)
    }


    private onMotion = async (message: IMessage) => {
        let motionPlayer: MotionResponse = JSON.parse(message.body)
        await this.updateGameInfo()
    }

    private onKeepCard = async (message: IMessage) => {
        let cardReceive: CardReceive = JSON.parse(message.body);
        await this.updateGameInfo()
    }

    private onMatchEnd = (message: IMessage) => {

    }

    private onCardPlay = async (message: IMessage) => {
        let cardPlay: OnCardPlay = JSON.parse(message.body)
        await this.updateGameInfo()
        //this.gameEntity!.players[cardPlay.playerIndex].cards.splice(cardPlay.cardIndex, 1)
    }

    private onPlayerDeath = (message: IMessage) => {

    }

    private updateGameInfo = async () => {
        await this.app.getGame(this.gameId).then(
            result => {
                this.gameEntity = result.data
            }
        )

        await this.app.getGameId(this.gameId).then(
            result => {
                this.gameIdEntity = result.data
            }
        )
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