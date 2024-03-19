import {ViewModel} from "@yoskutik/react-vvm";
import {makeObservable, observable, runInAction} from "mobx";
import {GamePageRepository} from "../repositories/GamePageRepository";
import {GameId} from "../models/GameId";
import GamePageAPI from "../API/GamePageAPI";
import {GameEventsHolder} from "../models/GameEventsHolder";
import {IMessage} from "@stomp/stompjs";
import {GameEntity} from "../models/GameEntity";
import {MotionResponse} from "../models/MotionResponse";
import {GameEvent} from "../models/GameEvent";
import {OnCardPlay} from "../models/OnCardPlay";
import {PlayingCard} from "../models/PlayingCard";
import PlayerDeath from "../models/PlayerDeath";
import {MatchEnd} from "../models/MatchEnd";

export class DescriptionShowingProps {
    constructor(needToShow: boolean, card: PlayingCard){
        this.needToShow = needToShow
        this.card = card
    }

    needToShow: boolean
    card: PlayingCard
}

class GameViewModel extends ViewModel {
    private gameId = ''
    private nickname = ''
    private matchEndInfo: MatchEnd | undefined

    @observable gameEntity: undefined | GameEntity
    @observable gameIdEntity: undefined | GameId
    @observable cards: PlayingCard[] = []
    @observable isDead: boolean = false
    @observable isEnded: boolean = false
    @observable descriptionCardShowing: DescriptionShowingProps | undefined

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

    public getMathEndInfo = () => {
        return this.matchEndInfo
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

    public getPlayerNicknameByIndex = (index: number) => {
        return this.gameIdEntity!.players[index].nickname
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

    public showCardDescription = (card: PlayingCard) => {
        this.descriptionCardShowing = new DescriptionShowingProps(true, card)
    }

    public closeCardDescription = () => {
        this.descriptionCardShowing = undefined
    }

    private onMotion = async (message: IMessage) => {
        let motionPlayer: MotionResponse = JSON.parse(message.body)
        await this.updateGameInfo()
    }

    private onKeepCard = async (message: IMessage) => {
        await this.updateGameInfo()
    }

    private onMatchEnd = (message: IMessage) => {
        let matchEndInfo: MatchEnd = JSON.parse(message.body)
        let player = this.gameEntity!.players[matchEndInfo.winnerIndex]
        localStorage.setItem('winnerRole', player.role)
        localStorage.setItem('winnerNickname', this.getPlayerNicknameByIndex(matchEndInfo.winnerIndex))
        this.isEnded = true
    }

    private onCardPlay = async (message: IMessage) => {
        let cardPlay: OnCardPlay = JSON.parse(message.body)
        await this.updateGameInfo()
        //this.gameEntity!.players[cardPlay.playerIndex].cards.splice(cardPlay.cardIndex, 1)
    }

    private onPlayerDeath = (message: IMessage) => {
        let playerDeath: PlayerDeath = JSON.parse(message.body)

        let nickname = this.getPlayerNicknameByIndex(playerDeath.playerIndex)
        if (nickname == this.nickname){
            this.isDead = true
        } else {
            this.gameEntity!.players.splice(playerDeath.playerIndex, 1)
        }
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