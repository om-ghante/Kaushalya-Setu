import { useAuth } from '../context/AuthContext';
import { logoutUser } from '../firebase/authFirebaseOperations';

const getInitials = (firstName, lastName) => {
  const first = firstName?.charAt(0)?.toUpperCase() || '';
  const last = lastName?.charAt(0)?.toUpperCase() || '';
  return `${first}${last}`;
};

const Profile = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logoutUser();
    logout(); 
  };

  if (!user) return <div className="p-6">No user logged in.</div>;

  return (
    <div className="bg-white rounded-sm shadow-sm p-4 mb-6">
      <h2 className="text-xl font-lg mb-4">Profile Information</h2>

      <div className="flex items-center mb-4">
        {user.photoURL ? (
          <img
            src={user.photoURL}
            alt="Profile"
            className="w-16 h-16 rounded-full object-cover border border-gray-300 mr-4"
          />
        ) : (
          <div className="w-16 h-16 bg-gray-300 text-white flex items-center justify-center rounded-full font-semibold text-lg mr-4">
            {getInitials(user.firstName, user.lastName)}
          </div>
        )}

        <div>
          <h3 className="font-bold text-md">{user.firstName} {user.lastName}</h3>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="mt-4 py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
