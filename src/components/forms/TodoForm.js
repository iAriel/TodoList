import React, {useState, useEffect, useRef} from 'react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function TodoForm(props) {
    const [input, setInput] = useState(props.edit ? props.edit.value: '');
    const [radioValue, setRadioValue] = useState(props.edit ? props.edit.value: '')

    const inputRef = useRef(null);

    useEffect(() =>{
        inputRef.current.focus()
    })

    const handleChange = e =>{
        setInput(e.target.value);
    };

    const handleChangeRadio = e =>{
        setRadioValue(e.target.value);
    }

    const handleSubmit = e => {
        e.preventDefault();
        if(input.length > 100){
            toast.error("A atividade não pode conter mais de 100 caracteres.")
        }else{
            props.onSubmit({
                id: Math.floor(Math.random() * 10000),
                text: input,
                category: radioValue
              });
              setInput('');
        }
      };

    return (
        <>
            
            <form className="todo-form" onSubmit={handleSubmit}> 
                <h1>O que faremos hoje ?</h1>
                {props.edit ? (
                    <>
                        <input 
                            type="text" 
                            placeholder="atualize sua atividade" 
                            value={input} 
                            name="text" 
                            className="todo-input" 
                            onChange={handleChange}
                            ref={inputRef}
                        />
                        <div className="todo-radio">
                            <label>Pessoal
                                <input type="radio" id="personal" name="category" value="pessoal" onChange={handleChangeRadio}/>
                            </label> 
                            
                            <label>Trabalho
                                <input type="radio" id="work" name="category" value="trabalho" onChange={handleChangeRadio}/>
                            </label>
                            
                        </div>
                        <button className="todo-button"> Atualizar </button>
                    </>
                ) : (
                    <>
                        <input 
                        type="text" 
                        placeholder="Adicione uma atividade" 
                        value={input} 
                        name="text" 
                        className="todo-input" 
                        onChange={handleChange}
                        ref={inputRef}
                    />
                    <div className="todo-radio">
                        <label>Pessoal</label> 
                        <input type="radio" id="personal" name="category" value="pessoal" onChange={handleChangeRadio}/>
                        <label>Trabalho</label>
                        <input type="radio" id="work" name="category" value="trabalho" onChange={handleChangeRadio}/>
                    </div>
                    <button className="todo-button"> Adicionar </button>
                
                </>
            )
            }
            
        </form>
        <ToastContainer />
        </>
    )
}

export default TodoForm
