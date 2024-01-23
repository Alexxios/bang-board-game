import {ViewModel} from "@yoskutik/react-vvm";
import {makeObservable, observable} from "mobx";

class WaitingViewModel extends ViewModel {

    constructor() {
        super();
        makeObservable(this);
    }

}

export default WaitingViewModel