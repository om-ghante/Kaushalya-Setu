import React from 'react';

const TextArea = ({ name, value, onChange, placeholder, required = true, rows = 4 }) => {
  return (
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-700"
      required={required}
      rows={rows}
    />
  );
};

export default TextArea;