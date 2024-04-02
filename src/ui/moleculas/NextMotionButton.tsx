import React from "react";
import styles from "../../styles.module.css"

export const NextMotionButton = ({onClick} : {onClick: Function}) => {
    return <button className={styles.button} style={{height: 100}} onClick={() => {onClick()}}>Следующий ход</button>
}