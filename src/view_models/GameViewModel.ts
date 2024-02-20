import {ViewModel} from "@yoskutik/react-vvm";
import {makeObservable, observable} from "mobx";
import {WaitingPageRepository} from "../repositories/WaitingPageRepository";
import {GamePageRepository} from "../repositories/GamePageRepository";
import {PlayerId} from "../models/PlayerId";
import {GameId} from "../models/GameId";

class GameViewModel extends ViewModel {
    private gameId = '';
    @observable gameIdEntity: undefined|GameId;

    constructor(private app: GamePageRepository) {
        super();
        makeObservable(this);
        this.gameId = localStorage.getItem('gameId')!;

        this.app.getGame(this.gameId).then(
            result => {
                this.gameIdEntity = result.data;
            }
        );
    }

}

export default GameViewModel