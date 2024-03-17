import React from "react";

export const NextMotionButton = ({onClick} : {onClick: Function}) => {
    return <button style={{height: 100}} onClick={() => {onClick()}}>Следующий ход</button>
}