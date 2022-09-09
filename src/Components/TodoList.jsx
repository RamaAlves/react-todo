import React from 'react'
import {TodoItem} from './TodoItem'

//todos es la lista de tareas que se reciben desde la App
//aquí se itera por ella y se crea un TodoItem por cada elemento

//toggleTodo es una funcion que actualiza el estado completed de las tareas (se envia como props a TodoItem)

export function TodoList({todos, toggleTodo}) {
    return (
        <ul>
            {todos.map((todo)=>(
                <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo}/>
            ))}
        </ul>
    )
}
