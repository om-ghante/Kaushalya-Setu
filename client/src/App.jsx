import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import Dashboard from './pages/Dashboard';
import Register from './pages/auth/Register';
import DeviceWarningPopup from './pages/DeviceWarningPopup';

function App() {
//  useEffect(() => {
//    document.body.style.overflow = 'hidden';
//    return () => {
//      document.body.style.overflow = 'auto';
//    };
//  }, []);

  useEffect(() => {
        console.log(
            "%cStop!",
            "color: red; font-size: 50px; font-weight: bold;"
        );
        console.log(
            "%cThis is a browser feature intended for developers...",
            "font-size: 16px;"
        );
    }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Homepage / Main Dashboard */}
        <Route path="/" element={<Dashboard />} />

        {/* Register Page */}
        <Route path="/register" element={<Register />} />

        {/* Add more routes here if needed */}
      </Routes>

      {/* Always show the device warning popup */}
      <DeviceWarningPopup />
    </BrowserRouter>
  );
}

export default App;