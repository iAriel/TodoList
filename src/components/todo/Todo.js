import React, {useState} from 'react'
import TodoForm from '../forms/TodoForm'
import {BiTrash} from 'react-icons/bi'
import {TiEdit} from 'react-icons/ti'


function Todo({ todos, completeTodo, removeTodo, updateTodo }) {
    const [edit, setEdit] = useState({
        id: null,
        value: '',
        category: ''
    });

    const submitUpdate = value => {
        updateTodo(edit.id, value);
        setEdit({
          id: null,
          value: '',
          category: ''
        });
      };
    
    if (edit.id) {
        return <TodoForm edit={edit} onSubmit={submitUpdate} />;
    }

    return todos.map((todo, index) => (
        <div 
            className={todo.isComplete ? 'todo-row complete' : 'todo-row'} 
            key={index}
        >
            <div key={todo.id} onClick={() => completeTodo(todo.id)}>
                {todo.text} {todo.category}
            </div>
            <div className="icons">
                <BiTrash 
                    onClick={() => removeTodo(todo.id)}
                    className="delete-icon"
                />
                <TiEdit 
                    onClick={() => setEdit({
                        id: todo.id,
                        value: todo.text,
                    })}
                    className="edit-icon"
                />
            </div>
        </div>
    ));
}

export default Todo
