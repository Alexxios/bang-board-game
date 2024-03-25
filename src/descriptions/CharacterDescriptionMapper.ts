import {Character} from "../enums/Character";

export class CharacterDescriptionMapper {

    private bartCassidy = 'Всякий раз, когда теряет единицу здоровья, немедленно ' +
        'тянет на руку карту из колоды.'

    private blackJack = 'В фазе набора своего хода должен показать вторую ' +
        'взятую карту: если это черва или бубна, тянет ещё одну карту (не показывая её).'

    private calamityJanet = 'Может играть карты «Бэнг!» вместо карт «Мимо!» ' +
        'и наоборот. Применив «Мимо!» вместо «Бэнг!», ' +
        'она не может в тот же ход сыграть обычный «Бэнг!», если только у неё ' +
        'нет «Волканика».'

    private elGringo = 'Всякий раз, когда теряет единицу ' +
        'здоровья из-за сыгранной соперником карты, вслепую тянет карту ' +
        'с руки этого соперника (по одной за каждую потерянную единицу). Если у соперника нет карт на' +
        'руке, Джанго не тянет ничего. За урон от «Динамита» никто из игроков не отвечает.'

    private jesseJones = 'В фазе набора своего хода может взять первую карту либо из колоды, либо ' +
        'вслепую с руки любого соперника. Затем тянет вторую карту из колоды.'

    private jourdonnais = 'Всюду ходит со своей бочкой: может отменить ' +
        'нацеленное в него попадание, если вытянет черву. Если у него в игре есть карта ' +
        '«Бочка», он получает два шанса отменить попадание (а потом может ' +
        'ещё и «Мимо!» сыграть).'

    private kitCarlson = 'В фазе набора своего хода тянет из колоды 3 карты, ' +
        'оставляет на руке две из них, а третью возвращает на верх колоды лицом вниз.'

    private luckyDuke = 'Всякий раз, когда делает проверку, открывает 2 верхние ' +
        'карты колоды и выбирает одну из них. Затем обе карты уходят в сброс.'

    private paulRegret = 'Не спешивается со своего мустанга: соперники всегда видят его на ' +
        'расстоянии на 1 больше обычного. Если у него в игре есть ' +
        'ещё и карта «Мустанг», все расстояния до Джо увеличиваются ' +
        'в сумме на 2.'

    private pedroRamirez = 'В фазе набора своего хода может взять ' +
        'первую карту либо из колоды, либо с верха сброса. Затем тянет вторую ' +
        'карту из колоды.'

    private roseDoolan = 'Пользуется собственным прицелом: всегда видит соперников на ' +
        'расстоянии на 1 меньше обычного. Если у неё в игре есть ещё и карта «Прицел», все ' +
        'расстояния для Рози сокращаются в сумме на 2.'

    private sidKetchum = 'Может в любой момент игры ' +
        'сбросить 2 карты с руки, чтобы тут же восстановить единицу здоровья. ' +
        'Том вправе применить это свойство несколько раз подряд. Нельзя ' +
        'получить больше здоровья, чем было в начале партии.'

    private slabTheKiller = 'Требует 2 карт «Мимо!» ' +
        'для отмены своих попаданий. Успешно применённая «Бочка» считается ' +
        'за одну карту «Мимо!».'

    private suzyLafayette = 'Тянет карту из колоды, как ' +
        'только остаётся без карт на руке.'

    private vultureSam = 'Всякий раз, когда кто-то из' +
        'соперников убит, забирает на руку все карты ' +
        'с руки погибшего и у него из игры.'

    private willyTheKid = 'В свой ход может сыграть сколько угодно карт «Бэнг!».'

    descriptions: Map<Character, string> = new Map([
        [Character.Jourdonnais, this.jourdonnais],
        [Character.BlackJack, this.blackJack],
        [Character.BartCassidy, this.bartCassidy],
        [Character.ElGringo, this.elGringo],
        [Character.JesseJames, this.jesseJones],
        [Character.CalamityJanet, this.calamityJanet],
        [Character.KitCarlson, this.kitCarlson],
        [Character.LuckyDuke, this.luckyDuke],
        [Character.PaulRegrez, this.paulRegret],
        [Character.PedroRamirez, this.pedroRamirez],
        [Character.RoseDoolan, this.roseDoolan],
        [Character.SidKetchum, this.sidKetchum],
        [Character.SuzyLafayette, this.suzyLafayette],
        [Character.SlabTheKiller, this.slabTheKiller],
        [Character.VultureSam, this.vultureSam],
        [Character.WillyTheKid, this.willyTheKid],
    ])

    public getDescription = (character: Character) => {
        return this.descriptions.get(character)
    }
}