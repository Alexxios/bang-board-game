import {singleton} from "tsyringe";
import axios from "axios";

@singleton()
export class API {
    public static api = axios.create({
        baseURL: 'http://127.0.0.1:80'
    })
}