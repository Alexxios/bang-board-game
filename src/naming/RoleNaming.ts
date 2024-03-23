import { PlayingCardName } from "../enums/PlayingCardsName";
import { Role } from "../enums/Roles";

export class RoleNaming {

    private dictionary = new Map<Role, string>([
        [Role.Assistant, 'Ассистент'],
        [Role.Bandit, 'Бандит'],
        [Role.Sheriff, 'Шериф'],
        [Role.Renegat, 'Ренегат'],
    ])

    public getName = (role: Role) => {
        return this.dictionary.get(role)
    }
}