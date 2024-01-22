import React from "react";
import {Panel} from "./styles/PanelDiv";

const CreateGamePanel = () => {
    return <Panel>
        <p>Создать игру</p>
        <div style={{display: "flex"}}>
            <p>Количество игроков</p>
            <button>{"<"}</button>
            <p>0</p>
            <button>{">"}</button>
        </div>
        <button>Создать игру!</button>
    </Panel>
}

export default CreateGamePanel;