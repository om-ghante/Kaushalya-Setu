import { useEffect } from 'react';
import './App.css';

import Dashboard from './pages/Dashboard';
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
    <>
    <Dashboard />
    <DeviceWarningPopup />
    </>
  );
}

export default App;