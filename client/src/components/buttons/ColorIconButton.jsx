const ColorIconButton = ({ 
  icon, 
  onClick, 
  className = '', 
  ariaLabel,
  bgColor = 'bg-gray-200',
  hoverColor = 'hover:bg-blue-50',
  textColor = 'text-gray-500'
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        ${bgColor}
        ${hoverColor}
        ${textColor}
        p-3
        transition-all
        duration-200
        ease-in-out
        rounded-sm
        focus:ring-opacity-50
        ${className}
      `}
      aria-label={ariaLabel}
    >
      {icon}
    </button>
  );
};

export default ColorIconButton;