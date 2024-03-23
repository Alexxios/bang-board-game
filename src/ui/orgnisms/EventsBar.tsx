import {Panel} from "./styles/PanelDiv";
import {Event} from "../../enums/Event";
import {EventType} from "../../enums/EventType";
import {BottomDiv} from "../styles/PositionDivs";

const formatEvent = (event: Event) => {
    if (event.eventType == EventType.CardPlay){
        let getter = 'себя'
        if (event.getterNickname !== event.senderNickname){
            getter = event.getterNickname
        }
        let cardNaming = new ()

        return `Игрок ${event.senderNickname} сыграл ${event.cardName} на ${getter}`
    }
    if (event.eventType == EventType.NextMotion){
        return `Ход передан игроку ${event.getterNickname}`
    }
    return ''
}

export const EventsBar = ({events} : {events: Event[]}) => {
    let formattedEvents = events.map(event => formatEvent(event))
    return <Panel style={{height: 300, width: 600}}>
        <h3>События</h3>
        <BottomDiv style={{height: 250}}>
            <div style={{ overflowY: 'scroll', width: 'auto'}}>
                {formattedEvents.map(event => <p>{event}</p>)}
            </div>
        </BottomDiv>
    </Panel>
}