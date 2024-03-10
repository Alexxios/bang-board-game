import {ViewModel} from "@yoskutik/react-vvm";
import {makeObservable, observable} from "mobx";
import {HomePageRepository} from "../repositories/HomePageRepository";
import {injectable} from "tsyringe";
import HomePageAPI from "../API/HomePageAPI";

@injectable()
class HomePageViewModel extends ViewModel {
    private readonly maxPlayersCount = 7
    private readonly minPlayersCount = 4

    @observable currentPlayersCount: number

    constructor(private app: HomePageRepository) {
        super()
        makeObservable(this)
        this.app = new HomePageRepository(new HomePageAPI())
        this.currentPlayersCount = 4
    }

    createGame = async (nickname: string) => {
        let gameId = ''
        await this.checkUserNickname(nickname).then(
            async result => {
                if (result){
                    localStorage.setItem('nickname', nickname)
                    await this.app.createGame(nickname).then(
                        data => {
                            gameId = data.data
                            localStorage.setItem('gameId', gameId)
                        }
                    )
                }
            }
        )

        return gameId
    }

    enterGame = async (nickname: string, gameId: string) => {
        let isValid = false
        await this.checkUserNickname(nickname).then(
            async result => {
                if (result){
                    localStorage.setItem('nickname', nickname)
                    await this.app.enterGame(nickname, gameId).then(
                        data => {
                            isValid = data
                            localStorage.setItem('gameId', gameId)
                        }
                    )
                }
            }
        )

        return isValid
    }

    incrementPlayersCount = () => {
        if (this.currentPlayersCount == this.maxPlayersCount){
            this.currentPlayersCount = this.minPlayersCount
        }else{
            this.currentPlayersCount++
        }
    }

    decrementPlayersCount = () => {
        if (this.currentPlayersCount == this.minPlayersCount){
            this.currentPlayersCount = this.maxPlayersCount
        }else{
            this.currentPlayersCount--
        }
    }

    private checkUserNickname = async (nickname: string) => {
        if (nickname.length < 3){
            return false
        }

        let result = false;
        await this.app.checkNickname(nickname).then(
            data => {
                console.log(data)
                result = data
            }
        )

        return result
    }
}

export default HomePageViewModel