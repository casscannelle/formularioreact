import { useState } from 'react';
import GenderFormItem from '../Radio/radio';

function Form() {
  const [inputValue, setInputValue] = useState({ nome: '', email: '', idade: ''});
  const [gender, setGender] = useState('');
  const [showAnswers, setshowAnswers] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputValue((prevInputValue) => ({ ...prevInputValue, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setshowAnswers(true);
  };

  const hideAnswers = (event) => {
    event.preventDefault();
    setshowAnswers(false);
  }

  const handleGenderChange = (selectedGender) => {
    setGender(selectedGender);
  };


  return (
    <>
    <div className='container-form'>
      <form>
        <h1 className='form_h1'>Preencha seus dados</h1>
        <label>Nome:</label>
        <input className='form_input' type="text" name="nome" value={inputValue.nome} onChange={handleChange} minlength="3" required={true} />
        <label>Idade:</label>
        <input className='form_input' type="number" name="idade" value={inputValue.idade} onChange={handleChange} min="0" required={true} />
        <label>E-mail:</label>
        <input className='form_input' type="email" name="email" value={inputValue.email} onChange={handleChange} required={true} />
        <GenderFormItem selectedOption={gender} onOptionChange={handleGenderChange} />
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
            <h3>Gênero:</h3> {gender}
          </p>
          <button className='btn' onClick={hideAnswers}>Limpar</button>
        </div>
        

      )}
    </div>
    </>
  );
}


export default Form;
