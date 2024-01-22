import React from "react";
import {Panel} from "./styles/PanelDiv";

const EnterGamePanel = () => {
    return <Panel>
        <p>Войти в игру</p>
        <div style={{display: "table-cell", width: 100, paddingBottom: 30}}>
            <input placeholder="Номер игры"></input>
        </div>

        <button>Играть!</button>
    </Panel>
}

export default EnterGamePanel
