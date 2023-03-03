import React, {Fragment} from 'react'
import { TodoList } from './TodoList'
import { Card } from "./UI/Card"

//este componente recibe las tareas realizadas y con ellas renderiza una seccion que contiene una lista con las mismas

export function SectionDone ({todos, toggle, handleClear}){
    return(
        <Card>
            <section className='container-section-todo'>
                <h2>Tareas completadas</h2>
                <TodoList todos={todos} toggle={toggle} />
                <div className='info-bin'>
                    <button className='bin' onClick={handleClear}>
                        {todos.filter((todo)=>todo.completed).length} tareas listas para ser eliminadas 🗑
                    </button>
                </div>
            </section>
        </Card>
    )
}