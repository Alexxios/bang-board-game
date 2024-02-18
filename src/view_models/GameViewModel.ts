import {ViewModel} from "@yoskutik/react-vvm";
import {makeObservable, observable} from "mobx";
import {WaitingPageRepository} from "../repositories/WaitingPageRepository";
import {GamePageRepository} from "../repositories/GamePageRepository";

class GameViewModel extends ViewModel {
    private gameId = '';

    constructor(private app: GamePageRepository) {
        super();
        makeObservable(this);
        this.gameId = localStorage.getItem('gameId')!;
    }

}

export default GameViewModel