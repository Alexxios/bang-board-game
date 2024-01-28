import React, {ChangeEventHandler, MouseEventHandler} from "react";
import {Panel} from "./styles/PanelDiv";

const EnterGamePanel = ({onClick, onChange} : {onClick: MouseEventHandler<HTMLButtonElement>, onChange: ChangeEventHandler<HTMLInputElement>}) => {
    return <Panel>
        <p>Войти в игру</p>
        <div style={{display: "table-cell", width: 100, paddingBottom: 30}}>
            <input onChange={onChange} placeholder="Номер игры"></input>
        </div>

        <button onClick={onClick}>Играть!</button>
    </Panel>
}

export default EnterGamePanel
