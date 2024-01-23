import React from 'react';
import {view} from "@yoskutik/react-vvm";
import WaitingViewModel from "../view_models/WaitingViewModel";

const WaitingView = view(WaitingViewModel)(({viewModel: WaitingViewModel}) => {

    return <p>Waiting page</p>
})

export default WaitingView;