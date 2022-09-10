import React, {useState, Fragment, useRef} from "react";
import { TodoList } from "./Components/TodoList";
import {v4 as uuidv4 } from "../node_modules/uuid/dist";


export function App(){
    //tareas por hacer
    const [todos, setTodos] = useState([
        //estado por defecto
        {id:1, task:"tarea 1", completed: false}
    ])
    
    //agregar tareas realizadas a nueva lista en un p al final
    //tareas hechas
    const [done, setDone] = useState([])

    //referencia para obtener el valor del input
    const todoTaskRef = useRef();



    //funcion para verificar el estado completed de cada tarea (se envia como prop hacia todo list y luego a todo item)
    const toggleTodo= (id)=>{
        //copia de lista de tareas
        const newTodos = [...todos];
        const todo = newTodos.find((todo)=>todo.id===id);
        todo.completed= !todo.completed;
        //actualizacion de lista de tareas
        setTodos(newTodos)

    }
    //funcion agregar tareas a listado
    const handleTodoAdd = ()=>{
        const task= todoTaskRef.current.value;
        //validando contenido del input
        if (task=== '') return;
        //agregando tarea a lista
        setTodos((prevTodos)=>{
            return [...prevTodos, {id:uuidv4(), task, completed: false}]
        })
        //reseteando input
        todoTaskRef.current.value= null;
    }
    //funcion borrar tareas completas
    const handleClearAll = ()=>{
        //copia de lista de tareas solo de elementos completos
        const newDone = todos.filter((todo)=>todo.completed);
        //validando que no se encuentre vacio el  array
        if (newDone.length === 0) return;
        //agregando a tareas realizadas
        newDone.map((taskDone)=>(
            setDone((prevDone)=>{
                return [...prevDone, taskDone];
            })
        ))
        
        
        //copia de lista de tareas solo de elementos sin completar
        const newTodos = todos.filter((todo)=>!todo.completed);
        setTodos(newTodos);
        
    }


    return (
        <Fragment>
                <TodoList todos={todos} toggleTodo={toggleTodo}/>
                <input ref={todoTaskRef} type="text" placeholder="Nueva Tarea"></input>
                <button onClick={handleTodoAdd}>➕</button>
                <button onClick={handleClearAll}>🗑</button>
                {/* se verifican las tareas completadas*/}
                <p> Te quedan {todos.filter((todo)=>!todo.completed).length} tareas por terminar</p>
                <article>
                    <h2>Tareas completadas</h2>
                    <TodoList todos={done}/>
                </article>
        </Fragment>
    )
}
