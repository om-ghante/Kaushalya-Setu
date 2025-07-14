import React from 'react'
import Profile from '../Profile'
import PostList from '../../components/list/PostList'
import MyMatch from '../../components/userComponents/MyMatch'
import Calendar from '../../components/userComponents/Calendar'
import { useAuth } from '../../context/AuthContext';


const Home = () => {
    const { user, setUser } = useAuth();

      const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };
  return (
    <div>
      <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-3 space-y-6">
              {user && <Profile user={user} onLogout={logout} />}
            </div>
            <div className="lg:col-span-6 space-y-6">
              <PostList />
            </div>
            <div className="lg:col-span-3 space-y-6">
              <MyMatch />
              <Calendar />
              <div>
                  <p className="text-center text-md text-gray-500 mt-8">
                    Made By Om Ghante with Passion
                  </p>
                  <p className="text-center text-sm text-gray-500">
                    Kaushalya Setu © 2025
                  </p>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Home
