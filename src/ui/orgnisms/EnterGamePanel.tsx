import React, {ChangeEventHandler, MouseEventHandler} from "react";
import {Panel} from "./styles/PanelDiv";
import styles from "../../styles.module.css";
import { CenterDiv } from "../../views/HomeView";

const EnterGamePanel = ({onClick, onChange} : {onClick: MouseEventHandler<HTMLButtonElement>, onChange: ChangeEventHandler<HTMLInputElement>}) => {
    return <div className={styles.panel}>
        <p style={{fontSize:48}}>ВОЙТИ В ИГРУ</p>
        <p><input className={styles.entry} style={{height:40, width:300}} onChange={onChange} placeholder="Номер игры"></input></p>
        <button className={styles.button} style={{fontSize:20}} onClick={onClick}>Играть!</button>
    </div>
}

export default EnterGamePanel
