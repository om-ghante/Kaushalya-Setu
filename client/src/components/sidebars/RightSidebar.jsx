import React, { useRef, useEffect } from 'react';
import ColorIconButton from '../buttons/ColorIconButton';
import { BsXLg, BsPin, BsPinFill } from 'react-icons/bs';
import { useAuth } from '../../context/AuthContext';
import Inbox from '../messageComponents/Inbox'; // adjust the path based on your structure

const RightSidebar = ({ isOpen, isPinned, onClose, onTogglePin }) => {
  const sidebarRef = useRef(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!isPinned && isOpen) {
      const handleClickOutside = (event) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
          onClose();
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isPinned, isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      ref={sidebarRef}
      className={`fixed inset-y-0 right-0 z-40 
        ${isPinned ? 'w-1/4' : 'w-1/2'} 
        bg-white shadow-lg border-l border-gray-200
        transition-all duration-300 ease-in-out
        ${isPinned ? '' : 'shadow-xl'}`}
    >
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Tools Panel</h2>
        <div className="flex gap-2">
          <ColorIconButton
            icon={isPinned ? <BsPinFill className="text-blue-500" /> : <BsPin />}
            onClick={onTogglePin}
            ariaLabel={isPinned ? "Unpin sidebar" : "Pin sidebar"}
            bgColor="bg-transparent"
            hoverColor="hover:bg-gray-100"
            textColor="text-gray-500"
          />
          <ColorIconButton
            icon={<BsXLg />}
            onClick={onClose}
            ariaLabel="Close sidebar"
            bgColor="bg-transparent"
            hoverColor="hover:bg-gray-100"
            textColor="text-gray-500"
          />
        </div>
      </div>

      <div className="p-4 h-[calc(100vh-57px)] overflow-y-auto">
        {user ? (
          <Inbox />
        ) : (
          <div className="text-center text-gray-500 mt-10">
            <p className="text-lg font-medium">Please log in to start chatting with someone.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RightSidebar;
