import {ViewModel} from "@yoskutik/react-vvm";
import {makeObservable, observable, runInAction} from "mobx";
import {PlayerId} from "../models/PlayerId";
import {WaitingPageRepository} from "../repositories/WaitingPageRepository";
import WaitingPageAPI from "../API/WaitingPageAPI";
import SockJS from "sockjs-client";
import {CompatClient, IMessage, Stomp} from "@stomp/stompjs";
import {singleton} from "tsyringe";

@singleton()
class WaitingViewModel extends ViewModel {
    @observable players: PlayerId[] = [];
    @observable gameId: string;
    private nickname: string;

    constructor(private app: WaitingPageRepository) {
        super();
        makeObservable(this);


        this.gameId = localStorage.getItem('gameId')!;
        this.nickname = localStorage.getItem('nickname')!;

        this.app = new WaitingPageRepository(new WaitingPageAPI(), this.gameId, this.nickname, (message: IMessage) => {
            runInAction(
                () => {
                    this.players = JSON.parse(message.body);
                }
            )

        });
    }

    private getPlayers = async (gameId: string) => {
        const game = await this.app.getGame(gameId);
        return game.usersNicknames;
    }

}

export default WaitingViewModel