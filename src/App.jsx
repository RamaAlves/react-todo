import React, {useState, Fragment, useRef, useEffect} from "react";
import { TodoList } from "./Components/TodoList";
import { SectionDone } from "./Components/SectionDone";
import {v4 as uuidv4 } from "../node_modules/uuid/dist";
import { SectionTodo } from "./Components/SectionTodo";

import './test.css';
import { Card } from "./Components/UI/Card";

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
    //restaurar tareas realizadas desde localStorage
    useEffect(()=>{
        const storedTodos = JSON.parse(localStorage.getItem(KEY))
        if (storedTodos){
            setTodos(storedTodos)
        }
        
        const storedDone = JSON.parse(localStorage.getItem(KEY_DONE))
        if (storedDone){
            setDone(storedDone)
        }
    }, [])
    
    //resguardo de tareas en el localStorage
    //resguardo de tareas realizadas en el localStorage
    useEffect(()=>{
        localStorage.setItem(KEY, JSON.stringify(todos))
        localStorage.setItem(KEY_DONE, JSON.stringify(done))
    }, [todos, done]);
    
    //funcion agregar tareas a listado
    const handleTodoAdd = (toAddTask) =>{
        //validando contenido del input
        if (toAddTask === '') return;
        //agregando tarea a lista
        setTodos((prevTodos)=>{
            return [...prevTodos, {id:uuidv4(), task: toAddTask, completed: false}]
        })
    }
    //funcion confirmar tareas completadas
    const handleConfirmTodoDone = () =>{
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

    // funcion para verificar el estado completed de cada tarea (se envia como prop hacia todo list y luego a todo item)
    const toggleTodo = (id)=>{
        //copia de lista de tareas
        const newTodos = [...todos];
        const todo = newTodos.find((todo)=>todo.id===id);
        todo.completed= !todo.completed;
        //actualizacion de lista de tareas
        setTodos(newTodos)
    }

    //funcion para eliminar tarea de lista de tareas realizadas
    const handleClearTodoDone = () => {
        const newNotRemove = done.filter((taskDone)=>!taskDone.completed);
        setDone(newNotRemove);
    }

    return (
        <Card>
            <SectionTodo title={'Gestor de tareas'} onClick={handleTodoAdd} onAdd={handleTodoAdd} todos={todos} onConfirm={handleConfirmTodoDone} onToggle={toggleTodo} />
            {/* se verifican las tareas completadas}*/}
            <Card ><p className="paragraph"> Te quedan {todos.filter((todo)=>!todo.completed).length} tareas por terminar</p></Card>
            {/* seccion de tareas realizadas */}
            {done.length > 0 && <SectionDone title={'Tareas Realizadas'} showInput={false} onClick={() => {}} todos={done} toggle={toggleDone} handleClear={handleClearTodoDone}/>} 
        </Card>
    )
}
