import {ViewModel} from "@yoskutik/react-vvm";
import {makeObservable, observable} from "mobx";

class GameViewModel extends ViewModel {

    constructor() {
        super();
        makeObservable(this);
    }
}

export default GameViewModel