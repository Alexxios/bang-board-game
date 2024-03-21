import {CardForSelection} from "../moleculas/CardForSelection";
import {PlayingCard} from "../../models/PlayingCard";
import { CenterDiv } from "../../views/HomeView";

export const CardSelectionPanel = ({cards, onSelect} : {cards: PlayingCard[], onSelect: Function}) => {
    return <div style={{marginTop: 150}}>
        <CenterDiv>
            <h1>Выберите карту</h1>
        </CenterDiv>
        
        <CenterDiv >
            {cards.map((card, index) => {
                return <CardForSelection card={card} index={index} onSelect={onSelect}/>
            })}
        </CenterDiv>
    </div>
}