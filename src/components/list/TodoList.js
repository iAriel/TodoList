import React, {useState} from 'react'
import TodoForm from '../forms/TodoForm'
import Todo from '../todo/Todo'
import Img from '../../assets/svg/DrawKit_Vector_Illustration_Black_Friday_&_Online_Shopping.svg'
import Img2 from '../../assets/svg/personal_woman.svg'

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
        const existInPersonal = todos.find(todo => {
            if(todo.id === todoId){
                return todo;
            }
        });


        if (existInPersonal) {
            if(newValue.category !== 'pessoal' && newValue.category !== 'trabalho'){
                newValue.category = existInPersonal.category;
            }
            if (existInPersonal.category !== newValue.category) {
                removeTodo(existInPersonal.id)
                setWorkTodos([...workTodos, newValue])
            } else {
                setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)))
            }
        } else {
            const existInWork = workTodos.find(todo => {
                if(todo.id === todoId){
                    return todo;
                }
            })
            if(newValue.category !== 'pessoal' && newValue.category !== 'trabalho'){
                newValue.category = existInWork.category;
            }
            if(existInWork.category !== newValue.category){
                console.log(existInWork, newValue)
                removeTodo(existInWork.id)
                setTodos([...todos, newValue])
            } else {
                setWorkTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)))
            }
        }
    };

    const completeTodo = id => {
        const existId = todos.find(todo => {
            if(todo.id === id){
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
                    {!todos.length ? ( 
                    <img className="not-todo" src={Img2} alt=""/>
                    ) : (
                        <Todo
                        todos={todos} 
                        completeTodo={completeTodo} 
                        removeTodo={removeTodo}
                        updateTodo={updatedTodo}
                    />
                    )}
                    
                </div>
                <div className="work-todos">
                    <label> Trabalho </label>
                    {!workTodos.length ? (
                    <img className="not-todo" src={Img} alt="Home loading packages"/>
                    ):(
                        <Todo 
                            todos={workTodos} 
                            completeTodo={completeTodo} 
                            removeTodo={removeTodo}
                            updateTodo={updatedTodo}
                        />
                    )}
                    
                </div>
            </div>
        </div>
    )
}

export default TodoList
