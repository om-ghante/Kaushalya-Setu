import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import ColorIconButton from '../buttons/ColorIconButton';

const PasswordInput = ({ value, onChange, placeholder, label, name }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={name}
          name={name}
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-700"
          required
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-2">
          <ColorIconButton
            icon={showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            onClick={() => setShowPassword(!showPassword)}
            ariaLabel="Toggle password visibility"
            bgColor="bg-transparent"
            hoverColor="hover:bg-gray-100"
            textColor="text-gray-600"
            className="p-1"
          />
        </div>
      </div>
    </div>
  );
};

export default PasswordInput;
