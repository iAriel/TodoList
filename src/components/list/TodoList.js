import React, {useState} from 'react'
import TodoForm from '../forms/TodoForm'
import Todo from '../todo/Todo'

function TodoList() {
    const [todos, setTodos] = useState([]);

    

    const addTodo = todo =>{
        if(!todo.text || /^\s*$/.test(todo.text)){
            return
        }

        const newTodos = [todo, ...todos];

        setTodos(newTodos)
    };

    const removeTodo = id =>{
        const remoreArr = [...todos].filter(todo => todo.id !== id);
        setTodos(remoreArr)
    };

    const updatedTodo = (todoId, newValue) => {
        if(!newValue.text || /^\s*$/.test(newValue.text)){
            return
        }

        setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)))
    };

    const completeTodo = id => {
        let updatedTodo = todos.map(todo => {
            if(todo.id === id){
                todo.isComplete = !todo.isComplete
            }
            return todo
        })
        setTodos(updatedTodo)
    };

    return (      
        <div>
            <h1>O que temos que fazer hoje ?</h1>
            <TodoForm onSubmit={addTodo} />
            <Todo 
                todos={todos} 
                completeTodo={completeTodo} 
                removeTodo={removeTodo}
                updateTodo={updatedTodo}
            />
        </div>
    )
}

export default TodoList
