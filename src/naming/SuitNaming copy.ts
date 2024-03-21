import { Character } from "../enums/Character";
import { PlayingCardName } from "../enums/PlayingCardsName";
import { Suit } from "../enums/Suit";

export class SuitNaming {

    private dictionary = new Map<Suit, string>([
        [Suit.Clubs, 'Крести'],
        [Suit.Diamonds, 'Буби'],
        [Suit.Spades, 'Пики'],
        [Suit.Hearts, 'Черви'],
    ])

    public getName = (suit: Suit) => {
        return this.dictionary.get(suit)
    }
}