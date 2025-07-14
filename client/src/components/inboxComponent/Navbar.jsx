import React from 'react';
import { signOut, getAuth } from 'firebase/auth';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        logout();
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  };

  const getInitials = () => {
    const first = user?.firstName?.charAt(0)?.toUpperCase() || '';
    const last = user?.lastName?.charAt(0)?.toUpperCase() || '';
    return `${first}${last}`;
  };

  return (
    <div className="navbar flex items-center justify-between px-4 py-2 bg-blue-600 text-white shadow-md">
      <span className="logo text-lg font-bold">ChatBox</span>
      {user && (
        <div className="user flex items-center gap-3">
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt="profile"
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-white text-blue-600 flex items-center justify-center font-bold">
              {getInitials()}
            </div>
          )}
          <span className="font-medium hidden sm:inline">
            {user.displayName || `${user.firstName} ${user.lastName}`}
          </span>
          <button
            onClick={handleLogout}
            className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-200 transition"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
