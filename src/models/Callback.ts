import {CallbacType} from "../enums/CallbacType";

export interface Callback{
    event: Event,
    callbackType: CallbacType
}