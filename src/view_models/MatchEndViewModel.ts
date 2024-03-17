import {ViewModel} from "@yoskutik/react-vvm";
import {makeObservable, observable} from "mobx";
import {HomePageRepository} from "../repositories/HomePageRepository";
import {injectable} from "tsyringe";
import HomePageAPI from "../API/HomePageAPI";

@injectable()
class MatchEndViewModel extends ViewModel {
    private nickname = ''
    private role = ''


    constructor() {
        super()
        this.nickname = localStorage.getItem('winnerNickname')!
        this.role = localStorage.getItem('winnerRole')!
    }

    public getNickname = () => {
        return this.nickname
    }

    public getRole = () => {
        return this.role
    }

}

export default MatchEndViewModel