const TextButton = ({ 
  text, 
  onClick, 
  className = '', 
  bgColor = 'bg-gray-200',
  hoverColor = 'hover:bg-blue-50',
  textColor = 'text-gray-700'
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        px-4 py-2
        rounded-md
        font-medium
        transition-all
        duration-200
        ease-in-out
        focus:outline-none
        focus:ring-1
        focus:ring-violet-700
        focus:ring-opacity-50
        ${bgColor}
        ${hoverColor}
        ${textColor}
        ${className}
      `}
    >
      {text}
    </button>
  );
};

export default TextButton;