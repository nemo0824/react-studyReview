import { useState } from "react"
import { todoState, IToDo } from "../atom"
import { useRecoilState } from "recoil"


function ToDoList(){
    const [atomToDo, setAtomToDo] = useRecoilState(todoState)
    const [newtoDo, setNewtoDo]  = useState("")
    const addToDo = (event:React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        const newToDoItem:IToDo = {
            id:Date.now(),
            text: newtoDo,
            category: "TO_DO"
        }
      setAtomToDo((beforetoDo) => [newToDoItem, ...beforetoDo]);
      setNewtoDo("")
    }
    return(
        <div>
            <h1>ToDoList review without react-hook-form</h1>
            <hr/>
            <form onSubmit={addToDo}>
                <input 
                placeholder="할일 입력해"
                type="text"
                value={newtoDo}
                onChange={(e)=> setNewtoDo(e.target.value)}
                />
                <button>할일 추가</button>
            </form>
            <ul>{atomToDo.map((toDo)=> <li key={toDo.id}>{toDo.text}</li>)}</ul>
        </div>
    )
}


export default ToDoList