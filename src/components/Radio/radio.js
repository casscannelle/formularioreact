import React from 'react';

const GenderFormItem = ({ selectedOption, onOptionChange }) => {
  const genderOptions = [
    { label: 'Masculino', value: 'Masculino' },
    { label: 'Feminino', value: 'Feminino' },
    { label: 'Outro', value: 'Outro' },
    { label: 'Prefiro não informar', value: 'Não Informado' },
  ];



  return (
    <div>
      <label>Gênero:</label>
      <div>
        {genderOptions.map((option) => (
          <div key={option.value}>
            <input
              type='radio'
              id={option.value}
              value={option.value}
              checked={selectedOption === option.value}
              onChange={() => onOptionChange(option.value)}
            />
            <label htmlFor={option.value}>{option.label}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenderFormItem;