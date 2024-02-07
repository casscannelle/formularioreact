import { useState } from 'react';

function Form() {
  const [inputValue, setInputValue] = useState({ nome: '', email: '', idade: '', gender: 'Feminino'});
  const [showAnswers, setshowAnswers] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputValue((prevInputValue) => ({ ...prevInputValue, [name]: value }));
    setshowAnswers(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      setshowAnswers(true);
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (inputValue.nome.length < 3) {
      errors.nome = 'Por favor, digite seu nome';
    }
    if (inputValue.idade === 0 || inputValue.idade === '0') {
      errors.idade = 'Por favor, digite sua idade';
    }
    if (!inputValue.email.includes('@')) {
      errors.email = 'Digite um e-mail válido';
    }
    if (!inputValue.gender) {
      errors.gender = 'Por favor, selecione um gênero';
    }
    return errors;
  };
    
  const hideAnswers = (event) => {
    event.preventDefault();
    setshowAnswers(false);
    setErrors({});
  }

  return (
    <>
    <div className='container-form'>
      <form>
        <h1 className='form_h1'>Preencha seus dados</h1>
        <label>Nome:</label>
        <input className='form_input' type="text" name="nome" value={inputValue.nome} onChange={handleChange} required />
        {errors.nome && <p className="error-message">{errors.nome}</p>}
        <label>Idade:</label>
        <input className='form_input' type="number" name="idade" value={inputValue.idade} onChange={handleChange} min="0" required />
        {errors.idade && <p className="error-message">{errors.idade}</p>}
        <label>E-mail:</label>
        <input className='form_input' type="email" name="email" value={inputValue.email} onChange={handleChange} required />
        {errors.email && <p className="error-message">{errors.email}</p>}
        <label>Gênero</label>
        <div>
          <input type='radio' name="gender" value="Feminino" id="feminino" checked={inputValue.gender === "Feminino"} onChange={handleChange} />
          <label htmlFor="feminino">Feminino</label>
        </div>
        <div>
          <input type='radio' name="gender" value="Masculino" id="masculino" checked={inputValue.gender === "Masculino"} onChange={handleChange} />
          <label htmlFor="masculino">Masculino</label>
        </div>
        <div>
          <input type='radio' name="gender" value="Não informado" id="naoinformado" checked={inputValue.gender === "Não informado"} onChange={handleChange} />
          <label htmlFor="naoinformado">Prefiro não informar</label>
        </div>
        {errors.gender && <p className="error-message">{errors.gender}</p>}
        <button className='btn' type="submit" onClick={handleSubmit}>Enviar</button>
      </form>
      </div>

      <div className={`container-answer ${showAnswers ? '' : 'hide-container-answer'}`}>
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
