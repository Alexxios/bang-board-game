import React, {ChangeEvent, EventHandler, MouseEventHandler} from "react";
import {Panel} from "./styles/PanelDiv";

const CreateGamePanel = ({playersCount, incrementOnClick, decrementOnClick}: {
    playersCount: number
    incrementOnClick: MouseEventHandler<HTMLButtonElement>,
    decrementOnClick: MouseEventHandler<HTMLButtonElement>,
}) => {
    return <Panel>
        <p>Создать игру</p>
        <div style={{display: "flex"}}>
            <p>Количество игроков</p>
            <button onClick={decrementOnClick}>{"<"}</button>
            <p>{playersCount}</p>
            <button onClick={incrementOnClick}>{">"}</button>
        </div>
        <button>Создать игру!</button>
    </Panel>
}

export default CreateGamePanel;