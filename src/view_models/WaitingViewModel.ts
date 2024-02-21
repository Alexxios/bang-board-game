import {ViewModel} from "@yoskutik/react-vvm";
import {makeObservable, observable, runInAction} from "mobx";
import {PlayerId, Status} from "../models/PlayerId";
import {WaitingPageRepository} from "../repositories/WaitingPageRepository";
import WaitingPageAPI from "../API/WaitingPageAPI";
import {CompatClient, IMessage, Stomp} from "@stomp/stompjs";
import {singleton} from "tsyringe";
import {useNavigate} from "react-router-dom";

@singleton()
class WaitingViewModel extends ViewModel {
    @observable players: PlayerId[] = [];
    @observable gameId: string;
    @observable isRaady: boolean;
    private nickname: string;

    constructor(private app: WaitingPageRepository) {
        super();
        makeObservable(this);


        this.gameId = localStorage.getItem('gameId')!;
        this.nickname = localStorage.getItem('nickname')!;
        this.isRaady = false;

        this.app = new WaitingPageRepository(new WaitingPageAPI(), this.gameId, this.nickname, this.onMessage);
    }

    closeConnection = () => {
        this.app.closeConnection();
    }

    private getPlayers = async (gameId: string) => {
        const game = await this.app.getGame(gameId);
        return game.players;
    }

    private onMessage = (message: IMessage) => {
        runInAction(() => {
            this.players = JSON.parse(message.body);
        });


        if (this.players.length >= 2){
            this.isRaady = true;
        }

        if (this.players.every(player => { return player.status == Status.Ready})){
            this.isRaady = true;
        }
    }
}

export default WaitingViewModel