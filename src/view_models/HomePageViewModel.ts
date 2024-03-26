import {ViewModel} from "@yoskutik/react-vvm";
import {makeObservable, observable} from "mobx";
import {HomePageRepository} from "../repositories/HomePageRepository";
import {injectable} from "tsyringe";
import HomePageAPI from "../API/HomePageAPI";
import {collectStoredAnnotations} from "mobx/dist/api/decorators";

@injectable()
class HomePageViewModel extends ViewModel {
    private readonly maxPlayersCount = 7
    private readonly minPlayersCount = 2

    @observable currentPlayersCount: number
    @observable connectionError: boolean = true

    constructor(private app: HomePageRepository) {
        super()
        makeObservable(this)
        this.app = new HomePageRepository(new HomePageAPI())
        this.currentPlayersCount = 4
    }

    createGame = async (nickname: string) => {
        let gameId: string | undefined = undefined
        await this.checkUserNickname(nickname).then(
            async result => {
                if (!result){
                    localStorage.setItem('nickname', nickname)
                    this.addUser(nickname)
                    await this.app.createGame(nickname, this.currentPlayersCount).then(
                        data => {
                            gameId = data.data
                            localStorage.setItem('gameId', gameId)
                        }
                    )
                }else {
                    this.connectionError = false
                }
            }
        )
        return gameId
    }

    enterGame = async (nickname: string, gameId: string) => {
        this.connectionError = false
        await this.checkUserNickname(nickname).then(
            async result => {
                if (!result){
                    localStorage.setItem('nickname', nickname)
                    this.addUser(nickname)
                    await this.app.enterGame(nickname, gameId).then(
                        data => {
                            this.connectionError = !data
                            localStorage.setItem('gameId', gameId)
                        }
                    )
                }
            }
        )

        return this.connectionError
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
                result = data
            }
        )

        return result
    }

    private addUser = (nickname: string) => {
        this.app.addUser(nickname)
    }
}

export default HomePageViewModel