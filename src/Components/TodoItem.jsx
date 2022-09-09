import React from "react";

export function TodoItem({todo, toggleTodo}){
    const {id, task, completed} = todo;

    const handleTodoClick=()=>{
        //se recibio a traves de props, se ejecuta y devuelve los cambios
        toggleTodo(id)
    }

    return (
        <li>
            <input type="checkbox" checked={completed} onChange={handleTodoClick}/>
            {task}
        </li>
    )
}