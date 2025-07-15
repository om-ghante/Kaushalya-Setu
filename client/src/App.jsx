import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import Dashboard from './pages/Dashboard';
import Register from './pages/auth/Register';
import DeviceWarningPopup from './pages/DeviceWarningPopup';
import Home from './pages/protected/Home';
import ExploreSkills from './pages/protected/ExploreSkills';
import Profile from './pages/protected/ProfileDashboard';
import Calender from './pages/protected/CalenderDashboard';
import MyMatch from './pages/protected/MyMatchDashboard';
import Inbox from './pages/protected/InboxDashboard';

import { AuthProvider } from './context/AuthContext';
import { ChatContextProvider } from './context/ChatContext'; 

function App() {
  useEffect(() => {
    console.log("%cStop!", "color: red; font-size: 50px; font-weight: bold;");
    console.log(
      "%cThis is a browser feature intended for developers...",
      "font-size: 16px;"
    );
  }, []);

  return (
    <AuthProvider>
      <ChatContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />}>
              <Route index element={<Navigate to="/" replace />} />
              <Route path="home" element={<Home />} />
              <Route path="explore" element={<ExploreSkills />} />
              <Route path="profile" element={<Profile />} />
              <Route path="match" element={<MyMatch />} />
              <Route path="calendar" element={<Calender />} />
              <Route path="inbox" element={<Inbox />} />
            </Route>
          </Routes>

          <DeviceWarningPopup />
        </BrowserRouter>
      </ChatContextProvider>
    </AuthProvider>
  );
}

export default App;
