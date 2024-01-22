import CreateGamePanel from "../ui/orgnisms/CreateGamePanel";
import EnterGamePanel from "../ui/orgnisms/EnterGamePanel";
import React from "react";

const mainDivStyle = {
    display: "flex",
    justifyContent: "center"
}

const HomePage = () => {
    return <>
        <div
            style={mainDivStyle}>
            <CreateGamePanel/>
            <EnterGamePanel/>
        </div>

    </>;
}

export default HomePage;