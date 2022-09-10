import React from "react";

// se recibe un elemento por cada iteracion que se realiza en TodoList y se crea un elemento de la lista
// handleTodoClick ejecuta la funcion ToggleTodo que recibe el id del Item y actualiza el estado de completed
export function TodoItem({todo, toggleTodo}){
    const {id, task, completed} = todo;

    const handleTodoClick=()=>{
        //verificacion si toggleTodo existe
        if (toggleTodo === undefined) return;
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