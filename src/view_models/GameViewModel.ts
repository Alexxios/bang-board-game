import {ViewModel} from "@yoskutik/react-vvm";
import {makeObservable, observable} from "mobx";
import {GamePageRepository} from "../repositories/GamePageRepository";
import {GameId} from "../models/GameId";
import GamePageAPI from "../API/GamePageAPI";
import {GameEventsHolder} from "../models/GameEventsHolder";
import {IMessage} from "@stomp/stompjs";
import {GameEntity} from "../models/GameEntity";
import {GameEvent} from "../models/GameEvent";
import {OnCardPlay} from "../models/OnCardPlay";
import {PlayingCard} from "../models/PlayingCard";
import PlayerDeath from "../models/PlayerDeath";
import {MatchEnd} from "../models/MatchEnd";
import {Event} from "../enums/Event";
import {Character} from "../enums/Character";
import {EventType} from "../enums/EventType";

export class CardDescriptionShowingProps {
    constructor(needToShow: boolean, card: PlayingCard) {
        this.needToShow = needToShow
        this.card = card
    }

    needToShow: boolean
    card: PlayingCard
}

export class CharacterDescriptionShowingProps {
    constructor(needToShow: boolean, character: Character) {
        this.needToShow = needToShow
        this.character = character
    }

    needToShow: boolean
    character: Character
}


class GameViewModel extends ViewModel {
    private gameId = ''
    private nickname = ''
    private matchEndInfo: MatchEnd | undefined

    @observable gameEntity: undefined | GameEntity
    @observable gameIdEntity: undefined | GameId
    @observable events: Event[] = []
    @observable cards: PlayingCard[] = []
    @observable isDead: boolean = false
    @observable isEnded: boolean = false
    @observable cardDescriptionShowing: CardDescriptionShowingProps | undefined
    @observable characterDescriptionShowing: CharacterDescriptionShowingProps | undefined

    constructor(private app: GamePageRepository) {
        super()
        makeObservable(this)
        this.gameId = localStorage.getItem('gameId')!
        this.nickname = localStorage.getItem('nickname')!
        this.app = new GamePageRepository(new GamePageAPI(), this.gameId, this.nickname, this.gameEvents)

        this.app.initGame(this.gameId).then(
            () => {
                this.updateGameInfo()
            }
        )

    }

    public getNickname = () => {
        return this.nickname
    }

    public getMathEndInfo = () => {
        return this.matchEndInfo
    }

    public nextMotion = async () => {
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

    public showCardDescription = (card: PlayingCard) => {
        this.cardDescriptionShowing = new CardDescriptionShowingProps(true, card)
    }

    public closeCardDescription = () => {
        this.cardDescriptionShowing = undefined
    }

    public showCharacterDescription = (character: Character) => {
        this.characterDescriptionShowing = new CharacterDescriptionShowingProps(true, character)
    }

    public closeCharacterDescription = () => {
        this.characterDescriptionShowing = undefined
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
        await this.updateGameInfo()
        let playerNickname = this.getPlayerNicknameByIndex(this.gameEntity!.motionPlayerIndex)
        this.events.push({
            eventType: EventType.NextMotion,
            senderNickname: '',
            getterNickname: playerNickname,
            cardName: undefined
        })
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
        await this.updateGameInfo()
        let cardPlay: OnCardPlay = JSON.parse(message.body)
        let getterNickname = this.getPlayerNicknameByIndex(cardPlay.getterIndex)
        let senderNickname = this.getPlayerNicknameByIndex(cardPlay.senderIndex)

        this.events.push({
            eventType: EventType.CardPlay,
            getterNickname: getterNickname,
            senderNickname: senderNickname,
            cardName: cardPlay.cardName
        })
    }

    private onPlayerDeath = (message: IMessage) => {
        let playerDeath: PlayerDeath = JSON.parse(message.body)

        let nickname = this.getPlayerNicknameByIndex(playerDeath.playerIndex)
        if (nickname == this.nickname) {
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