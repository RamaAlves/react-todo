import React from "react";

// se recibe un elemento por cada iteracion que se realiza en TodoList y se crea un elemento de la lista
// handleTodoClick ejecuta la funcion Toggle que recibe el id del Item y actualiza el estado de completed

// completed se utiliza para validar si la tarea ya esta completa y se puede manipularla(pasarla a tareas 
// realizadas o eliminarla)
export function TodoItem({todo, toggle}){
    const {id, task, completed} = todo;

    const handleTodoClick=()=>{
        //verificacion si toggleTodo existe
        if (toggle === undefined) return;
        //se recibio a traves de props, se ejecuta y devuelve los cambios
        toggle(id);
    }

    return (
        <li>
            <p>{task}</p>
            <input type="checkbox" checked={completed} onChange={handleTodoClick}/>
        </li>
    )
}