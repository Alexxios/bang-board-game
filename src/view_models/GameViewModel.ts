import {ViewModel} from "@yoskutik/react-vvm";
import {makeObservable, observable} from "mobx";

class GameViewModel extends ViewModel {

    constructor() {
        super();
        makeObservable(this);
    }

    startGame = () => {
        // stable web socket connection
    }

    endGame = () => {
        // unstable web socket connection
    }
}

export default GameViewModel