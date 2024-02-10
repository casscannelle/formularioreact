import { useState } from 'react';
import React from 'react';


function Form() {
  const [inputValue, setInputValue] = useState({ nome: '', email: '', idade: '', gender: 'Feminino' });
  const [showAnswers, setShowAnswers] = useState(false);
  const [errors, setErrors] = useState({});
  const [responses, setResponses] = useState([]);
  const [selectedResponse, setSelectedResponse] = useState(null);
  const [sortOrder, setSortOrder] = useState('newest');
  
  

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputValue((prevInputValue) => ({ ...prevInputValue, [name]: value }));
    
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      setShowAnswers(true);
  
      // Atualizar lista de respostas
      const newResponse = { ...inputValue, timestamp: new Date() };
      setResponses((prevResponses) => [newResponse, ...prevResponses]);
  
      // Limpar o formulário
      setInputValue({ nome: '', email: '', idade: '', gender: 'Feminino' });
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (inputValue.nome.length < 3) {
      errors.nome = 'Por favor, digite seu nome';
    }
    if (inputValue.idade.length === 0) {
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
    setShowAnswers(false);
    setErrors({});
  };

  const showResponseModal = (response) => {
    setSelectedResponse(response);
  };

  const hideModal = () => {
    setSelectedResponse(null);
  };

  const toggleSortOrder = () => {
    setSortOrder((prevSortOrder) => (prevSortOrder === 'newest' ? 'oldest' : 'newest'));
  };

  const getSortedResponses = () => {
    return sortOrder === 'newest'
      ? [...responses].sort((a, b) => b.timestamp - a.timestamp)
      : [...responses].sort((a, b) => a.timestamp - b.timestamp);
  };

  const deleteAnswer = (index) => {
    const updatedResponses = [...responses];
    updatedResponses.splice(index, 1);
    setResponses(updatedResponses);
  }

  return (
    <div className='container-wrapper'>
      <div className='container-form'>
        <form>
        <h1 className='form_h1'>Preencha seus dados</h1>
        <label>Nome:</label>
        <input className='form_input' type="text" name="nome" value={inputValue.nome} onChange={handleChange} required />
        {showAnswers || !errors.nome ? null : <p className="error-message">{errors.nome}</p>}
        <label>Idade:</label>
        <input className='form_input' type="number" name="idade" value={inputValue.idade} onChange={handleChange} min="0" required />
        {showAnswers || !errors.idade ? null : <p className="error-message">{errors.idade}</p>}
        <label>E-mail:</label>
        <input className='form_input' type="email" name="email" value={inputValue.email} onChange={handleChange} required />
        {showAnswers || !errors.email ? null : <p className="error-message">{errors.email}</p>}
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
        {showAnswers || !errors.gender ? null : <p className="error-message">{errors.gender}</p>}
        <button className='btn' type="submit" onClick={handleSubmit}>
            Enviar
          </button>
        </form>
      </div>
      {/* Respostas por nome */}
      <div className={`container-answer ${showAnswers ? '' : 'hide-container-answer'}`}>
        {showAnswers && (
          <div>
            <>
            <h2>Respostas</h2>
              <button className="btn-filter" onClick={toggleSortOrder}>
                {sortOrder === 'newest' ? 'Mais recentes' : 'Mais antigas'}
              </button>
              </>
            
            
            <ol>
              {getSortedResponses().map((response, index) => (
                <li key={index} >
                  {response.nome} 
                  <button className="btn-vermais" onClick={() => showResponseModal(response)}>Ver mais</button>
                  <button className="btn-vermais" onClick={() => deleteAnswer(index)}>Excluir</button>
                </li>
              ))}
            </ol>
            <button className='btn' onClick={hideAnswers}>
              Fechar
            </button>
          </div>
        )}
      </div>


      {/* Modal com respostas completas */}
      {selectedResponse && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={hideModal}>
              &times;
            </span>
            <h2>Detalhes da Resposta</h2>
            <p>
              <strong>Nome:</strong> {selectedResponse.nome}
            </p>
            <p>
              <strong>Idade:</strong> {selectedResponse.idade}
            </p>
            <p>
              <strong>E-mail:</strong> {selectedResponse.email}
            </p>
            <p>
              <strong>Gênero:</strong> {selectedResponse.gender}
            </p>
            <button className="btn" onClick={hideModal}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Form;