import {ViewModel} from "@yoskutik/react-vvm";
import {makeObservable, observable} from "mobx";

class HomePageViewModel extends ViewModel {
    private readonly maxPlayersCount = 7;
    private readonly minPlayersCount = 4;

    @observable currentPlayersCount: number;

    constructor() {
        super();
        makeObservable(this);
        this.currentPlayersCount = 4;
    }

    createGame = (nickname: string) => {

    }

    enterGame = (nickname: string) => {

    }

    incrementPlayersCount = () => {
        if (this.currentPlayersCount == this.maxPlayersCount){
            this.currentPlayersCount = this.minPlayersCount;
        }else{
            this.currentPlayersCount++;
        }
    }

    decrementPlayersCount = () => {
        if (this.currentPlayersCount == this.minPlayersCount){
            this.currentPlayersCount = this.maxPlayersCount;
        }else{
            this.currentPlayersCount--;
        }
    }
}

export default HomePageViewModel