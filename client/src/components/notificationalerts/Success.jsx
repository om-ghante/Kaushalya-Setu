// src/components/alerts/SuccessMessage.jsx

import React from 'react';

const SuccessMessage = ({ message, type = 'success' }) => {
  const bgColor = type === 'success' ? 'bg-green-100' : 'bg-red-100';
  const textColor = type === 'success' ? 'text-green-700' : 'text-red-700';
  const borderColor = type === 'success' ? 'border-green-400' : 'border-red-400';

  return (
    <div className={`border ${borderColor} ${bgColor} ${textColor} px-4 py-3 rounded relative`} role="alert">
      <strong className="font-bold">{type === 'success' ? 'Success!' : 'Error!'}</strong>
      <span className="block sm:inline ml-1">{message}</span>
    </div>
  );
};

export default SuccessMessage;
