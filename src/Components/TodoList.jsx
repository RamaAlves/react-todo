import React from 'react'
import {TodoItem} from './TodoItem'

//todos es la lista de tareas que se reciben desde la App
//aquí se itera por ella y se crea un TodoItem por cada elemento

//toggle es una funcion que actualiza el estado completed de las tareas (se envia como props a TodoItem)

export function TodoList({todos, toggle}) {
    return (
        <ul className='todo-list'>
            {todos.map((todo)=>(
                <TodoItem key={todo.id} todo={todo} toggle={toggle}/>
            ))}
        </ul>
    )
}
