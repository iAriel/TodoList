import React, {useState, useEffect, useRef} from 'react'

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
        
        props.onSubmit({
          id: Math.floor(Math.random() * 10000),
          text: input,
          category: radioValue
        });
        setInput('');
      };

    return (
        
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
                        <label for="personal">Pessoal
                            <input type="radio" id="personal" name="category" value="pessoal" checked={true}/>
                        </label> 
                        
                        <label for="work">Trabalho
                            <input type="radio" id="work" name="category" value="trabalho" />
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
                    <label for="personal">Pessoal</label> 
                    <input type="radio" id="personal" name="category" value="pessoal" onChange={handleChangeRadio}/>
                    <label for="work">Trabalho</label>
                    <input type="radio" id="work" name="category" value="trabalho" onChange={handleChangeRadio}/>
                </div>
                <button className="todo-button"> Adicionar </button>
                
                </>
            )
            }
            
        </form>
    )
}

export default TodoForm
