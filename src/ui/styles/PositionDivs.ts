import styled from "styled-components";

export const BottomDiv = styled.div`
    display: flex;
    position: absolute;
    bottom: 0;
    margin-bottom: 2%;
    vertical-align: middle;
`

export const TopDiv = styled.div`
    display: flex;
    flex-direction: row;
    position: absolute;
    margin-top: 1%;
    left: 50%;
    transform: translateX(-50%);
`

export const LeftDiv = styled.div`
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
`
export const RightDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
`
export const RightBottomDiv = styled.div`
    display: flex;
    position: absolute;
    bottom: 0;
    right: 0;
    margin-bottom: 2%;
    vertical-align: middle;
`