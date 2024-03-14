import {PlayingCard} from "../../enums/PlayingCards";
import {CardForSelection} from "../moleculas/CardForSelection";

export const CardSelectionPanel = ({cards, onSelect} : {cards: PlayingCard[], onSelect: Function}) => {
    return <>
        {cards.map((card, index) => {
            return <CardForSelection card={card} index={index} onSelect={onSelect}/>
        })}
    </>
}