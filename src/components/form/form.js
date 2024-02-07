import { useState } from 'react';

function Form() {
  const [inputValue, setInputValue] = useState({ nome: '', email: '', idade: '', gender: 'Feminino'});
  const [showAnswers, setshowAnswers] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputValue((prevInputValue) => ({ ...prevInputValue, [name]: value }));
    setshowAnswers(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setshowAnswers(true);
  };

  const hideAnswers = (event) => {
    event.preventDefault();
    setshowAnswers(false);
  }

  return (
    <>
    <div className='container-form'>
      <form>
        <h1 className='form_h1'>Preencha seus dados</h1>
        <label>Nome:</label>
        <input className='form_input' type="text" name="nome" value={inputValue.nome} onChange={handleChange} minlength="3" />
        <label>Idade:</label>
        <input className='form_input' type="number" name="idade" value={inputValue.idade} onChange={handleChange} min="0" />
        <label>E-mail:</label>
        <input className='form_input' type="email" name="email" value={inputValue.email} onChange={handleChange} />
        <label>Gênero</label>
        <div>
          <input type='radio' name="gender" value="Feminino" id="feminino" checked={inputValue.gender === "Feminino"} onChange={handleChange} />
          <label htmlFor="feminino">Feminino</label>
        </div>
        <div>
          <input type='radio' name="gender" value="Masculino" id="masculino" checked={inputValue.gender === "Masculino"} onChange={handleChange} />
          <label htmlFor="masculino">Masculino</label>
        </div>
        <button className='btn' type="submit" onClick={handleSubmit}>Enviar</button>
      </form>
      </div>

      <div className='container-answer'>
      {showAnswers && (
        <div>
          <h2>Respostas</h2>
          <p>
            <h3>Nome:</h3> {inputValue.nome}
          </p>
          <p>
            <h3>Idade:</h3> {inputValue.idade}
          </p>
          <p>
            <h3>E-mail:</h3> {inputValue.email}
          </p>
          <p>
            <h3>Gênero:</h3> {inputValue.gender}
          </p>
          <button className='btn' onClick={hideAnswers}>Limpar</button>
        </div>
        

      )}
    </div>
    </>
  );
}


export default Form;
