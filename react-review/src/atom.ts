import {atom} from "recoil"

export interface IToDo{
    id:number;
    category:string;
    text:string;
}

export const todoState= atom<IToDo[]>({
    key: "todoState",
    default: []
})

