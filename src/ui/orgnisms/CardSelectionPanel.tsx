import {CardForSelection} from "../moleculas/CardForSelection";
import {PlayingCard} from "../../models/PlayingCard";

export const CardSelectionPanel = ({cards, onSelect} : {cards: PlayingCard[], onSelect: Function}) => {
    return <>
        {cards.map((card, index) => {
            return <CardForSelection card={card} index={index} onSelect={onSelect}/>
        })}
    </>
}