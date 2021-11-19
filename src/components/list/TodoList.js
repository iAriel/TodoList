import React, {useState} from 'react'
import TodoForm from '../forms/TodoForm'
import Todo from '../todo/Todo'

function TodoList() {
    const [todos, setTodos] = useState([]);
    const [workTodos, setWorkTodos] = useState([]);

    

    const addTodo = todo =>{
        if(!todo.text || /^\s*$/.test(todo.text)){
            return
        }

        if(todo.category === "pessoal"){
            const newTodos = [todo, ...todos];
            setTodos(newTodos)
        }else if(todo.category === "trabalho"){
            const newTodos = [todo, ...workTodos];
            setWorkTodos(newTodos)
        }
        console.log(todos, workTodos)
        
    };

    const removeTodo = id =>{
        const existId = todos.find(todo => {
            if(todo.id === id){
                return todo;
            }
        });

        if(existId){
            const remoreArr = [...todos].filter(todo => todo.id !== id);
            setTodos(remoreArr)
        }else{
            const remoreArrWokr = [...workTodos].filter(todo => todo.id !== id);
            setWorkTodos(remoreArrWokr)
        }

        
    };

    const updatedTodo = (todoId, newValue) => {
        if(!newValue.text || /^\s*$/.test(newValue.text)){
            return
        }
        const existId = todos.find(todo => {
            if(todo.id === todoId){
                return todo;
            }
        });

        if(existId){
            setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)))
        }else{
            setWorkTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)))
        }
        
    };

    const completeTodo = id => {
        const existId = todos.find(todo => {
            if(todo.id == id){
                return todo;
            }
        });

        if(existId) {
            let updatedTodo = todos.map(todo => {
                if(todo.id === id){
                    todo.isComplete = !todo.isComplete
                }
                return todo
            })
            setTodos(updatedTodo)
        }else{
            let updatedWorkTodo = workTodos.map(todo => {
                if(todo.id === id){
                    todo.isComplete = !todo.isComplete
                }
                return todo
            })
            setWorkTodos(updatedWorkTodo)
        }
        
        
    };

    return (      
        <div>
            <TodoForm onSubmit={addTodo} />
            <div  className="todo-column">
                <div className="personal-todos">
                    <label> Pessoal </label>
                    <Todo
                        todos={todos} 
                        completeTodo={completeTodo} 
                        removeTodo={removeTodo}
                        updateTodo={updatedTodo}
                    />
                </div>
                <div className="work-todos">
                    <label> Trabalho </label>
                    <Todo 
                        todos={workTodos} 
                        completeTodo={completeTodo} 
                        removeTodo={removeTodo}
                        updateTodo={updatedTodo}
                    />
                </div>
                
            </div>
            
        </div>
    )
}

export default TodoList
