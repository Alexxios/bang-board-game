import {ViewModel} from "@yoskutik/react-vvm";
import {makeObservable, observable} from "mobx";
import {HomePageRepository} from "../repositories/HomePageRepository";
import {injectable} from "tsyringe";
import HomePageAPI from "../API/HomePageAPI";
import {RoleNaming} from "../naming/RoleNaming";
import {Role} from "../enums/Roles";

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
        let roleNaming = new RoleNaming()
        if (this.role == Role.Sheriff){
            return roleNaming.getName(Role.Sheriff)
        }
        if (this.role == Role.Assistant){
            return roleNaming.getName(Role.Assistant)
        }
        if (this.role == Role.Renegat){
            return roleNaming.getName(Role.Renegat)
        }
        if (this.role == Role.Assistant){
            return roleNaming.getName(Role.Assistant)
        }
        return this.role
    }

}

export default MatchEndViewModel