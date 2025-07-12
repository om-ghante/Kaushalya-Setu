import React, { useRef, useEffect } from 'react';

const PopupModal = ({ title, onClose, children }) => {
  const modalRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
      <div 
        ref={modalRef}
        className="bg-white rounded-lg shadow-sm w-full max-w-4xl mx-4 max-h-[90vh] overflow-hidden flex flex-col"
      >
        <div className="p-4 bg-gray-50 border-b">
          <h2 className="text-xl font-semibold text-center">{title}</h2>
        </div>
        <div className="overflow-y-auto p-6 flex-1">
          {children}
        </div>
      </div>
    </div>
  );
};

export default PopupModal;