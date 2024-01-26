import React, {MouseEventHandler} from "react";
import {Panel} from "./styles/PanelDiv";

const EnterGamePanel = ({onClick} : {onClick: MouseEventHandler<HTMLButtonElement>}) => {
    return <Panel>
        <p>Войти в игру</p>
        <div style={{display: "table-cell", width: 100, paddingBottom: 30}}>
            <input placeholder="Номер игры"></input>
        </div>

        <button onClick={onClick}>Играть!</button>
    </Panel>
}

export default EnterGamePanel
