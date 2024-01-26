import {ViewModel} from "@yoskutik/react-vvm";
import {makeObservable, observable} from "mobx";
import {PlayerId} from "../models/PlayerId";

class WaitingViewModel extends ViewModel {
    @observable players: PlayerId[];

    constructor() {
        super();
        makeObservable(this);
        this.players = [{nickname: "andrey"}, {nickname: "lexa"}];
    }

    getPlayers = () => {
        // get players array
        // check count of players
        // if count is enough then redirect to game
    }
}

export default WaitingViewModel