import React, { Fragment } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { TodoList } from "./TodoList";
import { Card } from "./UI/Card";

//este componente recibe las tareas realizadas y con ellas renderiza una seccion que contiene una lista con las mismas

export function SectionTodo(props) {
  const [inputValue, setInputValue] = useState("");

  const [inputDisable, setInputDisable] = useState(true);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };    

  useEffect (() => {
    if (inputValue.length > 0) {
        setInputDisable(false);
    } else {
        setInputDisable(true);
    }
  })

  const addTask = () => {
    props.onAdd(inputValue);
    setInputValue('');
  }

  return (
    <Card>
      <section className="container-section-todo">
        <h2>Tareas completadas</h2>
        <div className="container-form-task">
          <input
            type="text"
            placeholder="Nueva Tarea"
            onChange={handleChange}
            value={inputValue}
          ></input>
          <button type="button" onClick={addTask} disabled={inputDisable}>
            ➕
          </button>  
        </div>
        <TodoList todos={props.todos} toggle={props.onToggle} />
        <button className="confirm-task" onClick={props.onConfirm}>
          ✔ Confirmar tareas realizadas
        </button>
      </section>
    </Card>
  );
}
