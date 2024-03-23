import { PlayingCardName } from "../enums/PlayingCardsName";

export class CardNaming {

    private dictionary = new Map<PlayingCardName, string>([
        [PlayingCardName.Aim, 'Прицел'],
        [PlayingCardName.Bang, 'Бэнг'], 
        [PlayingCardName.Barile, 'Бочка'],
        [PlayingCardName.Beer, 'Пиво'],
        [PlayingCardName.Carabine, 'Карабин'],
        [PlayingCardName.Diligenza, 'Дилижанс'],
        [PlayingCardName.Dinamite, 'Динамит'],
        [PlayingCardName.Duel, 'Дуэль'],
        [PlayingCardName.Gatling, 'Гатлинг'],
        [PlayingCardName.Indians, 'Индейцы'],
        [PlayingCardName.Lovely, 'Красотка'],
        [PlayingCardName.Miss, 'Мимо'],
        [PlayingCardName.Mustang, 'Мустанг'],
        [PlayingCardName.Panic, 'Паника'],
        [PlayingCardName.Prison, 'Тюрьма'],
        [PlayingCardName.Remington, 'Ремингтон'],
        [PlayingCardName.Saloon, 'Салун'],
        [PlayingCardName.Schofield, 'Скофилд'],
        [PlayingCardName.Shop, 'Магазин'],
        [PlayingCardName.Volcanic, 'Волканик'],
        [PlayingCardName.WellsFargo, 'Уэллс Фарго'],
        [PlayingCardName.Winchester, 'Винчестер'],
        [PlayingCardName.Colt, 'Кольт'],
        [PlayingCardName.ClosedCard, 'БЭНГ!'],
    ])

    public getName = (card: PlayingCardName) => {
        return this.dictionary.get(card)
    }
}