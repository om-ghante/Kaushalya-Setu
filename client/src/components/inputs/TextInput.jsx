import React from 'react';

const TextInput = ({ name, value, onChange, placeholder, type = 'text', required = true }) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-700"
      required={required}
    />
  );
};

export default TextInput;
