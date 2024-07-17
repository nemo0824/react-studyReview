import {atom, selector} from "recoil"

export interface IToDo{
    id:number;
    category:string;
    text:string;
}

export const todoState= atom<IToDo[]>({
    key: "todoState",
    default: []
})

export const categoryState = atom({
    key: "categoryState",
    default: "TO_DO"
})

export const toDoSelector = selector({
    key:"toDoSelector",
    get: ({get}) =>{
        const toDos = get(todoState)
        const category = get(categoryState)
        return toDos.filter(toDo => toDo.category === category)
            // toDos.filter((todo)=> todo.category === "To_DO" ), 
            // toDos.filter((todo)=> todo.category==="DOING"), 
            // toDos.filter((todo) => todo.category === "Done")

          
        
    }
})
// selector 기능은 atom에서 state를가져다가 output을 변경할수있다

