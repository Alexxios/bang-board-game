import {ViewModel} from "@yoskutik/react-vvm";
import {makeObservable, observable} from "mobx";
import {HomePageRepository} from "../repositories/HomePageRepository";

class HomePageViewModel extends ViewModel {
    private readonly maxPlayersCount = 7;
    private readonly minPlayersCount = 4;

    @observable currentPlayersCount: number;

    constructor(private app: HomePageRepository) {
        super();
        makeObservable(this);
        this.currentPlayersCount = 4;
    }

    createGame = (nickname: string) => {
        if (this.checkUserNickname(nickname)){

        }
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

    checkUserNickname = (nickname: string) => {
        if (nickname.length < 3){
            return false;
        }

        let result = false;
        this.app.checkNickname(nickname).then(
            data => {
                result = data;
            }
        )

        return result;
    }
}

export default HomePageViewModel