import {ViewModel} from "@yoskutik/react-vvm";
import {makeObservable, observable, runInAction} from "mobx";
import {PlayerId, Status} from "../models/PlayerId";
import {WaitingPageRepository} from "../repositories/WaitingPageRepository";
import WaitingPageAPI from "../API/WaitingPageAPI";
import {CompatClient, IMessage, Stomp} from "@stomp/stompjs";
import {singleton} from "tsyringe";
import {useNavigate} from "react-router-dom";
import {GameId} from "../models/GameId";

@singleton()
class WaitingViewModel extends ViewModel {
    @observable players: PlayerId[] = []
    @observable gameId: string
    @observable isRaady: boolean
    private nickname: string

    constructor(private app: WaitingPageRepository) {
        super()
        makeObservable(this)
        this.gameId = localStorage.getItem('gameId')!
        this.nickname = localStorage.getItem('nickname')!
        this.app = new WaitingPageRepository(new WaitingPageAPI(), this.gameId, this.nickname, this.onMessage)
        this.isRaady = false
    }

    closeConnection = () => {
        this.app.closeConnection()
    }

    private onMessage = async (message: IMessage) => {
        runInAction(() => {
            this.players = JSON.parse(message.body)
        })


        await this.app.getGame(this.gameId).then(
            response => {
                if (this.players.length == response.maxPlayersCount){ // КОСТЫЛЬ!!! УБРАТЬ!!!
                    this.isRaady = true
                }

                if (this.players.every(player => { return player.status == Status.Ready})){
                    this.isRaady = true
                }
            }
        )
    }
}

export default WaitingViewModel