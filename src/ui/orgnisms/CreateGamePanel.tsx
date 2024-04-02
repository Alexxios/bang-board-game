import React, {ChangeEvent, EventHandler, MouseEventHandler} from "react";
import {Panel} from "./styles/PanelDiv";
import styles from "../../styles.module.css";

const CreateGamePanel = ({playersCount, incrementOnClick, decrementOnClick, onClick}: {
    playersCount: number
    incrementOnClick: MouseEventHandler<HTMLButtonElement>,
    decrementOnClick: MouseEventHandler<HTMLButtonElement>,
    onClick: MouseEventHandler<HTMLButtonElement>
}) => {
    return <div className={styles.panel}>
        <p style={{fontSize: 48}}>СОЗДАТЬ ИГРУ</p>
        <div style={{display: "flex", justifyContent:'center'}}>
            <p>Количество игроков</p>
            <button style={{borderColor:'#DF7453', borderRadius:'50%', background:0, color:'#DF7453',paddingInline:14, margin:5}} onClick={decrementOnClick}>{"<"}</button>
            <p>{playersCount}</p>
            <button style={{borderColor:'#DF7453', borderRadius:'50%', background:0, color:'#DF7453',paddingInline:14, margin:5}} onClick={incrementOnClick}>{">"}</button>
        </div>
        <button className={styles.button} style={{fontSize:22}} onClick={onClick}>Создать игру!</button>
    </div>
}

export default CreateGamePanel;