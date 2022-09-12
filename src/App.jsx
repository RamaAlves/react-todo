import React, {useState, Fragment, useRef, useEffect} from "react";
import { TodoList } from "./Components/TodoList";
import { SectionDone } from "./Components/SectionDone";
import {v4 as uuidv4 } from "../node_modules/uuid/dist";

const KEY='todoApp.todos'
const KEY_DONE='todoApp.done'

export function App(){
    //tareas por hacer
    const [todos, setTodos] = useState([
        //estado por defecto
        {id:1, task:"tarea 1", completed: false}
    ])
    
    //tareas completadas
    const [done, setDone] = useState([])

    //referencia para obtener el valor del input
    const todoTaskRef = useRef();

    //restaurar tareas desde localStorage
    useEffect(()=>{
        const storedTodos = JSON.parse(localStorage.getItem(KEY))
        if (storedTodos){
            setTodos(storedTodos)
        }
    }, [])

    //restaurar tareas realizadas desde localStorage
    useEffect(()=>{
        const storedDone = JSON.parse(localStorage.getItem(KEY_DONE))
        if (storedDone){
            setDone(storedDone)
        }
    }, [])
    
    //resguardo de tareas en el localStorage
    useEffect(()=>{
        localStorage.setItem(KEY, JSON.stringify(todos))
    }, [todos]);
    

    //resguardo de tareas realizadas en el localStorage
    useEffect(()=>{
        localStorage.setItem(KEY_DONE, JSON.stringify(done))
    }, [done]);

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
    //funcion confirmar tareas completadas
    const handleConfirmTodoDone = ()=>{
        //copia de lista de tareas solo de elementos completos
        const newDone = todos.filter((todo)=>todo.completed);
        //validando que no se encuentre vacio el  array
        if (newDone.length === 0) return;
        //agregando a tareas realizadas
        newDone.map((taskDone)=>(
            setDone((prevDone)=>{
                taskDone.completed=false;
                return [...prevDone, taskDone];
            })
        ))
        
        
        //copia de lista de tareas solo de elementos sin completar
        const newTodos = todos.filter((todo)=>!todo.completed);
        setTodos(newTodos);
    }

    //funcion para verificar el estado remove de cada tarea (se envia como prop hacia SectionDone y luego a TodoItem)
    const toggleDone= (id)=>{
        //copia de lista de tareas realizadas
        const newDone = [...done];
        const taskDone = newDone.find((done)=>done.id===id);
        taskDone.completed= !taskDone.completed;
        //actualizacion de lista de tareas realizadas
        setDone(newDone)
    }

    //funcion para eliminar tarea de lista de tareas realizadas
    const handleClearTodoDone = ()=>{
        const newNotRemove = done.filter((taskDone)=>!taskDone.completed);
        setDone(newNotRemove);
    }

    return (
        <Fragment>
<<<<<<< HEAD
            <h1>Gestor de tareas</h1>
            <input ref={todoTaskRef} type="text" placeholder="Nueva Tarea"></input>
            <button onClick={handleTodoAdd}>➕</button>
            <TodoList todos={todos} toggle={toggleTodo}/>
            <button onClick={handleConfirmTodoDone}>✔ Confirmar tareas realizadas</button>
            {/* se verifican las tareas completadas}*/}
=======
            <TodoList todos={todos} toggle={toggleTodo}/>
            <input ref={todoTaskRef} type="text" placeholder="Nueva Tarea"></input>
            <button onClick={handleTodoAdd}>➕</button>
            <button onClick={handleConfirmTodoDone}>✔</button>
            {/* se verifican las tareas completadas*/}
>>>>>>> 285fc276ef317c370a2404309d7f41b8cf360bfb
            <p> Te quedan {todos.filter((todo)=>!todo.completed).length} tareas por terminar</p>
            {/* seccion de tareas realizadas */}
            <SectionDone todos={done} toggle={toggleDone} handleClear={handleClearTodoDone}/> 
        </Fragment>
    )
}
