import { Character } from "../enums/Character";
import { PlayingCardName } from "../enums/PlayingCardsName";

export class CharacterNaming {

    private dictionary = new Map<Character, string>([
        [Character.BartCassidy, 'Барт Кассиди'],
        [Character.BlackJack, 'Чертный Джек'],
        [Character.CalamityJanet, 'Бедная Джаннет'],
        [Character.ElGringo, 'Эль Гринго'],
        [Character.JesseJames, 'Джесси Джеймс'],
        [Character.Jourdonnais, 'Журдонне'],
        [Character.KitCarlson, 'Кит Карлсон'],
        [Character.LuckyDuke, 'Везучий Дюк'],
        [Character.PaulRegrez, 'Пол Регрез'],
        [Character.PedroRemirez, 'Педро Рамирес'],
        [Character.RoseDoolan, 'Роза Дулан'],
        [Character.SidKetchum, 'Сид Кетчум'],
        [Character.SlabTheKiller, 'Слеб убийца'],
        [Character.SuzyLafayette, 'Сьюзи Лафайет'],
        [Character.VultureSam, 'Стервятник Сэм'],
        [Character.WillyTheKid, 'Малшы Билли'],
    ])

    public getName = (character: Character) => {
        return this.dictionary.get(character)
    }
}