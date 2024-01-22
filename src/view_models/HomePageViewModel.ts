import {ViewModel} from "@yoskutik/react-vvm";
import {makeObservable, observable} from "mobx";


class HomePageViewModel extends ViewModel {

    constructor() {
        super();
        makeObservable(this);
    }

    createGame = () => {

    }

    enterGame = () => {
    }
}

export default HomePageViewModel