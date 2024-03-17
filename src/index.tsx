import "reflect-metadata";

import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import HomeView from "./views/HomeView";
import WaitingView from "./views/WaitingView";
import GameView from "./views/GameView";
import MatchEndViewModel from "./view_models/MatchEndViewModel";
import MathEndView from "./views/MathEndView";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeView/>
    },
    {
        path: '/waiting-room/:gameId',
        element: <WaitingView/>,
    },
    {
        path: '/game/:gameId',
        element: <GameView/>,
    },
    {
        path: 'match-end',
        element: <MathEndView/>
    }
]);


root.render(
    <RouterProvider router={router}/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
